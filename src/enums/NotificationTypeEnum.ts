export enum NotificationTypeEnum {
  /**
   * 系统通知
   */
  SYSTEM = 'system',

  /**
   * 用户通知
   */
  USER = 'user',

  /**
   * 评论通知
   */
  COMMENT = 'comment',

  /**
   * 点赞通知
   */
  LIKE = 'like',

  /**
   * 关注通知
   */
  FOLLOW = 'follow',

  /**
   * 全员广播
   */
  BROADCAST = 'broadcast',
}

export const NotificationTypeEnumMap = {
  [NotificationTypeEnum.SYSTEM]: {
    text: '系统通知',
  },
  [NotificationTypeEnum.USER]: {
    text: '用户通知',
  },
  [NotificationTypeEnum.COMMENT]: {
    text: '评论通知',
  },
  [NotificationTypeEnum.LIKE]: {
    text: '点赞通知',
  },
  [NotificationTypeEnum.FOLLOW]: {
    text: '关注通知',
  },
  [NotificationTypeEnum.BROADCAST]: {
    text: '全员广播',
  },
};
