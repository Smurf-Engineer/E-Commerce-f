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
  Footer
} from './styledComponents'

const getSizeInCentimeters = (pixels: number): number => {
  return Math.round((pixels * CM_PER_INCH) / DPI)
}

interface Props {
  images: ImageFile[]
  onClickImage: (file: ImageFile) => void
  onClickDelete: (id: number) => void
}

class ImageList extends React.PureComponent<Props, {}> {
  render() {
    const { images } = this.props
    const imageList = images.map((file, index) => {
      const { id, fileUrl, size } = file
      const completeName = fileUrl.split('/').pop()
      let width = 0
      let height = 0
      if (!!size) {
        width = getSizeInCentimeters(size.width)
        height = getSizeInCentimeters(size.height)
      }
      return (
        <Row key={index}>
          <Image src={fileUrl} onClick={this.handleOnClickImage(file)} />
          <Info>
            <Name>{completeName}</Name>
            <Footer>
              <div>
                <Size>Max</Size>
                <Size>{`${width} cm x ${height} cm`}</Size>
              </div>
              <Delete onClick={this.handleOnClickDelete(id)}>Delete</Delete>
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
