import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App.jsx';

ReactDOM.render(
  <GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>, document.getElementById('root')
);