import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


export default function NewAccount({ changeView, profileData }) {
  const [bio, setBio] = useState('');
  const [path_to_pic, setPath] = useState('');
  const [username, setUsername] = useState('');

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

  const onSubmit = () => {
    let data = {
      name: profileData.name,
      email: profileData.email,
      bio, path_to_pic, username };
    changeView('home');
  }


  return (
    <div>
      Let's set up your new account!
      <br /><br />
      <form>
        <div>
          <label htmlFor="path">
            Profile Picture:
            <br /><img src={path_to_pic} /><br />
            <Button variant="contained" component="label">
              Change
              <input type="file" name="path" accept="image/*" onChange={(e) => console.log(e.target.files[0])} style={{ display: 'none' }} />
            </Button>
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input type="text" name="username" data-testid="username" onChange={(e) => handleChange(e)} required />
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
      <Button variant="contained" component="label" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}