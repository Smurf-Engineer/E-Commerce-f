/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, AllButton, ContainerLoading } from './styledComponents'
import { compose, graphql } from 'react-apollo'
import Spin from 'antd/lib/spin'
import SeeAllButton from '../SeeAllButton'
import ProductThumbnail from '../ProductThumbnail'
import { productsQuery } from './data'
import { Product, ProductType, QueryProps, Filter } from '../../types/common'

interface Data extends QueryProps {
  products?: ProductType
}

interface Props {
  data: Data
  genderFilter?: Filter
  sportFilter: Filter
  onPressSeeAll: () => void
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number) => void
  width?: string
  category: Filter
}

export const ProductHorizontalList = ({
  data,
  onPressSeeAll,
  onPressCustomize,
  onPressQuickView,
  width = '60%',
  genderFilter,
  sportFilter,
  category
}: Props) => {
  if (data.loading) {
    return (
      <ContainerLoading {...{ width }}>
        <Spin />
      </ContainerLoading>
    )
  }

  // TODO: Empty error
  if (data.error) {
    return <div>Error...</div>
  }

  const products: ProductType = data.products || ({} as ProductType)

  const list = products.products.map(
    (
      { id, type, images, description, priceRange, isTopProduct, collections },
      key
    ) => (
      <ProductThumbnail
        {...{
          key,
          id,
          onPressCustomize,
          onPressQuickView,
          type,
          images,
          description,
          priceRange,
          isTopProduct,
          collections
        }}
      />
    )
  )
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
