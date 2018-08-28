import { UserType } from '../../types/common'
import config from '../../config'

export const downloadFile = async (user: UserType, code: string) => {
  try {
    const fileResponse = await fetch(
      `${config.graphqlUriBase}design-files?designCode=${code}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    if (fileResponse.ok) {
      const blobFile = await fileResponse.blob()
      return Promise.resolve(blobFile)
    }
    throw 'Unknown Error'
  } catch (e) {
    return Promise.reject(e)
  }
}
