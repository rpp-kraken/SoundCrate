import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';


export default function ConfirmDeleteAccount(props) {
  const handleDelete = () => {
    console.log('yes please');
  }

  const handleCancel = () => {
    console.log('no thanks')
  }

  return (
    <div>
      <h3>Are you sure you want to delete your account?</h3>
      <Button variant="contained" component="label">
        Yes
        <input type="submit" onClick={handleDelete} style={{ display: 'none' }}/>
      </Button>
      <Button variant="contained" component="label">
        No
        <input type="submit" onClick={handleCancel} style={{ display: 'none' }}/>
      </Button>
    </div>
  );
}