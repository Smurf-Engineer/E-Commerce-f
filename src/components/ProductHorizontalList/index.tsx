/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, Text } from './styledComponents'
import ProductThumbnail from '../ProductThumbnail'
import { Product } from '../../types/common'

interface Props {
  products: Product[]
}

const ProductHorizontalList = ({ products }: Props) => {
  const list = products.map((product, key) => (
    <ProductThumbnail {...{ product, key }} />
  ))
  return <Container>{list}</Container>
}

export default ProductHorizontalList
