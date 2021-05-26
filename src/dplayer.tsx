import React, {
  Children,
  cloneElement,
  FC,
  ForwardedRef,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import omit from 'omit.js';
import DPlayer from 'dplayer';
import DPlayerInstance, {
  DPlayerDanmakuItem,
  DPlayerEvents,
  DPlayerOptions,
} from 'types/dplayer';
import { render } from 'react-dom';

export interface ICommentRefProps {
  draw: (dan: Partial<DPlayerDanmakuItem>) => void;
  isFullScreen: boolean;
}

interface IProps {
  dpRef?: ForwardedRef<DPlayerInstance>;
  options: DPlayerOptions;
  commentRef?: (props: ICommentRefProps) => ReactNode | ''; // TODO： 类型？
  onLoad: (dp: DPlayerInstance) => void;
  onDisconnect: () => void;
  onReconnect: () => void;
  onConnected: () => void;
  [k: string]: any;
}

const DPlayerComponent: FC<IProps> = (props) => {
  const containerRef = useRef<HTMLElement>(null);
  const dp = useRef<DPlayerInstance>();
  const { className, options, commentRef, bottomArea, ...otherProps } = props;
  const [isRender, setIsRender] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const resetProps = omit(otherProps, [
    'options',
    'dpRef',
    'onDisconnect',
    'onReconnect',
    'onConnected',
    // ...eventsProps.map(ev => ev.prop),
  ]);

  const wrapperClassName = clsx({
    [`dplayer`]: true,
    [`${className}`]: !!className,
  });

  useLayoutEffect(() => {
    options.container = containerRef.current;
    // dplayer实例 Ref
    dp.current = new DPlayer(options);
    props.onLoad(dp.current as DPlayerInstance);
    setIsRender(true);
  }, [options, props]);

  useEffect(() => {
    if (dp.current) {
      // 注册事件
      dp.current.on(DPlayerEvents.disconnect, props.onDisconnect);
      dp.current.on(DPlayerEvents.connected, props.onConnected);
      dp.current.on(DPlayerEvents.reconnect, props.onReconnect);
      dp.current.on(DPlayerEvents.fullscreen_cancel, () => {
        setIsFullScreen(false);
        props.onFullscreenCancel && props.onFullscreenCancel();
      });
      dp.current.on(DPlayerEvents.fullscreen, () => {
        setIsFullScreen(true);
        props.onFullscreen && props.onFullscreen();
      });
    }
  }, [props]);

  const draw = useCallback((danItem: DPlayerDanmakuItem) => {
    const defaultDan = { text: '', color: '#fff', type: 'top' };
    if (dp.current?.danmaku) {
      dp.current?.danmaku.draw({ ...defaultDan, ...danItem });
    }
  }, []);

  useEffect(() => {
    if (isRender && props.commentRef && containerRef.current) {
      const commentEl = containerRef.current?.querySelector(
        '.dplayer-inner-comment-box',
      );
      const Component = props.commentRef;
      render(<Component draw={draw} isFullScreen={isFullScreen} />, commentEl);
    }
  }, [draw, isFullScreen, isRender, props.commentRef]);

  const childrenWithProps = Children.map(props.children, (child) => {
    if (child) {
      return cloneElement(child, {
        draw: draw,
        isFullScreen: isFullScreen,
      });
    }
  });

  return (
    <>
      <div
        ref={containerRef}
        className={wrapperClassName}
        {...resetProps}
      ></div>
      {childrenWithProps}
    </>
  );
};

export default DPlayerComponent;
