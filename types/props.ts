import DPlayerInstance, {
  DPlayerDanmakuItem,
  DPlayerEvents,
  DPlayerOptions,
} from './dplayer';
import { ForwardedRef, ReactNode } from 'react';

export interface ICommentRefProps {
  draw: (dan: Partial<DPlayerDanmakuItem>) => void;
  isFullScreen: boolean;
}

export interface IProps {
  dpRef?: ForwardedRef<DPlayerInstance>;
  options?: DPlayerOptions;
  commentRef?: (props: ICommentRefProps) => ReactNode | ''; // TODO： 类型？
  onLoad?: (dp: DPlayerInstance) => void;
  onNotBeginPic: any;
  onEndPic: any;
  onDisconnect?: () => void;
  playGasketOnDisconnect?: boolean;
  roomID: string;
  token: string;
  onReconnect?: () => void;
  onConnected?: () => void;
  [k: string]: any;
}
