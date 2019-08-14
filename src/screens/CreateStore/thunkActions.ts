import message from 'antd/lib/message'
import { setPaginationDataAction } from './actions'

export const setPaginationData = (offset: number, page: number) => {
  return async (dispatch: any) => {
    try {
      dispatch(setPaginationDataAction(offset, page))
    } catch (e) {
      message.error(e)
    }
  }
}
