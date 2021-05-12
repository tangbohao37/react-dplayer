import React, { useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import reactCreateClass from 'create-react-class';
// import DPlayer from '../lib';
import DPlayer from '../src/index';
import flvjs from 'flv.js';
import Hls from 'hls.js';

window.Hls = Hls;
window.flvjs = flvjs;

const Example = reactCreateClass({
  getInitialState() {
    return {
      canplay: false,
      play: false,
      currentTime: 0,
    };
  },

  seek() {
    this.dp.seek(10);
  },

  play() {
    this.dp.play();
  },

  pause() {
    this.dp.pause();
  },

  onLoad(dp) {
    this.dp = dp;
  },

  onCanplay() {
    this.setState({
      canplay: true,
    });
  },

  setSubContent() {
    this.dp.setSubContent('9999人');
  },

  onPlay() {
    this.setState({
      play: true,
    });
  },

  onPause() {
    this.setState({
      play: false,
    });
  },

  onEnded() {
    console.log('end');
  },

  onSourcesStatusChange(e) {
    console.log(e);
  },

  onError(e) {
    console.log('error', e);
  },

  onPlaying() {
    this.setState({
      currentTime: this.dp.video.currentTime,
    });
  },
  onDisconnect(e) {
    console.log('获取流失败，断开连接', e);
  },
  onReconnect(e) {
    console.log('重新连接成功', e);
  },
  onConnected(e) {
    console.log('连接成功', e);
  },

  render() {
    return (
      <div style={{ width: 800, margin: '0px auto' }}>
        <DPlayer
          options={{
            live: true,
            loop: false,
            // 如果目标流获取失败是否轮训
            onStreamErrorInterval: true,
            // 如果目标流中断是否轮询
            onStreamEndInterval: true,
            // 轮训时间配置
            timeout: 5000,
            video: {
              quality: [
                {
                  name: 'HD',
                  // url:
                  //   'https://tactivity-play.wiiqq.com/live/tactivity-push_20d396a52a0a4ba281050d29043abd67_customhd.flv?txSecret=643c60bd30973ce95daec581b7da256e&txTime=60A644E2',
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
          onDisconnect={this.onDisconnect}
          onReconnect={this.onReconnect}
          onConnected={this.onConnected}
          onLoad={this.onLoad}
          onPlay={this.onPlay}
          onCanplay={this.onCanplay}
          onPause={this.onPause}
          onEnded={this.onEnded}
          onError={this.onError}
          onPlaying={this.onPlaying}
        />
        <button onClick={this.play}>play</button>
        <button onClick={this.pause}>pause</button>
        <button onClick={this.seek}>seek 10</button>
        <button onClick={this.setSubContent}>subContent</button>

        <h3>canplay {JSON.stringify(this.state.canplay)}</h3>
        <h3>play {JSON.stringify(this.state.play)}</h3>
        <h3>currentTime {this.state.currentTime}</h3>
      </div>
    );
  },
});

ReactDOM.render(<Example />, document.getElementById('example'));
