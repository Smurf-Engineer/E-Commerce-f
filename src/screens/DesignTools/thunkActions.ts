import config from '../../config/index'
import message from 'antd/lib/message'
import { setGoogleFontsListAction } from './actions'

export const getGoogleFonts = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${config.googleFontsUrl}key=${config.googleFontsKey}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
      const responseJson = await response.json()
      dispatch(setGoogleFontsListAction(responseJson))
    } catch (e) {
      message.error('Error loading fonts')
    }
  }
}
