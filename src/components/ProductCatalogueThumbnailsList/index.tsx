/**
 * ProductCatalogueThumbnailsList Component - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import includes from 'lodash/includes'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu from 'antd/lib/menu'
import Modal from 'antd/lib/modal'
import messages from './messages'
import { GetProductsQuery, profileSettingsQuery } from './data'
import ProductThumbnail from '../ProductThumbnail'
import SelectedProducts from '../../screens/IntakeForm/SelectedProducts'
import FooterThumbnailLocker from '../FooterThumbnailLocker'
import AddToCartButton from '../AddToCartButton'
import {
  QueryProps,
  ProductType,
  DesignType,
  ClickParam,
  Product,
  IProfileSettings,
  User
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
  ButtonsContainer,
  CopyButton
} from './styledComponents'
import downArrowIcon from '../../assets/downarrow.svg'
import get from 'lodash/get'
import { APPROVED, DATE_FORMAT } from '../../constants'
import moment from 'moment'

const { warning } = Modal

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface Data extends QueryProps {
  products: ProductType
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number, yotpoId: string, gender?: number, hideSliderButtons?: boolean) => void
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
  profileData: ProfileData
  isEdit?: boolean
  makeCopy: (shortId: string) => void
  setDesignSelected: (shortId: string) => void
  changeQuantity: (key: number) => void
  openAddToTeamStoreModalAction: (open: boolean, id: string) => void
  setCurrentShare: (savedDesignId: string, openShareModal: boolean) => void
  onPressPrivate?: (id: string, isPrivate: boolean) => void
  onPressDelete?: (id: string, name: string) => void
  onPressRename?: (id: string, name: string) => void
  withoutPadding?: boolean
  currentCurrency: string
  genderFilters: string
  selectProduct?: boolean
  selectedItems?: Product[]
  fromIntakeForm?: boolean
  adminProject?: boolean
  searchText?: string
  handleCheckChange: (product: Product, checked: boolean, key?: number) => void
}

export class ProductCatalogueThumbnailsList extends React.Component<Props, {}> {
  setSeen = () => {
    localStorage.setItem('hideTooltips', 'true')
    setTimeout(() => this.forceUpdate(), 1500)
  }
  render() {
    const {
      formatMessage,
      sortByLabel,
      currentPage,
      limit,
      handleChangePage,
      handleOrderBy,
      profileData,
      fromIntakeForm,
      adminProject,
      data,
      isEdit,
      designs,
      changeQuantity,
      onPressPrivate = () => { },
      onPressDelete = () => { },
      onPressRename = () => { },
      withoutPadding,
      currentCurrency,
      genderFilters,
      previewOnly = false,
      selectProduct,
      selectedItems = [],
      handleCheckChange
    } = this.props

    let thumbnailsList
    let total = ''
    let sortOptions = null
    let loading = false
    let renderThumbnailList = null
    let renderLoading = null
    const hideTooltips = localStorage.getItem('hideTooltips')
    const showTooltips = !hideTooltips || hideTooltips !== 'true'
    const { status, comission: resellerComission, inline } = get(profileData, 'profileData.reseller', {})
    const isReseller = status === APPROVED
    if (designs) {
      thumbnailsList = designs.map(
        (
          {
            name,
            product: productData,
            image,
            createdAt,
            shortId,
            shared,
            code,
            proDesign,
            outputSvg,
            outputPng,
            proCertified,
            qualityWarning
          },
          index
        ) => {
          let product = productData
          if (isReseller) {
            product = this.calculateReseller(product, resellerComission)
          }
          const selectedProductIds = selectedItems.map((sectedProduct: Product) => sectedProduct.id)
          const isSelected = includes(selectedProductIds, product.id)

          const addToCartButton = product.active || product.onlyProDesign ? (
            <AddToCartButton
              label={formatMessage(messages.addToCart)}
              renderForThumbnail={true}
              item={{ product }}
              {...{ formatMessage, proCertified, proDesign }}
              withoutTop={true}
              designId={shortId}
              designName={name}
              designImage={image}
              designCode={code}
              myLockerList={true}
            />
          ) : null
          return (
            <ThumbnailListItem index={index + 1} key={index}>
              <ProductThumbnail
                {...{
                  currentCurrency,
                  fromIntakeForm,
                  handleCheckChange,
                  isSelected,
                  proDesign,
                  showTooltips,
                  formatMessage,
                  proCertified,
                  qualityWarning
                }}
                id={product.id}
                setSeen={this.setSeen}
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
                    showDelete={!proDesign}
                    description={`${product.type} ${product.description}`}
                    date={createdAt}
                    setShare={this.setShare(shortId as string, true)}
                    canShare={!previewOnly && shared}
                  />
                }
                labelButton={
                  <ButtonsContainer>
                    {!previewOnly ? (
                      <div>
                        {!proDesign &&
                          <ButtonContainer>
                            <CopyButton onClick={this.handleMakeCopy(shortId)}>
                              {formatMessage(messages.makeCopy)}
                            </CopyButton>
                          </ButtonContainer>
                        }
                        {addToCartButton}
                        <ButtonContainer maxMargin={true}>
                          <ActionButton
                            onClick={(
                              (product.id === 262 && 
                                moment(createdAt, DATE_FORMAT).isBefore('02/23/2022')) || 
                              (product.id === 265 && 
                                moment(createdAt, DATE_FORMAT).isBefore('02/22/2022'))) ? 
                              this.promptNotEditable : this.gotToEditDesign(shortId || '')
                            }
                          >
                            {formatMessage(
                              !proDesign ? messages.edit : messages.preview
                            )}
                          </ActionButton>
                        </ButtonContainer>
                        {(product.active || product.onlyProDesign) &&
                          <ButtonContainer maxMargin={true}>
                            <ActionButton onClick={this.openAddStore(shortId)}>
                              {formatMessage(messages.addToStore)}
                            </ActionButton>
                          </ButtonContainer>
                        }
                      </div>
                    ) : (
                      <>
                        <ButtonContainer>
                          <CopyButton onClick={this.handleMakeCopy(shortId)}>
                            {formatMessage(messages.makeCopy)}
                          </CopyButton>
                        </ButtonContainer>
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
        thumbnailsList = catalogue.map((productData, index) => {
          let product = productData
          if (isReseller) {
            product = this.calculateReseller(product, productData.customizable ? resellerComission : inline)
          }
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
          const selectedProductIds = selectedItems.map((sectedProduct: Product) => sectedProduct.id)
          const isSelected = includes(selectedProductIds, product.id)
          return (
            <ThumbnailListItem index={index + 1} key={index}>
              <ProductThumbnail
                onPressCustomize={this.gotoDesignCenter}
                onPressQuickView={this.handlePressQuickView}
                images={productImages}
                product={product}
                setSeen={this.setSeen}
                customizableLabel={formatMessage(messages.customizable)}
                selectedIndex={isSelected && selectedItems.findIndex((item) => item === product.id) + 1}
                {...{
                  currentCurrency,
                  id,
                  fromIntakeForm,
                  yotpoId,
                  type,
                  showTooltips,
                  formatMessage,
                  description,
                  isTopProduct,
                  collections,
                  priceRange,
                  customizable,
                  colors,
                  selectProduct,
                  handleCheckChange,
                  isSelected
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
        <SelectedProducts
          {...{ changeQuantity, fromIntakeForm, adminProject, isEdit }}
          products={selectedItems}
          title={formatMessage(messages.selectedProducts)}
          handleDeleteProduct={handleCheckChange}
        />
        <HeadRow withoutPadding={!!withoutPadding}>
          {total ? <TotalItems>{`${total} Items`}</TotalItems> : null}
          {sortOptions && !!sortByLabel.length && (
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

  calculateReseller = (productData: Product, comission = 0) => {
    let product = productData
    const originalPriceRange = get(productData, 'priceRange', [])
    const purchasePrices = originalPriceRange.map((priceItem) => {
      const price = (priceItem.price * (1 - (comission / 100))).toFixed(2)
      return { ...priceItem, price }
    })
    product = { ...product, priceRange: purchasePrices }
    return product
  }

  gotoDesignCenter = (id: string) => {
    const { history } = this.props
    history.push(`/design-center?id=${id}`)
  }

  openAddStore = (id: string) => () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(true, id)
  }

  promptNotEditable = () => {
    warning({
      title: <strong>EDITING NOT AVAILABLE</strong>,
      width: 494,
      // tslint:disable-next-line: max-line-length
      content: 'This product has been updated and editing capabilities have been removed. Not to worry! Your design can still be added to your cart and ordered, but if you require changes to your design please contact our designers for assistance through the ProAssist chat M-F 6am-6pm PST.',
    })
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
    const { openQuickView, fromIntakeForm } = this.props
    !fromIntakeForm ? openQuickView(id, yotpoId) : openQuickView(id, yotpoId, null, true)
  }

  openPreview = (designId: string) => () => {
    window.open(`/designs?id=${designId}`)
  }

  handleMakeCopy = (designId: string) => () => {
    const { makeCopy } = this.props
    makeCopy(designId)
  }

  openAssistModal = (designId: string) => () => {
    const { setDesignSelected } = this.props
    setDesignSelected(designId)
  }

  // TODO: Handle add to cart
  handleOnPressAddToCart = (id: number) => { }
}

type OwnProps = {
  contentTile?: string
  collectionFilters?: string
  genderFilters?: string
  sportFilters?: string
  user?: User
  categoryFilters?: string
  seasonFilters?: string
  fitFilters?: string
  temperatureFilters?: string
  limit?: number
  orderBy?: string
  skip?: number
  isAdmin?: boolean
  designs?: DesignType[]
  selectProduct?: boolean
  fromIntakeForm?: boolean
  searchText?: string
}

const ThumbnailsListEnhance = compose(
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => ({
      fetchPolicy: 'network-only',
      skip: !user
    }),
    name: 'profileData',
  }),
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
      isAdmin,
      orderBy,
      skip,
      fromIntakeForm,
      designs,
      selectProduct,
      searchText
    }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          contentTile: contentTile ? contentTile : null,
          collection: selectProduct ? 1 : ((collectionFilters || contentTile) ? collectionFilters : 1),
          gender: genderFilters ? genderFilters : null,
          category: categoryFilters ? categoryFilters : null,
          sport: sportFilters ? sportFilters : null,
          season: seasonFilters ? seasonFilters : null,
          fitStyle: fitFilters ? fitFilters : null,
          limit: limit ? limit : null,
          order: orderBy ? orderBy : null,
          offset: skip ? skip : null,
          searchText,
          onlyActive: !isAdmin,
          isAdminIntake: isAdmin && fromIntakeForm
        },
        skip: !!designs
      }
    }
  })
)(ProductCatalogueThumbnailsList)

export default ThumbnailsListEnhance
