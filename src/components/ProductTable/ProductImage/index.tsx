/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { ImageContainer, Image, Page } from './styledComponents'

interface Props {
  image?: string
}

const ProductSlide = ({ image }: Props) => {
  return (
    <ImageContainer>
      <Page>
        <Image src={image} />
      </Page>
    </ImageContainer>
  )
}

export default ProductSlide
