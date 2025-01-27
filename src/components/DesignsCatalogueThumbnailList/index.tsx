/**
 * ProductCatalogueThumbnailsList Component - Created by gustavomedina on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import Dropdown from 'antd/lib/dropdown'
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
  MenuStyle,
  NoResultsFound,
  InfiniteScrollStyled
} from './styledComponents'
import downArrowIcon from '../../assets/downarrow.svg'
import { GRAY_LIGHTEST } from '../../theme/colors'
import { FormattedMessage } from 'react-intl'
import filter from 'lodash/filter'
import get from 'lodash/get'
const LIMIT_FIRST_RANGE = 2
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
  isResellerStore?: boolean
  fromYotpo?: boolean
  isResellerOwner?: boolean
  designs?: TeamStoreItemtype[]
  withoutPadding?: boolean
  storeFront?: boolean
  targetRange?: Filter
  currentRange: Filter
  targetPrice: string
  currentCurrency: string
  display?: boolean
  purchasePrice?: number
  resellerComission?: number
  teamStoreName?: string
  closed?: boolean
  fixedPrice?: boolean
  totalDesigns?: number
}

export class DesignsCatalogueThumbnailList extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      sortByLabel,
      handleChangePage,
      handleOrderBy,
      data,
      teamStoreShortId,
      designs,
      display,
      resellerComission = 0,
      isResellerStore,
      isResellerOwner,
      onDemandMode,
      withoutPadding,
      targetRange,
      fromYotpo,
      currentRange,
      currentCurrency = config.defaultCurrency,
      teamStoreName,
      closed,
      fixedPrice,
      totalDesigns = 0
    } = this.props
    const LAST_ITEM = 1

    let thumbnailsList
    let total = ''
    let sortOptions = null
    let renderThumbnailList = null
    if (designs) {
      total = designs.length.toString()
      thumbnailsList = designs.map(
        (
          {
            design: { id, shortId, name, product: productData, image, code, proDesign, proCertified },
            totalOrders,
            resellerRange,
            priceRange: fixedRange,
            short_id: itemShortId
          },
          index
        ) => {
          const priceRange = isResellerStore ? resellerRange : fixedRange
          let product = productData
          if (isResellerOwner) {
            const originalPriceRange = get(product, 'priceRange', [])
            const purchasePrices = originalPriceRange.map((priceItem) => {
              const price = (priceItem.price * (1 - (resellerComission / 100))).toFixed(2)
              return { ...priceItem, price }
            })
            product = { ...product, priceRange: purchasePrices }
          }
          const targetPriceValue: any = targetRange
            ? find(product.priceRange, {
              quantity: (isResellerOwner ? '2-5' : targetRange.name),
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
            const maxQuantity = parseInt(quantities[LAST_ITEM], 10)

            if (totalOrders === 0 && current.quantity === 'Personal') {
              currentRangeAttributes.price = fixedPriceValue.price
              return true
            }
            if (totalOrders <= maxQuantity) {
              const minQuantity =
                rangeIndex <= LAST_ITEM
                  ? LAST_ITEM
                  : parseInt(quantities[0], 10)
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
                if (totalOrders + LIMIT_FIRST_RANGE >= nextMinQuantity) {
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

          const currentPrice = (onDemandMode || fixedPrice)
            ? fixedPriceValue.price
            : currentRangeAttributes.price
          const currentPriceText = `${fixedPriceValue.shortName
            } ${currentPrice}`
          const targetPriceText = `${targetPriceValue.shortName}
          ${isResellerOwner ? Number(targetPriceValue.price).toFixed(2) : targetPriceValue.price}`
          const suggestedSaveText = currentRangeAttributes.percentToSave
            ? formatMessage(messages.suggestedSave, {
              itemsLeft: `<strong>${currentRangeAttributes.itemsLeft
                } more</strong>`,
              percent: `<strong>${currentRangeAttributes.percentToSave
                }%</strong>`
            })
            : ''
          return (
            <ThumbnailListItem {...{ fromYotpo }} key={index}>
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
                      fixedPrice,
                      isResellerStore,
                      isResellerOwner,
                      code,
                      currentRangeAttributes,
                      suggestedSaveText
                    }}
                    genders={product.genders}
                    description={`${product.type} ${product.description}`}
                    progress={totalOrders}
                    priceRange={priceRanges}
                    currentPrice={currentPriceText}
                    targetPrice={targetPriceText}
                  />
                }
                labelButton={
                  display &&
                  !closed && (
                    <AddToCartButton
                      label={formatMessage(messages.addToCart)}
                      renderForThumbnail={true}
                      item={{ product }}
                      {...{ formatMessage, teamStoreName }}
                      withoutTop={true}
                      designId={shortId}
                      designName={name}
                      isReseller={isResellerStore && !isResellerOwner}
                      designImage={image}
                      designCode={code}
                      promptReseller={isResellerOwner}
                      isFixed={!onDemandMode}
                      teamStoreItem={itemShortId}
                      teamStoreId={teamStoreShortId}
                      fixedPrices={isResellerOwner ? [] : priceRange}
                      {...{ proCertified, proDesign, fixedPrice }}
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
        <InfiniteScrollStyled
          {...{ fromYotpo }}
          useWindow={false}
          pageStart={0}
          threshold={728}
          loadMore={handleChangePage}
          hasMore={fromYotpo ? false : totalDesigns > designs.length}
          loader={<Loading><Spin /></Loading>}
        >
          <ThumbnailsList {...{ fromYotpo }} withoutPadding={!!withoutPadding}>
            {thumbnailsList}
          </ThumbnailsList>
        </InfiniteScrollStyled>
      )
    } else {
      const { loading: loadingData, products } = data
      if (!products || loadingData) {
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
          <ThumbnailsList {...{ fromYotpo }}>{thumbnailsList}</ThumbnailsList>
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
          {!fromYotpo &&
            <TotalItems>
              <FormattedMessage {...messages.items} values={{ total, totalDesigns }} />
            </TotalItems>
          }
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
        <Content {...{ fromYotpo }}>
          {renderThumbnailList}
        </Content>
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
  handleOnPressAddToCart = (id: number) => { }
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
