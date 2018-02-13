/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, AllButton } from './styledComponents'
import SeeAllButton from '../SeeAllButton'
import ProductThumbnail from '../ProductThumbnail'
import { Product } from '../../types/common'

interface Props {
  products: Product[]
  onPressSeeAll: () => void
  onPressCustomize: (id: string) => void
}

const ProductHorizontalList = ({
  products,
  onPressSeeAll,
  onPressCustomize
}: Props) => {
  const list = products.map((product, key) => (
    <ProductThumbnail {...{ product, key, onPressCustomize }} />
  ))
  return (
    <Container>
      {list}
      <AllButton>
        <SeeAllButton onClick={onPressSeeAll} />
      </AllButton>
    </Container>
  )
}

export default ProductHorizontalList
