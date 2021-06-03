export enum LiveStatus {
  WAITING = 0, // 未开始
  LIVING = 1, // "直播中"
  TRYING = 2, // "试播中"
  OVER = 3, // "已结束"
  PUBLISH = 4, // "已发布"  对应C端未开始状态
}

export enum RecordStatus {
  ENABLE = 0, // 启用
  DISABLE = 1, // 未启用
}

export interface LiveRoomRespDto {
  /** 地址 */
  address?: string;

  /** 审批时间 */
  approveTime?: string;

  /** 直播间简介 */
  brief?: string;

  /** 创建时间 */
  createTime?: string;

  /** 创建者 */
  creator?: string;

  /** 创建者名称 */
  creatorString?: string;

  /** 延迟播放时间（s） */
  delayTime?: number;

  /** 直播间介绍 */
  detail?: string;

  /** 企业Id */
  enterpriseId?: string;

  /** 企业名称 */
  enterpriseName?: string;

  /** 展品id列表 */
  exhibitIdList?: Array<string>;

  /** extendJson */
  extendJson?: string;

  /** 直播间id */
  id?: number;

  /** IM群聊ID */
  imGroupId?: string;

  /** 是否延迟播放 */
  isDelay?: number;

  /** 是否开启直播 */
  isLive?: number;

  /** 是否加密 */
  isLock?: number;

  /** 是否启动公告 */
  isNotice?: number;

  /** 是否录制 */
  isRecord?: number;

  /** 关联主持人id */
  liveAnchor?: number;

  /** 关联主持人姓名 */
  liveAnchorName?: string;

  /** 直播结束时间 */
  liveEndTime?: string;

  /** 预热视频截图 */
  liveGasketVideoPicture?: string;

  /** 预热视频地址 */
  liveGasketVideoUrl?: string;

  /** 录制配置信息id */
  liveRecordSettingId?: number;

  /** 直播间机器审核状态 */
  liveRobotAuditStatus?: number;

  /** 直播间机器审核状态 */
  liveRobotAuditStatusString?: string;

  /** 直播间人工审核状态 */
  liveRoomStatus?: number;

  /** 直播间人工审核状态 */
  liveRoomStatusString?: string;

  /** 直播开始时间 */
  liveStartTime?: string;

  /** 直播状态 */
  liveStatus?: number;

  /** 直播状态 */
  liveStatusString?: string;

  /** 直播间密码 */
  lockKey?: string;

  /** 机审状态 */
  machineStatus?: string;

  /** 机审状态 */
  machineStatusString?: string;

  /** 会议类型：0-线上会议 1-线下会议 2-线上+线下会议 */
  meetingType?: number;

  /** 直播间名称 */
  name?: string;

  /** 公告 */
  notice?: string;

  /** 数据库逻辑id */
  oid?: string;

  /** 直播间人工审核意见 */
  opinion?: string;

  /** 播放地址 */
  play?: string;

  /** 预计直播时间 */
  preLiveTime?: number;

  /** 推流地址 */
  push?: string;

  /** 推流状态 */
  pushStatus?: number;

  /** 推流状态 */
  pushStatusString?: string;

  /** 直播间请求流水号 */
  reqNo?: string;

  /** 风险类型 */
  riskType?: string;

  /** 风险类型 */
  riskTypeString?: string;

  /** 直播间封面 */
  roomCoverUrl?: string;

  /** 状态 */
  status?: string;

  /** 直播流名称 */
  streamCode?: string;

  /** tagIds */
  tagIds?: Array<number>;

  /** 标签 */
  tagName?: Array<string>;

  /** 指定用户id */
  targetUserId?: string;

  /** 指定用户名称 */
  targetUserName?: string;

  /** 指定用户权限,见TargetUserPermissionEnums的值 */
  targetUserPermission?: string;

  /** 置顶值，默认0 */
  topValue?: number;

  /** 更新时间 */
  updateTime?: string;

  /** 更新者 */
  updater?: string;

  /** 更新者名称 */
  updaterString?: string;
}

export interface TheReturnValueParameter {
  /** coverUrl */
  coverUrl?: string;

  /** createTime */
  createTime?: string;

  /** creator */
  creator?: string;

  /** creatorString */
  creatorString?: string;

  /** disabled */
  disabled?: number;

  /** downloadUrl */
  downloadUrl?: string;

  /** endTime */
  endTime?: string;

  /** id */
  id?: number;

  /** liveAnchorName */
  liveAnchorName?: string;

  /** liveRoomName */
  liveRoomName?: string;

  /** liveTime */
  liveTime?: number;

  /** name */
  name?: string;

  /** oid */
  oid?: string;

  /** recordFileSize */
  recordFileSize?: number;

  /** recordUrl */
  recordUrl?: string;

  /** startTime */
  startTime?: string;

  /** status */
  status?: number;

  /** 直播间名称 */
  streamCode?: string;

  /** updateTime */
  updateTime?: string;

  /** updater */
  updater?: string;
}
