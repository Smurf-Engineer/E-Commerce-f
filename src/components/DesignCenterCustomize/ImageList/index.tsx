/**
 * ImageList Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { Container, Row, Col, Image } from './styledComponents'

interface Props {
  images: string[]
  onClickImage: (base64: string) => void
}

class ImageList extends React.PureComponent<Props, {}> {
  handleOnClickImage = (uri: string) => () => {
    const { onClickImage } = this.props
    onClickImage(uri)
  }

  render() {
    const { images } = this.props
    const imageList = images.map((uri, index) => (
      <Col key={index}>
        <Image src={uri} onClick={this.handleOnClickImage(uri)} />
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
