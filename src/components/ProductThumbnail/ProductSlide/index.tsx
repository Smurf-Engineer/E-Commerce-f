/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import Responsive from 'react-responsive'
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

const AboveTablet = (props: any) => <Responsive {...props} minWidth={768} />

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
  disableSlider?: boolean
  customizable?: boolean
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
  // urlProduct, TODO: WIP new way to right click
  myLockerList,
  disableSlider = false,
  customizable
}: Props) => {
  if (image) {
    return (
      <ImageContainer
        {...{ onMouseEnter, onMouseLeave, isTopProduct, hideCustomButton }}
      >
        <ImageTop>
          <AboveTablet>
            {!hideQuickView && (
              <QuickView onClick={onPressQuickView}>
                <img src={quickViewIcon} />
              </QuickView>
            )}
          </AboveTablet>
          {isTopProduct && (
            <TopContainer>
              <TopText>TOP</TopText>
            </TopContainer>
          )}
        </ImageTop>
        <Page>
          {/* <a href={urlProduct}> TODO: WIP new way to right click */}
          <Image src={image} onClick={onPressThumbnail} />
          {/* </a> TODO: WIP new way to right click */}
        </Page>
        <AboveTablet>
          {isHovered && (
            <ButtonContainer {...{ myLockerList }} onClick={onPressCustomize}>
              {labelButton}
            </ButtonContainer>
          )}
        </AboveTablet>
      </ImageContainer>
    )
  }

  const imagePages = imagesOrder.map((key, index) => {
    return (
      <Page key={index}>
        {!!images && (
          // <a href={urlProduct}> TODO: WIP new way to right click
          <Image src={images[key]} onClick={onPressThumbnail} />
          // </a> TODO: WIP new way to right click
        )}
      </Page>
    )
  })

  const buttonToRender = (
    <ButtonContainer
      {...{ myLockerList }}
      onClick={customizable ? onPressCustomize : onPressThumbnail}
    >
      <CustomizeButton>{labelButton}</CustomizeButton>
    </ButtonContainer>
  )

  return (
    <ImageContainer {...{ onMouseEnter, onMouseLeave, isTopProduct }}>
      <ImageTop>
        <AboveTablet>
          <QuickView onClick={onPressQuickView}>
            <img src={quickViewIcon} />
          </QuickView>
        </AboveTablet>
        {isTopProduct && (
          <TopContainer>
            <TopText>TOP</TopText>
          </TopContainer>
        )}
      </ImageTop>
      <SwipeableViews index={currentImage} disabled={disableSlider}>
        {imagePages}
      </SwipeableViews>
      <AboveTablet>
        {isHovered && (
          <Arrows>
            <Arrow src={backIcon} onClick={onPressBack} />
            <Arrow src={nextIcon} onClick={onPressNext} />
          </Arrows>
        )}
        {isHovered && buttonToRender}
      </AboveTablet>
    </ImageContainer>
  )
}

export default ProductSlide
