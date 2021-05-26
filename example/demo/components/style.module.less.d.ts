declare namespace StyleModuleLessNamespace {
  export interface IStyleModuleLess {
    'dplayer-comment-box': string;
    'dplayer-comment-box-icon': string;
    'dplayer-comment-input': string;
    'dplayer-comment-setting-box': string;
    'dplayer-comment-setting-color': string;
    'dplayer-comment-setting-icon': string;
    'dplayer-comment-setting-open': string;
    'dplayer-comment-setting-title': string;
    'dplayer-comment-setting-type': string;
    'dplayer-icon-content': string;
    'dplayer-send-icon': string;
    'dplayer-showdan': string;
    'dplayer-toggle': string;
    'dplayer-video-bottom-area': string;
    'dplayer-video-bottom-area-left': string;
    'dplayer-video-bottom-area-left-info': string;
    'dplayer-video-bottom-area-right': string;
    'my-face': string;
    'show-dan-box': string;
  }
}

declare const StyleModuleLessModule: StyleModuleLessNamespace.IStyleModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleModuleLessNamespace.IStyleModuleLess;
};

export = StyleModuleLessModule;
