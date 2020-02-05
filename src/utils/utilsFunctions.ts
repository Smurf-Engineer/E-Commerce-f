import moment from 'moment'
import { WorkHours } from '../types/common'

export const changePosition = (
  itemOrder: number,
  collection: any,
  index: number
) => {
  if (!itemOrder && index === 0) {
    return (collection[index].itemOrder = 1)
  } else if (
    collection[index - 1] &&
    collection[index - 1].itemOrder !== itemOrder - 1
  ) {
    return (collection[index].itemOrder = collection[index - 1].itemOrder + 1)
  }
}

export const isWorkingHour = ({ timezone, start, end }: WorkHours) => {
  if (timezone && start && end) {
    const currentTime = moment().utcOffset(timezone)
    const startTime = moment(start, 'HH:mm:ss').utcOffset(timezone, true)
    const endTime = moment(end, 'HH:mm:ss').utcOffset(timezone, true)
    const isAvailable =
      currentTime.isBetween(startTime, endTime, 'second') &&
      currentTime.isoWeekday() < 7
    return isAvailable
  } else {
    return false
  }
}
