import config from '../../config/index'
import message from 'antd/lib/message'
import messages from './messages'

export const getGoogleFonts = (formatMessage: any) => {
  return async () => {
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
    return responseJson
    } catch (e) {
    message.error(formatMessage(messages.googleFontsError))
    }
  }
}