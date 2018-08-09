/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, AllButton, ContainerLoading } from './styledComponents'
import { compose, graphql } from 'react-apollo'
import Spin from 'antd/lib/spin'
import messages from './messages'
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
  categoryFilter: Filter
  formatMessage: (messageDescriptor: any) => string
}

export const ProductHorizontalList = ({
  data,
  onPressCustomize,
  onPressQuickView,
  width = '60%',
  genderFilter,
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

  const products: ProductType = data.products || {
    fullCount: '0',
    products: []
  }

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
          yotpoId,
          customizable
        }}
        images={productImages}
        gender={genderId}
        customizableLabel={formatMessage(messages.customizable)}
        labelButton={
          customizable ? (
            formatMessage(messages.customize)
          ) : (
            <AddToCartButton
              label={formatMessage(messages.addToCart)}
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
  categoryFilter?: Filter
  sportFilter?: Filter
}

const ListEnhance = compose(
  graphql<Data>(productsQuery, {
    options: ({ genderFilter, categoryFilter, sportFilter }: OwnProps) => {
      const sportName = sportFilter && sportFilter.name.toLowerCase()
      return {
        variables: {
          sportGroup: sportName === 'cycling' ? sportName : null,
          gender: genderFilter ? genderFilter.id : null,
          category: categoryFilter ? categoryFilter.id : null,
          sport: sportFilter ? sportFilter.id : null
        }
      }
    }
  })
)(ProductHorizontalList)

export default ListEnhance
