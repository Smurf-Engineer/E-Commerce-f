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
import { GetProductsByIdQuery, profileSettingsQuery } from './data'
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
  WomenIcon,
  layoutStyle,
  CustomizeButton,
  DealerTitle,
  SizeChart,
  // ColorButtons,
  // ToneButton,
  InfoTag,
  MobileButtonTemplate,
  ActionButtonsRow,
  ButtonTemplate,
  Download,
  YouthLabel,
  ThreeDButton,
  FingerIcon,
  InfoMessage,
  SizeChartCustom,
  SizeChartCustomMobile,
  MobileFlex,
  BackButton,
  BackIcon,
  BackTopStyled,
  CartLabel,
  CartIcon,
} from './styledComponents'
import lockSound from '../../assets/lock.wav'
import enabledSound from '../../assets/enabled.wav'
import sizeChartSvg from '../../assets/sizechart.svg'
import colorWheel from '../../assets/Colorwheel.svg'
import threeDviewIcon from '../../assets/3dview.svg'
import fingerIcon from '../../assets/fingericon.png'
// import sunny from '../../assets/sunny.png'
// import cloudy from '../../assets/cloudy.png'
// import moon from '../../assets/moonlight.png'
import Modal from '../../components/Common/JakrooModal'
import { APPROVED, MAIN_TITLE, onlyPro } from '../../constants'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import Render3D from '../../components/Render3D'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import FitInfo from '../../components/FitInfo'
import ImagesSlider from '../../components/ImageSlider'
import StartDesignModal from '../../components/StartDesignModal'
import AddtoCartButton from '../../components/AddToCartButton'
import {
  Product,
  QueryProps,
  CartItemDetail,
  SelectedType,
  PriceRange,
  ProductColors,
  ProductFile,
  ItemDetailType,
  BreadRoute,
  IProfileSettings,
  UserType,
} from '../../types/common'
import config from '../../config/index'
import YotpoSection from '../../components/YotpoSection'
import Helmet from 'react-helmet'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import BreadCrumbs from '../../components/BreadCrumbs'
import message from 'antd/lib/message'

// const Desktop = (props: any) => <Responsive {...props} minWidth={768} />
const COMPARABLE_PRODUCTS = ['FONDO', 'NOVA PRO', 'FORZA', 'ULTRA']
const WHITENAME = 'White'

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

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
  phone: boolean
  isMobile: boolean
  profileData: ProfileData
  designModalOpen: boolean
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
  setDesignModalOpenAction: (open: boolean) => void
}

interface StateProps {
  showDetails: boolean
  showFits: boolean
  invalidData: boolean
}

export class ProductDetail extends React.Component<Props, StateProps> {
  state = {
    showDetails: false,
    showFits: false,
    tone: '',
    hideControls: true,
    invalidData: false
  }

  constructor(props: any) {
    super(props)
    this.customerReviewRef = React.createRef()
  }
  private buyOptions: any

  componentWillUnmount() {
    const { resetReducerAction } = this.props
    resetReducerAction()
  }

