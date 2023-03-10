import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import clientID from './components/login/googleClientID.js'

ReactDOM.render(<App clientID={clientID()} />, document.getElementById('root'));