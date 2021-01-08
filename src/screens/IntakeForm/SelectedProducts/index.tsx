import * as React from 'react'
import { Product } from '../../../types/common'
import get from 'lodash/get'
import TrashImg from '../../../assets/trash.svg'
import {
  Container,
  Products,
  ProductThumbnail,
  Image,
  Bottom,
  Description,
  Trash
} from './styledComponents'

interface Props {
  products: Product
  currentCurrency: string
}

const SelectedProducts = ({ products }: Props) => {
  return (
    <Container>
      <Products total={products.length}>
        {products.map((product: Product) => {
          const {
            images,
            description,
            id
          } = product
          const imageSrc = get(images[0], 'thumbnail', '')
          return (<ProductThumbnail key={id}>
                <Image src={imageSrc} />
                <Bottom>
                  <Description>
                    {description}
                  </Description>
                  <Trash src={TrashImg} />
                  </Bottom>
            </ProductThumbnail>)})}
      </Products>
    </Container>
  )
}

export default SelectedProducts
