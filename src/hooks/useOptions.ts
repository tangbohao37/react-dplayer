import omit from 'omit.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { parse, eventsProps, checkType } from '@/utils';
import { useLiveStatus } from '@/context/live-status';
import {
  LiveRoomRespDto,
  LiveStatus,
  TheReturnValueParameter,
} from 'types/live';
import { IProps } from 'types/props';
import { recordApi } from '@/api/record-api';
import { DPlayerOptions } from 'types/dplayer';

const defaultOptions: DPlayerOptions = {
  container: null,
  live: true,
  // 如果目标流获取失败是否轮训
  onStreamErrorInterval: true,
  // 如果目标流中断是否轮询
  onStreamEndInterval: true,
  // 轮训时间配置
  timeout: 5000,
  screenshot: true,
  danmaku: true,
};

export default (
  roomDetail: LiveRoomRespDto,
  container: HTMLElement,
  props: IProps,
) => {
  const { options, commentRef, ...otherProps } = props;
  const [loading, setLoading] = useState(true);
  const { liveStatus: status, setShowIsNotStart } = useLiveStatus();
  const [dpOptions, setDpOptions] = useState<DPlayerOptions>();
  const defOpt = useRef<DPlayerOptions>({ ...defaultOptions, ...options });

  useEffect(() => {
    if (
      roomDetail !== undefined &&
      container &&
      setShowIsNotStart &&
      status !== undefined
    ) {
      let video = {};
      switch (status) {
        case LiveStatus.WAITING:
          if (!roomDetail.liveGasketVideoUrl) {
            setShowIsNotStart(true);
          } else {
            video = {
              pic: roomDetail.liveGasketVideoPicture,
              url: roomDetail.liveGasketVideoUrl as string,
            };
            setDpOptions({
              ...defaultOptions,
              ...defOpt.current,
              video,
              container,
            });
            setLoading(false);
          }
          break;
        case LiveStatus.LIVING:
          const quality = parse(roomDetail);
          video = {
            quality,
            defaultQuality: 0,
            pic: roomDetail.roomCoverUrl,
          };
          setDpOptions({
            ...defaultOptions,
            ...defOpt.current,
            video,
            container,
          });
          setLoading(false);
          break;
        case LiveStatus.OVER:
          recordApi
            .post('/oss/v1/live-record-video/list', {
              currentPage: 1,
              pageSize: 10,
              query: {
                streamCode: roomDetail.streamCode,
              },
              sorts: [{ field: 'createTime', order: 'desc' }],
            })
            .then(({ list }: { list: TheReturnValueParameter[] }) => {
              for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element.downloadUrl && status) {
                  const recordType = checkType(element.downloadUrl);
                  video = {
                    pic: element.coverUrl,
                    url: element.downloadUrl,
                    type: recordType,
                  };
                  setDpOptions({
                    ...defaultOptions,
                    ...defOpt.current,
                    video,
                    container,
                  });
                  setLoading(false);
                  break;
                }
              }
            });
          break;
        default:
          break;
      }
    }
  }, [container, roomDetail, setShowIsNotStart, status]);

  const containerOptions = useMemo(() => {
    const resetProps = omit(otherProps, [
      'dpRef',
      'roomID',
      'playGasketOnDisconnect',
      'onNotBeginPic',
      ...eventsProps.map((ev) => ev.prop),
    ]);
    return resetProps;
  }, [otherProps]);

  return {
    dpOptions,
    containerOptions,
    commentRef,
    loading,
    setShowIsNotStart,
  };
};
