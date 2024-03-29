import React, { useState, useRef } from 'react';
import getBlobDuration from 'get-blob-duration';
import { Typography, Card, TableCell, Button, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { useTheme } from '@mui/material/styles';


export const MicrophoneRecorder = (props) => {
  const theme = useTheme();
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // console.log('Microphone access granted');
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/' });
        setAudioBlob(audioBlob)
        getBlobDuration(audioBlob).then(function (duration) {
          // console.log(duration + ' seconds');
          if (duration * 1000 < 30000) {
            props.setListOfTracks(prevList => [...prevList, URL.createObjectURL(audioBlob)]);
            // console.log(props.maxTracks)
            props.setMax(props.maxTracks + 1);
            // console.log(props.maxTracks)
            // if (props.maxTracks >= 2) {
            if (props.maxTracks < 3) {
              props.setUnderMax(true);
              // console.log(props.setUnderMax)
            } else {
              props.setUnderMax(false);
            };
          } else {
            alert(`'Your recording is ${duration * 1000} seconds. Please record less than 30 seconds.'`);
          }
        })
      });

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }

  function stopRecording() {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }


  return (
    <Button variant="contained" color="secondary" sx={{ gap: '10px' }} onClick={recording ? stopRecording : startRecording} disabled={!props.underMax}>
      <MicIcon />
      {recording ? 'Stop Recording' : 'Start Recording'}
    </Button>
  );
}