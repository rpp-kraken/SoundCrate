import React, { useState, useEffect, useRef } from 'react';
import Login from './Login.jsx'


export default function Splash() {

  const [showModal, setModal] = useState(false)

  return (
    <div>
      <video autoPlay muted className="video" onEnded={() => setModal(true)} data-testid="splash">
        <source src="SquareNeonOpener.mp4" type="video/mp4" />
        Ouch! Sorry, your browser doesnt support this video! Get logged in to have some fun!
      </video>
      {showModal && <Login />}
    </div>
  );
}