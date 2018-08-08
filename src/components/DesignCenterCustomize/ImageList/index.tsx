/**
 * ImageList Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { ImageFile } from '../../../types/common'
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
    const imageList = images.map(({ fileUrl, size }, index) => {
      const completeName = fileUrl.split('/').pop()
      const name = completeName && completeName.split('-').pop()
      // TODO: WIP
      let width = 0
      let height = 0
      if (size) {
        width = Math.round(0.02645833 * size.width)
        height = Math.round(0.02645833 * size.height)
      }
      return (
        <Row key={index}>
          <Image src={fileUrl} onClick={this.handleOnClickImage(fileUrl)} />
          <Info>
            <Name>{completeName || name}</Name>
            <Footer>
              <div>
                <Size>Max</Size>
                <Size>{`${width} cm x ${height} cm`}</Size>
              </div>
              <Delete>Delete</Delete>
            </Footer>
          </Info>
        </Row>
      )
    })
    return <Container>{imageList}</Container>
  }
}

export default ImageList