  componentDidMount() {
    const {
      data: { product },
      // setSelectedFitAction, // TODO: refactor if needed
      setSelectedColorAction,
    } = this.props
    LoadScripts(threeDScripts)
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

  componentDidUpdate(prevProps: Props) {
    const { loadingImage, setLoadingImageAction } = this.props
    if (loadingImage) {
      setLoadingImageAction(false)
    }
    const { location: prevLocation } = prevProps
    const { location, resetReducerAction } = this.props
    const { search: oldSearch } = prevLocation || {}
    const { search } = location || {}
    if (search !== oldSearch) {
      resetReducerAction()
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

  onTouchEndAction = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
  }

  setTone = (evt: React.MouseEvent) => {
    if (evt) {
      evt.stopPropagation()
      const {
        currentTarget: { id },
      } = evt
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

  getMetaData = (productId: string) => {
    {/* tslint:disable:max-line-length */}
    let metaData
    switch (productId) {
      case '82':
        metaData =
          <Helmet title="Custom Women's Running Singlet. Fully printable - JAKROO">
            <meta name="description" content="Fully customizable women's running singet. Lightweight performance tank. Design Online. 2 Week Delivery" />
            <meta name="keywords" content="custom running singlet, custom women running singlet, women custom run tank, custom gym tank women" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Jerseys" />
            <meta property="og:title" content="Custom Women's Running Singlet. Fully printable - JAKROO" />
            <meta property="og:url" content="https://jakroo.com/product?id=82&modelId=arc" />
            <meta property="og:type" content="article" />
            <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/JakrooCustom.jpg" />
            <meta property="og:description" content="Fully customizable women's running singet. Lightweight performance tank. Design Online. 2 Week Delivery" />
            <link rel="canonical" href="https://jakroo.com/product?id=82&modelId=arc" />
            <link rel="author" href="https://jakroo.com/product?id=82&modelId=arc" />
            <link rel="alternate" href="https://designlab.jakroo.com/product?id=82&modelId=arc"/>
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/product?id=82&modelId=arc/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/product?id=82&modelId=arc/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/product?id=82&modelId=arc/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/product?id=82&modelId=arc/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/product?id=82&modelId=arc/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/product?id=82&modelId=arc/us?lang=en&currency=usd" />
          </Helmet>
        break
      case '64':
        metaData =
          <Helmet title="Custom Men's Running Singlet. Fully printable - JAKROO">
            <meta name="description" content="Fully customizable men's running singlet. Lightweight performance singlet. Design Online. 2 Week Delivery" />
            <meta name="keywords" content="custom running singlet, design running singlet, custom running vest, custom running tank" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Jerseys" />
            <meta property="og:title" content="Custom Men's Running Singlet. Fully printable - JAKROO" />
            <meta property="og:url" content="https://jakroo.com/product?id=64&modelId=apex" />
            <meta property="og:type" content="article" />
            <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/JakrooCustom.jpg" />
            <meta property="og:description" content="Fully customizable men's running singlet. Lightweight performance singlet. Design Online. 2 Week Delivery" />
            <link rel="canonical" href="https://jakroo.com/product?id=64&modelId=apex" />
            <link rel="author" href="https://jakroo.com/product?id=64&modelId=apex" />
            <link rel="alternate" href="https://designlab.jakroo.com/product?id=64&modelId=apex"/>
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/product?id=64&modelId=apex/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/product?id=64&modelId=apex/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/product?id=64&modelId=apex/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/product?id=64&modelId=apex/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/product?id=64&modelId=apex/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/product?id=64&modelId=apex/us?lang=en&currency=usd" />
          </Helmet>
        break
      case '7':
        metaData =
          <Helmet title="Custom Cycling Club Jersey. Ideal for all levels of cyclists - JAKROO">
            <meta name="description" content="Fully customizable cycling club jersey. Ideal for cycling clubs and recreational cyclists. Design Online. 2 Week Delivery" />
            <meta name="keywords" content="custom bicycle jerseys, custom bike jerseys, custom blank cycling jerseys, design your own cycling jersey" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Jerseys" />
            <meta property="og:title" content="Custom Cycling Club Jersey. Ideal for all levels of cyclists - JAKROO" />
            <meta property="og:url" content="https://jakroo.com/product?id=7&modelId=fondo" />
            <meta property="og:type" content="article" />
            <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/JakrooCustom.jpg" />
            <meta property="og:description" content="Fully customizable cycling club jersey. Ideal for cycling clubs and recreational cyclists. Design Online. 2 Week Delivery" />
            <link rel="canonical" href="https://jakroo.com/product?id=7&modelId=fondo" />
            <link rel="author" href="https://jakroo.com/product?id=7&modelId=fondo" />
            <link rel="alternate" href="https://designlab.jakroo.com/product?id=7&modelId=fondo"/>
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/product?id=7&modelId=fondo/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/product?id=7&modelId=fondo/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/product?id=7&modelId=fondo/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/product?id=7&modelId=fondo/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/product?id=7&modelId=fondo/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/product?id=7&modelId=fondo/us?lang=en&currency=usd" />
          </Helmet>
        break
      case '164':
        metaData =
          <Helmet title="Custom Cycling Race Jersey for Elite and Professional teams - JAKROO">
            <meta name="description" content="Fully customizable race jersey for cycling clubs or individuals. Premium Italian fabrics. Design Online. 2 Week Delivery." />
            <meta name="keywords" content="custom cycling jersey, custom road bike jersey, design your own cycling jersey. custom cycling kit" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Jerseys" />
            <meta property="og:title" content="Custom Cycling Race Jersey for Elite and Professional teams - JAKROO" />
            <meta property="og:url" content="https://jakroo.com/product?id=164&modelId=nova_pro" />
            <meta property="og:type" content="article" />
            <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/JakrooCustom.jpg" />
            <meta property="og:description" content="Fully customizable race jersey for cycling clubs or individuals. Premium Italian fabrics. Design Online. 2 Week Delivery." />
            <link rel="canonical" href="https://jakroo.com/product?id=164&modelId=nova_pro" />
            <link rel="author" href="https://jakroo.com/product?id=164&modelId=nova_pro" />
            <link rel="alternate" href="https://designlab.jakroo.com/product?id=164&modelId=nova_pro"/>
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/product?id=164&modelId=nova_pro/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/product?id=164&modelId=nova_pro/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/product?id=164&modelId=nova_pro/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/product?id=164&modelId=nova_pro/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/product?id=164&modelId=nova_pro/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/product?id=164&modelId=nova_pro/us?lang=en&currency=usd" />
          </Helmet>
        break
      default:
        metaData =
          <Helmet title={MAIN_TITLE}>
            <meta name="description" content="Design your custom cycling apparel today! Delivered in 2 Weeks or less. Customized cycling jerseys. Custom bike jerseys" />
            <meta name="keywords" content="custom mountain bike jerseys, custom cycling jerseys, custom triathlon suits, custom running shirts" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Jerseys" />
            <meta property="og:title" content="Custom Cycling Apparel for Teams, Clubs and Individuals - JAKROO" />
            <meta property="og:description" content="Design your custom cycling apparel today! Delivered in 2 Weeks or less. Customized cycling jerseys. Custom bike jerseys" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://jakroo.com" />
            <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/JakrooCustom.jpg" />
            <link rel="canonical" href="https://jakroo.com/" />
            <link rel="author" href="https://jakroo.com/" />
            <link rel="alternate" href="https://designlab.jakroo.com"/>
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/us?lang=en&currency=usd" />
          </Helmet>
        break
    }
    return metaData
    {/* tslint:enable:max-line-length */}
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
      // showBuyNowSection,
      selectedSize,
      selectedGender,
      selectedFit,
      selectedColor,
      openFitInfo,
      profileData,
      setLoadingModel,
      loadingImage,
      setLoadingImageAction,
      currentCurrency,
      data: { product: productData, error, loading },
      phone,
      designModalOpen,
    } = this.props

    const { formatMessage } = intl
    const { status, inline, comission } = get(
      profileData,
      'profileData.reseller',
      {}
    )
    const isReseller = status === APPROVED
    let product = productData

    const isRetail =
      product &&
      (product.retailMen || product.retailWomen || !product.customizable)

    if (isReseller) {
      const originalPriceRange = get(productData, 'priceRange', [])
      const comissionToApply = isRetail ? inline : comission
      const purchasePrices = originalPriceRange.map((priceItem) => {
        const price = (priceItem.price * (1 - comissionToApply / 100)).toFixed(
          2
        )
        return { ...priceItem, price }
      })
      product = { ...product, priceRange: purchasePrices }
    }

    const { showDetails, showFits, invalidData } = this.state
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
      customLink,
      yotpoAverageScore: reviewsScore,
      mpn: mpnCode,
      obj,
      id: productId,
      mtl,
      chart,
      templateZip,
      bannerMaterials,
      details: detailsOptions,
      mediaFiles,
      colors,
      relatedItemTag,
      fitStyles,
      youthCombined,
      hideFitStyles,
      sizeRange: sizesProduct,
      modelSize,
      infoFlag,
      infoMessage,
    } = product
    const { tone, hideControls } = this.state
    const moreTag = relatedItemTag ? relatedItemTag.replace(/_/g, ' ') : ''

    let renderPrices

    const {
      location: { search },
    } = this.props

    const queryParams = queryString.parse(search)

    const yotpoId = queryParams.modelId || ''
    const previousRoute = queryParams.ps || ''
    const gender = queryParams.gender || 0
    const idParam = queryParams.id || 0
    const colorId = selectedColor && selectedColor.id

    const searchObject = isRetail ? { colorId } : {}
    if (gender) {
      Object.assign(searchObject, { genderId: parseInt(gender, 10) })
    }

    const genderIndex = findIndex(imagesArray, searchObject)
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches

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
      abbreviation: currentCurrency || config.defaultCurrency,
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
      quantity: 'Personal',
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
      sizeRange = sizesProduct.filter(
        (genderItem) => genderItem.isYouth === youthSelected
      )
    }

    const availableSizes = sizeRange.map(
      ({ id, name: sizeName, isYouth }: SelectedType, index: number) => (
        <div key={index}>
          <SectionButton
            range={true}
            oneSize={sizeName === oneSize}
            id={String(id)}
            highlight={invalidData && !selectedSize.id}
            selected={id === selectedSize.id}
            onClick={this.handleSelectedSize({ id, name: sizeName, isYouth })}
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
            highlight={invalidData && !selectedFit.id}
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
            highlight={invalidData && !selectedColor.id}
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

    const fitSection = !!availableFits && !(hideFitStyles && youthSelected) && (
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
      quantity: 1,
    }
    itemDetails.push(detail)

    const itemToAdd = Object.assign({}, { product }, { itemDetails })
    const cartDisabled = !this.validCart()

    const addToCartRow = (
      <ButtonsRow disabled={cartDisabled}>
        <AddtoCartButton
          {...{ formatMessage }}
          onClick={this.validateAddtoCart}
          label={<CartLabel><CartIcon type="shopping-cart" />{formatMessage(messages.addToCartButtonLabel)}</CartLabel>}
          item={itemToAdd}
          itemProdPage={true}
          {...{ formatMessage }}
        />
        {customLink && (
          <StyledButtonWrapper marginLeft="24px">
            <CustomizeButton href={customLink}>
              <ColorWheel src={colorWheel} />
              {formatMessage(messages.customize)}
            </CustomizeButton>
          </StyledButtonWrapper>
        )}
      </ButtonsRow>
    )

    const sizeChartButton = !!chart && (
      <SizeChart onClick={this.goToChart} src={sizeChartSvg} />
    )

    const collectionSelection = (
      <BuyNowOptions
        innerRef={buyOption => {
          this.buyOptions = buyOption
        }}
      >
        {gendersSection}
        {colorsSection}
        {sizeSection}
        {sizeChartButton}
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
    let youthAvailable = false
    if (genders) {
      genders.forEach((genderItem: ItemDetailType) => {
        if (genderItem.name === 'Men') {
          menAvailable = true
        }
        if (genderItem.name === 'Women') {
          womenAvailable = true
        }
        if (genderItem.name === 'Youth') {
          youthAvailable = true
        }
      })
    }
    const validateShowCompare = COMPARABLE_PRODUCTS.includes(name)
    const routes: BreadRoute[] = [
      {
        url: '/',
        label: 'Home',
      },
    ]
    switch (previousRoute) {
      case 'product-catalogue':
        routes.push({
          url: '/product-catalogue',
          label: formatMessage(messages.productCatalog),
        })
        break
      case 'design-center':
        routes.push({
          url: `/design-center?id=${productId}`,
          label: formatMessage(messages.designCenter),
        })
        break
      default:
        break
    }
    routes.push({
      selected: true,
      label: name,
    })

    return (
      <Layout {...{ history, intl }} style={layoutStyle}>
        {this.getMetaData(idParam)}
        <Container>
          <BreadCrumbs {...{ history, formatMessage, routes }} />
          {isMobile &&
            <BackTopStyled>
              <BackButton><BackIcon type="up-circle" theme="twoTone" twoToneColor="#4596bf" /> UP</BackButton>
            </BackTopStyled>
          }
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
                        <Render3D
                          customProduct={true}
                          designId={0}
                          disableControls={isMobile ? hideControls : false}
                          textColor="white"
                          isProduct={true}
                          asImage={phone}
                          light={tone}
                          {...{ product, modelSize }}
                        />
                        {isMobile &&
                          <ThreeDButton
                            onTouchEnd={this.onTouchEndAction}
                            onTouchStart={this.setHideControls}
                            selected={!hideControls}
                            src={threeDviewIcon}
                          />
                        }
                        {infoFlag && <InfoTag>{infoMessage}</InfoTag>}
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
                                setLoadingImageAction,
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
                          setLoadingImageAction,
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
                      {youthAvailable && <YouthLabel>{formatMessage(messages.youth)}</YouthLabel>}
                    </Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                    <Subtitle>{`MPN: ${mpnCode}`}</Subtitle>
                  </TitleSubtitleContainer>
                  {validateShowCompare && renderCompareButton}
                </TitleRow>
                {isReseller && (
                  <DealerTitle>
                    {formatMessage(messages.dealerPricing)}
                  </DealerTitle>
                )}
                <PricesRow>{isRetail ? retailPrice : renderPrices}</PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  rating={get(reviewsScore, 'averageScore', 0)}
                  totalReviews={get(reviewsScore, 'total', 0)}
                  handleClickStars={this.handleClickStars}
                />
                {!isRetail && (
                  <MobileButtonWrapper>
                    <MobileButton onClick={this.openDesignModal}>
                      <ColorWheel src={colorWheel} />
                      {formatMessage(messages.customizeLabel)}
                    </MobileButton>
                  </MobileButtonWrapper>
                )}
                <MobileFlex>
                  {!isRetail && chart && <SizeChartCustomMobile onClick={this.goToChart} src={sizeChartSvg} />}
                  {templateZip && (
                    <MobileButtonTemplate onClick={this.openTemplate}>
                      <Download type="download" />
                      {formatMessage(messages.downloadTemplates)}
                    </MobileButtonTemplate>
                  )}
                </MobileFlex>
                <Description>{description}</Description>
                <BannerMaterialSection>
                  {bannerMaterials.map((banner: ProductFile) => (
                    <BannerMaterial src={banner.url} />
                  ))}
                </BannerMaterialSection>
                <ActionButtonsRow>
                  {!isRetail && (
                    <StyledButtonWrapper>
                      <StyledButton onClick={this.openDesignModal}>
                        <ColorWheel src={colorWheel} />
                        {formatMessage(messages.customizeLabel)}
                      </StyledButton>
                    </StyledButtonWrapper>
                  )}
                  {!isRetail && chart && <SizeChartCustom onClick={this.goToChart} src={sizeChartSvg} />}
                  {templateZip && (
                    <ButtonTemplate onClick={this.openTemplate}>
                      <Download type="download" />
                      {formatMessage(messages.downloadTemplates)}
                    </ButtonTemplate>
                  )}
                </ActionButtonsRow>
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
              productId,
              relatedItemTag,
              moreTag,
              name,
              history,
              formatMessage,
              currentCurrency,
            }}
            ref={this.customerReviewRef}
          />
        </Container>
        <StartDesignModal
          open={designModalOpen}
          onClose={this.closeDesignModal}
          {...{ formatMessage }}
          goToCustomize={this.gotoCustomize}
          goToProDesign={this.goToProDesign}
        />
      </Layout>
    )
  }
  closeDesignModal = () => {
    const { setDesignModalOpenAction } = this.props
    setDesignModalOpenAction(false)
  }
  openDesignModal = () => {
    const { setDesignModalOpenAction, data } = this.props
    const productId = get(data, 'product.id', '')
    if (onlyPro[productId]) {
      this.goToProDesign()
    } else {
      setDesignModalOpenAction(true)
    }
  }
  openTemplate = () => {
    const {
      data: { product: productData },
    } = this.props
    const { templateZip } = productData
    window.open(templateZip)
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
    const {
      setSelectedGenderAction,
      selectedSize,
      setSelectedSizeAction,
      setSelectedFitAction,
      data,
    } = this.props
    setSelectedGenderAction(gender)
    const youthCombined = get(data, 'product.youthCombined', false)
    const hideFitStyles = get(data, 'product.hideFitStyles', false)
    const genderYouth = gender && gender.name === 'Youth'
    if (youthCombined) {
      const youthSizeSelected = selectedSize && selectedSize.isYouth
      if (
        (!genderYouth && youthSizeSelected) ||
        (genderYouth && !youthSizeSelected)
      ) {
        setSelectedSizeAction({})
      }
    }
    if (genderYouth && hideFitStyles) {
      setSelectedFitAction({})
    }
    this.setState({ invalidData: false })
  }

  handleSelectedSize = (size: SelectedType) => () => {
    const { setSelectedSizeAction } = this.props
    setSelectedSizeAction(size)
    this.setState({ invalidData: false })
  }

  handleSelectedFit = (fitStyle: SelectedType) => () => {
    const { setSelectedFitAction } = this.props
    setSelectedFitAction(fitStyle)
    this.setState({ invalidData: false })
  }

  handleOpenFitInfo = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(true)
  }

  gotoCustomize = () => {
    const {
      history,
      data: { product },
    } = this.props
    const productId = get(product, 'id')

    history.push(`/design-center?id=${productId}`)
  }

  goToProDesign = () => {
    const {
      history,
      data: { product },
    } = this.props
    const productObj = {
      ...product,
      type: product.name,
      description: product.shortDescription,
    }
    history.push({
      pathname: `/pro-design`,
      state: {
        product: productObj,
      },
    })
  }

  gotoGetFittedPage = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  goToChart = () => {
    const { data } = this.props
    const chart = get(data, 'product.chart', '')
    window.open(chart)
  }

  gotoCompare = () => {
    const { history } = this.props
    history.push('/jersey-comparison')
  }

  validCart = () => {
    const {
      selectedSize,
      selectedGender,
      selectedColor,
      selectedFit,
      data: { product },
    } = this.props
    const fitStyles = get(product, 'fitStyles', []) as SelectedType[]
    const hideFitStyles = get(product, 'hideFitStyles', false)
    const youthGender = selectedGender && selectedGender.name === 'Youth'
    if (fitStyles.length && fitStyles[0].id) {
      return (
        selectedSize.id >= 0 &&
        ((selectedFit && selectedFit.id && !(hideFitStyles && youthGender)) ||
          (hideFitStyles && youthGender)) &&
        selectedColor.id &&
        selectedGender.id
      )
    }
    return selectedSize.id >= 0 && selectedColor.id && selectedGender.id
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
  const responsive = state.get('responsive').toJS()
  const app = state.get('app').toJS()
  return {
    ...productDetail,
    ...menu,
    ...menuSports,
    ...langProps,
    ...responsive,
    ...app,
  }
}

type OwnProps = {
  productId?: number
  match?: any
  location?: any
  user?: UserType
}

const ProductDetailEnhance = compose(
  connect(
    mapStateToProps,
    { ...productDetailActions }
  ),
  injectIntl,
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => ({
      fetchPolicy: 'network-only',
      skip: !user,
    }),
    name: 'profileData',
  }),
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search },
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          id: queryParams ? queryParams.id : null,
        },
        fetchPolicy: 'network-only',
      }
    },
  })
)(ProductDetail)

export default ProductDetailEnhance
