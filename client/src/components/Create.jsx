import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Typography, Card, TableCell, Button, IconButton } from '@mui/material';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import * as Tone from 'tone';
import audioBufferToWav from 'audiobuffer-to-wav';
import CreateFxPanel from './CreateFxPanel.jsx';
import CreateAudioWaveform from './CreateAudioWaveform.jsx'
import { MicrophoneRecorder } from './CreateMicRecord.jsx';
import { Publish } from './Publish.jsx';

export default function Create(props) {
  const theme = useTheme();


  const [listOfTracks, setListOfTracks] = useState([]);
  const [listPlayers, setListPlayers] = useState({});
  const [song, setSong] = useState();
  const [songUrl, setSongUrl] = useState();
  const [openPublish, setOpenPublish] = useState(false);
  const [isTrack, setIsTrack] = useState(false);
  const [maxTracks, setMax] = useState(0);
  const [underMax, setUnderMax] = useState(true);

  useEffect(() => {
    if (props.collaborateSongPath) {
      let trackUrlSources = [
        props.collaborateSongPath
      ];
      setMax(trackUrlSources.length);
      setListOfTracks(trackUrlSources);
    }
  }, []);

  useEffect(() => {
    if (maxTracks < 3) {
      setUnderMax(true);
    } else {
      setUnderMax(false);
    };
    if (maxTracks > 0) {
      setIsTrack(true);
    }
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
          if (maxTracks === 0) {
            setIsTrack(false);
          }
        };
      }
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
  };

  const handleDelete = (index) => {
    setListOfTracks([]);
    setMax(0);
    setIsTrack(false);
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

        setSongUrl(url);
        setSong(blob);
        // Create an anchor tag and allows for download of wav right now
      }, maxDuration);
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 'fit-content', marginBottom: '110px', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={1} p={4} sx={{ backgroundColor: theme.palette.background.default, flexDirection: 'column', alignItems: 'center', maxWidth: '300px', minWidth: '300px' }}>
        <Typography color="secondary" variant='bodyText' sx={{ width: '75%', textAlign: 'center', color: 'white' }}>To start creating, upload some audio or record yourself!</Typography>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
        {underMax &&
        <Button
          id="upload-button"
          component="label"
          color="secondary"
          htmlFor="upload-audio"
          sx={{ gap: '10px' }}
        >
          <CloudUploadOutlined />
          Upload File
          <input
            id="upload-audio"
            type="file"
            accept="audio/*"
            onChange={handleUploadAudio}
            hidden
          />
        </Button>
        }
        {underMax &&
        <MicrophoneRecorder setListOfTracks={setListOfTracks} setMax={setMax} maxTracks={maxTracks} setUnderMax={setUnderMax} underMax={underMax} />
        }
      </Box>
        {listOfTracks.map((urlTrack, i) => { return <CreateAudioWaveform trackUrl={urlTrack} index={i} key={i} /> })}
      <div className="sidescroller">
        {listOfTracks.map((urlTrack, i) => { return <CreateFxPanel trackUrl={urlTrack} index={i} key={i} handleAddPlayer={handleAddPlayer} /> })}
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '10px' }}>
        {isTrack &&
        <Button variant="contained" onClick={handlePlayAll}>
          Play All
        </Button>}
        {
        isTrack &&
        <>
          <Button variant="contained" onClick={handleDelete}>
            Clear All
          </Button>
          <Button variant="contained" onClick={handlePublish}>
            Publish
          </Button>
        </>
        }
      </Box>

      {openPublish && <Publish setOpenPublish={setOpenPublish} song={song} songUrl={songUrl} profileData={props.profileData} changeView={props.changeView} />}
    </Box>
  );
}