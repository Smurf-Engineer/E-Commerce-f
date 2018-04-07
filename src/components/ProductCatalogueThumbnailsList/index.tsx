/**
 * ProductCatalogueThumbnailsList Component - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu, { ClickParam } from 'antd/lib/menu'
import messages from './messages'
import { GetProductsQuery } from './data'
import ProductThumbnail from '../ProductThumbnail'
import FooterThumbnailLocker from '../FooterThumbnailLocker'
import { QueryProps, ProductType, DesignType } from '../../types/common'
import {
  Container,
  Content,
  Text,
  HeadRow,
  SortByLabel,
  SortOptions,
  TotalItems,
  StyledImg,
  ThumbnailsList,
  ThumbnailListItem,
  Loading,
  PaginationRow,
  MenuStyle,
  NoResultsFound
} from './styledComponents'
import downArrowIcon from '../../assets/downarrow.svg'

interface Data extends QueryProps {
  products: ProductType
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number) => void
  handleChangePage: (page: number) => void
  handleOrderBy?: (evt: ClickParam) => void
  sortOptions?: Element | null
  sortByLabel: string
  data: Data
  history: any
  currentPage: number
  limit?: number
  designs?: DesignType[]
  onPressPrivate?: () => void
  onPressDelete?: () => void
}

export class ProductCatalogueThumbnailsList extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      sortByLabel,
      currentPage,
      limit,
      handleChangePage,
      handleOrderBy,
      data,
      designs,
      onPressPrivate = () => {},
      onPressDelete = () => {}
    } = this.props

    let thumbnailsList
    let total = '10'
    let sortOptions = null
    let loading = false
    let renderThumbnailList = null
    let renderLoading = null
    if (designs) {
      thumbnailsList = designs.map(({ id, name, product }, index) => {
        return (
          <ThumbnailListItem key={index}>
            <ProductThumbnail
              id={product.id}
              yotpoId={product.yotpoId}
              footer={
                <FooterThumbnailLocker
                  {...{ id, name, onPressPrivate, onPressDelete }}
                  description={`${product.type} ${product.description}`}
                  date="03/03/2018" // TODO: Get design date
                />
              }
              labelButton="ADD TO CART"
              isTopProduct={product.isTopProduct}
              onPressCustomize={this.handleOnPressAddToCart}
              onPressQuickView={this.handlePressQuickView}
              image="https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png" // TODO: Get design image
            />
          </ThumbnailListItem>
        )
      })
      renderThumbnailList = <ThumbnailsList>{thumbnailsList}</ThumbnailsList>
    } else {
      renderLoading = (
        <Loading>
          <Spin />
        </Loading>
      )

      const { loading: loadingData, products } = data
      loading = loadingData || false
      if (!products) {
        return null
      }
      const { products: catalogue = [], fullCount } = products
      total = fullCount
      if (catalogue) {
        thumbnailsList = catalogue.map((product, index) => {
          // TODO: filter by gender
          const productImages = product.images ? product.images[0] : {}
          return (
            <ThumbnailListItem key={index}>
              <ProductThumbnail
                id={product.id}
                yotpoId={product.yotpoId}
                type={product.type}
                description={product.description}
                isTopProduct={product.isTopProduct}
                onPressCustomize={this.gotoDesignCenter}
                onPressQuickView={this.handlePressQuickView}
                collections={product.collections}
                images={productImages}
                priceRange={product.priceRange}
              />
            </ThumbnailListItem>
          )
        })
      }

      renderThumbnailList =
        catalogue.length > 0 ? (
          <ThumbnailsList>{thumbnailsList}</ThumbnailsList>
        ) : (
          <NoResultsFound>
            {formatMessage(messages.emptyResults)}
          </NoResultsFound>
        )

      sortOptions = (
        <Menu style={MenuStyle} onClick={handleOrderBy}>
          <Menu.Item key="topSeller">
            {formatMessage(messages.topSellerLabel)}
          </Menu.Item>
          <Menu.Item key="pricelow">
            {formatMessage(messages.lowestPriceLabel)}
          </Menu.Item>
          <Menu.Item key="pricehigh">
            {formatMessage(messages.hightestPriceLabel)}
          </Menu.Item>
        </Menu>
      )
    }

    return (
      <Container>
        <HeadRow>
          <TotalItems>{`${total} Items`}</TotalItems>
          {sortOptions && (
            <SortOptions>
              <SortByLabel>{formatMessage(messages.sortByLabel)}</SortByLabel>
              <Dropdown overlay={sortOptions} placement="bottomCenter">
                <Text>{sortByLabel}</Text>
              </Dropdown>
              <StyledImg src={downArrowIcon} />
            </SortOptions>
          )}
        </HeadRow>
        <Content>{loading ? renderLoading : renderThumbnailList}</Content>
        <PaginationRow>
          {parseInt(total, 10) > 12 && (
            <Pagination
              size="small"
              current={currentPage}
              onChange={handleChangePage}
              total={parseInt(total, 10)}
              pageSize={limit}
            />
          )}
        </PaginationRow>
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

  // TODO: Handle add to cart
  handleOnPressAddToCart = (id: number) => {}
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

const ThumbnailsListEnhance = compose(
  graphql<Data>(GetProductsQuery, {
    options: ({
      genderFilters,
      categoryFilters,
      sportFilters,
      seasonFilters,
      limit,
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
        },
        skip: !!designs
      }
    }
  })
)(ProductCatalogueThumbnailsList)

export default ThumbnailsListEnhance
