import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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

export const Publish = (props) => {
  const theme = useTheme();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

    const audioRef = React.useRef(null);


  const handleInput = (e) => {
    const tag = e.target.value.trim();
    if (tag !== "" && !tag.includes(" ")) {
      if (tags.length < 3) {
        setTags([...tags, tag]);
        e.target.value = "";
      }
    }
  };

  const handleDelete = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
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



  const handleSubmit = (event) => {
    event.preventDefault();
    setAudio(new Audio(props.song));

  };

  return (
    <div>
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
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>
          {image && <img src={URL.createObjectURL(image)} alt="Selected song image" />}
          <br />
          <label>
            Song Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          <label htmlFor="tags">Tags (up to 3):</label>
          <input type="text" name="tags" onKeyPress={handleKeyPress} placeholder="Press enter to create tag" />
            <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                {tag}
                <button type="button" onClick={() => handleDelete(index)}>
                  X
                </button>
              </li>
            ))}
            </ul>
            <div>
            <br />
          Preview:
        {props.song && (
          <audio
            ref={audioRef}
            src={props.song}
            controls
            onPlay={handlePlay}
            onPause={handlePause}
          />
        )}
        <button onClick={handleClose}>cancel</button>
        </div>
          <button type="submit">Submit</button>
        </form>
        </div>
      </Modal>
    </div>
  );
}





