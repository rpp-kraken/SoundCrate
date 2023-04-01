import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

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

export default function EditProfile(props) {
  const theme = useTheme();
  const [bio, setBio] = useState(props.profileData.bio);
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(false);

  const paperStyle = {
    backgroundColor: useTheme().palette.primary.dark,
    boxShadow: 'none',
    padding: '2rem',
    width: '400px',
  };

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.setOpenEditProfile(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = props.profileData.id;

    if (image === null) {
      setImage(props.profileData.path_to_pic);
    };

    console.log('here is image', image);
    console.log(id);


    const formData = new FormData();
    formData.append('imageFile', image);


    //image
    fetch(`/api/editProfilePic?userId=${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      return response.text();
    })
    .then(data => {
      //Bio
      fetch(`/api/editProfileBio?userId=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bio })
        })
        .then(() => {
          setOpen(false);
          fetch(`/api/userbycol?col=name&val=${props.profileData.name}`, {
            method: 'GET'
          })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            props.setProfileData(data);
            props.handleSetArtistSongData(data.username, null);
          })
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleImageChange = (picture) => {
    setImage(picture);
    setUrlImage(URL.createObjectURL(picture));
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  }


  const handleFocus = (event) => {
    // Set the value to an empty string when the input box is focused
    if (event.target.value === props.profileData.bio) {
      setBio('');
    }
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button variant="contained" component="label" style={{ width: 'fit-content' }}>
              New Profile Image
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} style={{ display: 'none' }} />
            </Button>
            {urlImage && <img className="picturePreview" src={urlImage} alt="Profile Image Preview" />}
            <label>
              Edit Bio:
              <input type="text" onChange={handleChangeBio} value={bio} style={{ display: 'block', width: '100%', height: '75px' }}/>
            </label>
            <Button variant="contained" onClick={handleClose} style={{ width: 'fit-content' }}>Cancel</Button>
            <Button variant="contained" type="submit" style={{ width: 'fit-content' }}>Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}