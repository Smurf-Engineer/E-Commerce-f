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
import { ProductType, QueryProps, Filter, Reseller } from '../../types/common'
import get from 'lodash/get'
import { APPROVED } from '../../constants'

interface Data extends QueryProps {
  products?: ProductType
}

interface Props {
  data: Data
  genderFilter?: Filter
  sportFilter: Filter
  reseller?: Reseller
  fromTop?: boolean
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
  reseller,
  fromTop,
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
  const { status, inline = 0, comission = 0 } = reseller || {}
  const isReseller = status === APPROVED

  const list = products.products.map((productData, key) => {
    let product = productData
    if (isReseller) {
      const originalPriceRange = get(productData, 'priceRange', [])
      const comissionToApply = product.customizable ? comission : inline
      const purchasePrices = originalPriceRange.map((priceItem) => {
        const price = (priceItem.price * (1 - (comissionToApply / 100))).toFixed(2)
        return { ...priceItem, price }
      })
      product = { ...product, priceRange: purchasePrices }
    }
    const {
      id,
      type,
      images,
      description,
      priceRange,
      isTopProduct,
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
          fromTop,
          isTopProduct,
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
