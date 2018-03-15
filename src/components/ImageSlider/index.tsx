/**
 * ImageSlider Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import SwipeableViews from 'react-swipeable-views'
import messages from './messages'
import {
  Container,
  Text,
  SwipeContainer,
  ThumbnailContainer,
  ImageThumbnails,
  ThumbnailImg,
  SelectedImage,
  Arrows,
  ArrowLeft,
  ArrowRight
} from './styledComponents'
import NextArrow from '../../assets/arrow.svg'
import PreviousArrow from '../../assets/leftarrow.svg'
import { ImageType } from '../../types/common'

interface Props {
  images: ImageType
}

interface StateProps {
  index: number
}
class ImageSlider extends React.Component<Props, StateProps> {
  state = {
    index: 0
  }
  render() {
    const { images } = this.props
    const { index } = this.state

    // TODO: Change this code when client provides the images
    const ThumbnailsArary = [
      images.front,
      images.right,
      images.back,
      images.left
    ]
    // ########

    const thumbnails = ThumbnailsArary.map((thumbnail, i) => (
      <ThumbnailContainer key={i}>
        <ThumbnailImg
          id={i.toString()}
          src={thumbnail}
          onClick={this.selectThumbnail}
          selected={index === i}
        />
      </ThumbnailContainer>
    ))

    const selectedImages = ThumbnailsArary.map((thumbnail, i) => (
      <SelectedImage key={i}>
        <img src={thumbnail} />
      </SelectedImage>
    ))
    return (
      <Container>
        <SwipeContainer>
          <SwipeableViews enableMouseEvents={true} {...{ index }}>
            {selectedImages}
          </SwipeableViews>
          <Arrows>
            <ArrowLeft src={PreviousArrow} onClick={this.handlePreviousPage} />
            <ArrowRight src={NextArrow} onClick={this.handleNextPage} />
          </Arrows>
        </SwipeContainer>
        <ImageThumbnails>{thumbnails}</ImageThumbnails>
      </Container>
    )
  }

  selectThumbnail = (evt: React.MouseEvent<HTMLImageElement>) => {
    const { currentTarget: { id } } = evt
    this.setState({ index: parseInt(id, 10) })
  }

  handleNextPage = () => {
    const { index } = this.state

    if (index < 3) {
      this.setState({ index: index + 1 })
    }
  }

  handlePreviousPage = () => {
    const { index } = this.state

    if (index > 0) {
      this.setState({ index: index - 1 })
    }
  }
}

export default ImageSlider
