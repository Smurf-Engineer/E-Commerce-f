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
  LoadingContainer
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
  BreadRoute
} from '../../types/common'
import Modal from '../../components/Common/JakrooModal'
import Render3D from '../../components/Render3D'
import ImagesSlider from '../../components/ImageSlider'
import PriceQuantity from '../../components/PriceQuantity'
import Ratings from '../../components/Ratings'
import FitInfo from '../../components/FitInfo'
import AddtoCartButton from '../../components/AddToCartButton'
import ProductInfo from '../../components/ProductInfo'
import config from '../../config/index'
import { ProductGenders } from '../ProductDetail/constants'
import YotpoSection from '../../components/YotpoSection'
import { BLUE, GRAY_DARK } from '../../theme/colors'
import BreadCrumbs from '../../components/BreadCrumbs'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Spin from 'antd/lib/spin'

const MAX_AMOUNT_PRICES = 4
const teamStoreLabels = ['regularPrice', 'teamPrice']
const { Men, Women, Unisex } = ProductGenders

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
  showFitsModal: boolean
  phone: boolean
  loading: boolean
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
}

export class CustomProductDetail extends React.Component<Props, {}> {
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    this.handleSetLoading(false)
  }

  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
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
      openFitInfo,
      setLoadingModel,
      showDetails,
      currentCurrency,
      showFitsModal,
      loading,
      phone
    } = this.props
    const { formatMessage } = intl

    const queryParams = queryString.parse(search)

    const ownedDesign = get(design, 'canEdit', false)
    const product = get(design, 'product', null)
    const productPriceRange = get(product, 'priceRange', null)
    const proDesignAssigned = get(design, 'png', '') && !get(design, 'svg', '')
    const teamStoreItem = queryParams.item

    if (loading || dataLoading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (!product || error) {
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
    const designCode = get(design, 'code', '')
    const teamPrice = get(design, 'teamPrice', '')
    const teamEnable = get(design, 'teamEnable', '')
    const teamOnDemand = get(design, 'teamOnDemand', '')
    const teamName = get(design, 'teamName', '')
    const proDesign = get(design, 'proDesign', false)
    const {
      images: imagesArray,
      genders,
      name,
      type,
      yotpoAverageScore,
      description,
      yotpoId,
      sizeRange,
      fitStyles,
      details,
      materials,
      mediaFiles,
      modelSize,
      id: productId,
      bannerMaterials,
      relatedItemTag
    } = product
    const totalReviews = get(yotpoAverageScore, 'total', 0)
    const rating = get(yotpoAverageScore, 'averageScore', 0)
    const genderId = selectedGender ? selectedGender.id : 0
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

    const hasFixedPrices = teamPrice && teamPrice.length
    let priceRange: PriceRange[] = []
    if (teamStoreItem) {
      const regularPrices = filter(
        productPriceRange,
        ({ quantity }) =>
          quantity === 'Personal' || (quantity === '2-5' && !hasFixedPrices)
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

    const symbol = currencyPrices.length ? currencyPrices[0].shortName : ''
    const renderPrices =
      currencyPrices &&
      currencyPrices.length &&
      currencyPrices.map(
        ({ price, quantity }, index: number) =>
          index < MAX_AMOUNT_PRICES && (
            <AvailablePrices key={index}>
              <PriceQuantity
                {...{ index, price, symbol, teamStoreItem }}
                priceColor={index > 0 && teamStoreItem ? BLUE : GRAY_DARK}
                quantity={
                  teamStoreItem
                    ? formatMessage(messages[teamStoreLabels[index]])
                    : quantity
                }
              />
            </AvailablePrices>
          )
      )

    const maleGender = genders.find(x => x.name === Men)
    const femaleGender = genders.find(x => x.name === Women)
    const unisexGender = genders.find(x => x.name === Unisex)

    let genderMessage = messages.maleGenderLabel
    if (unisexGender) {
      genderMessage = messages.unisexGenderLabel
    } else if (femaleGender) {
      genderMessage = maleGender
        ? messages.unisexGenderLabel
        : messages.femaleGenderLabel
    }

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
      sizeRange.map(({ id, name: sizeName }: ItemDetailType, key: number) => (
        <div {...{ key }}>
          <SectionButton
            id={String(id)}
            selected={id === selectedSize.id}
            onClick={this.handleSelectedSize({
              id: Number(id),
              name: String(sizeName)
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

    const fitSection = !isEmpty(fitStyles) && fitStyles[0].id && (
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
          isFixed={!teamOnDemand}
          teamStoreId={teamStoreShortId}
          fixedPrices={teamPrice}
          {...{ designId, designName, designImage, teamStoreItem }}
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
          {design && !loading && (
            <Content>
              <ImagePreview>
                <RenderContainer>
                  <Render3D
                    customProduct={true}
                    textColor="white"
                    {...{ designId, modelSize }}
                    zoomedIn={true}
                    asImage={phone}
                  />
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
                  {...{ rating, totalReviews }}
                />
                <Description>{description}</Description>
                <AvailableLabel>{formatMessage(genderMessage)}</AvailableLabel>
                <BannerMaterialSection>
                  {bannerMaterials.map((banner: ProductFile) => (
                    <BannerMaterial src={banner.url} />
                  ))}
                </BannerMaterialSection>
                {((teamStoreItem && teamEnable) || !teamStoreItem) &&
                  collectionSelection}
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
              currentCurrency
            }}
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
  }

  handleSelectedSize = (size: SelectedType) => () => {
    const { setSelectedSizeAction } = this.props
    setSelectedSizeAction(size)
  }

  handleSelectedGender = (gender: SelectedType) => () => {
    const { setSelectedGenderAction } = this.props
    setSelectedGenderAction(gender)
  }

  handleSetLoading = (loading: boolean) => {
    const { setLoadingAction } = this.props
    setLoadingAction(loading)
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
    const {
      selectedSize,
      selectedGender,
      selectedFit,
      data: { design }
    } = this.props
    const fitStyles = get(design.product, 'fitStyles', []) as SelectedType[]
    if (fitStyles.length && fitStyles[0].id) {
      return (
        selectedSize.id >= 0 &&
        selectedFit &&
        selectedFit.id &&
        selectedGender.id
      )
    }
    return selectedSize.id >= 0 && selectedGender.id
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
  connect(mapStateToProps, { ...customProductDetailActions }),
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
