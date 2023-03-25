import React, { useState, useEffect } from 'react';


export default function TierVerification({ profileData, likes }) {

  const checkTiers = (likes) => {
    let bronze = 250000;
    let silver = 500000;
    let gold = 1000000;
    let tillNextTier, currentTier;


    if (likes >= bronze) {
      tillNextTier = silver - likes;
      currentTier = 'tier1';
    } else if (likes <= silver && likes >= gold) {
      tillNextTier = gold - likes;
      currentTier = 'tier2';
    } else if (likes >= gold) {
      currentTier = 'tier3';
    }


  }

  return (
    <div>
      <h2>Verification</h2>
    </div>
  );
}