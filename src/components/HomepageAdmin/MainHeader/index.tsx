/**
 * MainHeader Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import Uploader from './Uploader'
import indexOf from 'lodash/indexOf'
import { getFileExtension } from '../../../utils/utilsFiles'
import { Container, UploadersContainer, Title } from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import { ImageTypes, Sections } from '../constants'

const validFileExtensions = ['.jpg', '.jpeg', '.png', '.gif']
const { MAIN_HEADER } = Sections
interface Props {
  desktopImage: string
  mainHeader: any
  loading: any
  saving: boolean
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any, section: string, imageType: string) => void
  setUrl: (value: string) => void
  onSaveHeader: () => void
}

class MainHeader extends React.Component<Props, {}> {
  beforeUpload = (file: any, imageType: string) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (
        indexOf(
          validFileExtensions,
          (fileExtension as String).toLowerCase()
        ) === -1
      ) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file, MAIN_HEADER, imageType)
    }
    return false
  }
  uploadDesktopImage = (file: any) => {
    this.beforeUpload(file, ImageTypes.DESKTOP)
  }
  uploadMobileImage = (file: any) => {
    this.beforeUpload(file, ImageTypes.MOBILE)
  }
  handleOnSetUrl = (event: any) => {
    const { setUrl } = this.props
    setUrl(event.target.value)
  }
  render() {
    const { mainHeader, loading, formatMessage } = this.props

    const uploadItems = mainHeader.map((item: any, index: number) => (
      <Uploader
        key={index}
        {...{
          item,
          formatMessage,
          index,
          loading: loading[index],
          onUploadFile: () => console.log('a'),
          setUrl: () => console.log('a'),
          removeImage: () => console.log('a')
        }}
      />
    ))

    return (
      <Container>
        <Title>{formatMessage(messages.mainHeaderTitle)}</Title>
        <UploadersContainer>{uploadItems}</UploadersContainer>
        <Divider />
      </Container>
    )
  }
}

export default MainHeader
