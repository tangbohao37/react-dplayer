import React, { useRef } from 'react';
// import DPlayer from '../lib';
import { DPlayer } from '@/index';
import DplayerInstance from 'types/dplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import { BottomArea } from './components/bottom';
import { CommentFun } from './components/comment';

window.Hls = Hls;
window.flvjs = flvjs;

export const LiveComment = () => {
  return (
    <div style={{ width: 800, margin: '0px auto' }}>
      <DPlayer
        token={'123'}
        roomID={'522'}
        onNotBeginPic={
          'https://a-test-media-1252759886.cos.ap-guangzhou.myqcloud.com//20210511/cover-20210511-b23a608b774a490f8bd5e5fa2499a66b.jpeg'
        }
        commentRef={CommentFun}
        playGasketOnDisconnect={true}
      >
        {/* <BottomArea></BottomArea> */}
      </DPlayer>
    </div>
  );
};
