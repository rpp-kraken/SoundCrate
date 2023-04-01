import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function ArtistBadge({ username, view }) {

  const [badgeLevelIcon, setBadgeLevel] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/userbycol?col=username&val=${username}`)
      .then((data) => {
        let tier1 = data.data.tier1
        let tier2 = data.data.tier2
        let tier3 = data.data.tier3
          if (tier1 || tier2 || tier3) {
            setBadgeLevel('verifiedUser.png')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, []);

  if(!badgeLevelIcon) {
    return
  } else {
    return (
      <img src={badgeLevelIcon} className="badge-icon" />
    )
  }
};

