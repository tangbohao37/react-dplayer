import React from 'react';
import style from './style.module.less';
import { Comment } from './comment';

export const BottomArea = (props: any) => {
  return (
    <>
      <div className={style['dplayer-video-bottom-area']}>
        <div className={style['dplayer-video-bottom-area-left']}>
          <p className={style['dplayer-video-bottom-area-left-info']}>
            123正在观看
          </p>
          <div className={style['show-dan-box']}>
            {/* {{ include './controller/show-dan.art' }} */}
          </div>
        </div>
        <div className={style['dplayer-video-bottom-area-right']}>
          <Comment {...props}></Comment>
        </div>
      </div>
    </>
  );
};
