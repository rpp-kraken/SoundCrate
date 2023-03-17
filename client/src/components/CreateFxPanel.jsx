import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
// import WaveformCanvas from './WaveformCanvas.jsx';

const CreateFxPanel = (props) => {

  const [sliderVolumeValue, setSliderVolume] = useState(1);
  const [sliderPitchValue, setSliderValue] = useState(0);
  const [tempoValue, setTempoValue] = useState(1);
  const [mute1prev, setMute1prev] = useState(0);
  const [isMuted1, setIsMuted1] = useState(false);

  useEffect(() => {
    // console.log(`${props.trackUrl} CARD RENDER. Key = ${props.index}`);
    const player = new Tone.Player(props.trackUrl).connect(gainNode);
    const key = props.index;
    const obj = {};
    obj[key] = player;
    handleFileChange(obj, tempoValue);
  }, [sliderVolumeValue, sliderPitchValue, tempoValue, mute1prev, isMuted1]);

  const handleFileChange = (newsound, tempo) => {
    props.handleAddPlayer(newsound, tempo);
  };

  const handleChangeVolume = (event) => {
    event.preventDefault();
    setSliderVolume(event.target.value);
  };

  const handleChangePitch = (event) => {
    event.preventDefault();
    setSliderValue(event.target.value);
  };

  const handleChangeTempo = (event) => {
    event.preventDefault();
    setTempoValue(event.target.value);
  };

  // const onClickDelete = (index) => {
  //   props.handleDelete(props.index);
  // };

  const muteSound = () => {
    setIsMuted1(!isMuted1);
    if (isMuted1) {
      // console.log('unmuting Track');
      setSliderVolume(mute1prev);
    } else {
      setMute1prev(sliderVolumeValue);
      // console.log('Muting Track');
      setSliderVolume(0);
    }
  }

  // FX Needed for BMR
  let effectPitch = new Tone.PitchShift(sliderPitchValue).toDestination();
  let gainNode = new Tone.Gain(sliderVolumeValue).connect(effectPitch);

  return (
    // <div className={props.index + 1 === props.active ? null : "hidden"}>
    <div>
      <h4> FX: Sound {props.index + 1}</h4>
      <button className="outline-button-button" onClick={muteSound}>
        {isMuted1 ? 'Unmute' : 'Mute'}
      </button>
      {/* <button className="outline-button-button" onClick={onClickDelete}>
        Delete Track
      </button> */}
      <div>
        <p>Volume Slider value: {sliderVolumeValue}</p>
        <input
          type="range"
          min="0"
          max="3"
          step="0.25"
          value={sliderVolumeValue}
          onChange={handleChangeVolume}
          disabled={isMuted1}
        />
      </div>
      <div>
        <p>Pitch Slider value: {sliderPitchValue}</p>
        <input
          type="range"
          min="-24"
          max="24"
          value={sliderPitchValue}
          onChange={handleChangePitch}
        />
      </div>
      <div>
        <p>Tempo Slider value: {tempoValue}</p>
        <input
          type="range"
          min="0.2"
          max="4"
          step="0.2"
          value={tempoValue}
          onChange={handleChangeTempo}
        />
      </div>
      <br />
      <br />
    </div>
  )
}

export default CreateFxPanel;
