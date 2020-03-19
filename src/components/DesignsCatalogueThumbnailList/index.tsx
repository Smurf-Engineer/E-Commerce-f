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
  ClickParam,
  PriceRange,
  PriceRangeProgress,
  Message
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
import { GRAY_LIGHTEST } from '../../theme/colors'
import { FormattedMessage } from 'react-intl'
import filter from 'lodash/filter'

interface Data extends QueryProps {
  products: ProductType
}

interface Props {
  formatMessage: (messageDescriptor: Message, params?: any) => string
  openQuickView: (id: number) => void
  handleChangePage: (page: number) => void
  handleOrderBy?: (evt: ClickParam) => void
  sortOptions?: Element | null
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
  display?: boolean
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
      display,
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
            priceRange,
            short_id: itemShortId
          },
          index
        ) => {
          const targetPriceValue: any = targetRange
            ? find(product.priceRange, {
                quantity: targetRange.name,
                abbreviation: currentCurrency || config.defaultCurrency
              }) || {
                price: 0
              }
            : { price: 0 }
          const currentPriceValue: any = currentRange
            ? find(product.priceRange, {
                quantity:
                  currentRange.name === '0-0' ? '2-5' : currentRange.name,
                abbreviation: currentCurrency || config.defaultCurrency
              }) || {
                price: 0
              }
            : { price: 0 }
          const fixedPriceValue =
            priceRange && priceRange.length
              ? find(priceRange, ['abbreviation', currentCurrency])
              : currentPriceValue
          const priceRanges = filter(product.priceRange, [
            'abbreviation',
            currentCurrency || config.defaultCurrency
          ])

          const currentRangeAttributes: PriceRangeProgress = {
            minQuantity: 0,
            maxQuantity: 0,
            range: 0,
            index: 0,
            price: 0
          }
          priceRanges.some((current: PriceRange, rangeIndex: number) => {
            const quantities = current.quantity.split('-')
            const maxQuantity = parseInt(quantities[1], 10)

            if (totalOrders === 0 && current.quantity === 'Personal') {
              currentRangeAttributes.price = fixedPriceValue.price
              return true
            }
            if (totalOrders <= maxQuantity) {
              const minQuantity =
                rangeIndex <= 1 ? 1 : parseInt(quantities[0], 10)
              currentRangeAttributes.maxQuantity = maxQuantity
              currentRangeAttributes.minQuantity = minQuantity
              currentRangeAttributes.range = maxQuantity - minQuantity
              currentRangeAttributes.index = rangeIndex
              currentRangeAttributes.price = current.price

              const nextPriceRange = priceRanges[rangeIndex + 1]
              if (nextPriceRange) {
                const nextMinQuantity = parseInt(
                  nextPriceRange.quantity.split('-')[0],
                  10
                )
                if (totalOrders + 2 >= nextMinQuantity) {
                  const save = targetPriceValue.price - nextPriceRange.price
                  const percent = Math.round(
                    (save * 100) / targetPriceValue.price
                  )
                  currentRangeAttributes.itemsLeft =
                    nextMinQuantity - totalOrders
                  currentRangeAttributes.percentToSave = percent
                }
              }
              return true
            }
          })

          const currentPrice = onDemandMode
            ? fixedPriceValue.price
            : currentRangeAttributes.price
          const currentPriceText = `${fixedPriceValue.shortName} ${currentPrice}`
          const targetPriceText = `${targetPriceValue.shortName} ${targetPriceValue.price}`
          const suggestedSaveText = currentRangeAttributes.percentToSave
            ? formatMessage(messages.suggestedSave, {
                itemsLeft: `<strong>${currentRangeAttributes.itemsLeft} more</strong>`,
                percent: `<strong>${currentRangeAttributes.percentToSave}%</strong>`
              })
            : ''
          return (
            <ThumbnailListItem key={index}>
              <ProductThumbnail
                id={product.id}
                backgroundColor={GRAY_LIGHTEST}
                designId={shortId}
                itemId={itemShortId}
                product={product}
                yotpoId={product.yotpoId}
                hideQuickView={true}
                footer={
                  <FooterThumbnailTeamStore
                    {...{
                      id,
                      name,
                      targetRange,
                      onDemandMode,
                      code,
                      currentRangeAttributes,
                      suggestedSaveText
                    }}
                    description={`${product.type} ${product.description}`}
                    progress={totalOrders}
                    priceRange={priceRanges}
                    currentPrice={currentPriceText}
                    targetPrice={targetPriceText}
                  />
                }
                labelButton={
                  display && (
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
                      teamStoreItem={itemShortId}
                      teamStoreId={teamStoreShortId}
                      fixedPrices={priceRange}
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
                backgroundColor={GRAY_LIGHTEST}
                yotpoId={product.yotpoId}
                type={product.type}
                product={product}
                description={product.description}
                isTopProduct={product.isTopProduct}
                onPressCustomize={this.gotoDesignCenter}
                onPressQuickView={this.handlePressQuickView}
                collections={product.collections}
                images={productImages}
                teamStoreShortId={teamStoreShortId}
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
          <TotalItems>
            <FormattedMessage {...messages.items} values={{ total }} />
          </TotalItems>
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
