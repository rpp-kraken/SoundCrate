import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';


export default function NewAccount({ changeView, profileData, setProfileData, setLoggedIn }) {
  const [bio, setBio] = useState('');
  const [path_to_pic, setPath] = useState('');
  const [file, setFile] = useState('');
  const [tempFile, setTempFile] = useState('');
  const [username, setUsername] = useState('');
  const [isPicture, setIsPicture] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);

  useEffect(() => {
    if (!path_to_pic && profileData.picture) {
      setPath(profileData.picture);
      setUsername(profileData.given_name);
    }
  }, [path_to_pic, name, username, bio]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (target.name === "bio") {
      setBio(value);
    } else if (target.name === "username") {
      setUsername(value);
    }
  }

  const handleFile = async (e) => {
    console.log('inside Handle Submti', e)
    await setFile(e.target.files[0])
    setTempFile(URL.createObjectURL(e.target.files[0]));
    setIsUpdated(false);
    setIsPicture(true);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", profileData.id);
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("bio", bio);
      formData.append("path_to_pic", path_to_pic);
      formData.append("username", username);
      formData.append("tier1", false);
      formData.append("tier2", false);
      formData.append("tier3", false);
      formData.append("imageFile", file);

      const response = await fetch("/api/user", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setProfileData(data);
      setLoggedIn(true);
      changeView('home');
    } catch (error) {
      return ('error in user post', error);
    }
  };


  return (
    <div>
      Are you ready to set up your new account? Let's do it!
      <br /><br />
      <form>
        <div>
          <label htmlFor="path">
            Profile Picture:
            <br />{isUpdated && <img src={path_to_pic} className={'picturePreview'}/>} {isPicture && <img src={tempFile} className={'picturePreview'}/>}<br />
            <Button variant="contained" component="label">
              Update
              <input type="file" name="path" accept="image/*" onChange={(e) => handleFile(e)} style={{ display: 'none' }} required />
            </Button>
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input type="text" name="username" data-testid="username" onChange={(e) => handleChange(e)} />
          </label>
        </div>
        <div>
          <label htmlFor="bio">
            Bio: <br />
            <textarea rows="3" cols="30" name="bio" placeholder="Tell us about you..." onChange={(e) => handleChange(e)} ></textarea>
            <br></br>
          </label>
        </div>
      </form>
      <Button variant="contained" component="label" onClick={(e) => onSubmit(e)}>
        Submit
      </Button>
    </div>
  );
}