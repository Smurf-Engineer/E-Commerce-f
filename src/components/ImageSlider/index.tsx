/**
 * ImageSlider Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import get from 'lodash/get'
import {
  Container,
  SwipeContainer,
  ThumbnailContainer,
  ImageThumbnails,
  ThumbnailImg,
  SelectedImage,
  ArrowContainer,
  Arrow,
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
  squareArrows?: boolean
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

    const front = get(images, 'front', '')
    const right = get(images, 'right', '')
    const back = get(images, 'back', '')
    const left = get(images, 'left', '')

    const ThumbnailsArray = [front, right, back, left]

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
      moreImages,
      squareArrows
    } = this.props
    const { index } = this.state

    const front = get(images, 'front', '')
    const right = get(images, 'right', '')
    const back = get(images, 'back', '')
    const left = get(images, 'left', '')

    // TODO: Change this code when client provides the images
    const ThumbnailsArray = [front, right, back, left]

    if (moreImages) {
      for (const img of moreImages) {
        ThumbnailsArray.push(img.front)
        ThumbnailsArray.push(img.right)
        ThumbnailsArray.push(img.back)
        ThumbnailsArray.push(img.left)
      }
    }

    const ThumbnailsArrayWith3D = [customImage, front, right, back, left]

    const thumbnails = ThumbnailsArray.map((thumbnail, i) => (
      <ThumbnailContainer design={false} key={i}>
        <ThumbnailImg
          id={i.toString()}
          src={thumbnail}
          onClick={this.selectThumbnail}
          selected={index === i}
        />
      </ThumbnailContainer>
    ))

    const thumbnailsWith3d = ThumbnailsArrayWith3D.map((thumbnail, i) => (
      <ThumbnailContainer design={i === 0} key={i}>
        <ThumbnailImg
          id={i.toString()}
          src={thumbnail}
          onClick={this.selectThumbnail}
          selected={index === i}
          design={i === 0}
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
      // TODO: continue testing the virtualize option from swipeableViews to create a smoother loop
      <SwipeableViews {...{ index }}>{selectedImages}</SwipeableViews>
    )
    return (
      <Container>
        <SwipeContainer squareArrows={!!squareArrows}>
          <ArrowContainer onClick={this.handlePreviousPage}>
            <Arrow src={PreviousArrow} />
          </ArrowContainer>
          {index === 0 && customProduct ? threeDmodel : swipeViews}
          <ArrowContainer onClick={this.handleNextPage}>
            <Arrow src={NextArrow} />
          </ArrowContainer>
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
    } else {
      this.resetIndex(0)
    }
  }

  handlePreviousPage = () => {
    const { index, length } = this.state

    if (index > 0) {
      this.setState({ index: index - 1 })
    } else {
      this.resetIndex(length)
    }
  }

  resetIndex = (i: number) => {
    this.setState({ index: i })
  }
}

export default ImageSlider
