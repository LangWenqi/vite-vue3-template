import moment, { Moment } from 'moment'

/**
 * 格式化时间
 * @param time
 * @param format 格式 YYYY-MM-DD HH:mm:ss
 */
export const formatTime = (time: Moment | string, format?: string) => {
  if (time) {
    return moment(time).format(format || 'yyyy-MM-DD HH:mm:ss')
  } else {
    return '';
  }
}

export const disabledNextDate = (current: Moment) => {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}
