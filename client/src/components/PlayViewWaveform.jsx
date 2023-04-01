import React, { useState, useEffect, useContext, useRef } from 'react';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import wavesurfer from 'wavesurfer.js';
import { Typography, Card, TableCell, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const PlayViewWaveform = (props) => {
	const theme = useTheme();

	const wavesurferRef = useRef(null);
	const timelineRef = useRef(null);

	// fetch file url from the context
	// const { fileURL, setFileURL } = useContext(FileContext);

	const fileURL = props.trackUrl
	// crate an instance of the wavesurfer
	const [wavesurferObj, setWavesurferObj] = useState();

	const [playing, setPlaying] = useState(true); // to keep track whether audio is currently playing or not
	const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
	const [initLoad, setInitLoad] = useState(true); // init load play button ternary
	const [duration, setDuration] = useState(0); // duration is used to set the default region of selection for trimming the audio

	// create the waveform inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObj) {
			setWavesurferObj(
				wavesurfer.create({
					container: '#waveform',
					// scrollParent: true,
					autoCenter: true,
					cursorColor: 'violet',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#69207F',
					responsive: true,
					autoPlay: true,
					barWidth: 3,
					barHeight: 7,
					// plugins: [
					// 	TimelinePlugin.create({
					// 		container: '#wave-timeline',
					// 	}),
					// RegionsPlugin.create({}),
					// ],
				})
			);
		}
	}, [wavesurferRef, wavesurferObj]);

	// once the file URL is ready, load the file to produce the waveform
	useEffect(() => {
		if (fileURL && wavesurferObj) {
			wavesurferObj.load(fileURL);
		}
	}, [fileURL, wavesurferObj]);

	useEffect(() => {
		if (wavesurferObj) {
			// console.log("🚀 ~ file: PlayViewWaveform.jsx:58 ~ useEffect ~ wavesurferObj:", wavesurferObj)
			// once the waveform is ready, play the audio
			wavesurferObj.on('ready', () => {
				wavesurferObj.play();
				// wavesurferObj.enableDragSelection({}); // to select the region to be trimmed
				setDuration(Math.floor(wavesurferObj.getDuration())); // set the duration in local state
			});

			// once audio starts playing, set the state variable to true
			wavesurferObj.on('play', () => {
				setPlaying(true);
			});

			// once audio starts playing, set the state variable to false
			wavesurferObj.on('finish', () => {
				setPlaying(false);
			});
		}
	}, [wavesurferObj]);

	// set volume of the wavesurfer object, whenever volume variable in state is changed
	useEffect(() => {
		if (wavesurferObj) wavesurferObj.setVolume(volume);
	}, [volume, wavesurferObj]);

	const handlePlayPause = (e) => {
		wavesurferObj.playPause();
		setPlaying(!playing);
		setInitLoad(false);
	};

	const handleReload = (e) => {
		// stop will return the audio to 0s, then play it again
		wavesurferObj.stop();
		wavesurferObj.play();
		setPlaying(true); // to toggle the play/pause button icon
	};

	const handleVolumeSlider = (e) => {
		setVolume(e.target.value);
	};


	const handleTrim = (e) => {
		if (wavesurferObj) {
			// get start and end points of the selected region
			const region =
				wavesurferObj.regions.list[
				Object.keys(wavesurferObj.regions.list)[0]
				];

			if (region) {
				const start = region.start;
				const end = region.end;

				// obtain the original array of the audio
				const original_buffer = wavesurferObj.backend.buffer;

				// create a temporary new buffer array with the same length, sample rate and no of channels as the original audio
				const new_buffer = wavesurferObj.backend.ac.createBuffer(
					original_buffer.numberOfChannels,
					original_buffer.length,
					original_buffer.sampleRate`	`
				);

				// create 2 indices:
				// left & right to the part to be trimmed
				const first_list_index = start * original_buffer.sampleRate;
				const second_list_index = end * original_buffer.sampleRate;
				const second_list_mem_alloc =
					original_buffer.length - end * original_buffer.sampleRate;

				// create a new array upto the region to be trimmed
				const new_list = new Float32Array(parseInt(first_list_index));

				// create a new array of region after the trimmed region
				const second_list = new Float32Array(
					parseInt(second_list_mem_alloc)
				);

				// create an array to combine the 2 parts
				const combined = new Float32Array(original_buffer.length);

				// 2 channels: 1-right, 0-left
				// copy the buffer values for the 2 regions from the original buffer

				// for the region to the left of the trimmed section
				original_buffer.copyFromChannel(new_list, 1);
				original_buffer.copyFromChannel(new_list, 0);

				// for the region to the right of the trimmed section
				original_buffer.copyFromChannel(
					second_list,
					1,
					second_list_index
				);
				original_buffer.copyFromChannel(
					second_list,
					0,
					second_list_index
				);

				// create the combined buffer for the trimmed audio
				combined.set(new_list);
				combined.set(second_list, first_list_index);

				// copy the combined array to the new_buffer
				new_buffer.copyToChannel(combined, 1);
				new_buffer.copyToChannel(combined, 0);

				// load the new_buffer, to restart the wavesurfer's waveform display
				wavesurferObj.loadDecodedBuffer(new_buffer);
			}
		}
	};

	const handleClosePlayView = (event) => {
		event.stopPropagation();
		wavesurferObj.stop();
		props.handleClose();
	}

	return (
		<section className='waveform-container'>
			<h2 style={{ textAlign: 'center' }}>{props.trackTitle}</h2>

			<div ref={wavesurferRef} id='waveform' />
			<div ref={timelineRef} id='wave-timeline' />
			<br/>
			<div className='all-controls'>
				<div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

					<Button
						title='play/pause'
						className='controls'
						onClick={handlePlayPause}
						p={4}
						sx={{ padding: '10px' }}>
						{/* {playing ? (
							initLoad === false ? (
								<i className='material-icons'>pause</i>
							) : (
								<i className='material-icons'>unmute play view</i>
							)
						) : (
							<i className='material-icons'>play_arrow</i>
						)} */}
						{playing ? (
							<i className='material-icons'>Pause</i>
						) : (
							<i className='material-icons'>Play</i>
						)}
					</Button>
					<Button
						title='reload'
						className='controls'
						onClick={handleReload}
						p={4}
						sx={{ padding: '10px' }}>
						<i className='material-icons'>Replay</i>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default PlayViewWaveform;
