import { DPlayerEvents } from 'types/dplayer';

const MAP = {
  customsd: '标清',
  customld: '高清',
  customhd: '超清',
};

const isMobile = /mobile/i.test(window.navigator.userAgent);

export const parse = (roomDetail: any) => {
  const type = isMobile;
  try {
    if (typeof roomDetail?.play === 'string') {
      if (roomDetail?.play.startsWith('"')) {
        roomDetail.play = roomDetail.play.slice(1);
      }
      if (roomDetail?.play.endsWith('"')) {
        roomDetail.play = roomDetail.play.slice(-1, 0);
      }
      const playUrl = JSON.parse(roomDetail?.play);
      const quality = [];
      for (const key in playUrl) {
        if (Object.prototype.hasOwnProperty.call(playUrl, key)) {
          const element = playUrl[key];
          const name = MAP[key];
          if (name) {
            quality.push({
              name: name,
              url: element[!isMobile ? 1 : 2],
              type: !isMobile ? 'flv' : 'hls',
            });
          }
        }
      }
      return quality;
    }
  } catch (error) {
    throw new Error('地址解析失败');
  }
};

const events = Object.values(DPlayerEvents);

const capitalize = function (str: string) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
};
const capitalizeEventName = function (str: string) {
  return str.split('_').map(capitalize).join('');
};
export const eventsProps = events.map((eventName) => ({
  eventName,
  prop: `on${capitalizeEventName(eventName)}`,
}));

export const checkType = (video: string) => {
  if (/m3u8(#|\?|$)/i.exec(video)) {
    return 'hls';
  } else if (/.flv(#|\?|$)/i.exec(video)) {
    return 'flv';
  } else if (/.mp4(#|\?|$)/i.exec(video)) {
    return 'mp4';
  } else {
    throw new Error('未知类型视频');
  }
};
