/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, AllButton, ContainerLoading } from './styledComponents'
import { compose, graphql } from 'react-apollo'
import Spin from 'antd/lib/spin'
import SeeAllButton from '../SeeAllButton'
import ProductThumbnail from '../ProductThumbnail'
import AddToCartButton from '../AddToCartButton'
import { productsQuery } from './data'
import { ProductType, QueryProps, Filter } from '../../types/common'

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
  formatMessage: (messageDescriptor: any) => string
}

export const ProductHorizontalList = ({
  data,
  onPressSeeAll,
  onPressCustomize,
  onPressQuickView,
  width = '60%',
  genderFilter,
  sportFilter,
  category,
  formatMessage
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

  const genderId = genderFilter ? genderFilter.id : null

  const products: ProductType = data.products || ({} as ProductType)

  const list = products.products.map((product, key) => {
    // TODO: filter by gender
    const {
      id,
      type,
      images,
      description,
      priceRange,
      isTopProduct,
      collections,
      yotpoId,
      customizable
    } = product

    const productImages = images ? images[0] : {}
    return (
      <ProductThumbnail
        {...{
          key,
          id,
          onPressCustomize,
          onPressQuickView,
          type,
          description,
          priceRange,
          isTopProduct,
          collections,
          yotpoId
        }}
        images={productImages}
        gender={genderId}
        labelButton={
          customizable ? (
            'CUSTOMIZE'
          ) : (
            <AddToCartButton
              label={'ADD TO CART'}
              renderForThumbnail={true}
              item={{ product }}
            />
          )
        }
      />
    )
  })
  return (
    <Container {...{ width }}>
      {list}
      <AllButton>
        <SeeAllButton {...{ formatMessage }} />
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
    options: ({ genderFilter, category, sportFilter }: OwnProps) => {
      const sportName = (sportFilter as Filter).name.toLowerCase()
      return {
        variables: {
          sportGroup: sportName === 'cycling' ? sportName : null,
          gender: genderFilter ? genderFilter.id : null,
          category: category ? category.id : null,
          sport: sportFilter ? sportFilter.id : null
        }
      }
    }
  })
)(ProductHorizontalList)

export default ListEnhance
