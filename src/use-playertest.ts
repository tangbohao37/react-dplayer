import { useRef } from 'react';
import DPlayer from 'dplayer';

type PlayerRef = DPlayer;

// js端事件
const events = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'mozaudioavailable',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  'screenshot',
  'thumbnails_show',
  'thumbnails_hide',
  'danmaku_show',
  'danmaku_hide',
  'danmaku_clear',
  'danmaku_loaded',
  'danmaku_send',
  'danmaku_opacity',
  'contextmenu_show',
  'contextmenu_hide',
  'notice_show',
  'notice_hide',
  'quality_start',
  'quality_end',
  'destroy',
  'resize',
  'fullscreen',
  'fullscreen_cancel',
  'subtitle_show',
  'subtitle_hide',
  'subtitle_change',
  'disconnect', // 网络异常 未拉取到数据
  'reconnect', // 网络异常，已重新连接
  'connected', // 成功拉取数据元信息/成功拉到流
] as const;

// react端 调用事件
const reactEvents = [
  'onAbort',
  'onCanplay',
  'onCanplaythrough',
  'onDurationchange',
  'onEmptied',
  'onEnded',
  'onError',
  'onLoadeddata',
  'onLoadedmetadata',
  'onLoadstart',
  'onMozaudioavailable',
  'onPause',
  'onPlay',
  'onPlaying',
  'onProgress',
  'onRatechange',
  'onSeeked',
  'onSeeking',
  'onStalled',
  'onSuspend',
  'onTimeupdate',
  'onVolumechange',
  'onWaiting',
  'onScreenshot',
  'onThumbnailsShow',
  'onThumbnailsHide',
  'onDanmakuShow',
  'onDanmakuHide',
  'onDanmakuClear',
  'onDanmakuLoaded',
  'onDanmakuSend',
  'onDanmakuOpacity',
  'onContextmenuShow',
  'onContextmenuHide',
  'onNoticeShow',
  'onNoticeHide',
  'onQualityStart',
  'onQualityEnd',
  'onDestroy',
  'onResize',
  'onFullscreen',
  'onFullscreenCancel',
  'onSubtitleShow',
  'onSubtitleHide',
  'onSubtitleChange',
  'onDisconnect',
  'onReconnect',
  'onConnected',
] as const;

type DpEvents = typeof events[number];
type ReactEvents = typeof reactEvents[number];

interface EventsProps {
  eventName: DpEvents;
  prop: ReactEvents;
}

const capitalize = function(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
};

const capitalizeEventName = function(str: DpEvents) {
  return str
    .split('_')
    .map(capitalize)
    .join('');
};

const eventsProps: EventsProps[] = events.map(eventName => ({
  eventName,
  prop: `on${capitalizeEventName(eventName)}` as ReactEvents,
}));

export const usePlayer = () => {
  // player 实例对象
  const dpRef = useRef<PlayerRef>();

  const setPlayerRef = (ref: PlayerRef) => {
    dpRef.current = ref;
  };

  if (dpRef.current) {
    eventsProps.forEach(({ eventName, prop }) => {
      // if (prop in listenEvents) {
      //   // 注册事件
      //   (dpRef.current as PlayerRef).on(
      //     DPlayerEvents[eventName as DPlayerEvents],
      //     listenEvents[prop],
      //   );
      // }
    });
  }
  return [dpRef.current];
};
