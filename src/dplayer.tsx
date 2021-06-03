import {
  Children,
  cloneElement,
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import DPlayer from '@wii-fe/dplayer';
import { useRoomDetail } from '@/context/room-detail';
import DPlayerInstance, {
  DPlayerDanmakuItem,
  DPlayerEvents,
} from 'types/dplayer';
import { IProps } from 'types/props';
import { render } from 'react-dom';
import useOptions from './hooks/useOptions';
import { LiveRoomRespDto } from 'types/live';

const DPlayerComponent: FC<IProps> = (props) => {
  const containerRef = useRef<HTMLElement>(null);
  const [dp, setDp] = useState<DPlayerInstance>();
  const { className, ...restPops } = props;
  const [isRender, setIsRender] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const roomDetail = useRoomDetail();

  const {
    dpOptions,
    containerOptions,
    commentRef,
    loading,
    setShowIsNotStart,
  } = useOptions(
    roomDetail as LiveRoomRespDto,
    containerRef.current as HTMLElement,
    restPops,
  );

  const wrapperClassName = useMemo(() => {
    return clsx({
      [`dplayer`]: true,
      [`${className}`]: !!className,
    });
  }, [className]);

  useLayoutEffect(() => {
    if (dpOptions) {
      setDp(new DPlayer(dpOptions));
      setIsRender(true);
    }
  }, [dpOptions]);

  // 注册事件
  useEffect(() => {
    if (dp && roomDetail) {
      props.onLoad && props.onLoad(dp as DPlayerInstance);
      dp.on(DPlayerEvents.disconnect, () => {
        if (props.playGasketOnDisconnect) {
          if (roomDetail.liveGasketVideoUrl) {
            dp.switchVideo({
              pic: roomDetail.liveGasketVideoPicture,
              url: roomDetail.liveGasketVideoUrl as string,
            });
          } else {
            setShowIsNotStart(true);
          }
        }
        props.onDisconnect && props.onDisconnect();
      });
      dp.on(DPlayerEvents.connected, () => {
        console.log('连接成功');
        props.onConnected && props.onConnected();
      });
      dp.on(DPlayerEvents.reconnect, () => {
        console.log('重新连接成功');
        props.onReconnect && props.onReconnect();
      });
      dp.on(DPlayerEvents.fullscreen_cancel, () => {
        setIsFullScreen(false);
        props.onFullscreenCancel && props.onFullscreenCancel();
      });
      dp.on(DPlayerEvents.fullscreen, () => {
        setIsFullScreen(true);
        props.onFullscreen && props.onFullscreen();
      });
    }
  }, [dp, props, roomDetail, setShowIsNotStart]);

  const draw = useCallback(
    (danItem: DPlayerDanmakuItem) => {
      const defaultDan = { text: '', color: '#fff', type: 'top' };
      if (dp?.danmaku) {
        dp?.danmaku.draw({ ...defaultDan, ...danItem });
      }
    },
    [dp?.danmaku],
  );

  useEffect(() => {
    if (isRender && commentRef && containerRef.current) {
      const commentEl = containerRef.current?.querySelector(
        '.dplayer-inner-comment-box',
      );
      const Component = commentRef;
      render(<Component draw={draw} isFullScreen={isFullScreen} />, commentEl);
    }
  }, [draw, isFullScreen, isRender, commentRef]);

  const childrenWithProps = useMemo(
    () =>
      Children.map(props.children, (child) => {
        if (child) {
          return cloneElement(child, {
            draw: draw,
            isFullScreen: isFullScreen,
          });
        }
      }),
    [draw, isFullScreen, props.children],
  );

  return (
    <>
      <div
        ref={containerRef}
        className={wrapperClassName}
        {...containerOptions}
      ></div>
      {childrenWithProps}
    </>
  );
};

export default DPlayerComponent;
