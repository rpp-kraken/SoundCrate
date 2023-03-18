import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


export default function NewAccount({ changeView, profileData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [path_to_pic, setPath] = useState('');
  const [username, setUsername] = useState('');

  // combined data
  const [userData, setUserData] = useState({})

  useEffect(() => {
    if (!path_to_pic && profileData.picture) {
      setPath(profileData.picture);
      setName(profileData.name);
      setUsername(profileData.given_name);
      setEmail(profileData.email);
    }
  }, [path_to_pic, name, username, bio]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (target.name === "name") {
      setName(value);
    } else if (target.name === "bio") {
      setBio(value);
    } else if (target.name === "username") {
      setUsername(value);
    }
  }

  const onSubmit = () => {
    let data = { name, email, bio, path_to_pic, username }
    setUserData(data)
    // changeView('home')
  }


  return (
    <div>
      Let's set up your new account
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
          <label htmlFor="name">
            Name:
            <input type="text" name="name" onChange={(e) => handleChange(e)} required />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input type="text" name="username" onChange={(e) => handleChange(e)} required />
          </label>
        </div>
        <div>
          <label htmlFor="bio">
            Bio:
            <textarea rows="3" cols="20" name="bio" placeholder="Tell us about you..." onChange={(e) => handleChange(e)} ></textarea>
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