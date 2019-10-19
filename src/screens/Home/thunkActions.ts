import get from 'lodash/get'
import message from 'antd/lib/message'
import { setHomepageInfoAction } from './actions'
import { getHomepageInfo } from './data'

export const getHomepage = (query: any, sportRoute: string) => {
  return async (dispatch: any) => {
    try {
      const response = await query({
        query: getHomepageInfo,
        variables: { sportRoute },
        fetchPolicy: 'network-only'
      })
      dispatch(
        setHomepageInfoAction(get(response, 'data.getHomepageContent', {}))
      )
    } catch (e) {
      message.error(e)
    }
  }
}
