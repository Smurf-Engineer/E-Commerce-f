/**
 * ProductDetail Screen - Created by cazarez on 12/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Responsive from 'react-responsive'
import queryString from 'query-string'
import get from 'lodash/get'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import Message from 'antd/lib/message'
// import AnimateHeight from 'react-animate-height'
import * as productDetailActions from './actions'
import messages from './messages'
import { GetProductsByIdQuery } from './data'
import {
  Container,
  Content,
  TitleRow,
  Title,
  Subtitle,
  // StyledInputNumber,
  ImagePreview,
  ProductData,
  AvailablePrices,
  PricesRow,
  Description,
  ButtonsRow,
  StyledButton,
  CompareButton,
  BuyNowOptions,
  SectionRow,
  SectionTitle,
  SectionTitleContainer,
  SectionButtonsContainer,
  SectionButton,
  SizeRowTitleRow,
  GetFittedLabel,
  QuestionSpan,
  // AddToCartRow,
  // AddToCartButton,
  JakrooWidgetsTitle,
  Downloadtemplate,
  DownloadTemplateContainer,
  AvailableLabel,
  DownloadImg,
  DetailsList,
  DetailsListItem,
  ProductAvailableColor,
  TitleSubtitleContainer,
  StyledLink
} from './styledComponents'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
import ImagesSlider from '../../components/ImageSlider'
import YotpoReviews from '../../components/YotpoReviews'
import { Product, QueryProps, ImageType } from '../../types/common'
import DownloadIcon from '../../assets/download.svg'
import ChessColors from '../../assets/chess-colors.svg'
import RedColor from '../../assets/colorred.svg'

const Desktop = (props: any) => <Responsive {...props} minWidth={768} />

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

export class ProductDetail extends React.Component<Props, StateProps> {
  state = {
    showDetails: true,
    showSpecs: true
  }

  render() {
    const {
      intl,
      history,
      // showBuyNowSection,
      selectedSize,
      // selectedGender,
      selectedFit,
      openFitInfo,
      setLoadingModel,
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

    const isRetail =
      get(product, 'retailMen', false) && get(product, 'retailWomen', false)
    const imagesArray = get(product, 'images', [] as ImageType[])
    const reviewsScore = get(product, 'yotpoAverageScore', {})

    const maleGender = get(genders, '0.gender', '')
    const femaleGender = get(genders, '1.gender', '')
    const genderMessage =
      femaleGender && maleGender
        ? formatMessage(messages.unisexGenderLabel)
        : formatMessage(messages.oneGenderLabel)
    let renderPrices
    const fitStyles = get(product, 'fitStyles', [])

    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)

    const yotpoId = queryParams.yotpoId || ''

    const genderId = queryParams.gender || 0
    const genderIndex = findIndex(imagesArray, {
      genderId: parseInt(genderId, 10)
    })

    const images = imagesArray[genderIndex] || imagesArray[0]

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
    const colorsSection = (
      <SectionRow>
        <SectionTitle>{formatMessage(messages.ColorsLabel)}</SectionTitle>
        <div>
          <ProductAvailableColor src={ChessColors} />
          <ProductAvailableColor src={RedColor} />
        </div>
      </SectionRow>
    )

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
        {colorsSection}
        {sizeSection}
        {fitSection}
        {addToCartRow}
      </BuyNowOptions>
    )

    return (
      <Layout {...{ history, intl }}>
        <Container>
          {product && (
            <Content>
              <ImagePreview>
                <ImagesSlider onLoadModel={setLoadingModel} {...{ images }} />
                <Desktop>
                  <DownloadTemplateContainer>
                    <a href="https://www.jakroo.com/download/Tour_Template.pdf">
                      <DownloadImg src={DownloadIcon} />
                    </a>
                    <Downloadtemplate>
                      {formatMessage(messages.downloadLabel)}
                    </Downloadtemplate>
                  </DownloadTemplateContainer>
                </Desktop>
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    <Title>{name}</Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                  </TitleSubtitleContainer>
                  <StyledLink href="https://www.jakroo.com/us/jersey-comparison.html">
                    <CompareButton>
                      {formatMessage(messages.compareLabe)}
                    </CompareButton>
                  </StyledLink>
                </TitleRow>
                <PricesRow>{renderPrices}</PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  rating={get(reviewsScore, 'averageScore', 0)}
                  totalReviews={get(reviewsScore, 'total', 0)}
                />
                <Description>{description}</Description>
                <AvailableLabel>{genderMessage}</AvailableLabel>
                <ButtonsRow>
                  {!isRetail && (
                    <StyledButton onClick={this.gotoCustomize}>
                      {formatMessage(messages.customizeLabel)}
                    </StyledButton>
                  )}
                  {/* <StyledButton onClick={this.toggleBuyNowOptions}>
                    {formatMessage(messages.buyNowLabel)}
                </StyledButton>*/}
                </ButtonsRow>
                {/* <AnimateHeight
                  duration={500}
                  height={showBuyNowSection ? 'auto' : 0}
                >*/}
                {isRetail && collectionSelection}
                {/* </AnimateHeight>*/}
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

  toggleBuyNowOptions = () => {
    const { showBuyNowOptionsAction, showBuyNowSection } = this.props
    showBuyNowOptionsAction(!showBuyNowSection)
  }

  handleSelectedGender = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { setSelectedGenderAction } = this.props
    const {
      currentTarget: { id }
    } = evt
    setSelectedGenderAction(id)
  }

  handleSelectedSize = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { setSelectedSizeAction } = this.props
    const {
      currentTarget: { id }
    } = evt
    setSelectedSizeAction(parseInt(id, 10))
  }

  handleSelectedFit = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { setSelectedFitAction } = this.props
    const {
      currentTarget: { id }
    } = evt
    setSelectedFitAction(parseInt(id, 10))
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

  addtoCart = () => {
    const {
      data: {
        product: { name }
      }
    } = this.props
    Message.success(`${name} has been succesfully added to cart!`)
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
  return { ...productDetail, ...menu, ...menuSports }
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
        }
      }
    }
  }),
  connect(mapStateToProps, { ...productDetailActions })
)(ProductDetail)

export default ProductDetailEnhance
