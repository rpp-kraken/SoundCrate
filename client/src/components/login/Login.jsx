import React from 'react';
import { GoogleLogin } from '@react-oauth/google';


export default function Login(props) {
  const responseMessage = (response) => {
    console.log('Success', response);
  };
  const errorMessage = (error) => {
    console.log('Login failed', error);
  };

  return (
    <div data-testid="google-oauth">
      <h2>Google Login</h2>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} text="continue_with" />
    </div>
  );
}