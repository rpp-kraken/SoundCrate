import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


export default function NewAccount({ profileData }) {
  const [path_to_pic, setPath] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [userData, setUserData] = useState({})

  useEffect(() => {
    if (!path_to_pic && profileData.picture) {
      setPath(profileData.picture);
      setName(profileData.name);
      setUsername(profileData.given_name);
      setEmail(profileData.email);
    }
  }, [path_to_pic, name, username, bio]);

  const onSubmit = () => {
    let data = { name, email, bio, path_to_pic, username }
    setUserData(data)
    console.log(userData)
  }


  return (
    <div>
      Create your new account
      <br /><br />
      <form action="/newUser" method="post">
        <div>
          <label>
            Profile Picture:
            <br />
            <Button variant="contained" component="label">
              Change
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target.files[0])} style={{ display: 'none' }} />
            </Button>
          </label>
        </div>
        <div>
          <label htmlFor="name">
            Name:
            <input type="text" name="name" id="name" value={profileData.name} required />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input type="text" name="username" id="username" value={profileData.given_name} required />
          </label>
        </div>
        <div>
          <label htmlFor="bio">
            Bio:
            <input type="text" name="bio" id="bio" />
          </label>
        </div>
      </form>
      <Button variant="contained" component="label" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}