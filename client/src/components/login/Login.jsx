import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';


export default function Login(props) {
  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    onError: err => console.log('Login failed', error),
    flow: 'auth-code',
  });

  return (
    <div data-testid="google-oauth" onClick={() => login()}>
      Login
    </div>
  );
}