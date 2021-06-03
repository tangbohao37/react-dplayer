import { createContext, FC, useContext, useMemo, useState } from 'react';
import { useRoomDetail } from '@/context/room-detail';
import { LiveStatus } from 'types/live';

const LiveStatusContext = createContext<{
  liveStatus: LiveStatus;
  setShowIsNotStart: any;
}>({
  liveStatus: LiveStatus.WAITING,
  setShowIsNotStart: () => {},
});

const imgStyle = {
  width: '100%',
};

const useLiveStatus = () => useContext(LiveStatusContext);

const LiveStatusProvider: FC<{ onNotBeginPic: any }> = ({
  onNotBeginPic,
  children,
}) => {
  const roomDetail = useRoomDetail();
  const [showIsNotStart, setShowIsNotStart] = useState(false);

  const render = useMemo(() => {
    if (roomDetail) {
      switch (roomDetail.liveStatus) {
        case LiveStatus.TRYING:
          return '试播中';
        case LiveStatus.PUBLISH:
          // 已发布 还未开始 且没有垫片视频
          if (!roomDetail.liveGasketVideoUrl) {
            return (
              <img src={onNotBeginPic} style={imgStyle} alt="精彩即将开始" />
            );
          }
        default:
          return children;
      }
    }
  }, [children, onNotBeginPic, roomDetail]);

  if (showIsNotStart) {
    return <img src={onNotBeginPic} style={imgStyle} alt="精彩即将开始" />;
  }

  return roomDetail ? (
    <LiveStatusContext.Provider
      value={{
        liveStatus: roomDetail.liveStatus as LiveStatus,
        setShowIsNotStart,
      }}
    >
      {render}
    </LiveStatusContext.Provider>
  ) : (
    <></>
  );
};

export { LiveStatusProvider, LiveStatusContext, useLiveStatus };
