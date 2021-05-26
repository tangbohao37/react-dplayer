import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// import DPlayer from '../lib';
import DPlayer from '@/dplayer';
import DplayerInstance from 'types/dplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';

window.Hls = Hls;
window.flvjs = flvjs;

export const NormalLive = () => {
  const dp = useRef<DplayerInstance>();

  //#region
  const play = () => {
    dp.current?.play();
  };

  const pause = () => {
    dp.current?.pause();
  };

  const onLoad = (dpInstance: DplayerInstance) => {
    dp.current = dpInstance;
    console.log('触发onLoad', dp.current);
  };

  const onDisconnect = e => {
    console.log('获取流失败，断开连接', e);
  };

  const onReconnect = e => {
    console.log('重新连接成功', e);
    dp.current?.play();
  };

  const onConnected = e => {
    console.log('连接成功', e);
    dp.current?.play();
  };

  //#endregion

  return (
    <div style={{ width: 800, margin: '0px auto' }}>
      <DPlayer
        options={{
          live: true,
          // 如果目标流获取失败是否轮训
          // onStreamErrorInterval: true,
          // 如果目标流中断是否轮询
          // onStreamEndInterval: true,
          // 轮训时间配置
          timeout: 5000,
          video: {
            quality: [
              {
                name: 'HD',
                // url:
                //   'https://tactivity-play.wiiqq.com/live/tactivity-push_47dc616ae95b478eb71ac4d40124e82e_customhd.flv?txSecret=b3a002b90813036e4f2e7a768ef356a6&txTime=60A7151A',
                url:
                  'https://tactivity-play.wiiqq.com/live/tactivity-push_47dc616ae95b478eb71ac4d40124e82e_customhd.m3u8?txSecret=b3a002b90813036e4f2e7a768ef356a6&txTime=60A7151A',
                type: 'hls',
              },
              {
                name: 'SD',
                url:
                  'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                type: 'normal',
              },
            ],
            defaultQuality: 0,
            pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
          },
          // video: {
          //   url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
          //   pic:
          //     'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
          // },
          // subContent: '3人正在观看',
          screenshot: true,
          isShowBottomArea: false,
          danmaku: false,
        }}
        onDisconnect={onDisconnect}
        onReconnect={onReconnect}
        onConnected={onConnected}
        onLoad={onLoad}
      />
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
    </div>
  );
};
