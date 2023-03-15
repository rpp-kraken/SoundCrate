import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);