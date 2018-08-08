/**
 * ImageSlider Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
  Container,
  SwipeContainer,
  ThumbnailContainer,
  ImageThumbnails,
  ThumbnailImg,
  SelectedImage,
  Arrows,
  ArrowLeft,
  ArrowRight,
  SwipeImg
} from './styledComponents'
import NextArrow from '../../assets/arrow.svg'
import PreviousArrow from '../../assets/leftarrow.svg'
import { ImageType } from '../../types/common'

interface Props {
  images: ImageType
  moreImages?: ImageType[]
  loading?: boolean
  onLoadModel?: (loading: boolean) => void
  threeDmodel?: React.ReactNode
  customProduct?: boolean
  customImage?: string
}

interface StateProps {
  index: number
  length: number
}
class ImageSlider extends React.Component<Props, StateProps> {
  state = {
    index: 0,
    length: 3
  }

  componentDidMount() {
    const { images, moreImages } = this.props

    const ThumbnailsArray = [
      images.front,
      images.right,
      images.back,
      images.left
    ]

    if (moreImages) {
      for (const img of moreImages) {
        ThumbnailsArray.push(img.front)
        ThumbnailsArray.push(img.right)
        ThumbnailsArray.push(img.back)
        ThumbnailsArray.push(img.left)
      }
    }
    this.updateLength(ThumbnailsArray.length - 1)
  }

  updateLength = (length: number) => {
    this.setState({ length })
  }

  render() {
    const {
      images,
      threeDmodel,
      customProduct,
      customImage,
      moreImages
    } = this.props
    const { index } = this.state

    // TODO: Change this code when client provides the images
    const ThumbnailsArray = [
      images.front,
      images.right,
      images.back,
      images.left
    ]

    if (moreImages) {
      for (const img of moreImages) {
        ThumbnailsArray.push(img.front)
        ThumbnailsArray.push(img.right)
        ThumbnailsArray.push(img.back)
        ThumbnailsArray.push(img.left)
      }
    }

    const ThumbnailsArrayWith3D = [
      customImage,
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

    const thumbnailsWith3d = ThumbnailsArrayWith3D.map((thumbnail, i) => (
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
        <SwipeImg src={thumbnail} />
      </SelectedImage>
    ))

    const selectedImagesWith3d = ThumbnailsArrayWith3D.map((thumbnail, i) => (
      <SelectedImage key={i}>
        <SwipeImg src={thumbnail} />
      </SelectedImage>
    ))

    const swipeViews = customProduct ? (
      <SwipeableViews {...{ index }}>
        {index === 0 ? threeDmodel : selectedImagesWith3d}
      </SwipeableViews>
    ) : (
      <SwipeableViews {...{ index }}>{selectedImages}</SwipeableViews>
    )
    return (
      <Container>
        <SwipeContainer>
          {index === 0 && customProduct ? threeDmodel : swipeViews}
          <Arrows>
            <ArrowLeft src={PreviousArrow} onClick={this.handlePreviousPage} />
            <ArrowRight src={NextArrow} onClick={this.handleNextPage} />
          </Arrows>
        </SwipeContainer>
        <ImageThumbnails>
          {customProduct ? thumbnailsWith3d : thumbnails}
        </ImageThumbnails>
      </Container>
    )
  }

  selectThumbnail = (evt: React.MouseEvent<HTMLImageElement>) => {
    const {
      currentTarget: { id }
    } = evt
    this.setState({ index: parseInt(id, 10) })
  }

  handleNextPage = () => {
    const { index, length } = this.state

    if (index < length) {
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
