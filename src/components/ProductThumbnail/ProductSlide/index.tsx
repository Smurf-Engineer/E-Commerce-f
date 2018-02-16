/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
  ImageContainer,
  ImageTop,
  TopContainer,
  TopText,
  Image,
  Arrows,
  Arrow,
  ButtonContainer,
  CustomizeButton,
  Page,
  QuickView
} from './styledComponents'
import backIcon from '../../../assets/leftarrow.svg'
import nextIcon from '../../../assets/rightarrow.svg'
import quickViewIcon from '../../../assets/quickview.svg'
import { ImageType } from '../../../types/common'

interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
  isHovered: boolean
  isTopProduct: boolean
  images?: ImageType
  currentImage: number
  onPressBack: () => void
  onPressNext: () => void
  onPressQuickView: () => void
  onPressCustomize: () => void
}

const imagesOrder = ['front', 'left', 'right', 'back']

const ProductSlide = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  isTopProduct,
  images,
  currentImage,
  onPressCustomize,
  onPressQuickView,
  onPressBack,
  onPressNext
}: Props) => {
  const imagePages = imagesOrder.map((key, index) => {
    return <Page key={index}>{!!images && <Image src={images[key]} />}</Page>
  })
  return (
    <ImageContainer {...{ onMouseEnter, onMouseLeave, isTopProduct }}>
      <ImageTop>
        <QuickView onClick={onPressQuickView}>
          <img src={quickViewIcon} />
        </QuickView>
        {isTopProduct && (
          <TopContainer>
            <TopText>TOP</TopText>
          </TopContainer>
        )}
      </ImageTop>
      <SwipeableViews index={currentImage}>{imagePages}</SwipeableViews>
      {isHovered && (
        <Arrows>
          <Arrow src={backIcon} onClick={onPressBack} />
          <Arrow src={nextIcon} onClick={onPressNext} />
        </Arrows>
      )}
      {isHovered && (
        <ButtonContainer onClick={onPressCustomize}>
          <CustomizeButton>CUSTOMIZE</CustomizeButton>
        </ButtonContainer>
      )}
    </ImageContainer>
  )
}

export default ProductSlide
