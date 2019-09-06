/**
 * ProductHorizontalList Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { Container, ContainerLoading } from './styledComponents'
import { compose, graphql } from 'react-apollo'
import Spin from 'antd/lib/spin'
import messages from './messages'
import ProductThumbnail from '../ProductThumbnail'
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
  onPressQuickView: (id: number, yotpoId: string, gender: number) => void
  onPressThumbnail: () => void
  width?: string
  categoryFilter: Filter
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
}

export const ProductHorizontalList = ({
  data,
  onPressCustomize,
  onPressQuickView,
  width = '60%',
  genderFilter,
  formatMessage,
  onPressThumbnail,
  currentCurrency,
  onPressSeeAll
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
    const {
      id,
      type,
      images,
      description,
      priceRange,
      isTopProduct,
      collections,
      yotpoId,
      customizable,
      colors
    } = product

    const imagesByGender = images.find(image => image.genderId === genderId)
    const productImages = imagesByGender || images[0]

    return (
      <ProductThumbnail
        {...{
          key,
          id,
          onPressCustomize,
          onPressQuickView,
          onPressThumbnail,
          type,
          description,
          priceRange,
          isTopProduct,
          collections,
          yotpoId,
          currentCurrency,
          customizable,
          colors
        }}
        images={productImages}
        product={product}
        withMargin={true}
        gender={genderId}
        customizableLabel={formatMessage(messages.customizable)}
        labelButton={
          customizable
            ? formatMessage(messages.customize)
            : formatMessage(messages.retatil)
        }
      />
    )
  })
  return <Container {...{ width }}>{list}</Container>
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
