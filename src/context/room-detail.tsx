import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { liveApi } from '@/api/live-api';
import { LiveRoomRespDto } from 'types/live';

const RoomDetailContext = createContext<LiveRoomRespDto | undefined>(undefined);

const useRoomDetail = () => useContext(RoomDetailContext);

const RoomDetailProvider: FC<{ roomID: string }> = ({ roomID, children }) => {
  const [roomDetail, setRoomData] = useState<LiveRoomRespDto>({});

  useEffect(() => {
    if (roomID) {
      liveApi
        .get<LiveRoomRespDto>(`oss/v1/live-room/detail?id=${roomID}`)
        .then((res) => {
          setRoomData(res);
        });
    }
  }, [roomID]);

  return (
    <RoomDetailContext.Provider value={roomDetail}>
      {children}
    </RoomDetailContext.Provider>
  );
};

export { RoomDetailProvider, RoomDetailContext, useRoomDetail };
