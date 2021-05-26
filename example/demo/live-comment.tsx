import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
// import DPlayer from '../lib';
import DPlayer from '@/dplayer';
import DplayerInstance from 'types/dplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import { BottomArea } from './components/bottom';
import { CommentFun } from './components/comment';

window.Hls = Hls;
window.flvjs = flvjs;

export const LiveComment = () => {
  const dp = useRef<DplayerInstance>();

  //#region
  const onLoad = (dpInstance: DplayerInstance) => {
    dp.current = dpInstance;
  };

  const onDisconnect = () => {
    console.log('获取流失败，断开连接');
  };

  const onReconnect = () => {
    console.log('重新连接成功');
    dp.current?.play();
  };

  const onConnected = () => {
    console.log('连接成功');
    dp.current?.play();
  };

  //#endregion

  return (
    <div style={{ width: 800, margin: '0px auto' }}>
      <DPlayer
        commentRef={CommentFun}
        onDisconnect={onDisconnect}
        onReconnect={onReconnect}
        onConnected={onConnected}
        onLoad={onLoad}
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
                url:
                  'https://tactivity-play.wiiqq.com/live/tactivity-push_47dc616ae95b478eb71ac4d40124e82e_customhd.flv?txSecret=b3a002b90813036e4f2e7a768ef356a6&txTime=60A7151A',
                // url:
                //   'https://tactivity-play.wiiqq.com/live/tactivity-push_47dc616ae95b478eb71ac4d40124e82e_customhd.m3u8?txSecret=b3a002b90813036e4f2e7a768ef356a6&txTime=60A7151A',
                type: 'flv',
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
          screenshot: true,
          danmaku: true,
        }}
      >
        <BottomArea></BottomArea>
      </DPlayer>
    </div>
  );
};
