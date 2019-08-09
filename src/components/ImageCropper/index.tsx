/**
 * ImageCropper Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import Cropper from 'react-easy-crop'
import { Location, Area } from 'react-easy-crop'
import {
  SaveButton,
  Text,
  CropperContainer,
  AspectSection,
  AspectButton
} from './styledComponents'
import messages from './messages'
import { aspectRatios } from './constants'
import Modal from '../../components/Common/JakrooModal'
import getCroppedImg from '../../utils/utilsFiles'
import { AspectRatio } from '../../types/common'

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
    aspect: aspectRatios[0].value,
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
          <AspectSection>
            {aspectRatios.map((aspectRatio: AspectRatio) => (
              <AspectButton
                onClick={this.changeAspect(aspectRatio.value)}
                selected={aspect === aspectRatio.value}
              >
                {aspectRatio.name}
              </AspectButton>
            ))}
          </AspectSection>
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

  changeAspect = (aspect: number) => () => {
    this.setState({ aspect })
  }

  cropImage = async () => {
    const { setImage, image } = this.props
    const { croppedAreaPixels } = this.state
    const croppedImage = await getCroppedImg(image, croppedAreaPixels)
    setImage(croppedImage)
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
