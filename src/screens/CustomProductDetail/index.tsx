/**
 * CustomProductDetail Screen - Created by jorge on 03/08/18.
 */
import * as React from 'react'
import { injectIntl, FormattedMessage, InjectedIntl } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import * as customProductDetailActions from './actions'
import messages from './messages'
import { GetDesignByIdQuery, designsQuery } from './data'
import {
  Container,
  Content,
  ImagePreview,
  ProductData,
  TitleRow,
  TitleSubtitleContainer,
  Title,
  Subtitle,
  EditDesignButton,
  PricesRow,
  AvailablePrices,
  Description,
  AvailableLabel,
  BuyNowOptions,
  SectionRow,
  SectionTitleContainer,
  SectionTitle,
  SectionButtonsContainer,
  SectionButton,
  SizeRowTitleRow,
  QuestionSpan,
  RelatedProductsContainer,
  ReviewsHeader,
  ButtonsRow,
  DetailsList,
  DetailsListItem,
  PrivateContainer,
  PrivateTitle,
  PrivateSubtitle
} from './styledComponents'
import Layout from '../../components/MainLayout'
import ImagesSlider from '../../components/ImageSlider'
import {
  QueryProps,
  DesignType,
  Filter,
  SelectedType,
  ItemDetailType,
  FitStyle,
  CartItemDetail,
  Product
} from '../../types/common'
import Render3D from '../../components/Render3D'
import PriceQuantity from '../../components/PriceQuantity'
import Ratings from '../../components/Ratings'
import FitInfo from '../../components/FitInfo'
import AddtoCartButton from '../../components/AddToCartButton'
import RelatedProducts from '../../components/RelatedProducts'
import ProductInfo from '../../components/ProductInfo'
import YotpoReviews from '../../components/YotpoReviews'
import withLoading from '../../components/WithLoading'
import config from '../../config/index'

const MAX_AMOUNT_PRICES = 4

interface MyDesignsData extends QueryProps {
  myDesigns: { designs: DesignType[] }
}

interface Data extends QueryProps {
  design: DesignType
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  designsData: MyDesignsData
  selectedGender: SelectedType
  selectedSize: SelectedType
  selectedFit: SelectedType
  openFitInfo: boolean
  showDetails: boolean
  showSpecs: boolean
  currentCurrency: string
  setLoadingModel: (loading: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (selected: SelectedType) => void
  setSelectedSizeAction: (selected: SelectedType) => void
  setSelectedFitAction: (selected: SelectedType) => void
  addItemToCartAction: (item: any) => void
  setShowDetailsAction: (show: boolean) => void
  setShowSpecsAction: (show: boolean) => void
  resetDataAction: () => void
}

export class CustomProductDetail extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const {
      intl,
      history,
      location: { search },
      setLoadingModel,
      data: { design, error },
      designsData: { myDesigns },
      selectedGender,
      selectedSize,
      selectedFit,
      openFitInfo,
      showDetails,
      showSpecs,
      currentCurrency
    } = this.props

    const { formatMessage } = intl

    const queryParams = queryString.parse(search)

    const shared = get(design, 'shared', false)
    const shortId = get(design, 'shortId', '')

    const designs = get(myDesigns, 'designs', [] as DesignType[])

    const ownedDesign = designs && designs.find(d => d.shortId === shortId)

    if (error || (!shared && !ownedDesign)) {
      return (
        <Layout {...{ history, intl }}>
          <PrivateContainer>
            <div>
              <PrivateTitle>{formatMessage(messages.oops)}</PrivateTitle>
              <PrivateSubtitle>
                {formatMessage(messages.seemsPrivate)}
              </PrivateSubtitle>
            </div>
          </PrivateContainer>
        </Layout>
      )
    }

    const designId = queryParams.id
    const designName = get(design, 'name', '')
    const designImage = get(design, 'image')
    const designCode = get(design, 'code', '')
    const product = get(design, 'product', null)

    const images = get(product, 'images', [])
    const genderId = get(product, 'genderId', 0)
    const genders = get(product, 'genders', [] as Filter[])
    const type = get(product, 'type', '')
    const yotpoAverageScore = get(product, 'yotpoAverageScore')
    const description = get(product, 'description')
    const yotpoId = get(product, 'yotpoId', '')
    const sizeRange = get(product, 'sizeRange', [] as ItemDetailType[])
    const fitStyles = get(product, 'fitStyles', [] as FitStyle[])
    const details = get(product, 'details', '')
    const products = get(product, 'relatedProducts', [] as Product[])
    const intendedUse = get(product, 'intendedUse', '')
    const temperatures = get(product, 'temperatures', '')
    const materials = get(product, 'materials', '')

