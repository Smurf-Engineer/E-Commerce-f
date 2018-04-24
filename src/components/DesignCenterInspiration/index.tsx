/**
 * DesignCenterInspiration Component - Created by gustavomedina on 23/04/18.
 */
import * as React from 'react'
import Spin from 'antd/lib/spin'
import { compose, graphql } from 'react-apollo'
import ProductThumbnail from '../ProductThumbnail'
import {
  Container,
  ContainerLoading,
  FooterThumbnailInspiration
} from './styledComponents'
import { DesignResultType, QueryProps, Filter } from '../../types/common'
import { desginsQuery } from './data'

interface Data extends QueryProps {
  designs?: DesignResultType
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

export const DesignCenterInspiration = ({
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

  const designs: DesignResultType = data.designs || ({} as DesignResultType)

  const list = designs.designs.map(({ id, shortId, name, product }, index) => {
    return (
      <ProductThumbnail
        key={index}
        id={shortId}
        yotpoId={product.yotpoId}
        labelButton="ADD TO CART"
        isTopProduct={product.isTopProduct}
        onPressCustomize={(idd: string) => {}}
        onPressQuickView={(idi: number, yotpoId: string) => {}}
        image="https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png" // TODO: Get design image
        isStoreThumbnail={true}
        footer={<FooterThumbnailInspiration>{name}</FooterThumbnailInspiration>}
      />
    )
  })
  return <Container>{list}</Container>
}

type OwnProps = {
  productId?: number
}

const DesignCenterInspirationEnhance = compose(
  graphql<Data>(desginsQuery, {
    options: ({ productId }: OwnProps) => ({
      variables: { productId }
    })
  })
)(DesignCenterInspiration)

export default DesignCenterInspirationEnhance

// export default DesignCenterInspiration
