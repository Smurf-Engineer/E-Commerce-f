/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import Icon from 'antd/lib/icon'
import {
  Container,
  ImageBox,
  DeleteFile,
  DesktopImage,
  MobileImage,
  Images
} from './styledComponents'
import videoPlaceHolder from '../../../../../assets/video-placeholder.jpg'
import { ProductFile } from '../../../../../types/common'

interface Props {
  mediaFile: ProductFile
  index: number
  handleSetMedia: (event: any) => void
  beforeUpload: (file: any) => boolean
  removeMediaFile: (index: number) => void
}

class MediaBlock extends React.PureComponent<Props> {
  render() {
    const {
      handleSetMedia,
      beforeUpload,
      index,
      mediaFile: { isVideo, url, extension, urlMobile }
    } = this.props
    return (
      <Container>
        <DeleteFile onClick={this.handleOnRemove}>
          <Icon type="close" />
        </DeleteFile>
        <Images>
          <DesktopImage
            data={{ index, isMobile: false }}
            customRequest={handleSetMedia}
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <ImageBox
              maxWidth={true}
              src={extension === '.mp4' ? videoPlaceHolder : url}
              alt="avatar"
            />
          </DesktopImage>
          {!isVideo && (
            <MobileImage
              data={{ index, isMobile: true }}
              customRequest={handleSetMedia}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <ImageBox maxWidth={true} src={urlMobile} alt="avatar" />
            </MobileImage>
          )}
        </Images>
      </Container>
    )
  }
  handleOnRemove = () => {
    const { index, removeMediaFile } = this.props
    removeMediaFile(index)
  }
}

export default MediaBlock
