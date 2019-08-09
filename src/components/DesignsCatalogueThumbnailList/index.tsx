/**
 * ProductCatalogueThumbnailsList Component - Created by gustavomedina on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu from 'antd/lib/menu'
import find from 'lodash/find'
import messages from './messages'
import config from '../../config/index'
import { GetProductsQuery } from './data'
import ProductThumbnail from '../ProductThumbnail'
import AddToCartButton from '../AddToCartButton'
import FooterThumbnailTeamStore from '../FooterThumbnailTeamStore'
import {
  QueryProps,
  ProductType,
  DesignType,
  TeamStoreItemtype,
  Filter,
  ClickParam
} from '../../types/common'
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
  featured: boolean
  sortByLabel: string
  data: Data
  history: any
  currentPage: number
  onDemandMode?: boolean
  limit?: number
  teamStoreShortId?: string
  designs?: TeamStoreItemtype[]
  withoutPadding?: boolean
  storeFront?: boolean
  targetRange?: Filter
  currentRange: Filter
  targetPrice: string
  currentCurrency: string
}

export class DesignsCatalogueThumbnailList extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      sortByLabel,
      currentPage,
      limit,
      handleChangePage,
      handleOrderBy,
      data,
      teamStoreShortId,
      designs,
      featured,
      onDemandMode,
      withoutPadding,
      targetRange,
      currentRange,
      currentCurrency = config.defaultCurrency
    } = this.props

    let thumbnailsList
    let total = ''
    let sortOptions = null
    let loading = false
    let renderThumbnailList = null
    let renderLoading = null
    if (designs) {
      total = designs.length.toString()
      thumbnailsList = designs.map(
        (
          {
            design: { id, shortId, name, product, image, code },
            totalOrders,
            priceRange
          },
          index
        ) => {
          const targetPriceValue: any = targetRange
            ? find(product.priceRange, { quantity: targetRange.name }) || {
                price: 0
              }
            : { price: 0 }

          const currentPriceValue: any = currentRange
            ? find(product.priceRange, {
                quantity:
                  currentRange.name === '0-0' ? 'Personal' : currentRange.name
              }) || {
                price: 0
              }
            : { price: 0 }

          const fixedPrice =
            priceRange && priceRange.length
              ? find(priceRange, ['abbreviation', currentCurrency])
              : currentPriceValue

          return (
            <ThumbnailListItem key={index}>
              <ProductThumbnail
                id={shortId}
                product={product}
                yotpoId={product.yotpoId}
                footer={
                  <FooterThumbnailTeamStore
                    {...{ id, name, targetRange, onDemandMode }}
                    description={`${product.type} ${product.description}`}
                    progress={totalOrders}
                    targetPrice={targetPriceValue.price}
                    currentPrice={fixedPrice.price}
                  />
                }
                labelButton={
                  featured && (
                    <AddToCartButton
                      label={formatMessage(messages.addToCart)}
                      renderForThumbnail={true}
                      item={{ product }}
                      {...{ formatMessage }}
                      withoutTop={true}
                      designId={shortId}
                      designName={name}
                      designImage={image}
                      designCode={code}
                      teamStoreId={teamStoreShortId}
                    />
                  )
                }
                teamStoreShortId={teamStoreShortId || ''}
                isTopProduct={product.isTopProduct}
                onPressCustomize={this.handleOnPressAddToCart}
                onPressQuickView={this.handlePressQuickView}
                image={image}
                isStoreThumbnail={true}
                {...{ teamStoreShortId }}
              />
            </ThumbnailListItem>
          )
        }
      )
      renderThumbnailList = (
        <ThumbnailsList withoutPadding={!!withoutPadding}>
          {thumbnailsList}
        </ThumbnailsList>
      )
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
                product={product}
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
        <HeadRow withoutPadding={!!withoutPadding}>
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

  handlePressQuickView = (id: number, yotpoId: string) => {
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
  teamStoreShortId?: string
  designs?: DesignType[]
}

const DesignsThumbnailsListEnhance = compose(
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
)(DesignsCatalogueThumbnailList)

export default DesignsThumbnailsListEnhance
