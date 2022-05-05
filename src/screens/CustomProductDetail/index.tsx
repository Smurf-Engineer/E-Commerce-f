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
import zenscroll from 'zenscroll'
import isEmpty from 'lodash/isEmpty'
import AntdModal from 'antd/lib/modal'
import * as customProductDetailActions from './actions'
import messages from './messages'
import { GetDesignByIdQuery, profileSettingsQuery } from './data'
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
  // AvailableLabel,
  HowItFits,
  BuyNowOptions,
  BannerMaterialSection,
  BannerMaterial,
  SectionRow,
  SectionTitleContainer,
  SectionTitle,
  SectionButtonsContainer,
  SectionButton,
  SizeRowTitleRow,
  QuestionSpan,
  ButtonsRow,
  DetailsList,
  DetailsListItem,
  PrivateContainer,
  PrivateTitle,
  RenderContainer,
  PrivateSubtitle,
  ProApproved,
  ProApprovedLabel,
  layoutStyle,
  LoadingContainer,
  SizeChart,
  InfoTag,
  StyledInput,
  InfoMessage,
  FingerIcon,
  ThreeDButton,
  BackTopStyled,
  BackButton,
  BackIcon,
  CartLabel,
  CartIcon,
  AssistanceDiv,
  SectionLink,
  // ColorButtons,
  // ToneButton
} from './styledComponents'
import Layout from '../../components/MainLayout'
import {
  QueryProps,
  DesignType,
  SelectedType,
  ItemDetailType,
  CartItemDetail,
  ProductFile,
  PriceRange,
  UserType,
  BreadRoute, IProfileSettings
} from '../../types/common'
import lockSound from '../../assets/lock.wav'
import enabledSound from '../../assets/enabled.wav'
import fingerIcon from '../../assets/fingericon.png'
import threeDviewIcon from '../../assets/3dview.svg'
import sizeChartSvg from '../../assets/sizechart.svg'
// import sunny from '../../assets/sunny.png'
// import cloudy from '../../assets/cloudy.png'
// import moon from '../../assets/moonlight.png'
import Modal from '../../components/Common/JakrooModal'
import Render3D from '../../components/Render3D'
import ImagesSlider from '../../components/ImageSlider'
import PriceQuantity from '../../components/PriceQuantity'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import Ratings from '../../components/Ratings'
import FitInfo from '../../components/FitInfo'
import AddtoCartButton from '../../components/AddToCartButton'
import ProductInfo from '../../components/ProductInfo'
import config from '../../config/index'
// import { ProductGenders } from '../ProductDetail/constants'
import YotpoSection from '../../components/YotpoSection'
import { BLUE, GRAY_DARK } from '../../theme/colors'
import BreadCrumbs from '../../components/BreadCrumbs'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Spin from 'antd/lib/spin'
import { APPROVED, DATE_FORMAT, PREDYED_TRANSPARENT } from '../../constants'
import { getRangeLabel } from '../../utils/utilsShoppingCart'
import message from 'antd/lib/message'
import moment from 'moment'
import { FIT_FORM } from './constants'

const { warning } = AntdModal

const MAX_AMOUNT_PRICES = 4
const teamStoreLabels = ['regularPrice', 'teamPrice']
const purchaseLabels = ['regularPrice', 'listPrice']
const resellerLabels = ['purchasePrice', 'listPrice']
// const { Men, Women, Unisex } = ProductGenders

interface Data extends QueryProps {
  design: DesignType
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
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
  showFitsModal: boolean
  phone: boolean
  loading: boolean
  profileData: ProfileData
  selectedTopSize: SelectedType
  selectedBottomSize: SelectedType
  setLoadingAction: (loading: boolean) => void
  setFitsModal: (showFits: boolean) => void
  setLoadingModel: (loading: boolean) => void
  openFitInfoAction: (open: boolean) => void
  setSelectedGenderAction: (selected: SelectedType) => void
  setSelectedSizeAction: (selected: SelectedType) => void
  setSelectedFitAction: (selected: SelectedType) => void
  addItemToCartAction: (item: any) => void
  setShowDetailsAction: (show: boolean) => void
  setShowSpecsAction: (show: boolean) => void
  resetDataAction: () => void
  openQuickView: (id: number, yotpoId: string | null) => void
  setSelectedTopSizeAction: (selected: SelectedType) => void
  setSelectedBottomSizeAction: (selected: SelectedType) => void
}

