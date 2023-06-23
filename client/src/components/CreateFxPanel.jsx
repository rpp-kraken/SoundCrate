import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Box, Typography, Card, TableCell, Button, IconButton } from '@mui/material';

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

  const muteSound = () => {
    setIsMuted1(!isMuted1);
    if (isMuted1) {
      setSliderVolume(mute1prev);
    } else {
      setMute1prev(sliderVolumeValue);
      setSliderVolume(0);
    }
  }

  // Available Sound FX
  let effectPitch = new Tone.PitchShift(sliderPitchValue).toDestination();
  let gainNode = new Tone.Gain(sliderVolumeValue).connect(effectPitch);

  const sliderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75px'
  }

  return (
    <Box className="fx-box">
      <h4 style={{ margin: '3px' }}>FX: Sound {props.index + 1}</h4>
      <Button style={{ padding: '3px', fontSize: '14px' }}onClick={muteSound}>
        {isMuted1 ? 'Unmute' : 'Mute'}
      </Button>
      <Box className="fx-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="slider-container" style={{ ...sliderStyle  }}>
          <p style={{ fontSize: '14px', margin: '0' }}>{sliderVolumeValue}</p>
          <input
            className="fx-slider"
            orient="vertical"
            type="range"
            min="0"
            max="3"
            step="0.25"
            value={sliderVolumeValue}
            onChange={handleChangeVolume}
            disabled={isMuted1}
            style={{ width: '10px', height: '100px' }}
          />
          <p style={{ fontSize: '14px', margin: '0' }}>Volume</p>
        </Box>
        <Box className="slider-container" style={{ ...sliderStyle  }}>
          <p style={{ fontSize: '14px', margin: '0' }}>{sliderPitchValue}</p>
          <input
            className="fx-slider"
            orient="vertical"
            type="range"
            min="-24"
            max="24"
            value={sliderPitchValue}
            onChange={handleChangePitch}
            style={{ width: '10px', height: '100px'  }}
          />
          <p style={{ fontSize: '14px', margin: '0' }}>Pitch</p>
        </Box>
        <Box className="slider-container" style={{ ...sliderStyle  }}>
          <p style={{ fontSize: '14px', margin: '0' }}>{tempoValue}</p>
          <input
            className="fx-slider"
            orient="vertical"
            type="range"
            min="0.2"
            max="4"
            step="0.2"
            value={tempoValue}
            onChange={handleChangeTempo}
            style={{ width: '10px', height: '100px'  }}
          />
          <p style={{ fontSize: '14px', margin: '0' }}>Tempo</p>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateFxPanel;
