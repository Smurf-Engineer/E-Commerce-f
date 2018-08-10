/**
 * CustomProductDetail Screen - Created by jorge on 03/08/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import filter from 'lodash/filter'
import * as customProductDetailActions from './actions'
import messages from './messages'
import { GetDesignByIdQuery } from './data'
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
  ButtonsRow,
  DetailsList,
  DetailsListItem
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
  CartItemDetail
} from '../../types/common'
import ThreeDRender from '../TeamstoreProductPage/Product3D'
import PriceQuantity from '../../components/PriceQuantity'
import Ratings from '../../components/Ratings'
import FitInfo from '../../components/FitInfo'
import AddtoCartButton from '../../components/AddToCartButton'
import ProductInfo from '../../components/ProductInfo'
import YotpoReviews from '../../components/YotpoReviews'
import config from '../../config/index'

interface Data extends QueryProps {
  design: DesignType
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
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
}

export class CustomProductDetail extends React.Component<Props, {}> {
  render() {
    const {
      intl,
      history,
      location: { search },
      setLoadingModel,
      data: { design },
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

    const designId = queryParams.id
    const designName = get(design, 'name', '')
    const designImage = get(design, 'image')
    const colors = get(design, 'colors')
    const svgUrl = get(design, 'svg', '')
    const product = get(design, 'product', null)

    const productId = get(product, 'productId')
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
          index < 4 && (
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
      fitStyles.map(({ id, name: fitName }: SelectedType, index: number) => (
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
      ))) || (
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

    const fitSection = (
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
                  threeDmodel={<ThreeDRender {...{ colors, svgUrl }} />}
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
                {...{ productId, history }}
              />
            </Content>
          )}
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
  graphql<Data>(GetDesignByIdQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          designId: queryParams ? queryParams.id : null
        }
      }
    }
  }),
  connect(
    mapStateToProps,
    { ...customProductDetailActions }
  )
)(CustomProductDetail)

export default CustomProductDetailEnhance