export class CustomProductDetail extends React.Component<Props, {}> {
  state = {
    tone: '',
    hideControls: true,
    invalidData: false
  }
  constructor(props: any) {
    super(props)
    this.customerReviewRef = React.createRef()
  }
  private buyOptions: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    this.handleSetLoading(false)
  }

  componentDidUpdate(prevProps: Props) {
    const { location: prevLocation } = prevProps
    const { location, resetDataAction } = this.props
    const { search: oldSearch } = prevLocation || {}
    const { search } = location || {}
    if (search !== oldSearch) {
      resetDataAction()
      this.handleSetLoading(false)
    }
  }

  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  onTouchEndAction = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
  }

  setHideControls = (e: React.MouseEvent) => {
    const { intl: { formatMessage } } = this.props
    const { hideControls } = this.state
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    this.setState({ hideControls: !hideControls })
    if (hideControls) {
      message.info(
        <InfoMessage>
          <FingerIcon src={fingerIcon} />
          {formatMessage(messages.controlsEnabled)}
        </InfoMessage>
      , 4)
    } else {
      message.info(formatMessage(messages.controlsDisabled))
    }
    if (window.navigator && window.navigator.vibrate) {
      if (hideControls) {
        navigator.vibrate([80, 50, 40, 50])
      } else {
        navigator.vibrate([70, 50, 20])
      }
    }
    const snd = new Audio(hideControls ? lockSound : enabledSound)
    snd.play()
    snd.remove()
  }

  setTone = (evt: React.MouseEvent) => {
    if (evt) {
      evt.stopPropagation()
      const { currentTarget: { id } } = evt
      if (id) {
        const { tone } = this.state
        if (tone === id) {
          this.setState({ tone: '' })
        } else {
          this.setState({ tone: id })
        }
      }
    }
  }

  changeTone = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ tone: value })
  }

  handleClickStars = () => {
    const { customerReviewRef } = this
    if (customerReviewRef && customerReviewRef.current) {
      customerReviewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    const {
      intl,
      history,
      location: { search },
      data: { design, error, loading: dataLoading },
      selectedGender,
      selectedSize,
      selectedFit,
      openQuickView,
      openFitInfo,
      setLoadingModel,
      profileData,
      showDetails,
      currentCurrency,
      showFitsModal,
      loading,
      phone,
      user,
      selectedTopSize,
      selectedBottomSize
    } = this.props
    const { formatMessage } = intl
    const { hideControls, invalidData } = this.state
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches
    const queryParams = queryString.parse(search)
    const { comission = 0, margin = 0, status: resellerStatus } = get(profileData, 'profileData.reseller', {})
    const ownedDesign = get(design, 'canEdit', false)
    let product = get(design, 'product', null)
    const teamStoreItem = queryParams.item
    const comissionToApply = teamStoreItem ? margin : comission
    if (resellerStatus === APPROVED && ownedDesign) {
      const originalPriceRange = get(product, 'priceRange', [])
      const purchasePrices = originalPriceRange.map((priceItem) => {
        const price = (priceItem.price * (1 - (comissionToApply / 100))).toFixed(2)
        return { ...priceItem, price }
      })
      product = { ...product, priceRange: purchasePrices }
    }
    const productPriceRange = get(product, 'priceRange', [])
    const shared = get(design, 'shared', false)
    const proDesignAssigned = get(design, 'png', '') && !get(design, 'svg', '')

    if (loading || dataLoading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (!product || error || (!ownedDesign && !shared)) {
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
    const teamStoreShortId = queryParams.team
    const designName = get(design, 'name', '')
    const designImage = get(design, 'image')
    const proCertified = get(design, 'proCertified')
    const designCode = get(design, 'code', '')
    const totalOrders = get(design, 'totalOrders', 0)
    const fixedPrices = get(design, 'teamPrice', [])
    const resellerPrice = get(design, 'resellerPrice', [])
    const teamEnable = get(design, 'teamEnable', '')
    const teamOnDemand = get(design, 'teamOnDemand', false)
    const fixedPrice = get(design, 'fixedPrice', false)
    const isReseller = get(design, 'isReseller', false)
    const teamName = get(design, 'teamName', '')
    const predyedName = get(design, 'predyedName', '')
    const proDesign = get(design, 'proDesign', false)
    const {
      images: imagesArray,
      genders,
      name,
      type,
      yotpoAverageScore,
      description,
      youthCombined,
      hideFitStyles,
      yotpoId,
      sizeRange: sizesProduct,
      fitStyles,
      details,
      materials,
      chart,
      mediaFiles,
      active,
      onlyProDesign,
      modelSize,
      id: productId,
      bannerMaterials,
      relatedItemTag,
      twoPieces,
      infoFlag,
      infoMessage
    } = product
    const { tone } = this.state
    const totalReviews = get(yotpoAverageScore, 'total', 0)
    const rating = get(yotpoAverageScore, 'averageScore', 0)
    const genderId = selectedGender ? selectedGender.id : 0
    const rangeLabel = totalOrders > 5 && !teamOnDemand ? getRangeLabel(totalOrders) : '2-5'
    const genderIndex = findIndex(imagesArray, { genderId })
    const moreTag = relatedItemTag ? relatedItemTag.replace(/_/, ' ') : ''
    let images = null
    let moreImages = []
    if (!!imagesArray) {
      images = imagesArray[genderIndex] || imagesArray[0]
      moreImages = imagesArray.filter(
        ({ genderId: imageGender }) => imageGender !== images.genderId
      )
    }
    const teamPrice = isReseller ? resellerPrice : fixedPrices
    const hasFixedPrices = teamPrice && teamPrice.length && !isReseller
    let priceRange: PriceRange[] = []
    if (teamStoreItem) {
      const regularPrices = filter(
        productPriceRange,
        ({ quantity }) =>
          (quantity === 'Personal' && !isReseller) || (quantity === rangeLabel && !hasFixedPrices)
      )
      priceRange = [...regularPrices, ...teamPrice]
    } else {
      priceRange = productPriceRange
    }

    const currencyPrices =
      product &&
      filter(priceRange, {
        abbreviation: currentCurrency || config.defaultCurrency
      })
    let priceLabels = teamStoreLabels
    if (isReseller) {
      priceLabels = ownedDesign ? resellerLabels : purchaseLabels
    }
    const symbol = currencyPrices.length ? currencyPrices[0].shortName : ''
    const renderPrices =
      currencyPrices &&
      currencyPrices.length &&
      currencyPrices.map(
        ({ price, quantity }, index: number) =>
          index < MAX_AMOUNT_PRICES && (!(isReseller && !ownedDesign && index === 0) || !isReseller) && 
            ((fixedPrice && index !== 0) || !fixedPrice) && (
            <AvailablePrices key={index}>
              <PriceQuantity
                {...{ index, price, symbol, teamStoreItem }}
                priceColor={index > 0 && teamStoreItem ? BLUE : GRAY_DARK}
                quantity={
                  teamStoreItem
                    ? formatMessage(messages[priceLabels[index]])
                    : quantity
                }
              />
            </AvailablePrices>
          )
      )

    // const maleGender = genders.find(x => x.name === Men)
    // const femaleGender = genders.find(x => x.name === Women)
    // const unisexGender = genders.find(x => x.name === Unisex)

    // let genderMessage = messages.maleGenderLabel
    // if (unisexGender) {
    //   genderMessage = messages.unisexGenderLabel
    // } else if (femaleGender) {
    //   genderMessage = maleGender
    //     ? messages.unisexGenderLabel
    //     : messages.femaleGenderLabel
    // }

    const availableGenders = genders.map(
      ({ id, name: genderName }: SelectedType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            selected={id === selectedGender.id}
            large={true}
            highlight={invalidData && !selectedGender.id}
            onClick={this.handleSelectedGender({ id, name: genderName })}
          >
            {genderName}
          </SectionButton>
        </div>
      )
    )

    let sizeRange = sizesProduct
    const youthSelected = selectedGender.name === 'Youth'
    if (youthCombined && selectedGender && !!selectedGender.name) {
      sizeRange = sizesProduct.filter((genderItem) => genderItem.isYouth === youthSelected)
    }

    const availableSizes =
      !twoPieces &&
      sizeRange &&
      sizeRange.map(({ id, name: sizeName, isYouth }: ItemDetailType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            range={true}
            highlight={invalidData && !selectedSize.id}
            selected={id === selectedSize.id}
            onClick={this.handleSelectedSize({
              id: Number(id),
              name: String(sizeName),
              isYouth
            })}
          >
            {sizeName}
          </SectionButton>
        </div>
      ))

    const availableTopSizes =
      twoPieces &&
      sizeRange &&
      sizeRange.map(({ id, name: sizeName, isYouth }: ItemDetailType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            highlight={invalidData && !selectedTopSize.id}
            selected={id === selectedTopSize.id}
            onClick={this.handleSelectedTopSize({
              id: Number(id),
              name: String(sizeName),
              isYouth
            })}
          >
            {sizeName}
          </SectionButton>
        </div>
      ))

    const availableBottomSizes =
      twoPieces &&
      sizeRange &&
      sizeRange.map(({ id, name: sizeName, isYouth }: ItemDetailType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            highlight={invalidData && !selectedBottomSize.id}
            selected={id === selectedBottomSize.id}
            onClick={this.handleSelectedBottomSize({
              id: Number(id),
              name: String(sizeName),
              isYouth
            })}
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
                highlight={invalidData && !selectedFit.id}
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
          selected={1 === selectedFit.id}
          highlight={invalidData && !selectedFit.id}
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

    const sizeSection = !twoPieces && (
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

    const topSizeSection = twoPieces && (
      <SectionRow>
        <SizeRowTitleRow>
          <SectionTitleContainer>
            <SectionTitle>{formatMessage(messages.topSize)}</SectionTitle>
            <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
          </SectionTitleContainer>
        </SizeRowTitleRow>
        <SectionButtonsContainer>{availableTopSizes}</SectionButtonsContainer>
      </SectionRow>
    )

    const bottomSizeSection = twoPieces && (
      <SectionRow>
        <SizeRowTitleRow>
          <SectionTitleContainer>
            <SectionTitle>{formatMessage(messages.bottomSize)}</SectionTitle>
            <QuestionSpan onClick={this.handleOpenFitInfo}>?</QuestionSpan>
          </SectionTitleContainer>
        </SizeRowTitleRow>
        <SectionButtonsContainer>{availableBottomSizes}</SectionButtonsContainer>
      </SectionRow>
    )

    const fitSection = !isEmpty(fitStyles) && fitStyles[0].id && !(hideFitStyles && youthSelected) && (
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
        topSize: selectedTopSize,
        bottomSize: selectedBottomSize,
        quantity: 1
      }
      itemDetails.push(detail)
    }

    const cartDisabled = !this.validCart()

    const itemToAdd = Object.assign({}, { product }, { itemDetails })
    const addToCartRow = (
      <ButtonsRow disabled={cartDisabled}>
        {(active || onlyProDesign) &&
          <AddtoCartButton
            onClick={this.validateAddtoCart}
            label={<CartLabel><CartIcon type="shopping-cart" />{formatMessage(messages.addToCartButton)}</CartLabel>}
            item={itemToAdd}
            itemProdPage={true}
            withoutTop={true}
            promptReseller={isReseller && ownedDesign}
            isFixed={teamStoreItem && !teamOnDemand}
            teamStoreId={teamStoreShortId}
            isReseller={isReseller && !ownedDesign}
            fixedPrices={isReseller && ownedDesign ? [] : teamPrice}
            {...{
              designId,
              designName,
              designImage,
              teamStoreItem,
              fixedPrice,
              formatMessage,
              proCertified,
              proDesign
            }}
            teamStoreName={teamName}
          />
        }
      </ButtonsRow>
    )

    const sizeChartButton = !!chart && <SizeChart onClick={this.goToChart} src={sizeChartSvg} />

    const assistanceDiv = 
      <AssistanceDiv>
        <b>
          <FormattedMessage {...messages.needAssistance} />
        </b>
        <SectionLink target="_blank" href={FIT_FORM}>
          <FormattedMessage {...messages.tryFreeService} />
        </SectionLink>
      </AssistanceDiv>

    const collectionSelection = (
      <BuyNowOptions
        innerRef={buyOption => {
          this.buyOptions = buyOption
        }}
      >
        {gendersSection}
        {!twoPieces && sizeSection}
        {twoPieces && topSizeSection}
        {twoPieces && bottomSizeSection}
        {sizeChartButton}
        {fitSection}
        {addToCartRow}
        {assistanceDiv}
      </BuyNowOptions>
    )

    const productDetails = (details && details.split(',')) || ['']

    const detailsItems = productDetails.map((detail, key) => (
      <DetailsListItem {...{ key }}>{detail}</DetailsListItem>
    ))

    const productMaterials = (materials && materials.split('-')) || ['']
    const materialsList = productMaterials.map(
      (material: number, key: number) => (
        <DetailsListItem {...{ key }}>{material}</DetailsListItem>
      )
    )

    const productInfo = (
      <div>
        <ProductInfo
          id="Details"
          title={formatMessage(messages.description)}
          showContent={showDetails}
          toggleView={this.toggleProductInfo}
        >
          <DetailsList>{detailsItems}</DetailsList>
          {materialsList}
        </ProductInfo>
      </div>
    )
    const routes: BreadRoute[] = [
      {
        url: '/',
        label: 'Home'
      }
    ]
    if (teamStoreShortId) {
      routes.push({
        url: `/store-front?storeId=${teamStoreShortId}`,
        label: teamName
      })
    } else if (ownedDesign) {
      routes.push({
        url: '/account?option=myLocker',
        label: 'My Locker'
      })
    }
    routes.push({
      selected: true,
      label: designName
    })
    return (
      <Layout {...{ history, intl }} style={layoutStyle}>
        <Container>
          <BreadCrumbs {...{ history, formatMessage, routes }} />
          {isMobile &&
            <BackTopStyled>
              <BackButton><BackIcon type="up-circle" theme="twoTone" twoToneColor="#4596bf" /> UP</BackButton>
            </BackTopStyled>
          }
          {(design && !loading) && (
            <Content>
              <ImagePreview>
                <RenderContainer>
                  {/* <ColorButtons>
                    <ToneButton
                      selected={tone === 'rgb(255, 255, 206)'}
                      id="rgb(255, 255, 206)"
                      onClick={this.setTone}
                      src={sunny} 
                    />
                    <ToneButton
                      selected={tone === 'rgb(158, 192, 247)'}
                      id="rgb(158, 192, 247)"
                      onClick={this.setTone}
                      src={cloudy}  
                    />
                    <ToneButton
                      selected={tone === 'rgb(120, 126, 138)'}
                      id="rgb(120, 126, 138)"
                      onClick={this.setTone}
                      src={moon} 
                    />
                  </ColorButtons> */}
                  {(user && (user.id === 'HkuTqBauQ' || user.id === 'H1R0yFr0V')) &&
                    <StyledInput onChange={this.changeTone} value={tone} />
                  }
                  <Render3D
                    customProduct={true}
                    textColor="white"
                    disableControls={isMobile ? hideControls : false}
                    hidePredyed={predyedName === PREDYED_TRANSPARENT}
                    {...{ designId, modelSize }}
                    zoomedIn={true}
                    maxHeight={true}
                    light={tone}
                    asImage={phone}
                  />
                  {isMobile &&
                    <ThreeDButton 
                      onTouchEnd={this.onTouchEndAction}
                      onTouchStart={this.setHideControls}
                      selected={!hideControls} 
                      src={threeDviewIcon}
                    />
                  }
                  {
                    infoFlag && <InfoTag>{infoMessage}</InfoTag>
                  }
                  <HowItFits onClick={this.toggleFitsModal(true)}>
                    <FormattedMessage {...messages.howItFits} />
                  </HowItFits>
                  {showFitsModal && (
                    <Modal
                      open={showFitsModal}
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
                          moreImages
                        }}
                      />
                    </Modal>
                  )}
                </RenderContainer>
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    <Title>{designName}</Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                    {designCode && <Subtitle>{`MPN: ${designCode}`}</Subtitle>}
                  </TitleSubtitleContainer>
                  {!teamStoreItem &&
                    ownedDesign &&
                    (!proDesign ? (
                      <EditDesignButton
                        onClick={this.gotToEditDesign(designId)}
                      >
                        {formatMessage(messages.editDesign)}
                      </EditDesignButton>
                    ) : (
                      <ProApproved proAssigned={proDesignAssigned}>
                        <ProApprovedLabel>
                          {formatMessage(
                            messages[
                            proDesignAssigned ? 'proAssigned' : 'approved'
                            ]
                          )}
                        </ProApprovedLabel>
                      </ProApproved>
                    ))}
                </TitleRow>
                <PricesRow isTeamStore={!!teamStoreItem}>
                  {renderPrices}
                </PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  handleClickStars={this.handleClickStars}
                  {...{ rating, totalReviews }}
                />
                <Description>{description}</Description>
                {/* <AvailableLabel>{formatMessage(genderMessage)}</AvailableLabel> */}
                <BannerMaterialSection>
                  {bannerMaterials.map((banner: ProductFile) => (
                    <BannerMaterial src={banner.url} />
                  ))}
                </BannerMaterialSection>
                {((teamStoreItem && teamEnable) || !teamStoreItem) &&
                  collectionSelection}
                {teamStoreItem && !teamEnable && !!chart ?
                  sizeChartButton : null
                }
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
              productId,
              relatedItemTag,
              moreTag,
              name,
              openQuickView,
              teamStoreShortId,
              designId,
              history,
              resellerStatus,
              formatMessage,
              currentCurrency
            }}
            resellerComission={comissionToApply}
            ref={this.customerReviewRef}
            hideFeatured={true}
          />
        </Container>
      </Layout>
    )
  }
  toggleFitsModal = (showFits: boolean) => () => {
    const { setFitsModal } = this.props
    setFitsModal(showFits)
  }
  handleSelectedFit = (fitStyle: SelectedType) => () => {
    const { setSelectedFitAction } = this.props
    setSelectedFitAction(fitStyle)
    this.setState({ invalidData: false })
  }

  handleSelectedSize = (size: SelectedType) => () => {
    const { setSelectedSizeAction } = this.props
    setSelectedSizeAction(size)
    this.setState({ invalidData: false })
  }

  handleSelectedTopSize = (size: SelectedType) => () => {
    const { setSelectedTopSizeAction } = this.props
    setSelectedTopSizeAction(size)
    this.setState({ invalidData: false })
  }

  handleSelectedBottomSize = (size: SelectedType) => () => {
    const { setSelectedBottomSizeAction } = this.props
    setSelectedBottomSizeAction(size)
    this.setState({ invalidData: false })
  }

  handleSelectedGender = (gender: SelectedType) => () => {
    const {
      setSelectedGenderAction,
      selectedSize,
      setSelectedSizeAction,
      setSelectedFitAction,
      data,
      selectedTopSize,
      selectedBottomSize,
      setSelectedTopSizeAction,
      setSelectedBottomSizeAction
    } = this.props
    setSelectedGenderAction(gender)
    const youthCombined = get(data, 'design.product.youthCombined', false)
    const hideFitStyles = get(data, 'design.product.hideFitStyles', false)
    const genderYouth = gender && gender.name === 'Youth'
    if (youthCombined) {
      const youthSizeSelected = selectedSize && selectedSize.isYouth
      if (!genderYouth && youthSizeSelected || genderYouth && !youthSizeSelected) {
        setSelectedSizeAction({})
      }
      const youthTopSize = selectedTopSize && selectedTopSize.isYouth
      if (!genderYouth && youthTopSize || genderYouth && !youthTopSize) {
        setSelectedTopSizeAction({})
      }
      const youthBottomSize = selectedBottomSize && selectedBottomSize.isYouth
      if (!genderYouth && youthBottomSize || genderYouth && !youthBottomSize) {
        setSelectedBottomSizeAction({})
      }
    }
    if (genderYouth && hideFitStyles) {
      setSelectedFitAction({})
    }
    this.setState({ invalidData: false })
  }

  goToChart = () => {
    const { data } = this.props
    const chart = get(data, 'design.product.chart', '')
    window.open(chart)
  }

  handleSetLoading = (loading: boolean) => {
    const { setLoadingAction } = this.props
    setLoadingAction(loading)
  }

  gotToEditDesign = (designId: string) => () => {
    const { history, data } = this.props
    const productId = get(data, 'design.product.id', -1)
    const createdAt = get(data, 'design.createdAt', '')
    if (
      (productId === 262 && moment(createdAt, DATE_FORMAT).isBefore('02/23/2022')) || 
      (productId === 265 && moment(createdAt, DATE_FORMAT).isBefore('02/22/2022'))
    ) {
      warning({
        title: <strong>EDITING NOT AVAILABLE</strong>,
        width: 494,
        // tslint:disable-next-line: max-line-length
        content: 'This product has been updated and editing capabilities have been removed. Not to worry! Your design can still be added to your cart and ordered, but if you require changes to your design please contact our designers for assistance through the ProAssist chat M-F 6am-6pm PST.',
      })
    } else {
      history.push(`/design-center?designId=${designId}`)
    }
  }

  handleOpenFitInfo = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(true)
  }

  closeFitInfoModal = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(false)
  }

  validCart = () => {
    const {
      selectedSize,
      selectedGender,
      selectedFit,
      selectedTopSize,
      selectedBottomSize,
      data: { design }
    } = this.props
    const fitStyles = get(design.product, 'fitStyles', []) as SelectedType[]
    const hideFitStyles = get(design.product, 'hideFitStyles', []) as SelectedType[]
    const twoPieces = get(design.product, 'twoPieces', false)
    const youthGender = selectedGender && selectedGender.name === 'Youth'
    if (fitStyles.length && fitStyles[0].id) {
      return (
        ((!twoPieces && selectedSize.id >= 0) || (twoPieces && selectedTopSize.id > 0 &&
          selectedBottomSize.id > 0)) &&
        ((selectedFit &&
        selectedFit.id && !(hideFitStyles && youthGender)) || (hideFitStyles && youthGender)) &&
        selectedGender.id
      )
    }

    return ((!twoPieces && selectedSize.id >= 0) || (twoPieces && selectedTopSize.id > 0 &&
      selectedBottomSize.id > 0)) && selectedGender.id
  }

  validateAddtoCart = () => {
    this.setState({ invalidData: false })
    const validCart = this.validCart()
    this.setState({ invalidData: !validCart })
    if (!validCart && this.buyOptions) {
      zenscroll.to(this.buyOptions)
    }
    return validCart
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
  const responsive = state.get('responsive').toJS()
  const app = state.get('app').toJS()
  return { ...productDetail, ...langProps, ...responsive, ...app }
}

type OwnProps = {
  location?: any
  user?: UserType
}

const CustomProductDetailEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...customProductDetailActions, openQuickView: openQuickViewAction }),
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => ({
      fetchPolicy: 'network-only',
      skip: !user
    }),
    name: 'profileData',
  }),
  graphql<Data>(GetDesignByIdQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          designId: queryParams ? queryParams.id : null,
          teamStoreItem: queryParams ? queryParams.item : null
        },
        fetchPolicy: 'network-only'
      }
    }
  })
)(CustomProductDetail)

export default CustomProductDetailEnhance
