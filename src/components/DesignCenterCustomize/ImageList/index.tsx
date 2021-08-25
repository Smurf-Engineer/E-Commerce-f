/**
 * ImageList Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { ImageFile } from '../../../types/common'
import { DPI, CM_PER_INCH } from '../../../constants'
import {
  Container,
  Row,
  Image,
  Info,
  Name,
  Size,
  Delete,
  Apply,
  Footer,
  Buttons,
  ButtonWrapper,
  LowQualityIcon
} from './styledComponents'
import messages from './messages'
import LowQualityFlag from '../../../assets/warning_flag.png'

const vectorImages = [
  'application/postscript',
  'image/svg+xml',
  'application/pdf'
]

const getSizeInCentimeters = (pixels: number): number => {
  return Math.round((pixels * CM_PER_INCH) / DPI)
}

// TODO: Get name from the backend
const getFileName = (url: string): string => {
  const completeName = url.split('/').pop() || ''
  const fileName = completeName.split('-').pop() || ''
  const name = fileName
    .split('.')
    .slice(0, -1)
    .join('.')

  return name || ''
}

interface Props {
  images: ImageFile[]
  currentSelected: number
  formatMessage: (messageDescriptor: any, params?: any) => string
  onClickImage: (file: ImageFile) => void
  onClickDelete: (id: number) => void
}

class ImageList extends React.PureComponent<Props, {}> {
  render() {
    const { images, currentSelected, formatMessage } = this.props
    const imageList = images.map((file, index) => {
      const { id, fileUrl, size, type, lowQuality } = file
      const isVectorImage = vectorImages.includes(type)
      const name = getFileName(fileUrl)
      let width = 0
      let height = 0
      if (!!size && !isVectorImage) {
        width = getSizeInCentimeters(size.width)
        height = getSizeInCentimeters(size.height)
      }
      return (
        <Row key={index} selected={currentSelected === id}>
          {lowQuality && <LowQualityIcon src={LowQualityFlag} />}
          <Image src={fileUrl} />
          <Info>
            <div>
              <Name>{name}</Name>
              {!isVectorImage && (
                <Size>{formatMessage(messages.size, { width, height })}</Size>
              )}
            </div>
            <Footer>
              <Buttons>
                <Delete type="ghost" onClick={this.handleOnClickDelete(id)}>
                  {formatMessage(messages.delete)}
                </Delete>
                <ButtonWrapper>
                  <Apply type="primary" onClick={this.handleOnClickImage(file)}>
                    {formatMessage(messages.apply)}
                  </Apply>
                </ButtonWrapper>
              </Buttons>
            </Footer>
          </Info>
        </Row>
      )
    })
    return <Container>{imageList}</Container>
  }

  handleOnClickImage = (file: ImageFile) => () => {
    const { onClickImage } = this.props
    onClickImage(file)
  }

  handleOnClickDelete = (id: number) => () => {
    const { onClickDelete } = this.props
    onClickDelete(id)
  }
}

export default ImageList
