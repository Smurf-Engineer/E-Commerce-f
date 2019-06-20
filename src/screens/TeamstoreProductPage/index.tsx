/**
 * TeamstoreProductPage Screen - Created by cazarez on 06/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps, Link, Redirect } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { getTeamStoreStatus } from './data'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import capitalize from 'lodash/capitalize'
import queryString from 'query-string'
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
  ThumbnailFooterPricelabel,
  PriceSpan
} from './styledComponents'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
import ImagesSlider from '../../components/ImageSlider'
import YotpoReviews from '../../components/YotpoReviews'
import ProductThumbnail from '../../components/ProductThumbnail'
import AddtoCartButton from '../../components/AddToCartButton'
import ThreeDRender from './Product3D'
import { DEFAULT_ROUTE } from '../../constants'

import {
  QueryProps,
  ImageType,
  PriceRange,
  TeamstoreType,
  DesignType,
  TeamstoreItemType,
  CartItemDetail,
  SelectedType
} from '../../types/common'

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
  selectedGender: SelectedType
  selectedSize: SelectedType
  selectedFit: SelectedType
  loadingModel: boolean
  showDynamicPrice: boolean
  teamStoreItems: Data
  showTeamStores: boolean
  showBuyNowOptionsAction: (show: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (selected: SelectedType) => void
  setSelectedSizeAction: (selected: SelectedType) => void
  setSelectedFitAction: (selected: SelectedType) => void
  setLoadingModel: (loading: boolean) => void
  openDynamicPriceModalAction: (open: boolean) => void
  teamStoreStatus: () => Promise<any>
  setTeamStoreStatusAction: (show: boolean) => void
}

interface StateProps {
  showDetails: boolean
  showSpecs: boolean
}

export class TeamstoreProductPage extends React.Component<Props, StateProps> {
  state = {
    showDetails: true,
    showSpecs: true
  }
  async componentDidMount() {
    const { teamStoreStatus, setTeamStoreStatusAction } = this.props
    const response = await teamStoreStatus()
    setTeamStoreStatusAction(
      get(response, 'data.getTeamStoreStatus.showTeamStores', false)
    )
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
      data: { design },
      teamStoreItems: { relatedItems },
      showTeamStores
    } = this.props

    if (showTeamStores === false) {
      return <Redirect to={DEFAULT_ROUTE} />
    }

    const { formatMessage } = intl
    const { showDetails, showSpecs } = this.state
    const designName = get(design, 'name', '')
    const productId = get(design, 'product.id', '')
    const svgUrl = get(design, 'svg', '')
    const storeName = get(relatedItems, 'name', 'untitled')
    const name = get(design, 'product.name', '')
    const type = get(design, 'product.type', '')
    const description = get(design, 'product.description', '')
    const intendedUse = get(design, 'product.intendedUse', '')
    const temperatures = get(design, 'product.temperatures', '')
    const materials = get(design, 'product.materials', '')
    const genders = get(design, 'product.genders', [])
    const sizeRange = get(design, 'product.sizeRange', [])
    const maleGender = get(design, 'product.genders[0].name', '')
    const femaleGender = get(design, 'product.genders[1].name', '')
    const genderMessage =
      femaleGender && maleGender
        ? formatMessage(messages.unisexGenderLabel)
        : formatMessage(messages.oneGenderLabel)
    //    let renderPrices
    const fitStyles = get(design, 'product.fitStyles', [])
    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)
    const yotpoId = queryParams.modelId || ''
    const storeId = queryParams.store || ''

    // TODO: Change to real priceRange and starting price when gets implemmented in the backq
    // const priceRange = get(design, 'product.priceRange', [])
    //  const startingPrice = this.getTierPrice(priceRange)

    if (!design) {
      return null
    }

    const colors = get(design, 'colors')
    const designShortId = get(design, 'shortId')
    // TODO: temporal commented code
    /*   if (design.product) {
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
*/
    const productPrices = (
      <AvailablePrices>
        <AvailablePrices>
          <PriceQuantity
            price={119}
            priceColor={'#E61737'}
            quantity={'Current Price'}
            index={0}
          />
        </AvailablePrices>
        <AvailablePrices>
          <PriceQuantity price={63} quantity={'Team Target Price'} index={0} />
        </AvailablePrices>
      </AvailablePrices>
    )

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

    const availableGenders = genders.map(
      ({ id, name: genderName }: SelectedType, index: number) => (
        <div key={index}>
          <SectionButton
            id={String(id)}
            selected={id === selectedGender.id}
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
    if (design.product) {
      availableFits = fitStyles[0].id ? (
        fitStyles.map(({ id, name: fitName }: SelectedType, index: number) => (
          <div key={index}>
            <SectionButton
              id={String(id)}
              selected={id === selectedFit.id}
              onClick={this.handleSelectedFit({ id, name: fitName })}
            >
              {fitName}
            </SectionButton>
          </div>
        ))
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

    const addToCartRow = this.renderAddButton()

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
            {'Current Price'}
            <PriceSpan labelColor={'#E61737 '}>{'$ 119'}</PriceSpan>
          </ThumbnailFooterPricelabel>
          <ThumbnailFooterPricelabel>
            {'Estimate Price'}
            <PriceSpan>{'$ 119'}</PriceSpan>
          </ThumbnailFooterPricelabel>
        </ThumbnailFooterPriceContainer>
      </ThumbnailFooterContainer>
    )

    const filterRelatedProducts = filter(
      relatedItems.items,
      ({ design: { shortId } }: TeamstoreItemType) => {
        return shortId !== designShortId
      }
    )

    const relatedProducts = filterRelatedProducts.map((item, index) => (
      <ProductThumbnail
        id={item.design.shortId}
        isStoreThumbnail={true}
        yotpoId={item.design.product.yotpoId}
        teamStoreShortId={storeId}
        key={index}
        product={item}
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
                  threeDmodel={<ThreeDRender {...{ colors, svgUrl }} />}
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
                  <PricesContainer>{productPrices}</PricesContainer>
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
                product={design.product}
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

  gotoGetFittedPage = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  renderAddButton = () => {
    const {
      selectedGender,
      selectedFit,
      selectedSize,
      data: { design },
      intl: { formatMessage },
      location: { search }
    } = this.props

    const queryParams = queryString.parse(search)
    const storeId = queryParams.store || ''

    const { product, name, shortId, image } = design

    const details = [] as CartItemDetail[]
    if (product) {
      const detail: CartItemDetail = {
        fit: selectedFit,
        size: selectedSize,
        gender: selectedGender,
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
          itemProdPage={true}
          withoutTop={true}
          designId={shortId}
          designName={name}
          designImage={image}
          teamStoreId={storeId}
        />
      </ButtonsRow>
    )
  }

  validateAddtoCart = () => {
    const { selectedSize, selectedFit, selectedGender } = this.props
    return selectedSize.id && selectedFit.id && selectedGender.id
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

  getTierPrice = (prices: PriceRange[], range = '2-5') => {
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
  getTeamStoreStatus,
  graphql<Data>(GetDesignQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        fetchPolicy: 'network-only',
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
  connect(
    mapStateToProps,
    { ...teamstoreProductPageActions }
  )
)(TeamstoreProductPage)

export default TeamstoreProductPageEnhance
