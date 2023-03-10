import React from 'react';
import Login from '../components/login/Login.jsx'

export default function(props) {
  return (
    <div>
      Hello World!
      {props.clientID}
      <Login />
    </div>
  );
}