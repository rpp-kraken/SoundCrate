import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import * as Tone from 'tone';
import audioBufferToWav from 'audiobuffer-to-wav';
import CreateFxPanel from './CreateFxPanel.jsx';
import CreateAudioWaveform from './CreateAudioWaveform.jsx'
import { MicrophoneRecorder } from './CreateMicRecord.jsx';
import { Publish } from './Publish.jsx';

export default function Create(props) {

  const [listOfTracks, setListOfTracks] = useState([]);
  const [listPlayers, setListPlayers] = useState({});
  const [song, setSong] = useState(null);
  const [openPublish, setOpenPublish] = useState(false);
  // const [maxDuration, setMaxDuration] = useState(0);

  const [maxTracks, setMax] = useState(0);
  const [underMax, setUnderMax] = useState(true);

  // TODO: state or active track tapped
  // const [activeSoundCard, setActiveSoundCard] = useState(1);

  useEffect(() => {
    // console.log('first render!',);
    // TODO: COLLABORATE (put track URL into this array)
    let trackUrlSources = [
      // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
      // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
      // 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
      // 'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
      // 'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
      // 'https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0',
      // 'https://dl.dropboxusercontent.com/s/d539eig06ioc35s/one%20two.webm?dl=0',
    ];
    setMax(trackUrlSources.length);
    setListOfTracks(trackUrlSources);
  }, []);

  useEffect(() => {
    if (maxTracks < 3) {
      setUnderMax(true);
    } else {
      setUnderMax(false);
    };
  }, [maxTracks]);

  const listPlayersObj = {};

  function handleUploadAudio(event) {
    const file = event.target.files[0];
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = function () {
      const duration = audio.duration;
      if (duration > 30) {
        alert('Audio file must be no longer than 30 seconds.');
        return;
      } else {
        setListOfTracks(prevList => [...prevList, URL.createObjectURL(file)]);
        if (maxTracks <= 3) {
          // console.log(maxTracks);
          setMax(maxTracks + 1);
          if (maxTracks >= 2) {
            setUnderMax(false);
          }
        };
      }
      // Handle the valid audio file here
    };
  }

  const handlePublish = async () => {
    if (listOfTracks.length === 0) {
    alert('There is no song to publish')
    return;
    }
    await handleRender();
    setOpenPublish(true);
  }

  const handleAddPlayer = (player, tempoValue) => {
    const key = Object.keys(player);
    player[key]["transpose"] = tempoValue;
    listPlayersObj[key[0]] = player[key];

    setListPlayers(prevState => ({
      ...prevState,
      ...listPlayersObj
    }));
    // console.log('adding player to multiplayer...', listPlayers);
  };

  const handleDelete = (index) => {
    setListPlayers({});
    setListOfTracks([]);
    setUnderMax(true);
    setMax(0);
  };

  const handlePlayAll = () => {
    // console.log('PLAY ALL');
    Tone.loaded().then(() => {
      // Create a Gain node to use as the output destination
      const output = new Tone.Gain().toDestination();
      Tone.start();
      Tone.Transport.start();

      // Main Multiplayer (combined sound, what we hear)
      for (var key in listPlayers) {
        const playerEach = listPlayers[key];
        playerEach.start(); // Deleting this stops all sound
        playerEach.playbackRate = playerEach["transpose"];
      }
    });
  };

  const handleRecordRender = () => {
    // console.log('Render ALL tracks into Song');
    var maxDuration = 0;

    Tone.loaded().then(() => {
      // Create a Gain node to use as the output destination
      const output = new Tone.Gain().toDestination();
      // Create a new recorder and connect it to the output node
      const recorder = new Tone.Recorder();
      Tone.Master.connect(recorder);
      // Start recording
      recorder.start();

      Tone.start();
      Tone.Transport.start();

      // Main Multiplayer (combined sound, what we hear)
      for (var key in listPlayers) {
        const playerEach = listPlayers[key];
        // Play code block
        playerEach.start(); // Deleting this stops all sound
        playerEach.playbackRate = playerEach["transpose"];
        const durationMilliseconds = Math.round(playerEach.buffer.duration * 1000 / playerEach["transpose"]);
        if (durationMilliseconds > maxDuration) {
          maxDuration = durationMilliseconds;
          // console.log("set max duration: ", maxDuration);
        }
      }

      setTimeout(async () => {
        // the recorded audio is returned as a blob
        const recording = await recorder.stop();

        // //This is for disconnecting players:
        // for (var key in listPlayers) {
        //   const playerEach = listPlayers[key];
        //   playerEach.disconnect();
        // }

        // convert the blob to a Buffer
        const buffer = await recording.arrayBuffer();

        // convert the blob to an AudioBuffer
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(buffer);

        const wavData = audioBufferToWav(audioBuffer);
        setSong(new DataView(wavData));
        // Create an anchor tag and allows for download of wav right now
        const anchor = document.createElement('a');
        anchor.setAttribute('href', url);
        anchor.setAttribute('download', 'renderedSong.wav');
        anchor.click();
      }, maxDuration);
    });
  };

  const handleRender = () => {
    // console.log('Render ALL tracks into Song');
    var maxDuration = 0;

    Tone.loaded().then(() => {
      // Create a Gain node to use as the output destination
      const output = new Tone.Gain().toDestination();
      // Create a new recorder and connect it to the output node
      const recorder = new Tone.Recorder();
      Tone.Master.connect(recorder);
      // Start recording
      recorder.start();

      Tone.start();
      Tone.Transport.start();

      // Main Multiplayer (combined sound, what we hear)
      for (var key in listPlayers) {
        const playerEach = listPlayers[key];
        playerEach.start(); // Deleting this stops all sound
        playerEach.playbackRate = playerEach["transpose"];
        const durationMilliseconds = Math.round(playerEach.buffer.duration * 1000 / playerEach["transpose"]);
        if (durationMilliseconds > maxDuration) {
          maxDuration = durationMilliseconds;
          // console.log("set max duration: ", maxDuration);
        }
      }

      setTimeout(async () => {
        // the recorded audio is returned as a blob
        const recording = await recorder.stop();

        // //This is for disconnecting players:
        // for (var key in listPlayers) {
        //   const playerEach = listPlayers[key];
        //   playerEach.disconnect();
        // }

        // convert the blob to a Buffer
        const buffer = await recording.arrayBuffer();

        // convert the blob to an AudioBuffer
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(buffer);

        const wavData = audioBufferToWav(audioBuffer);

        // Create a Blob from the WAV data
        const blob = new Blob([new DataView(wavData)], { type: 'audio/wav' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        setSong(url);
        // Create an anchor tag and allows for download of wav right now
      }, maxDuration);
    });
  };

  return (
    <div>
      <h4>Create Tab - Project View</h4>
      <button className="outline-button-button" onClick={handlePlayAll}>
        Play All Sounds (with FX)
      </button><br />
      <button className="outline-button-button" onClick={handleRecordRender}>
        Render and download song
      </button><br />
      <button className="outline-button-button" onClick={handleDelete}>
        Delete All Tracks
      </button>
      <br />
      {/* {listOfTracks.map((urlTrack, i) => { return <WaveformCanvas trackUrl={urlTrack} index={i} key={i}/> })} */}
      {listOfTracks.map((urlTrack, i) => { return <CreateAudioWaveform trackUrl={urlTrack} index={i} key={i} /> })}
      <div className="sidescroller">
        {listOfTracks.map((urlTrack, i) => { return <CreateFxPanel trackUrl={urlTrack} index={i} key={i} handleAddPlayer={handleAddPlayer} handleDelete={handleDelete} /> })}
      </div>
      <h4>
        Upload File
      </h4>
      <form>
        {underMax && <input type="file" accept="audio/*" onChange={handleUploadAudio} />}
      </form>
      <h4>
        Record Audio
      </h4>
      {underMax && <MicrophoneRecorder setListOfTracks={setListOfTracks} setMax={setMax} maxTracks={maxTracks} setUnderMax={setUnderMax} underMax={underMax} />}
      <button onClick={handlePublish}> Publish </button>
      {openPublish && <Publish setOpenPublish={setOpenPublish} song={song} changeView={props.changeView} changeView={props.changeView}/>}
      <br/><br/>
      <br/><br/>
      <br/><br/>
    </div>
  );
}