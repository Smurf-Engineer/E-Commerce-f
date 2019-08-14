/**
 * ImageCropper Component - Created by Jesus Apodaca on 08/08/19.
 */
import * as React from 'react'
import Cropper from 'react-easy-crop'
import message from 'antd/lib/message'
import { Location, Area } from 'react-easy-crop'
import { SaveButton, Text, CropperContainer } from './styledComponents'
import messages from './messages'
import Modal from '../../components/Common/JakrooModal'
import getCroppedImg from '../../utils/utilsFiles'

interface Props {
  image: string
  setImage: (image: Blob) => void
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  open: boolean
}
class ImageCropper extends React.Component<Props, {}> {
  state = {
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4.59,
    croppedAreaPixels: null
  }
  render() {
    const { open, requestClose, image, formatMessage } = this.props
    const { crop, zoom, aspect } = this.state
    return (
      <Modal
        {...{ open, requestClose }}
        width={'90%'}
        style={{ maxWidth: '704px' }}
        withLogo={false}
      >
        <CropperContainer>
          <Cropper
            {...{ image, aspect, crop, zoom }}
            style={{
              cropAreaStyle: { boxShadow: '0 0 0 9999em #ffffff6b' }
            }}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </CropperContainer>
        <Text>{formatMessage(messages.scroll)}</Text>
        <SaveButton onClick={this.cropImage}>
          {formatMessage(messages.save)}
        </SaveButton>
      </Modal>
    )
  }

  cropImage = async () => {
    const { setImage, image } = this.props
    const { croppedAreaPixels } = this.state
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)
      setImage(croppedImage)
    } catch (e) {
      message.error('Error saving image:', e.message)
    }
  }

  onCropChange = (crop: Location) => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    this.setState({ croppedAreaPixels })
  }

  onZoomChange = (zoom: number) => {
    this.setState({ zoom })
  }
}

export default ImageCropper
