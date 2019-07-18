/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import {
  Container,
  ImageBox,
  DeleteFile,
  DesktopImage,
  AddMaterial,
  Loader,
  VideoBox,
  Label,
  MobileImage,
  Images
} from './styledComponents'
import messages from './messages'
import { ProductFile } from '../../../../../types/common'

interface Props {
  mediaFile: ProductFile
  index: number
  counter: object
  handleSetMedia: (event: any) => void
  beforeUpload: (file: any) => boolean
  removeMediaFile: (index: number) => void
}

class MediaBlock extends React.PureComponent<Props> {
  state = {
    loading: false
  }
  render() {
    const {
      handleSetMedia,
      beforeUpload,
      index,
      counter,
      mediaFile: { isVideo, url, urlMobile }
    } = this.props
    const { loading } = this.state
    const labelMessage = isVideo ? messages.video : messages.image
    const elementNode = isVideo ? (
      <VideoBox controls={true}>
        <source src={url} type="video/mp4" />
      </VideoBox>
    ) : (
      <ImageBox maxWidth={true} src={url} alt="avatar" />
    )
    return (
      <Container>
        <DeleteFile onClick={this.handleOnRemove}>
          <Icon type="close" />
        </DeleteFile>
        <Images>
          {loading ? (
            <Loader>
              <Spin size="large" />
            </Loader>
          ) : (
            <DesktopImage
              data={{ index, isMobile: false }}
              customRequest={this.handleRequest}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {url ? (
                elementNode
              ) : (
                <AddMaterial>
                  <Icon type={'plus'} />
                  <Label>
                    <FormattedMessage {...labelMessage} />
                    {counter[index]}
                  </Label>
                </AddMaterial>
              )}
            </DesktopImage>
          )}
          {!isVideo && (
            <MobileImage
              data={{ index, isMobile: true }}
              customRequest={handleSetMedia}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {urlMobile ? (
                <ImageBox maxWidth={true} src={urlMobile} alt="avatar" />
              ) : (
                <AddMaterial>
                  <Icon type={'plus'} />
                  <Label>
                    <FormattedMessage {...messages.mobile} />
                    {counter[index]}
                  </Label>
                </AddMaterial>
              )}
            </MobileImage>
          )}
        </Images>
      </Container>
    )
  }
  handleRequest = (event: any) => {
    const { handleSetMedia } = this.props
    this.setState({ loading: true })
    handleSetMedia(event)
    this.setState({ loading: false })
  }
  handleOnRemove = () => {
    const { index, removeMediaFile } = this.props
    removeMediaFile(index)
  }
}

export default MediaBlock
