import message from 'antd/lib/message'
import { setUploadingColorsAction, setColorList } from './actions'
import { UploadFile } from '../../types/common'

export const onUploadColorsList = (file: UploadFile, type: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingColorsAction(type, true))
      const reader = new FileReader()
      reader.onloadend = () => {
        const colorsResult = JSON.parse(reader.result)
        message.success('File uploaded')
        dispatch(setColorList(type, colorsResult))
      }
      reader.readAsText(file)
      return true
    } catch (e) {
      dispatch(setUploadingColorsAction(type, false))
      message.error(e.message)
      return false
    }
  }
}
