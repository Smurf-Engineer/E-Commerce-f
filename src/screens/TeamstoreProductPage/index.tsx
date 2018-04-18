/**
 * TeamstoreProductPage Screen - Created by cazarez on 06/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps, Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import capitalize from 'lodash/capitalize'
import queryString from 'query-string'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import Divider from 'antd/lib/divider'
import Breadcrumb from 'antd/lib/breadcrumb'
import { GetTeamStoreItems, GetDesignQuery } from './data'
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
  // JakrooWidgetsTitle,
  AvailableLabel,
  DetailsList,
  DetailsListItem,
  TitleSubtitleContainer,
  PricesContainer,
  EstimatePrice,
  DynamicPriceModalContainer,
  DynamicPriceModalTitle,
  StyledParagraph,
  ButtonRow,
  GotItButton,
  BreadCrumbRow,
  RelatedProductsContainer,
  RelatedProductsRow,
  ThumbnailFooterContainer,
  ThumbnailFooterTitle,
  ThumbnailFooterSubtitle,
  ThumbnailFooterPriceContainer,
  ThumbnailFooterPricelabel
} from './styledComponents'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
import ImagesSlider from '../../components/ImageSlider'
import YotpoReviews from '../../components/YotpoReviews'
import ProductThumbnail from '../../components/ProductThumbnail'
import ThreeDRender from './Product3D'

import {
  Product,
  QueryProps,
  ImageType,
  PriceRange,
  TeamstoreType,
  DesignType
} from '../../types/common'

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
}

interface Data extends QueryProps {
  design: DesignType
  relatedItems: TeamstoreType
}

interface Props extends RouteComponentProps<any> {
  productId?: number
  intl: InjectedIntl
  data: Data
  showBuyNowSection: boolean
  openFitInfo: boolean
  selectedGender: string
  selectedSize: number
  selectedFit: number
  loadingModel: boolean
  showDynamicPrice: boolean
  teamStoreItems: Data
  showBuyNowOptionsAction: (show: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (selected: string) => void
  setSelectedSizeAction: (selected: number) => void
  setSelectedFitAction: (selected: number) => void
  setLoadingModel: (loading: boolean) => void
  openDynamicPriceModalAction: (open: boolean) => void
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
      selectedGender,
      selectedSize,
      selectedFit,
      openFitInfo,
      showDynamicPrice,
      teamStoreItems,
      data: { design },
      teamStoreItems: { relatedItems }
    } = this.props
    console.log('DESGIN ', teamStoreItems, design)
    const { formatMessage } = intl
    const { showDetails, showSpecs } = this.state
    const designName = get(design, 'name', '')
    const colors = get(design, 'colors')
    console.log(designName, colors)
    const productId = get(design, 'product.id', '')
    const storeName = get(relatedItems, 'name', 'untitled')
    const name = get(design, 'product.name', '')
    const type = get(design, 'product.type', '')
    const description = get(design, 'product.description', '')
    const intendedUse = get(design, 'product.intendedUse', '')
    const temperatures = get(design, 'product.temperatures', '')
    const materials = get(design, 'product.materials', '')
    const genders = get(design, 'product.genders', [])
    const maleGender = get(design, 'product.genders[0].name', '')
    const femaleGender = get(design, 'product.genders[1].name', '')
    const genderMessage =
      femaleGender && maleGender
        ? formatMessage(messages.unisexGenderLabel)
        : formatMessage(messages.oneGenderLabel)
    let renderPrices
    const fitStyles = get(design, 'product.fitStyles', [])
    const { location: { search } } = this.props
    const queryParams = queryString.parse(search)
    const yotpoId = queryParams.yotpoId || ''
    const storeId = queryParams.store || ''

    if (!design) {
      return null
    }

    if (design.product) {
      renderPrices = design.product.priceRange.map(
        (item: any, index: number) => (
          <AvailablePrices key={index}>
            <PriceQuantity
              price={item.price}
              quantity={item.quantity}
              {...{ index }}
            />
          </AvailablePrices>
        )
      )
    }

    let productInfo
    if (design.product) {
      const productDetails =
        design.product.details !== null
          ? design.product.details.split(',')
          : ['']
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

    const availableGenders = map(genders, (item: ProductTypes, index) => (
      <div key={index}>
        <SectionButton
          id={item.name}
          selected={item.name === selectedGender}
          onClick={this.handleSelectedGender}
        >
          {item.name}
        </SectionButton>
      </div>
    ))

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
    if (design.product) {
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

    const gendersSection = (
      <SectionRow>
        <SectionTitleContainer>
          <SectionTitle>{formatMessage(messages.genderLabel)}</SectionTitle>
        </SectionTitleContainer>
        <SectionButtonsContainer>{availableGenders}</SectionButtonsContainer>
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
        {gendersSection}
        {sizeSection}
        {fitSection}
        {addToCartRow}
      </BuyNowOptions>
    )

    const breadCrumb = (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={'/search-teamstores'}>{'Teamstores'}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/store-front?storeId=${storeId}`}>
            {capitalize(storeName)}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{designName}</Breadcrumb.Item>
      </Breadcrumb>
    )

    const dinamicPriceModal = (
      <Modal
        visible={showDynamicPrice}
        closable={false}
        footer={null}
        onCancel={this.handleDynamicPriceModal}
      >
        <DynamicPriceModalContainer>
          <DynamicPriceModalTitle>
            {formatMessage(messages.dynamicPriceDropTitle).toLocaleUpperCase()}
          </DynamicPriceModalTitle>
          <StyledParagraph>
            {formatMessage(messages.everybodyWinsText)}
          </StyledParagraph>
          <StyledParagraph>
            {formatMessage(messages.asTeamMemberText)}
          </StyledParagraph>
          <StyledParagraph>
            {formatMessage(messages.finalPricingText)}
          </StyledParagraph>
          <ButtonRow>
            <GotItButton onClick={this.handleDynamicPriceModal}>
              {formatMessage(messages.gotItLabel)}
            </GotItButton>
          </ButtonRow>
        </DynamicPriceModalContainer>
      </Modal>
    )

    const imagesArray = get(design, 'product.images', [] as ImageType[])
    const images = imagesArray[0]

    // TODO: PASS TO THUMBNAIL FOOTER COMPONENT
    const thumbnailFooter = (desigName: string, productType: string) => (
      <ThumbnailFooterContainer>
        <ThumbnailFooterTitle>{desigName}</ThumbnailFooterTitle>
        <ThumbnailFooterSubtitle>{productType}</ThumbnailFooterSubtitle>
        <ThumbnailFooterPriceContainer>
          <ThumbnailFooterPricelabel>
            {'Current Price $119'}
          </ThumbnailFooterPricelabel>
          <ThumbnailFooterPricelabel>
            {'Estimate Price $63'}
          </ThumbnailFooterPricelabel>
        </ThumbnailFooterPriceContainer>
      </ThumbnailFooterContainer>
    )

    const relatedProducts = relatedItems.items.map((item, index) => (
      <ProductThumbnail
        id={item.design.shortId}
        isStoreThumbnail={true}
        yotpoId={item.design.product.yotpoId}
        teamStoreShortId={storeId}
        key={index}
        image={item.design.image}
        hideCustomButton={true}
        hideQuickView={true}
        footer={thumbnailFooter(item.design.name, item.design.product.type)}
      />
    ))

    return (
      <Layout teamStoresHeader={true} {...{ history, intl }}>
        {design.product && (
          <Container>
            <BreadCrumbRow>{breadCrumb}</BreadCrumbRow>
            <Content>
              <ImagePreview>
                <ImagesSlider
                  {...{ images }}
                  threeDmodel={<ThreeDRender {...{ colors }} />}
                  customProduct={true}
                />
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    <Title>{designName.toLocaleUpperCase()}</Title>
                    <Subtitle>{`${name} ${type}`}</Subtitle>
                    <Subtitle>{`MODEL ID`}</Subtitle>
                  </TitleSubtitleContainer>
                  <StyledButton onClick={this.handleDynamicPriceModal}>
                    {formatMessage(messages.dynamicPriceDropTitle)}
                  </StyledButton>
                </TitleRow>
                <PricesRow>
                  <PricesContainer>{renderPrices}</PricesContainer>
                </PricesRow>
                <EstimatePrice>
                  {formatMessage(messages.forEstimatePriceLabel, {
                    quantity: 3
                  })}
                </EstimatePrice>
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
            <Divider />
            <RelatedProductsContainer>
              <SectionTitleContainer>
                <SectionTitle>
                  {formatMessage(messages.relatedProductsLabel)}
                </SectionTitle>
              </SectionTitleContainer>
              <RelatedProductsRow>{relatedProducts}</RelatedProductsRow>
            </RelatedProductsContainer>
            {/* <JakrooWidgetsTitle>
              <FormattedMessage {...messages.jakrooWidgetTitle} />
            </JakrooWidgetsTitle>*/}
            <YotpoReviews {...{ yotpoId }} />
          </Container>
        )}
        {dinamicPriceModal}
      </Layout>
    )
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  handleSelectedGender = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { setSelectedGenderAction } = this.props
    const { currentTarget: { id } } = evt
    setSelectedGenderAction(id)
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
    const { data: { design: { product: { name } } } } = this.props
    Message.success(`${name} has been succesfully added to cart!`)
  }

  closeFitInfoModal = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(false)
  }

  loadModel = () => {}

  handleDynamicPriceModal = () => {
    const { openDynamicPriceModalAction, showDynamicPrice } = this.props
    openDynamicPriceModalAction(!showDynamicPrice)
  }

  getTierPrice = (prices: PriceRange[], range = '2-5') => () => {
    const index = findIndex(prices, ({ quantity }) => quantity === range)
    return prices[index] ? prices[index].price : 0
  }
}

const mapStateToProps = (state: any) => state.get('teamstoreProductPage').toJS()

type OwnProps = {
  location?: any
}

const TeamstoreProductPageEnhance = compose(
  injectIntl,
  graphql<Data>(GetDesignQuery, {
    options: (ownprops: OwnProps) => {
      const { location: { search } } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          searchParam: queryParams ? queryParams.id : null
        }
      }
    }
  }),
  graphql(GetTeamStoreItems, {
    name: 'teamStoreItems',
    options: ({ location: { search } }: OwnProps) => {
      const queryParams = queryString.parse(search)
      return {
        variables: {
          storeId: queryParams ? queryParams.store : null
        }
      }
    }
  }),
  connect(mapStateToProps, { ...teamstoreProductPageActions })
)(TeamstoreProductPage)

export default TeamstoreProductPageEnhance
