import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';


export default function Login({setUser}) {

  const login = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: err => console.log('Login failed', error),
    flow: 'implicit',
  });

  return (
    <div data-testid="google-oauth" onClick={() => login()}>
      <h2>Login</h2>
    </div>
  );
}