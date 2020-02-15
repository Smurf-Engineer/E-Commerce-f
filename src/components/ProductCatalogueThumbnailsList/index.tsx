/**
 * ProductCatalogueThumbnailsList Component - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu from 'antd/lib/menu'
import messages from './messages'
import { GetProductsQuery } from './data'
import ProductThumbnail from '../ProductThumbnail'
import FooterThumbnailLocker from '../FooterThumbnailLocker'
import AddToCartButton from '../AddToCartButton'
import {
  QueryProps,
  ProductType,
  DesignType,
  ClickParam
} from '../../types/common'
import { GRAY_LIGHTEST } from '../../theme/colors'
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
  NoResultsFound,
  ButtonContainer,
  ActionButton,
  ButtonsContainer
} from './styledComponents'
import downArrowIcon from '../../assets/downarrow.svg'

interface Data extends QueryProps {
  products: ProductType
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number, yotpoId: string) => void
  handleChangePage: (page: number) => void
  handleOrderBy?: (evt: ClickParam) => void
  sortOptions?: Element | null
  contentTile: string
  sortByLabel: string
  data: Data
  history: any
  currentPage: number
  limit?: number
  designs?: DesignType[]
  previewOnly?: boolean
  openAssist: (shortId: string) => void
  openAddToTeamStoreModalAction: (open: boolean, id: string) => void
  setCurrentShare: (savedDesignId: string, openShareModal: boolean) => void
  onPressPrivate?: (id: string, isPrivate: boolean) => void
  onPressDelete?: (id: string, name: string) => void
  onPressRename?: (id: string, name: string) => void
  withoutPadding?: boolean
  currentCurrency: string
  genderFilters: string
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
      onPressDelete = () => {},
      onPressRename = () => {},
      withoutPadding,
      currentCurrency,
      genderFilters,
      previewOnly = false
    } = this.props

    let thumbnailsList
    let total = ''
    let sortOptions = null
    let loading = false
    let renderThumbnailList = null
    let renderLoading = null
    if (designs) {
      thumbnailsList = designs.map(
        (
          {
            name,
            product,
            image,
            createdAt,
            shortId,
            shared,
            code,
            proDesign,
            outputSvg,
            outputPng
          },
          index
        ) => {
          const addToCartButton = (
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
              myLockerList={true}
            />
          )
          return (
            <ThumbnailListItem key={index}>
              <ProductThumbnail
                {...{ currentCurrency }}
                id={product.id}
                yotpoId={product.yotpoId}
                designId={shortId}
                product={product}
                backgroundColor={GRAY_LIGHTEST}
                footer={
                  <FooterThumbnailLocker
                    {...{
                      name,
                      onPressPrivate,
                      onPressDelete,
                      onPressRename,
                      formatMessage,
                      addToCartButton,
                      code
                    }}
                    id={shortId as string}
                    isPrivate={!shared}
                    description={`${product.type} ${product.description}`}
                    date={createdAt}
                    setShare={this.setShare(shortId as string, true)}
                    canShare={!previewOnly}
                  />
                }
                labelButton={
                  <ButtonsContainer>
                    {!previewOnly ? (
                      <div>
                        {addToCartButton}
                        <ButtonContainer>
                          <ActionButton
                            onClick={this.gotToEditDesign(shortId || '')}
                          >
                            {formatMessage(
                              !proDesign ? messages.edit : messages.preview
                            )}
                          </ActionButton>
                        </ButtonContainer>
                        <ButtonContainer>
                          <ActionButton onClick={this.openAddStore(shortId)}>
                            {formatMessage(messages.addToStore)}
                          </ActionButton>
                        </ButtonContainer>
                      </div>
                    ) : (
                      <>
                        <ButtonContainer>
                          <ActionButton onClick={this.openPreview(shortId)}>
                            {formatMessage(messages.preview)}
                          </ActionButton>
                        </ButtonContainer>
                        <ButtonContainer>
                          <ActionButton
                            secondary={true}
                            onClick={this.openAssistModal(shortId)}
                          >
                            {formatMessage(messages.proassist)}
                          </ActionButton>
                        </ButtonContainer>
                      </>
                    )}
                  </ButtonsContainer>
                }
                myLockerList={true}
                isTopProduct={product.isTopProduct}
                onPressCustomize={this.handleOnPressAddToCart}
                onPressQuickView={this.handlePressQuickView}
                image={image}
                proDesign={proDesign}
                proDesignAssigned={outputPng && !outputSvg}
                hideQuickView={previewOnly}
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
          const {
            images,
            id,
            yotpoId,
            type,
            description,
            isTopProduct,
            collections,
            priceRange,
            customizable,
            colors
          } = product

          const imgsByGender = images.find(
            item => item.genderId === parseInt(genderFilters, 10)
          )

          const productImages = images ? imgsByGender || images[0] : {}
          return (
            <ThumbnailListItem key={index}>
              <ProductThumbnail
                onPressCustomize={this.gotoDesignCenter}
                onPressQuickView={this.handlePressQuickView}
                images={productImages}
                product={product}
                customizableLabel={formatMessage(messages.customizable)}
                {...{
                  currentCurrency,
                  id,
                  yotpoId,
                  type,
                  description,
                  isTopProduct,
                  collections,
                  priceRange,
                  customizable,
                  colors
                }}
                labelButton={
                  customizable
                    ? formatMessage(messages.customize)
                    : formatMessage(messages.retailLabel)
                }
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
          {total ? <TotalItems>{`${total} Items`}</TotalItems> : null}
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

  openAddStore = (id: string) => () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(true, id)
  }

  gotToEditDesign = (designId: string) => () => {
    const { history } = this.props
    history.push(`/design-center?designId=${designId}`)
  }
  setShare = (shortId: string, openModal: boolean) => () => {
    const { setCurrentShare } = this.props
    setCurrentShare(shortId, openModal)
  }
  handlePressQuickView = (id: number, yotpoId: string) => {
    const { openQuickView } = this.props
    openQuickView(id, yotpoId)
  }

  openPreview = (designId: string) => () => {
    window.open(`/designs?id=${designId}`)
  }

  openAssistModal = (designId: string) => () => {
    const { openAssist } = this.props
    openAssist(designId)
  }

  // TODO: Handle add to cart
  handleOnPressAddToCart = (id: number) => {}
}

type OwnProps = {
  contentTile?: string
  collectionFilters?: string
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
      contentTile,
      collectionFilters,
      genderFilters,
      categoryFilters,
      sportFilters,
      seasonFilters,
      fitFilters,
      limit,
      orderBy,
      skip,
      designs
    }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          contentTile: contentTile ? contentTile : null,
          collection: collectionFilters ? collectionFilters : null,
          gender: genderFilters ? genderFilters : null,
          category: categoryFilters ? categoryFilters : null,
          sport: sportFilters ? sportFilters : null,
          season: seasonFilters ? seasonFilters : null,
          fitStyle: fitFilters ? fitFilters : null,
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
