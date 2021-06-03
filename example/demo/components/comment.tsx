import React, { FC, useCallback, useMemo, useState } from 'react';
import Pallette from 'assets/pallette.svg';
import cls from 'clsx';
import style from './style.module.less';
import { DirectionType } from 'types/dplayer';
import { ICommentRefProps } from '@/index';

export const CommentFun = (props: ICommentRefProps) => {
  return props.isFullScreen ? <Comment {...props} /> : '';
};

export const Comment: FC<ICommentRefProps> = (props) => {
  const [setting, toggleSetting] = useState(false);
  const [danType, setDanType] = useState<DirectionType>('right');
  const [inputValue, setInputValue] = useState<string>();

  const send = useCallback(
    (e) => {
      props.draw({ text: inputValue });
      e.preventDefault();
      setInputValue('');
    },
    [inputValue, props],
  );

  return (
    <>
      <div className={`${style['dplayer-comment-box']}`}>
        <button
          className={`${style['dplayer-comment-box-icon']} ${style['dplayer-comment-setting-icon']}`}
          data-balloon="{{ tran('Setting') }}"
          data-balloon-pos="up"
        >
          <span
            onClick={() => toggleSetting(!setting)}
            className={'dplayer-icon-content'}
          >
            <Pallette></Pallette>
          </span>
        </button>
        <div
          className={cls(style['dplayer-comment-setting-box'], {
            [style['dplayer-comment-setting-open']]: setting,
          })}
        >
          <div className={style['dplayer-comment-setting-color']}>
            <div className={style['dplayer-comment-setting-title']}>
              {/* TODO：暴露 i18n api */}
              设置弹幕颜色
            </div>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-color"
                value="#fff"
                defaultChecked
              />
              <span style={{ backgroundColor: '#fff' }}></span>
            </label>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-color"
                value="#e54256"
              />
              <span style={{ backgroundColor: '#e54256' }}></span>
            </label>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-color"
                value="#ffe133"
              />
              <span style={{ backgroundColor: '#ffe133' }}></span>
            </label>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-color"
                value="#64DD17"
              />
              <span style={{ backgroundColor: '#64DD17' }}></span>
            </label>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-color"
                value="#39ccff"
              />
              <span style={{ backgroundColor: '#39ccff' }}></span>
            </label>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-color"
                value="#D500F9"
              />
              <span style={{ backgroundColor: '#D500F9' }}></span>
            </label>
          </div>
          <div className={style['dplayer-comment-setting-type']}>
            <div className={style['dplayer-comment-setting-title']}>
              设置弹幕类型
            </div>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-type"
                onChange={() => setDanType('top')}
                value={'top'}
                checked={danType === 'top'}
              />
              <span> 顶部</span>
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setDanType('right')}
                name="dplayer-danmaku-type"
                value={'right'}
                checked={danType === 'right'}
              />
              <span> 滚动 </span>
            </label>
            <label>
              <input
                type="radio"
                name="dplayer-danmaku-type"
                onChange={() => setDanType('bottom')}
                value={'bottom'}
                checked={danType === 'bottom'}
              />
              <span> 底部 </span>
            </label>
          </div>
        </div>
        <input
          className={style['dplayer-comment-input']}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入弹幕"
        />
        <button
          className={`${style['dplayer-comment-box-icon']} ${style['dplayer-send-icon']}`}
          data-balloon="{{ tran('Send') }}"
          data-balloon-pos="up"
          onClick={send}
        >
          <span className={style['dplayer-icon-content']}>发送</span>
        </button>
      </div>
    </>
  );
};
