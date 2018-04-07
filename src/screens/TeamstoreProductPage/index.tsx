/**
 * TeamstoreProductPage Screen - Created by cazarez on 06/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import map from 'lodash/map'
import queryString from 'query-string'
import Message from 'antd/lib/message'
// import { ReducersObject } from '../../store/rootReducer'
import { GetProductsByIdQuery } from './data'
import * as teamstoreProductPageActions from './actions'
import messages from './messages'
import {
  Container,
  Content,
  TitleRow,
  Title,
  Subtitle,
  ImagePreview,
  ProductData,
  AvailablePrices,
  PricesRow,
  Description,
  ButtonsRow,
  StyledButton,
  BuyNowOptions,
  SectionRow,
  SectionTitle,
  SectionTitleContainer,
  SectionButtonsContainer,
  SectionButton,
  SizeRowTitleRow,
  GetFittedLabel,
  QuestionSpan,
  JakrooWidgetsTitle,
  AvailableLabel,
  DetailsList,
  DetailsListItem,
  TitleSubtitleContainer,
  OrdersInfo,
  PricesContainer,
  CurrentOrder,
  EstimatePrice,
  SpanNumber,
  TeamBanner
} from './styledComponents'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
// import ImagesSlider from '../../components/ImageSlider'
import YotpoReviews from '../../components/YotpoReviews'
import ThreeDRender from './Product3D'
import { Product, QueryProps } from '../../types/common'
// import DownloadIcon from '../../assets/download.svg'
// import ChessColors from '../../assets/chess-colors.svg'
// import RedColor from '../../assets/colorred.svg'
import BannerImage from '../../assets/banner.jpg'
// import BackgroundImg from '../../assets/FE1I5781.jpg'

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
}

interface Data extends QueryProps {
  product: ProductTypes
}

interface Props extends RouteComponentProps<any> {
  productId?: number
  intl: InjectedIntl
  data: Data
  showBuyNowSection: boolean
  openFitInfo: boolean
  selectedGender: number
  selectedSize: number
  selectedFit: number
  loadingModel: boolean
  showBuyNowOptionsAction: (show: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (selected: string) => void
  setSelectedSizeAction: (selected: number) => void
  setSelectedFitAction: (selected: number) => void
  setLoadingModel: (loading: boolean) => void
}

interface StateProps {
  showDetails: boolean
  showSpecs: boolean
}

// TODO: Remove sizes
const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL']

export class TeamstoreProductPage extends React.Component<Props, StateProps> {
  state = {
    showDetails: true,
    showSpecs: true
  }
  render() {
    const {
      intl,
      history,
      selectedSize,
      selectedFit,
      openFitInfo,
      // setLoadingModel,
      data: { product }
    } = this.props
    const { formatMessage } = intl
    const { showDetails, showSpecs } = this.state
    const productId = get(product, 'id')
    const name = get(product, 'name', '')
    const type = get(product, 'type', '')
    const description = get(product, 'description', '')
    const intendedUse = get(product, 'intendedUse', '')
    const temperatures = get(product, 'temperatures', '')
    const materials = get(product, 'materials', '')
    const genders = get(product, 'genders', '')

    const reviewsScore = get(product, 'yotpoAverageScore', {})

    const maleGender = get(genders, '0.gender', '')
    const femaleGender = get(genders, '1.gender', '')
    const genderMessage =
      femaleGender && maleGender
        ? formatMessage(messages.unisexGenderLabel)
        : formatMessage(messages.oneGenderLabel)
    let renderPrices
    const fitStyles = get(product, 'fitStyles', [])

    if (product) {
      renderPrices = product.priceRange.map((item: any, index: number) => (
        <AvailablePrices key={index}>
          <PriceQuantity
            price={item.price}
            quantity={item.quantity}
            {...{ index }}
          />
        </AvailablePrices>
      ))
    }

    let productInfo
    if (product) {
      const productDetails =
        product.details !== null ? product.details.split(',') : ['']
      const details = productDetails.map((detail, index) => (
        <DetailsListItem key={index}>{detail}</DetailsListItem>
      ))

      productInfo = (
        <div>
          <ProductInfo
            id="Details"
            title={formatMessage(messages.detailsLabel)}
            showContent={showDetails}
            toggleView={this.toggleProductInfo}
          >
            <DetailsList>{details}</DetailsList>
          </ProductInfo>
          <ProductInfo
            id="Specs"
            title={formatMessage(messages.specsLabel)}
            showContent={showSpecs}
            toggleView={this.toggleProductInfo}
          >
            <p>
              {intendedUse
                ? `${formatMessage(messages.intendedUseLabel)}: ${intendedUse}`
                : null}
            </p>
            <p>
              {temperatures
                ? `${formatMessage(
                    messages.temperaturesLabel
                  )}: ${temperatures}`
                : null}
            </p>
            <p>
              {materials
                ? `${formatMessage(messages.materialsLabel)}: ${materials}`
                : null}
            </p>
          </ProductInfo>
        </div>
      )
    }

    const availableSizes = sizes.map((size, index) => (
      <div key={index}>
        <SectionButton
          id={index.toString()}
          selected={index === selectedSize}
          onClick={this.handleSelectedSize}
        >
          {size}
        </SectionButton>
      </div>
    ))

    let availableFits
    if (product) {
      availableFits = fitStyles[0].id ? (
        map(fitStyles, (fit: any, index: number) => (
          <div key={index}>
            <SectionButton
              id={index.toString()}
              selected={index === selectedFit}
              onClick={this.handleSelectedFit}
            >
              {fit.name}
            </SectionButton>
          </div>
        ))
      ) : (
        <SectionButton
          id={'1'}
          selected={1 === selectedFit}
          onClick={this.handleSelectedFit}
        >
          {'Standard'}
        </SectionButton>
      )
    }

    const sizeSection = (
      <SectionRow>
        <SizeRowTitleRow>
          <SectionTitleContainer>
            <SectionTitle>{formatMessage(messages.sizeLabel)}</SectionTitle>
            <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
          </SectionTitleContainer>
          <GetFittedLabel onClick={this.gotoGetFittedPage}>
            {formatMessage(messages.getFittedLabel)}
          </GetFittedLabel>
        </SizeRowTitleRow>
        <SectionButtonsContainer>{availableSizes}</SectionButtonsContainer>
      </SectionRow>
    )

    const fitSection = (
      <SectionRow>
        <SectionTitleContainer>
          <SectionTitle>{formatMessage(messages.fitLabel)}</SectionTitle>
          <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
        </SectionTitleContainer>
        <SectionButtonsContainer>{availableFits}</SectionButtonsContainer>
      </SectionRow>
    )

    const addToCartRow = (
      <ButtonsRow>
        <StyledButton onClick={this.addtoCart}>
          {formatMessage(messages.addToCartButtonLabel)}
        </StyledButton>
      </ButtonsRow>
    )
    const collectionSelection = (
      <BuyNowOptions>
        {sizeSection}
        {fitSection}
        {addToCartRow}
      </BuyNowOptions>
    )

    const { location: { search } } = this.props
    const queryParams = queryString.parse(search)

    const yotpoId = queryParams.yotpoId || ''

    const colors = ['']
    return (
      <Layout {...{ history, intl }}>
        <Container>
          {product && (
            <Content>
              <ImagePreview>
                <TeamBanner src={BannerImage} />
                <ThreeDRender {...{ colors }} />
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    <Title>{name}</Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                  </TitleSubtitleContainer>
                </TitleRow>
                <PricesRow>
                  <PricesContainer>{renderPrices}</PricesContainer>
                  <OrdersInfo>
                    <div>
                      <CurrentOrder>
                        {`${formatMessage(messages.currentOrdersLabel)} `}
                        <SpanNumber>{'2'}</SpanNumber>
                      </CurrentOrder>
                      <EstimatePrice>
                        {`${formatMessage(messages.forEstimatePriceLabel)} `}
                        <SpanNumber>{'24'}</SpanNumber>
                      </EstimatePrice>
                    </div>
                    <QuestionSpan>?</QuestionSpan>
                  </OrdersInfo>
                </PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  rating={get(reviewsScore, 'averageScore', 0)}
                  totalReviews={get(reviewsScore, 'total', 0)}
                />
                <Description>{description}</Description>
                <AvailableLabel>{genderMessage}</AvailableLabel>
                {collectionSelection}
                {productInfo}
              </ProductData>
              <FitInfo
                open={openFitInfo}
                requestClose={this.closeFitInfoModal}
                productId={productId}
                history={history}
              />
            </Content>
          )}
          <JakrooWidgetsTitle>
            <FormattedMessage {...messages.jakrooWidgetTitle} />
          </JakrooWidgetsTitle>
          <YotpoReviews {...{ yotpoId }} />
        </Container>
      </Layout>
    )
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  handleSelectedSize = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { setSelectedSizeAction } = this.props
    const { currentTarget: { id } } = evt
    setSelectedSizeAction(parseInt(id, 10))
  }

  handleSelectedFit = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { setSelectedFitAction } = this.props
    const { currentTarget: { id } } = evt
    setSelectedFitAction(parseInt(id, 10))
  }

  handleOpenFitInfo = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(true)
  }

  gotoGetFittedPage = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  addtoCart = () => {
    const { data: { product: { name } } } = this.props
    Message.success(`${name} has been succesfully added to cart!`)
  }

  closeFitInfoModal = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(false)
  }

  loadModel = () => {}
}

const mapStateToProps = (state: any) => state.get('teamstoreProductPage').toJS()

type OwnProps = {
  productId?: number
  location?: any
}

const TeamstoreProductPageEnhance = compose(
  injectIntl,
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const { location: { search } } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          id: queryParams ? queryParams.id : null
        }
      }
    }
  }),
  connect(mapStateToProps, { ...teamstoreProductPageActions })
)(TeamstoreProductPage)

export default TeamstoreProductPageEnhance