    const rating = get(yotpoAverageScore, 'averageScore', 0)
    const totalReviews = get(yotpoAverageScore, 'total', 0)

    const genderIndex = findIndex(images, { genderId })

    const thumbnails = images && (images[genderIndex] || images[0])

    const currencyPrices =
      product &&
      filter(product.priceRange, {
        abbreviation: currentCurrency || config.defaultCurrency
      })

    const renderPrices =
      currencyPrices &&
      currencyPrices.length &&
      currencyPrices.map(
        ({ price, quantity }, index: number) =>
          index < MAX_AMOUNT_PRICES && (
            <AvailablePrices key={index}>
              <PriceQuantity {...{ index, price, quantity }} />
            </AvailablePrices>
          )
      )

    const maleGender = get(genders, '0.name', '')
    const femaleGender = get(genders, '1.name', '')

    const genderMessage =
      femaleGender && maleGender
        ? formatMessage(messages.unisexGenderLabel)
        : formatMessage(messages.oneGenderLabel)

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

    const availableSizes =
      sizeRange &&
      sizeRange.map(({ id, name: sizeName }: SelectedType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            id={String(id)}
            selected={id === selectedSize.id}
            onClick={this.handleSelectedSize({ id, name: sizeName })}
          >
            {sizeName}
          </SectionButton>
        </div>
      ))

    const availableFits = (fitStyles &&
      fitStyles.map(
        ({ id, name: fitName }: SelectedType, index: number) =>
          id && (
            <div key={index}>
              <SectionButton
                id={String(id)}
                selected={id === selectedFit.id}
                large={true}
                onClick={this.handleSelectedFit({ id, name: fitName })}
              >
                {fitName}
              </SectionButton>
            </div>
          )
      )) || (
      <SectionButton
        id={'1'}
        selected={1 === selectedFit.id}
        onClick={this.handleSelectedFit({ id: 1, name: 'Standard' })}
      >
        {formatMessage(messages.standard)}
      </SectionButton>
    )

    const gendersSection = (
      <SectionRow>
        <SectionTitleContainer>
          <SectionTitle>{formatMessage(messages.gender)}</SectionTitle>
        </SectionTitleContainer>
        <SectionButtonsContainer>{availableGenders}</SectionButtonsContainer>
      </SectionRow>
    )

    const sizeSection = (
      <SectionRow>
        <SizeRowTitleRow>
          <SectionTitleContainer>
            <SectionTitle>{formatMessage(messages.size)}</SectionTitle>
            <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
          </SectionTitleContainer>
        </SizeRowTitleRow>
        <SectionButtonsContainer>{availableSizes}</SectionButtonsContainer>
      </SectionRow>
    )

    const fitSection = !isEmpty(fitStyles) &&
      fitStyles[0].id && (
        <SectionRow>
          <SectionTitleContainer>
            <SectionTitle>{formatMessage(messages.fit)}</SectionTitle>
            <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
          </SectionTitleContainer>
          <SectionButtonsContainer>{availableFits}</SectionButtonsContainer>
        </SectionRow>
      )

    const itemDetails = [] as CartItemDetail[]

    if (product) {
      const detail: CartItemDetail = {
        fit: selectedFit,
        size: selectedSize,
        gender: selectedGender,
        quantity: 1
      }
      itemDetails.push(detail)
    }

    const itemToAdd = Object.assign({}, { product }, { itemDetails })

    const addToCartRow = (
      <ButtonsRow>
        <AddtoCartButton
          onClick={this.validateAddtoCart}
          label={formatMessage(messages.addToCartButton)}
          item={itemToAdd}
          itemProdPage={true}
          withoutTop={true}
          {...{ designId, designName, designImage }}
        />
      </ButtonsRow>
    )

    const collectionSelection = (
      <BuyNowOptions>
        {gendersSection}
        {sizeSection}
        {fitSection}
        {addToCartRow}
      </BuyNowOptions>
    )

    const productDetails = (details && details.split(',')) || ['']

    const detailsItems = productDetails.map((detail, key) => (
      <DetailsListItem {...{ key }}>{detail}</DetailsListItem>
    ))

