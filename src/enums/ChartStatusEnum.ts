/**
 * 图表状态枚举
 */
export const ChartStatusEnum = {
  WAIT: 'wait',
  RUNNING: 'running',
  SUCCEED: 'succeed',
  FAILED: 'failed',
};

export const ChartStatusEnumDesc = {
  [ChartStatusEnum.WAIT]: { text: '等待中', status: 'Default' },
  [ChartStatusEnum.RUNNING]: { text: '分析中', status: 'Processing' },
  [ChartStatusEnum.SUCCEED]: { text: '已完成', status: 'Success' },
  [ChartStatusEnum.FAILED]: { text: '失败', status: 'Error' },
};
