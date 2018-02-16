/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, AllButton } from './styledComponents'
import { compose, graphql } from 'react-apollo'
import SeeAllButton from '../SeeAllButton'
import ProductThumbnail from '../ProductThumbnail'
import { productsQuery } from './data'
import { Product, QueryProps, Filter } from '../../types/common'

interface Data extends QueryProps {
  products: Product[]
}

interface Props {
  data: Data
  products: Product[]
  genderFilter?: Filter
  sportFilter: Filter
  onPressSeeAll: () => void
  onPressCustomize: (id: string) => void
  width?: string
  category: Filter
}

export const ProductHorizontalList = ({
  products,
  data,
  onPressSeeAll,
  onPressCustomize,
  width = '60%',
  genderFilter,
  sportFilter,
  category
}: Props) => {
  const list = products.map((product, key) => (
    <ProductThumbnail {...{ product, key, onPressCustomize }} />
  ))
  return (
    <Container {...{ width }}>
      {list}
      <AllButton>
        <SeeAllButton onClick={onPressSeeAll} />
      </AllButton>
    </Container>
  )
}

type OwnProps = {
  genderFilter?: Filter
  category?: Filter
  sportFilter?: Filter
}

const ListEnhance = compose(
  graphql<Data>(productsQuery, {
    options: ({ genderFilter, category, sportFilter }: OwnProps) => ({
      variables: {
        gender: genderFilter ? genderFilter.id : null,
        category: category ? category.id : null,
        sport: sportFilter ? sportFilter.id : null
      }
    })
  })
)(ProductHorizontalList)

export default ListEnhance
