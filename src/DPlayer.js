import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import omit from 'omit.js';
import DPlayer from 'dplayer';
import { usePlayer } from './usePlayer';

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
  'sources_status_change',
  'subtitle_show',
  'subtitle_hide',
  'subtitle_change',
  'disconnect', // 网络异常 未拉取到数据
  'reconnect', // 网络异常，已重新连接
  'connected', // 成功拉取数据元信息/成功拉到流
];
const capitalize = function(str) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
};
const capitalizeEventName = function(str) {
  return str
    .split('_')
    .map(capitalize)
    .join('');
};
const eventsProps = events.map(eventName => ({
  eventName,
  prop: `on${capitalizeEventName(eventName)}`,
}));

const DPlayerComponent = props => {
  usePlayer();
  const dpRef = useRef(null);
  const containerRef = useRef(null);
  const { className, ...otherProps } = props;

  const resetProps = omit(otherProps, [
    'options',
    'onLoad',
    ...eventsProps.map(ev => ev.prop),
  ]);

  const wrapperClassName = clsx({
    [`dplayer`]: true,
    [`${className}`]: !!className,
  });

  useEffect(() => {
    dpRef.current = new DPlayer({
      ...props.options,
      lang: 'zh-cn',
      contextmenu: [],
      container: containerRef.current,
    });

    props.onLoad && props.onLoad(dpRef.current);

    eventsProps.forEach(({ eventName, prop }) => {
      if (prop in props) {
        dpRef.current.on(eventName, props[prop]);
      }
    });
  }, []);

  return (
    <div ref={containerRef} className={wrapperClassName} {...resetProps} />
  );
};

export default DPlayerComponent;
