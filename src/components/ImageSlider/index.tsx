/**
 * ImageSlider Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import Spin from 'antd/lib/spin'
import {
  Container,
  SwipeContainer,
  ThreeDThumbnailContair,
  ThumbnailContainer,
  ImageThumbnails,
  ThumbnailImg,
  SelectedImage,
  Arrows,
  ArrowLeft,
  ArrowRight
} from './styledComponents'
import Product3DThumbnail from '../Product3DThumbnail'
import NextArrow from '../../assets/arrow.svg'
import PreviousArrow from '../../assets/leftarrow.svg'
import { ImageType } from '../../types/common'

interface Props {
  images: ImageType
  loading?: boolean | undefined
  onLoadModel?: (loading: boolean) => void | undefined
}

interface StateProps {
  index: number
}
class ImageSlider extends React.Component<Props, StateProps> {
  state = {
    index: 0
  }
  render() {
    const { images, onLoadModel, loading } = this.props
    const { index } = this.state

    // TODO: Change this code when client provides the images
    const ThumbnailsArray = [
      images.front,
      images.front,
      images.right,
      images.back,
      images.left
    ]
    // ########

    const thumbnails = ThumbnailsArray.map((thumbnail, i) => (
      <ThumbnailContainer key={i}>
        <ThumbnailImg
          id={i.toString()}
          src={thumbnail}
          onClick={this.selectThumbnail}
          selected={index === i}
        />
      </ThumbnailContainer>
    ))

    const selectedImages = ThumbnailsArray.map((thumbnail, i) => (
      <SelectedImage key={i}>
        <img src={thumbnail} />
      </SelectedImage>
    ))

    const loading3Dmodel = loading ? (
      <Spin />
    ) : (
      <Product3DThumbnail {...{ onLoadModel }} />
    )
    const renderSelectedImage =
      index === 0 ? (
        <ThreeDThumbnailContair>{loading3Dmodel}</ThreeDThumbnailContair>
      ) : (
        <SwipeableViews {...{ index }}>{selectedImages}</SwipeableViews>
      )

    return (
      <Container>
        <SwipeContainer>
          {renderSelectedImage}
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

    if (index < 5) {
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
