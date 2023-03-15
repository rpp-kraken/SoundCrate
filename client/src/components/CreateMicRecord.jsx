import React, { useState, useRef } from 'react';
import getBlobDuration from 'get-blob-duration';

export const MicrophoneRecorder = (props) => {
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
            alert(`'Your recording is ${duration*1000} seconds. Please record less than 30 seconds.'`);
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
    <div>
      {props.underMax && <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>}
    </div>
  );
}