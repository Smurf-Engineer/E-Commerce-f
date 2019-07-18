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
  SubLoader,
  Loader,
  VideoBox,
  Label,
  MobileImage,
  Images
} from './styledComponents'
import messages from './messages'
import { ProductFile } from '../../../../../types/common'
import { uploadFile } from '../../../api'

interface Props {
  mediaFile: ProductFile
  index: number
  counter: object
  handleSetMedia: (
    selected: string,
    id: string,
    name: string,
    value: string
  ) => void
  beforeUpload: (file: any) => boolean
  removeMediaFile: (index: number) => void
}

class MediaBlock extends React.PureComponent<Props> {
  state = {
    loading: false,
    subLoading: false
  }
  render() {
    const {
      beforeUpload,
      index,
      counter,
      mediaFile: { isVideo, url, urlMobile }
    } = this.props
    const { loading, subLoading } = this.state
    const labelMessage = isVideo ? messages.video : messages.image
    const elementNode = isVideo ? (
      <VideoBox controls={true}>
        <source src={url} type="video/mp4" />
      </VideoBox>
    ) : (
      <ImageBox maxWidth={true} src={url} alt="avatar" />
    )
    const subElementNode = subLoading ? (
      <SubLoader>
        <Spin size="large" />
      </SubLoader>
    ) : (
      <MobileImage
        data={{ index, isMobile: true }}
        customRequest={this.handleRequest}
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {urlMobile ? (
          <ImageBox maxWidth={true} src={urlMobile} alt="avatar" />
        ) : (
          <AddMaterial>
            <Icon type="plus" />
            <Label>
              <FormattedMessage {...messages.mobile} />
              {counter[index]}
            </Label>
          </AddMaterial>
        )}
      </MobileImage>
    )
    return (
      <Container>
        <div>
          <DeleteFile onClick={this.handleOnRemove}>
            <Icon type="close" />
          </DeleteFile>
          <Icon type="ellipsis" />
        </div>
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
                  <Icon type="plus" />
                  <Label>
                    <FormattedMessage {...labelMessage} />
                    {counter[index]}
                  </Label>
                </AddMaterial>
              )}
            </DesktopImage>
          )}
          {!isVideo && subElementNode}
        </Images>
      </Container>
    )
  }
  setLoading = (value: boolean, isMobile: boolean) => {
    if (isMobile) {
      this.setState({ subLoading: value })
    } else {
      this.setState({ loading: value })
    }
  }
  handleRequest = async (event: any) => {
    const { handleSetMedia } = this.props
    const {
      file,
      data: { index, isMobile }
    } = event
    this.setLoading(true, isMobile)
    const response = await uploadFile(file, index, 'media')
    const { imageUri } = response
    const urlField = isMobile ? 'urlMobile' : 'url'
    handleSetMedia('mediaFiles', index, urlField, imageUri)
    this.setLoading(false, isMobile)
  }
  handleOnRemove = () => {
    const { index, removeMediaFile } = this.props
    removeMediaFile(index)
  }
}

export default MediaBlock
