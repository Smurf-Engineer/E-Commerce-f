import config from '../../config'
import { UserType } from '../../types/common'
import message from 'antd/lib/message'
import { setLoadingAction } from './actions'

/**
 * Thunk Actions
 */

export const sendWarrantyClaim = async (file: any, user: UserType) => {
  try {
    const formData = new FormData()

    formData.append('file', file)

    const response = await fetch(
      `${config.graphqlUriBase}/upload/warrantyImage`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      }
    )

    const json = await response.json()
    return json
  } catch (e) {
    throw e
  }
}
