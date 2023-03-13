import React from 'react';
import { GoogleLogin } from '@react-oauth/google';


export default function Login(props) {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div data-testid="google-oauth">
      <h2>Google Login</h2>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}