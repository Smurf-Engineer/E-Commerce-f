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
import findIndex from 'lodash/findIndex'
import * as productDetailActions from './actions'
import messages from './messages'
import { GetProductsByIdQuery } from './data'
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
  ReviewsHeader,
  Downloadtemplate,
  DownloadTemplateContainer,
  AvailableLabel,
  DownloadImg,
  DetailsList,
  DetailsListItem,
  ProductAvailableColor,
  TitleSubtitleContainer
} from './styledComponents'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
import ImagesSlider from '../../components/ImageSlider'
import YotpoReviews from '../../components/YotpoReviews'
import AddtoCartButton from '../../components/AddToCartButton'
import {
  Product,
  QueryProps,
  ImageType,
  CartItemDetail,
  SelectedType,
  Filter
} from '../../types/common'
import DownloadIcon from '../../assets/download.svg'
import ChessColors from '../../assets/chess-colors.svg'
import RedColor from '../../assets/colorred.svg'

const Desktop = (props: any) => <Responsive {...props} minWidth={768} />
const COMPARABLE_PRODUCTS = ['TOUR', 'NOVA', 'FONDO']

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
  loadingModel: boolean
  itemToAddCart: any
  showBuyNowOptionsAction: (show: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (id: number) => void
  setSelectedSizeAction: (selected: SelectedType) => void
  setSelectedFitAction: (selected: SelectedType) => void
  setLoadingModel: (loading: boolean) => void
  addItemToCartAction: (item: any) => void
}

interface StateProps {
  showDetails: boolean
  showSpecs: boolean
}

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
    const code = get(product, 'code', '')
    const type = get(product, 'type', '')
    const description = get(product, 'description', '')
    const intendedUse = get(product, 'intendedUse', '')
    const temperatures = get(product, 'temperatures', '')
    const materials = get(product, 'materials', '')
    const genders = get(product, 'genders', [] as Filter[])

    const isRetail =
      get(product, 'retailMen', false) || get(product, 'retailWomen', false)
    const imagesArray = get(product, 'images', [] as ImageType[])
    const reviewsScore = get(product, 'yotpoAverageScore', {})

    const maleGender = genders.find(x => x.name === 'Men')
    const femaleGender = genders.find(x => x.name === 'Women')

    const genderMessage = femaleGender
      ? (maleGender && formatMessage(messages.unisexGenderLabel)) ||
        formatMessage(messages.femaleGenderLabel)
      : formatMessage(messages.maleGenderLabel)

    let renderPrices
    const fitStyles = get(product, 'fitStyles', []) as SelectedType[]
    const sizeRange = get(product, 'sizeRange', []) as SelectedType[]

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

    const moreImages =
      genderIndex !== -1
        ? []
        : imagesArray.filter(post => post.genderId !== images.genderId)

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

    const availableSizes = sizeRange.map(
      ({ id, name: sizeName }: SelectedType, index: number) => (
        <div key={index}>
          <SectionButton
            id={String(id)}
            selected={id === selectedSize.id}
            onClick={this.handleSelectedSize({ id, name: sizeName })}
          >
            {sizeName}
          </SectionButton>
        </div>
      )
    )

    let availableFits
    if (product) {
      availableFits =
        fitStyles.length && fitStyles[0].id ? (
          fitStyles.map(
            ({ id, name: fitName }: SelectedType, index: number) => (
              <div key={index}>
                <SectionButton
                  id={id.toString()}
                  selected={id === selectedFit.id}
                  onClick={this.handleSelectedFit({ id, name: fitName })}
                >
                  {fitName}
                </SectionButton>
              </div>
            )
          )
        ) : (
          <SectionButton
            id={'1'}
            selected={1 === selectedFit.id}
            onClick={this.handleSelectedFit({ id: 1, name: 'Standard' })}
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

    const addToCartRow = this.renderAddButton()

    const collectionSelection = (
      <BuyNowOptions>
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

    const validateShowCompare = COMPARABLE_PRODUCTS.includes(name)

    return (
      <Layout {...{ history, intl }}>
        <Container>
          {product && (
            <Content>
              <ImagePreview>
                <ImagesSlider
                  onLoadModel={setLoadingModel}
                  {...{ images, moreImages }}
                />
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
                    {isRetail &&
                      code && <Subtitle>{`MNP: JR-${code}-${name}`}</Subtitle>}
                  </TitleSubtitleContainer>
                  {validateShowCompare && renderCompareButton}
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
                </ButtonsRow>
                {isRetail && collectionSelection}
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
          <ReviewsHeader>
            <FormattedMessage {...messages.reviews} />
          </ReviewsHeader>
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
    setSelectedGenderAction(parseInt(id, 10))
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
    const { selectedSize, selectedFit } = this.props
    return selectedSize.id >= 0 && selectedFit.id
  }

  renderAddButton = () => {
    const {
      selectedFit,
      selectedSize,
      data: { product },
      intl: { formatMessage }
    } = this.props

    const details = [] as CartItemDetail[]
    if (product) {
      const detail: CartItemDetail = {
        fit: selectedFit,
        size: selectedSize,
        quantity: 1
      }
      details.push(detail)
    }
    const itemToAdd = Object.assign(
      {},
      { product },
      {
        itemDetails: details
      }
    )
    return (
      <ButtonsRow>
        <AddtoCartButton
          onClick={this.validateAddtoCart}
          label={formatMessage(messages.addToCartButtonLabel)}
          item={itemToAdd}
        />
      </ButtonsRow>
    )
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
  connect(
    mapStateToProps,
    { ...productDetailActions }
  )
)(ProductDetail)

export default ProductDetailEnhance
