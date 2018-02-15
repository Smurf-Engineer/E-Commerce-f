/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, AllButton } from './styledComponents'
import SeeAllButton from '../SeeAllButton'
import ProductThumbnail from '../ProductThumbnail'
import { Product, QueryProps, Filter } from '../../types/common'

interface Data extends QueryProps {}

interface Props {
  // data: Data
  products: Product[]
  sportFilter?: Filter
  onPressSeeAll: () => void
  onPressCustomize: (id: string) => void
  width?: string
  category: Filter
}

const ProductHorizontalList = ({
  products,
  onPressSeeAll,
  onPressCustomize,
  width = '60%',
  sportFilter,
  category
}: Props) => {
  const list = products.map((product, key) => (
    <ProductThumbnail {...{ product, key, onPressCustomize }} />
  ))
  // console.log('----------SPORT---------')
  // console.log(sportFilter)
  // console.log('---------------------------')
  // console.log('--------CATEGORY--------')
  // console.log(category)
  // console.log('---------------------------')
  return (
    <Container {...{ width }}>
      {list}
      <AllButton>
        <SeeAllButton onClick={onPressSeeAll} />
      </AllButton>
    </Container>
  )
}

export default ProductHorizontalList

// graphql<Data>(productsQuery, {
//   options: ({ categories, categorySelected, sports, type }: any) => {
//     console.log('-------------DATA--------------')
//     console.log(categorySelected)
//     console.log('---------------------------')
//     return {
//       variables: { gender: 1 }
//     }
//   }
// }),
