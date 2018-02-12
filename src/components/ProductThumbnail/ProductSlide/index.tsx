/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
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
  Page
} from './styledComponents'
import SwipeableViews from 'react-swipeable-views'
import backIcon from '../../../assets/leftarrow.svg'
import nextIcon from '../../../assets/rightarrow.svg'
import quickViewIcon from '../../../assets/quickview.svg'
import { ImageType } from '../../../types/common'

interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
  isHovered: boolean
  isTopProduct: boolean
  images: ImageType
}

const ProductSlide = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  isTopProduct,
  images
}: Props) => {
  return (
    <ImageContainer {...{ onMouseEnter, onMouseLeave, isTopProduct }}>
      <ImageTop>
        <img src={quickViewIcon} />
        {isTopProduct && (
          <TopContainer>
            <TopText>TOP</TopText>
          </TopContainer>
        )}
      </ImageTop>
      {/* <Image src={images.front} /> */}
      <SwipeableViews>
        <Page>1</Page>
        <Page>2</Page>
        <Page>3</Page>
      </SwipeableViews>
      {isHovered && (
        <Arrows>
          <Arrow src={backIcon} />
          <Arrow src={nextIcon} />
        </Arrows>
      )}
      {isHovered && (
        <ButtonContainer>
          <CustomizeButton>CUSTOMIZE</CustomizeButton>
        </ButtonContainer>
      )}
    </ImageContainer>
  )
}

export default ProductSlide
