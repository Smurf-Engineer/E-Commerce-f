/**
 * ImageList Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { ImageFile } from '../../../types/common'
import { Container, Row, Col, Image } from './styledComponents'

interface Props {
  images: ImageFile[]
  onClickImage: (base64: string) => void
}

class ImageList extends React.PureComponent<Props, {}> {
  handleOnClickImage = (uri: string) => () => {
    const { onClickImage } = this.props
    onClickImage(uri)
  }

  render() {
    const { images } = this.props
    const imageList = images.map(({ fileUrl }, index) => (
      <Col key={index}>
        <Image src={fileUrl} onClick={this.handleOnClickImage(fileUrl)} />
      </Col>
    ))
    return (
      <Container>
        <Row>{imageList}</Row>
      </Container>
    )
  }
}

export default ImageList
