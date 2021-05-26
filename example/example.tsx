import React from 'react';
import ReactDOM from 'react-dom';
// import DPlayer from '../lib';
import { NormalLive } from './demo/normal-live';
import { NormalMedia } from './demo/normal-media';
import { LiveComment } from './demo/live-comment';

const Example = () => {
  return (
    <div style={{ width: 800, margin: '0px auto' }}>
      <p>普通直播场景(无弹幕/无聊天框)</p>
      {/* <NormalLive></NormalLive> */}
      <p>普通mp4视频场景(无弹幕/无聊天框)</p>
      {/* <NormalMedia></NormalMedia> */}
      <p>普通mp4视频场景(有聊天框)</p>
      <LiveComment></LiveComment>
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('example'));
