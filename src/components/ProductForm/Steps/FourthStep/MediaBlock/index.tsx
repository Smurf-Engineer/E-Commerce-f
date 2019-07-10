/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import {
  Container,
  ImageBox,
  MediaFooter,
  FileName,
  FileExtension,
  DeleteFile
} from './styledComponents'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import videoPlaceHolder from '../../../../../assets/video-placeholder.jpg'
import { ProductFile } from '../../../../../types/common'

interface Props {
  mediaFile: ProductFile
  index: number
  removeMediaFile: (index: number) => void
}

class MediaBlock extends React.PureComponent<Props> {
  render() {
    const { mediaFile } = this.props
    return (
      <Container>
        <ImageBox
          onClick={this.openMedia}
          clickable={!mediaFile.toUpload}
          src={
            mediaFile.extension === '.mp4' ? videoPlaceHolder : mediaFile.url
          }
          alt="avatar"
        />
        <MediaFooter>
          <div>
            <FileName>{mediaFile.name}</FileName>
            <FileExtension>{mediaFile.extension}</FileExtension>
          </div>
          <DeleteFile onClick={this.handleOnRemove}>
            <FormattedMessage {...messages.delete} />
          </DeleteFile>
        </MediaFooter>
      </Container>
    )
  }
  openMedia = () => {
    const {
      mediaFile: { url }
    } = this.props
    window.open(url)
  }
  handleOnRemove = () => {
    const { index, removeMediaFile } = this.props
    removeMediaFile(index)
  }
}

export default MediaBlock
