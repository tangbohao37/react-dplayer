import React from 'react';

export const Switch = () => {
  return (
    <div className="dplayer-toggle">
      <input
        className="dplayer-showdan-setting-input"
        type="checkbox"
        id="dplayer-toggle-dan"
      />
      <label htmlFor="dplayer-toggle-dan"></label>
    </div>
  );
};
