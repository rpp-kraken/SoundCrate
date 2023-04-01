import React, { useState, useEffect } from 'react';

export default function ArtistBadgeProfile({ tier1, tier2, tier3 }) {
  const [badgeLevelIcon, setBadgeLevel] = useState(null);

  useEffect(() => {
    if (tier1) {
      setBadgeLevel('bronze-icon-badge.png');
    } else if (tier2) {
      setBadgeLevel('silver-icon-badge.png');
    } else if (tier3) {
      setBadgeLevel('gold-icon-badge.png');
    }
  }, [tier1, tier2, tier3]);

  if (!badgeLevelIcon) {
    return null;
  }

  return (
    <img src={badgeLevelIcon} className="badge-icon-profile" />
  );
}

