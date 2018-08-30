/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import quickViewIcon from '../../../assets/quickview.svg'
import {
  ImageContainer,
  ImageTop,
  Image,
  Page,
  QuickView
} from './styledComponents'

interface Props {
  image?: string
  onPressQuickView: () => void
}

const ProductSlide = ({ image, onPressQuickView }: Props) => {
  return (
    <ImageContainer>
      <ImageTop>
        <QuickView onClick={onPressQuickView}>
          <img src={quickViewIcon} />
        </QuickView>
      </ImageTop>
      <Page>
        <Image src={image} />
      </Page>
    </ImageContainer>
  )
}

export default ProductSlide
