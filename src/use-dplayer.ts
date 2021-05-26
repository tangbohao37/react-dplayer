import { useRef, useState } from 'react';
import DPlayer from 'dplayer';

export const useDPlayer = () => {
  const dplayerRef = useRef<DplayerInstance>();

  const setDp = (dp: DplayerInstance) => {
    if (dp) {
      dplayerRef.current = dp;
    }
  };

  return { dp: dplayerRef.current, setDp };
};
