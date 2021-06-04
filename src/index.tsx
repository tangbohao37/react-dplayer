import { FC } from 'react';
import { RoomDetailProvider } from '@/context/room-detail';
import { LiveStatusProvider } from '@/context/live-status';
import { IProps } from 'types/props';
import Player from './dplayer';

export const DPlayer: FC<IProps> = (props) => {
  return (
    <RoomDetailProvider roomID={props.roomID}>
      <LiveStatusProvider
        onNotBeginPic={props.onNotBeginPic}
        onEndPic={props.onEndPic}
      >
        <Player {...props}></Player>
      </LiveStatusProvider>
    </RoomDetailProvider>
  );
};
