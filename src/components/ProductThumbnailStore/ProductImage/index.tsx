/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import Checkbox from 'antd/lib/checkbox'
import { ImageContainer, ImageTop, Image, Page } from './styledComponents'

interface Props {
  image?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  checked: boolean
}

const ProductSlide = ({ image, onChange, checked }: Props) => {
  return (
    <ImageContainer>
      <ImageTop>
        <Checkbox {...{ checked, onChange }} />
      </ImageTop>
      <Page>
        <Image src={image} />
      </Page>
    </ImageContainer>
  )
}

export default ProductSlide
