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
    formData.append('file', image);

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
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });

    //Bio
   fetch(`/api/editProfileBio?userId=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bio })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // props.changeView('myReleasedMusic');
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
        <form onSubmit={handleSubmit}>
          <label>
            <Button variant="contained" component="label">
                New Profile Image
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} style={{ display: 'none' }} />
            </Button>
          </label>
            {urlImage && <img src={urlImage} alt="Profile Image Preview" />}
           <label>
            Edit Bio:
            <input type="text" onChange={handleChangeBio} value={bio} />
          </label>
          <br />
            <div>
            <br />
        <Button variant="contained" onClick={handleClose} sx={{ marginBottom: '4em' }}>Cancel</Button>
        </div>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
      </div>
      </Modal>
    </div>
  );
}