    const productInfo = (
      <div>
        <ProductInfo
          id="Details"
          title={formatMessage(messages.description)}
          showContent={showDetails}
          toggleView={this.toggleProductInfo}
        >
          <DetailsList>{detailsItems}</DetailsList>
        </ProductInfo>
        <ProductInfo
          id="Specs"
          title={formatMessage(messages.specs)}
          showContent={showSpecs}
          toggleView={this.toggleProductInfo}
        >
          <p>
            {intendedUse &&
              `${formatMessage(messages.intendedUse)}: ${intendedUse}`}
          </p>
          <p>
            {temperatures &&
              `${formatMessage(messages.temperatures)}: ${temperatures}`}
          </p>
          <p>
            {materials && `${formatMessage(messages.materials)}: ${materials}`}
          </p>
        </ProductInfo>
      </div>
    )

    return (
      <Layout {...{ history, intl }}>
        <Container>
          {design && (
            <Content>
              <ImagePreview>
                <ImagesSlider
                  onLoadModel={setLoadingModel}
                  threeDmodel={
                    <Render3D customProduct={true} {...{ designId }} />
                  }
                  customProduct={true}
                  customImage={designImage}
                  images={thumbnails}
                />
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    <Title>{designName}</Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                    {designCode && <Subtitle>{`MPN: ${designCode}`}</Subtitle>}
                  </TitleSubtitleContainer>
                  <EditDesignButton onClick={this.gotToEditDesign(designId)}>
                    {formatMessage(messages.editDesign)}
                  </EditDesignButton>
                </TitleRow>
                <PricesRow>{renderPrices}</PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  {...{ rating, totalReviews }}
                />
                <Description>{description}</Description>
                <AvailableLabel>{genderMessage}</AvailableLabel>
                {collectionSelection}
                {productInfo}
              </ProductData>
              <FitInfo
                open={openFitInfo}
                requestClose={this.closeFitInfoModal}
                {...{ product, history, formatMessage }}
              />
            </Content>
          )}
          {product &&
            !!products.length && (
              <RelatedProductsContainer>
                <RelatedProducts
                  currentCurrency={currentCurrency || config.defaultCurrency}
                  {...{ products, history, formatMessage }}
                />
              </RelatedProductsContainer>
            )}
          <ReviewsHeader>
            <FormattedMessage {...messages.reviews} />
          </ReviewsHeader>
          <YotpoReviews {...{ yotpoId }} />
        </Container>
      </Layout>
    )
  }

  handleSelectedFit = (fitStyle: SelectedType) => () => {
    const { setSelectedFitAction } = this.props
    setSelectedFitAction(fitStyle)
  }

  handleSelectedSize = (size: SelectedType) => () => {
    const { setSelectedSizeAction } = this.props
    setSelectedSizeAction(size)
  }

  handleSelectedGender = (gender: SelectedType) => () => {
    const { setSelectedGenderAction } = this.props
    setSelectedGenderAction(gender)
  }

  gotToEditDesign = (designId: string) => () => {
    const { history } = this.props
    history.push(`/design-center?designId=${designId}`)
  }

  handleOpenFitInfo = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(true)
  }

  closeFitInfoModal = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(false)
  }

  validateAddtoCart = () => {
    const { selectedSize, selectedFit, selectedGender } = this.props
    return selectedSize.id && selectedFit.id && selectedGender.id
  }

  toggleProductInfo = (id: string) => {
    const {
      showDetails,
      showSpecs,
      setShowDetailsAction,
      setShowSpecsAction
    } = this.props

    id === 'Details'
      ? setShowDetailsAction(!showDetails)
      : setShowSpecsAction(!showSpecs)
  }
}

const mapStateToProps = (state: any) => {
  const productDetail = state.get('customProductDetail').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...productDetail, ...langProps }
}

type OwnProps = {
  location?: any
}

const CustomProductDetailEnhance = compose(
  injectIntl,
  graphql<any>(designsQuery, {
    options: () => {
      return {
        variables: {
          limit: 12,
          offset: 0
        },
        fetchPolicy: 'network-only'
      }
    },
    name: 'designsData'
  }),
  graphql<Data>(GetDesignByIdQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          designId: queryParams ? queryParams.id : null
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withLoading,
  connect(
    mapStateToProps,
    { ...customProductDetailActions }
  )
)(CustomProductDetail)

export default CustomProductDetailEnhance
