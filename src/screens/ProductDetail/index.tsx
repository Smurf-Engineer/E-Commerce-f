/**
 * ProductDetail Screen - Created by cazarez on 12/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
// import Responsive from 'react-responsive'
import zenscroll from 'zenscroll'
import queryString from 'query-string'
import get from 'lodash/get'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import Spin from 'antd/lib/spin'
import * as productDetailActions from './actions'
import messages from './messages'
import { GetProductsByIdQuery } from './data'
import { oneSize } from './constants'
import {
  Container,
  Content,
  TitleRow,
  Title,
  Subtitle,
  ImagePreview,
  ColorWheel,
  ProductData,
  AvailablePrices,
  PricesRow,
  Description,
  HowItFits,
  ModelContainer,
  ButtonsRow,
  StyledButton,
  CompareButton,
  BannerMaterialSection,
  BannerMaterial,
  BuyNowOptions,
  SectionRow,
  SectionTitle,
  SectionTitleContainer,
  SectionButtonsContainer,
  SectionButton,
  SizeRowTitleRow,
  // GetFittedLabel, TODO: hide get fitted for Jakroo phase I
  QuestionSpan, // Downloadtemplate,
  // DownloadTemplateContainer,
  // DownloadAnchor,
  // DownloadImg,
  DetailsList,
  DetailsListItem,
  ProductAvailableColor,
  ColorWrapper,
  TitleSubtitleContainer,
  Loading,
  MobileButton,
  MobileButtonWrapper,
  StyledButtonWrapper,
  MenIcon,
  WomenIcon
} from './styledComponents'
import colorWheel from '../../assets/Colorwheel.svg'
import Modal from '../../components/Common/JakrooModal'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import Render3D from '../../components/Render3D'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
import ImagesSlider from '../../components/ImageSlider'
import AddtoCartButton from '../../components/AddToCartButton'
import {
  Product,
  QueryProps,
  CartItemDetail,
  SelectedType,
  PriceRange,
  ProductColors,
  ProductFile,
  ItemDetailType
} from '../../types/common'
import config from '../../config/index'
import YotpoSection from '../../components/YotpoSection'

// const Desktop = (props: any) => <Responsive {...props} minWidth={768} />
const COMPARABLE_PRODUCTS = ['TOUR', 'NOVA', 'FONDO']
const WHITENAME = 'White'

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
}

interface Data extends QueryProps {
  product: ProductTypes
  match: object
}

interface Props extends RouteComponentProps<any> {
  productId?: number
  intl: InjectedIntl
  data: Data
  showBuyNowSection: boolean
  openFitInfo: boolean
  selectedGender: SelectedType
  selectedSize: SelectedType
  selectedFit: SelectedType
  selectedColor: SelectedType
  loadingModel: boolean
  itemToAddCart: any
  currentCurrency: string
  loadingImage: boolean
  showBuyNowOptionsAction: (show: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (selected: SelectedType) => void
  setSelectedSizeAction: (selected: SelectedType) => void
  setSelectedFitAction: (selected: SelectedType) => void
  setSelectedColorAction: (selected: SelectedType) => void
  setLoadingModel: (loading: boolean) => void
  addItemToCartAction: (item: any) => void
  setLoadingImageAction: (loading: boolean) => void
  resetReducerAction: () => void
}

interface StateProps {
  showDetails: boolean
  showFits: boolean
}

export class ProductDetail extends React.Component<Props, StateProps> {
  state = {
    showDetails: false,
    showFits: false
  }

  componentWillUnmount() {
    const { resetReducerAction } = this.props

    if (config.mainTitle) {
      document.title = config.mainTitle
    }
    resetReducerAction()
  }

  componentDidMount() {
    const {
      data: { product },
      // setSelectedFitAction, // TODO: refactor if needed
      setSelectedColorAction
    } = this.props
    zenscroll.toY(0, 0)
    // const fitStyles = get(product, 'fitStyles', []) as SelectedType[] // TODO: refactor if needed
    const colors = get(product, 'colors', [] as ProductColors[])
    // TODO: refactor if needed
    // if (!fitStyles.length || !fitStyles[0].id) {
    //   setSelectedFitAction({ id: 1, name: 'Standard' })
    // }
    if (colors && colors.length === 1 && colors[0].id) {
      const { id, name } = colors[0]
      setSelectedColorAction({ id, name })
    }
  }

  componentDidUpdate() {
    const { loadingImage, setLoadingImageAction } = this.props
    if (loadingImage) {
      setLoadingImageAction(false)
    }
  }

  render() {
    const {
      intl,
      history,
      // showBuyNowSection,
      selectedSize,
      selectedGender,
      selectedFit,
      selectedColor,
      openFitInfo,
      setLoadingModel,
      loadingImage,
      setLoadingImageAction,
      currentCurrency,
      data: { product, error, loading }
    } = this.props

    const { formatMessage } = intl
    const { showDetails, showFits } = this.state
    if ((!product || error) && !loading) {
      return (
        <Layout {...{ intl, history }}>
          <Loading>
            <FormattedMessage {...messages.productNotFound} />
          </Loading>
        </Layout>
      )
    } else if (loading) {
      return (
        <Layout {...{ intl, history }}>
          <Loading>
            <Spin />
          </Loading>
        </Layout>
      )
    }
    const {
      name,
      type,
      description,
      materials,
      genders,
      images: imagesArray,
      customizable,
      retailMen,
      retailWomen,
      yotpoAverageScore: reviewsScore,
      relatedProducts: products,
      mpn: mpnCode,
      obj,
      mtl,
      bannerMaterials,
      details: detailsOptions,
      mediaFiles,
      colors,
      relatedItemTag,
      fitStyles,
      sizeRange,
      title
    } = product
    const isRetail = retailMen || retailWomen || !customizable
    const moreTag = relatedItemTag.replace(/_/g, ' ')

    let renderPrices

    const {
      location: { search }
    } = this.props
    if (title) {
      document.title = title
    }
    const queryParams = queryString.parse(search)

    const yotpoId = queryParams.modelId || ''

    const gender = queryParams.gender || 0
    const colorId = selectedColor && selectedColor.id

    const searchObject = isRetail ? { colorId } : {}
    if (gender) {
      Object.assign(searchObject, { genderId: parseInt(gender, 10) })
    }
    const genderIndex = findIndex(imagesArray, searchObject)

    let images = null
    let moreImages = []
    if (!!imagesArray) {
      images = imagesArray[genderIndex] || imagesArray[0]
      moreImages = imagesArray.filter(
        ({ genderId: imageGender }) => imageGender !== images.genderId
      )
    }

    let retailPrice

    const currencyPrices = filter(product.priceRange, {
      abbreviation: currentCurrency || config.defaultCurrency
    })

    const symbol = currencyPrices[0].shortName

    renderPrices = currencyPrices.map(
      ({ price, quantity }: any, index: number) => {
        const render = (
          <AvailablePrices key={index}>
            <PriceQuantity {...{ index, price, quantity, symbol }} />
          </AvailablePrices>
        )

        return !isRetail && index >= 4 ? null : render
      }
    )

    const getRetailPrice = find(currencyPrices, {
      quantity: 'Personal'
    }) as PriceRange

    retailPrice = (
      <AvailablePrices>
        <PriceQuantity
          index={1}
          price={getRetailPrice.price}
          quantity={getRetailPrice.quantity}
          {...{ symbol }}
        />
      </AvailablePrices>
    )

    renderPrices = currencyPrices.map(
      ({ price, quantity }: any, index: number) => {
        const render = (
          <AvailablePrices key={index}>
            <PriceQuantity {...{ index, price, quantity, symbol }} />
          </AvailablePrices>
        )

        return !isRetail && index >= 4 ? null : render
      }
    )

    let productInfo
    let availableFits

    const productDetails = (detailsOptions && detailsOptions.split(',')) || ['']
    const details = productDetails.map((productDetail, index) => (
      <DetailsListItem key={index}>{productDetail}</DetailsListItem>
    ))

    const materialsArray = (materials && materials.split('-')) || ['']
    const materialsLit = materialsArray.map((material, index) => (
      <DetailsListItem key={index}>{material}</DetailsListItem>
    ))

    productInfo = (
      <div>
        <ProductInfo
          id="Details"
          title={formatMessage(messages.detailsLabel)}
          showContent={showDetails}
          toggleView={this.toggleProductInfo}
        >
          <DetailsList>
            {details} {materialsLit}
          </DetailsList>
        </ProductInfo>
      </div>
    )

    const availableGenders = genders.map(
      ({ id, name: genderName }: SelectedType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            id={String(id)}
            selected={id === selectedGender.id}
            large={true}
            onClick={this.handleSelectedGender({ id, name: genderName })}
          >
            {genderName}
          </SectionButton>
        </div>
      )
    )

    const availableSizes = sizeRange.map(
      ({ id, name: sizeName }: SelectedType, index: number) => (
        <div key={index}>
          <SectionButton
            oneSize={sizeName === oneSize}
            id={String(id)}
            selected={id === selectedSize.id}
            onClick={this.handleSelectedSize({ id, name: sizeName })}
          >
            {sizeName}
          </SectionButton>
        </div>
      )
    )

    availableFits =
      fitStyles.length &&
      fitStyles[0].id &&
      fitStyles.map(({ id, name: fitName }: SelectedType, index: number) => (
        <div key={index}>
          <SectionButton
            id={id.toString()}
            selected={id === selectedFit.id}
            large={true}
            onClick={this.handleSelectedFit({ id, name: fitName })}
          >
            {fitName}
          </SectionButton>
        </div>
      ))

    const gendersSection = (
      <SectionRow>
        <SectionTitleContainer>
          <SectionTitle>{formatMessage(messages.genderLabel)}</SectionTitle>
        </SectionTitleContainer>
        <SectionButtonsContainer>{availableGenders}</SectionButtonsContainer>
      </SectionRow>
    )

    const availableColors =
      colors &&
      colors.map(
        ({ id, image, name: colorName }: ProductColors, key: number) => (
          <ProductAvailableColor
            withBorder={colorName === WHITENAME}
            selected={id === selectedColor.id}
            src={image}
            onClick={this.handleSelectColor({ id, name: colorName })}
            {...{ key }}
          />
        )
      )

    const colorsSection = (
      <SectionRow>
        <SectionTitle>{formatMessage(messages.ColorsLabel)}</SectionTitle>
        <ColorWrapper>{availableColors}</ColorWrapper>
      </SectionRow>
    )

    const sizeSection = (
      <SectionRow>
        <SizeRowTitleRow>
          <SectionTitleContainer>
            <SectionTitle>{formatMessage(messages.sizeLabel)}</SectionTitle>
            <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
          </SectionTitleContainer>
          {/* TODO: Hide get fitted for Jakroo phase I
            <GetFittedLabel onClick={this.gotoGetFittedPage}>
            {formatMessage(messages.getFittedLabel)}
          </GetFittedLabel> */}
        </SizeRowTitleRow>
        <SectionButtonsContainer>{availableSizes}</SectionButtonsContainer>
      </SectionRow>
    )

    const fitSection = !!availableFits && (
      <SectionRow>
        <SectionTitleContainer>
          <SectionTitle>{formatMessage(messages.fitLabel)}</SectionTitle>
          <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
        </SectionTitleContainer>
        <SectionButtonsContainer>{availableFits}</SectionButtonsContainer>
      </SectionRow>
    )

    const itemDetails = [] as CartItemDetail[]

    const detail: CartItemDetail = {
      fit: selectedFit,
      size: selectedSize,
      gender: selectedGender,
      color: selectedColor,
      quantity: 1
    }
    itemDetails.push(detail)

    const itemToAdd = Object.assign({}, { product }, { itemDetails })

    const addToCartRow = (
      <ButtonsRow>
        <AddtoCartButton
          onClick={this.validateAddtoCart}
          label={formatMessage(messages.addToCartButtonLabel)}
          item={itemToAdd}
          itemProdPage={true}
        />
      </ButtonsRow>
    )

    const collectionSelection = (
      <BuyNowOptions>
        {gendersSection}
        {colorsSection}
        {sizeSection}
        {fitSection}
        {addToCartRow}
      </BuyNowOptions>
    )

    const renderCompareButton = (
      <CompareButton onClick={this.gotoCompare}>
        {formatMessage(messages.compareLabe)}
      </CompareButton>
    )
    let menAvailable = false
    let womenAvailable = false
    if (genders) {
      genders.forEach((genderItem: ItemDetailType) => {
        if (genderItem.name === 'Men') {
          menAvailable = true
        }
        if (genderItem.name === 'Women') {
          womenAvailable = true
        }
      })
    }
    const validateShowCompare = COMPARABLE_PRODUCTS.includes(name)

    return (
      <Layout {...{ history, intl }}>
        <Container>
          {product && (
            <Content>
              <ImagePreview>
                {loading ? (
                  <Loading>
                    <Spin />
                  </Loading>
                ) : (
                  <div>
                    {customizable && obj && mtl ? (
                      <ModelContainer>
                        <Render3D
                          customProduct={true}
                          designId={0}
                          phoneView={true}
                          textColor="white"
                          isProduct={true}
                          {...{ product }}
                        />
                        <HowItFits onClick={this.toggleFitsModal(true)}>
                          <FormattedMessage {...messages.howItFits} />
                        </HowItFits>
                        {showFits && (
                          <Modal
                            open={showFits}
                            requestClose={this.toggleFitsModal(false)}
                            width={'90%'}
                            style={{ maxWidth: '704px' }}
                            withLogo={false}
                          >
                            <ImagesSlider
                              onLoadModel={setLoadingModel}
                              squareArrows={true}
                              leftSide={true}
                              {...{
                                images,
                                moreImages,
                                loadingImage,
                                setLoadingImageAction
                              }}
                            />
                          </Modal>
                        )}
                      </ModelContainer>
                    ) : (
                      <ImagesSlider
                        onLoadModel={setLoadingModel}
                        squareArrows={true}
                        {...{
                          images,
                          moreImages,
                          loadingImage,
                          setLoadingImageAction
                        }}
                      />
                    )}
                  </div>
                )}
                {/* {!isRetail &&
                  template && (
                    <Desktop>
                      <DownloadTemplateContainer>
                        <DownloadAnchor href={template}>
                          <DownloadImg src={DownloadIcon} />
                          <Downloadtemplate>
                            {formatMessage(messages.downloadLabel)}
                          </Downloadtemplate>
                        </DownloadAnchor>
                      </DownloadTemplateContainer>
                    </Desktop>
                  )} */}
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    {/* TODO: Use unique name when "isRetail" */}
                    <Title>
                      {name}
                      {menAvailable && <MenIcon type="man" />}
                      {womenAvailable && <WomenIcon type="woman" />}
                    </Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                    <Subtitle>{`MPN: ${mpnCode}`}</Subtitle>
                  </TitleSubtitleContainer>
                  {validateShowCompare && renderCompareButton}
                </TitleRow>
                <PricesRow>{isRetail ? retailPrice : renderPrices}</PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  rating={get(reviewsScore, 'averageScore', 0)}
                  totalReviews={get(reviewsScore, 'total', 0)}
                />
                {!isRetail && (
                  <MobileButtonWrapper>
                    <MobileButton onClick={this.gotoCustomize}>
                      <ColorWheel src={colorWheel} />
                      {formatMessage(messages.customizeLabel)}
                    </MobileButton>
                  </MobileButtonWrapper>
                )}
                <Description>{description}</Description>
                <BannerMaterialSection>
                  {bannerMaterials.map((banner: ProductFile) => (
                    <BannerMaterial src={banner.url} />
                  ))}
                </BannerMaterialSection>
                <ButtonsRow>
                  {!isRetail && (
                    <StyledButtonWrapper>
                      <StyledButton onClick={this.gotoCustomize}>
                        <ColorWheel src={colorWheel} />
                        {formatMessage(messages.customizeLabel)}
                      </StyledButton>
                    </StyledButtonWrapper>
                  )}
                </ButtonsRow>
                {isRetail && collectionSelection}
                {productInfo}
              </ProductData>
              <FitInfo
                open={openFitInfo}
                requestClose={this.closeFitInfoModal}
                {...{ product, history, formatMessage }}
              />
            </Content>
          )}
          <YotpoSection
            {...{
              yotpoId,
              mediaFiles,
              products,
              moreTag,
              name,
              history,
              formatMessage,
              currentCurrency
            }}
          />
        </Container>
      </Layout>
    )
  }
  toggleFitsModal = (showFits: boolean) => () => {
    this.setState({ showFits })
  }
  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  toggleBuyNowOptions = () => {
    const { showBuyNowOptionsAction, showBuyNowSection } = this.props
    showBuyNowOptionsAction(!showBuyNowSection)
  }

  handleSelectedGender = (gender: SelectedType) => () => {
    const { setSelectedGenderAction } = this.props
    setSelectedGenderAction(gender)
  }

  handleSelectedSize = (size: SelectedType) => () => {
    const { setSelectedSizeAction } = this.props
    setSelectedSizeAction(size)
  }

  handleSelectedFit = (fitStyle: SelectedType) => () => {
    const { setSelectedFitAction } = this.props
    setSelectedFitAction(fitStyle)
  }

  handleOpenFitInfo = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(true)
  }

  gotoCustomize = () => {
    const {
      history,
      data: { product }
    } = this.props
    const productId = get(product, 'id')
    history.push(`/design-center?id=${productId}`)
  }

  gotoGetFittedPage = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  gotoCompare = () => {
    const { history } = this.props
    history.push('/jersey-comparison')
  }

  validateAddtoCart = () => {
    const {
      selectedSize,
      selectedColor,
      selectedFit,
      data: { product }
    } = this.props
    const fitStyles = get(product, 'fitStyles', []) as SelectedType[]
    if (fitStyles.length && fitStyles[0].id) {
      return (
        selectedSize.id >= 0 &&
        selectedFit &&
        selectedFit.id &&
        selectedColor.id
      )
    }
    return selectedSize.id >= 0 && selectedColor.id
  }

  handleSelectColor = (color: SelectedType) => () => {
    const { setSelectedColorAction } = this.props
    setSelectedColorAction(color)
  }

  closeFitInfoModal = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(false)
  }
}

const mapStateToProps = (state: any) => {
  const productDetail = state.get('productDetail').toJS()
  const menu = state.get('menu').toJS()
  const menuSports = state.get('menuSports').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...productDetail, ...menu, ...menuSports, ...langProps }
}

type OwnProps = {
  productId?: number
  match?: any
  location?: any
}

const ProductDetailEnhance = compose(
  injectIntl,
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          id: queryParams ? queryParams.id : null
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  connect(
    mapStateToProps,
    { ...productDetailActions }
  )
)(ProductDetail)

export default ProductDetailEnhance
