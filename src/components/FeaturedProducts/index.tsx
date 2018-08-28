/**
 * FeaturedProducts Component - Created by cazarez on 22/05/18.
 */
import * as React from 'react'

import { compose, graphql } from 'react-apollo'

import Caroussel from 'react-slick'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { GetProductsQuery } from './data'
import {
  Container,
  Title,
  CarouselContent,
  Arrow,
  Loading
} from './styledComponents'
import ProductThumbnail from '../ProductThumbnail'
import leftArrow from '../../assets/leftarrow.svg'
import rightArrow from '../../assets/arrow.svg'
import { ProductType, QueryProps, DesignType } from '../../types/common'

interface Data extends QueryProps {
  featuredProducts: ProductType
}
interface Props {
  data: Data
  history: any
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number) => void
}

const arrowLeft = <Arrow src={leftArrow} />
const arrowRight = <Arrow src={rightArrow} />

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  autoplay: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  arrows: true,
  centerMode: true,
  draggable: false,
  prevArrow: arrowLeft,
  nextArrow: arrowRight,
  responsive: [
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        centerMode: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        centerMode: false
      }
    }
  ]
}

export class FeaturedProducts extends React.PureComponent<Props, {}> {
  render() {
    const {
      openQuickView,
      formatMessage,
      currentCurrency,
      data: { loading, featuredProducts, error }
    } = this.props

    if (error) {
      return null
    }

    if (loading) {
      return (
        <Loading>
          <Spin />
        </Loading>
      )
    }

    const products = (featuredProducts && featuredProducts.products) || []

    const featuredList = products.map((product, key) => {
      const {
        id,
        yotpoId,
        type,
        description,
        isTopProduct,
        images,
        priceRange,
        customizable,
        colors
      } = product
      return (
        <div {...{ key }}>
          <ProductThumbnail
            onPressCustomize={this.gotoDesignCenter}
            onPressQuickView={openQuickView}
            images={images[0]}
            customizableLabel={formatMessage(messages.customizable)}
            disableSlider={true}
            {...{
              currentCurrency,
              id,
              yotpoId,
              type,
              description,
              isTopProduct,
              priceRange,
              customizable,
              colors
            }}
            labelButton={
              customizable
                ? formatMessage(messages.customize)
                : formatMessage(messages.viewFullDetailsLabel)
            }
          />
        </div>
      )
    })

    return (
      <Container>
        <Title>{formatMessage(messages.title)}</Title>
        <CarouselContent>
          <Caroussel {...settings}>{featuredList}</Caroussel>
        </CarouselContent>
      </Container>
    )
  }

  gotoDesignCenter = (id: string) => {
    const { history } = this.props
    history.push(`/design-center?id=${id}`)
  }

  handlePressQuickView = (id: number) => {
    const { openQuickView } = this.props
    openQuickView(id)
  }
}
type OwnProps = {
  genderFilters?: string
  sportFilters?: string
  categoryFilters?: string
  seasonFilters?: string
  fitFilters?: string
  temperatureFilters?: string
  limit?: number
  orderBy?: string
  skip?: number
  designs?: DesignType[]
}

const FeaturedProductsEnhanced = compose(
  graphql<Data>(GetProductsQuery, {
    options: ({
      genderFilters,
      categoryFilters,
      sportFilters,
      seasonFilters,
      limit = 10,
      orderBy,
      skip,
      designs
    }: OwnProps) => {
      return {
        variables: {
          gender: genderFilters ? genderFilters : null,
          category: categoryFilters ? categoryFilters : null,
          sport: sportFilters ? sportFilters : null,
          season: seasonFilters ? seasonFilters : null,
          limit: limit ? limit : null,
          order: orderBy ? orderBy : null,
          offset: skip ? skip : null
        }
      }
    }
  })
)(FeaturedProducts)

export default FeaturedProductsEnhanced
