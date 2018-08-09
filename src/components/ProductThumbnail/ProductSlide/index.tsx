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
  image?: string
  currentImage: number
  labelButton?: string | React.ReactNode
  hideCustomButton?: boolean
  hideQuickView?: boolean
  urlProduct: string
  myLockerList?: boolean
  currentCurrency: string
  onPressBack: () => void
  onPressNext: () => void
  onPressQuickView: () => void
  onPressCustomize: () => void
  onPressThumbnail: () => void
}

const imagesOrder = ['front', 'left', 'right', 'back']

const ProductSlide = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  isTopProduct,
  images,
  image,
  labelButton = 'CUSTOMIZE',
  currentImage,
  onPressCustomize,
  onPressQuickView,
  onPressBack,
  onPressNext,
  onPressThumbnail,
  hideCustomButton,
  hideQuickView,
  // urlProduct,
  myLockerList
}: Props) => {
  if (image) {
    return (
      <ImageContainer
        {...{ onMouseEnter, onMouseLeave, isTopProduct, hideCustomButton }}
      >
        <ImageTop>
          {!hideQuickView && (
            <QuickView onClick={onPressQuickView}>
              <img src={quickViewIcon} />
            </QuickView>
          )}
          {isTopProduct && (
            <TopContainer>
              <TopText>TOP</TopText>
            </TopContainer>
          )}
        </ImageTop>
        <Page>
          {/* <a href={urlProduct}> */}
          <Image src={image} onClick={onPressThumbnail} />
          {/* </a> */}
        </Page>
        {isHovered && (
          <ButtonContainer {...{ myLockerList }} onClick={onPressCustomize}>
            {labelButton}
          </ButtonContainer>
        )}
      </ImageContainer>
    )
  }

  const imagePages = imagesOrder.map((key, index) => {
    return (
      <Page key={index}>
        {!!images && (
          // <a href={urlProduct}>
          <Image src={images[key]} onClick={onPressThumbnail} />
          // </a>
        )}
      </Page>
    )
  })

  const buttonToRender =
    labelButton === 'CUSTOMIZE' ? (
      <ButtonContainer {...{ myLockerList }} onClick={onPressCustomize}>
        <CustomizeButton>{labelButton}</CustomizeButton>
      </ButtonContainer>
    ) : (
      labelButton
    )
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
      {isHovered && buttonToRender}
    </ImageContainer>
  )
}

export default ProductSlide
