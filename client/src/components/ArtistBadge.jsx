import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function ArtistBadge({ username }) {

  const [badgeLevelIcon, setBadgeLevel] = useState(null)

  useEffect(() => {
    axios
      .get('/api/userBadge', { params: { username } })
      .then((data) => {
        let tier1 = data.data.tier1
        let tier2 = data.data.tier2
        let tier3 = data.data.tier3
        if (tier1) {
          setBadgeLevel('bronze-icon-badge.PNG')
        }
        if (tier2) {
          setBadgeLevel('silver.png')
        }
        if (tier3) {
          setBadgeLevel('gold-icon-badge-high-vis.PNG')
        }
      })
      .catch((err) => {
        throw err
      })
  }, [])
  if(!badgeLevelIcon) {
    return
  } else {
    return (
      <img src={badgeLevelIcon} className="badge-icon" />
    )
  }
}

