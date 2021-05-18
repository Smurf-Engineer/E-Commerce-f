/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'

export const getAddressPredictions = async (
  address: string
) => {
  try {
    const response = await fetch(
      `${config.googlePlaceApiUrl}/autocomplete/json?input=${address}&key=${config.googleMapKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      }
    )

    return await response.json()
  } catch (e) {
    message.error(e.message)
  }
}

export const getAddressDetails = async (
  placeId: string
) => {
  try {
    const response = await fetch(
      `${config.googlePlaceApiUrl}/details/json?place_id=${placeId}&key=${config.googleMapKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      }
    )

    return await response.json()
  } catch (e) {
    message.error(e.message)
  }
}