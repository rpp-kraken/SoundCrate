import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import axios from "axios";

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Publish (props) {
  const theme = useTheme();
  const [image, setImage] = useState();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [underMax, setUnderMax] =useState(true);
  const [tagNum, setTagNum] = useState(0);
  const [doneRendering, setDoneRendering] = useState(false);
  const [urlImage, setUrlImage] = useState(false);

  const audioRef = React.useRef(null);


  const handleInput = async (e) => {
    const tag = e.target.value.trim();
    if (tag !== "" && !tag.includes(" ")) {
      if (tags.length < 3) {
        setTags([...tags, tag]);
        e.target.value = "";
        await setTagNum( tagNum + 1 )
        if (tagNum === 2) {
          setUnderMax(false);
        }
      }
    }
  };

  const handleDelete = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    setTagNum( tagNum - 1);
    setUnderMax(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInput(e);
    } else if (e.key === " ") {
      e.preventDefault();
    }
  };

  const paperStyle = {
    backgroundColor: useTheme().palette.primary.dark,
    boxShadow: 'none',
    padding: '2rem',
    width: '400px',
  };

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.setOpenPublish(false);
  }

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };



  const handleSubmit = async (event) => {
    if (tags.length === 0) {
      alert('please enter at least one tag');
      event.preventDefault();
    } else {
      event.preventDefault();
      var tagsString = tags.join(',');
      // console.log("Image in submit: ", image, "    song?  ", props.song);

      // formData type

      // console.log('here is type of song', typeof props.song);

    const formData = new FormData();
    formData.append('audioFile', props.song);
    formData.append('title', title);
    formData.append('created_at', new Date().toISOString());
    formData.append('play_count', 0);
    formData.append('fav_count', 0);
    formData.append('user', `${props.profileData.username}`);
    formData.append('userId', `${props.profileData.id}`);
    formData.append('imageFile', image);
    formData.append('tags', tagsString);

      fetch('/api/uploadSong', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.changeView('myReleasedMusic');
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const handleImageChange = (picture) => {
    setImage(picture);
    setUrlImage(URL.createObjectURL(picture));
  };

  return (
    <div data-testid="publish" >
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={style}
      >
        <div style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <label>
            Song Image:
            <Button variant="contained" component="label" >
              Upload Image
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} style={{ display: 'none' }} />
            </Button>
          </label>
            {urlImage && <img src={urlImage} alt="Song Image Preview" />}
           <label>
            Song Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </label>
          <br />
          <label htmlFor="tags">Tags (up to 3):</label>
          {underMax && <input type="text" name="tags" onKeyPress={handleKeyPress} placeholder="Press enter to create tag"/>}
            <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                {tag}
                <button type="button" onClick={() => handleDelete(index)} sx={{ marginBottom: '4em' }}>
                  X
                </button>
              </li>
            ))}
            </ul>
            <div>
            <br />
          Preview: <br />
          {props.songUrl ? null : "Recording and rendering your song..."}
          <audio
            ref={audioRef}
            src={props.songUrl}
            controls
            onPlay={handlePlay}
            onPause={handlePause}
          />
        <Button variant="contained" onClick={handleClose} sx={{ marginBottom: '4em' }}>Cancel</Button>
        </div>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
        </div>
      </Modal>
    </div>
  );
}





