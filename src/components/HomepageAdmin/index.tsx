/**
 * HomepageAdminActions Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import {
  setMainHeaderMutation,
  setSecondaryHeaderMutation,
  productsQuery,
  setFeaturedProductsMutation,
  deleteFeaturedProductMutation,
  getHomepageInfo,
  updateProductTilesMutation
} from './data'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { FormattedMessage } from 'react-intl'
import CarouselModal from '../CarouselModal'
import * as HomepageAdminActions from './actions'
import { Sections } from './constants'
import * as homepageAdminApiActions from './api'
import MainHeader from './MainHeader'
import SecondaryHeader from './SecondaryHeader'
import FeaturedProducts from './FeaturedProducts'
import Tiles from './Tiles'
import {
  Container,
  ScreenTitle,
  SpinContainer,
  Goback
} from './styledComponents'
import messages from './messages'
import { EMPTY_TILE, HOMEPAGE_LABEL, EMPTY_HEADER } from './constants'
import {
  Product,
  ProductType,
  ProductTiles,
  MessagePayload,
  HeaderImagePlaceHolder,
  HeaderImageResponse,
  ProductTilePlaceHolder,
  CarouselSettings
} from '../../types/common'
import { History } from 'history'

interface Props {
  history: History
  desktopImage: string
  client: any
  mainHeader: any
  mainHeaderLoading: any
  secondaryHeaderLoading: any
  loaders: any
  secondaryHeader: any
  limit: number
  offset: number
  currentPage: number
  fullCount: string
  products: Product[]
  selectedItems: any
  productsModalOpen: boolean
  items: any
  productTiles: ProductTiles[]
  previewOpen: boolean
  secondaryHeaderCarousel: CarouselSettings
  mainHeaderCarousel: CarouselSettings
  currentPreview: string
  formatMessage: (messageDescriptor: any) => string
  setMainHeader: (variables: {}) => Promise<any>
  setSecondaryHeader: (variables: {}) => Promise<any>
  setFeaturedProducts: (variables: {}) => Promise<any>
  openModalAction: (open: boolean) => void
  deleteFromTableAction: (id: number) => void
  setItemsAddAction: () => void
  deleteItemSelectedAction: (id: number) => void
  setItemSelectedAction: (item: any, checked: boolean) => void
  setProductsData: (data: ProductType, offset: number, page: number) => void
  setLoadersAction: (section: string, loading: boolean) => void
  setHomepageInfoAction: (data: any) => void
  setUrlListAction: (value: string, index: number, section: string) => void
  uploadFileAction: (
    file: any,
    section: string,
    imageType: string,
    index: number
  ) => void
  deleteFeaturedProduct: (variables: {}) => Promise<any>
  uploadProductFileAction: (
    file: File,
    index: number
  ) => Promise<MessagePayload>
  updateProductTiles: (variables: {}) => Promise<void>
  setTilesTextAction: (index: number, section: string, value: string) => void
  removeTileDataAction: (index: number) => void
  removeMainHeaderAction: (index: number, type: string) => void
  removeHeaderAction: (index: number, type: string) => void
  addMoreImagesAction: (imagePlaceholder: HeaderImagePlaceHolder) => void
  addMoreTilesAction: (tilePlaceholder: ProductTilePlaceHolder) => void
  updatePlaceHolderListAction: (
    list: [HeaderImagePlaceHolder],
    section: string
  ) => void
  updateProductTilesListAction: (tilesList: [ProductTilePlaceHolder]) => void
  addCarouselItemAction: (imagePlaceholder: HeaderImagePlaceHolder) => void
  togglePreviewModalAction: (section?: string) => void
  setDurationAction: (section: string, duration: string) => void
  setTransitionAction: (section: string, transition: string) => void
}

class HomepageAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      setLoadersAction,
      setHomepageInfoAction,
      client: { query }
    } = this.props
    const routeParam = this.getRouteParam()
    try {
      setLoadersAction(Sections.MAIN_CONTAINER, true)
      const response = await query({
        query: getHomepageInfo,
        variables: { route: routeParam },
        fetchPolicy: 'network-only'
      })
      await this.handleOnChangePage()
      const {
        id,
        featuredProducts,
        homepageImages,
        mainHeaderImages,
        productTiles,
        carouselSettings
      } = response.data.getHomepageContent
      const items = featuredProducts.map((item: Product) => {
        return { visible: true, product: item }
      })
      const cleanData = {
        id,
        items,
        homepageImages,
        mainHeaderImages,
        headerImageLink: '',
        headerImage: '',
        headerImageMobile: '',
        productTiles,
        mainHeaderCarousel: {
          duration: carouselSettings.slideDuration,
          transition: carouselSettings.slideTransition
        },
        secondaryHeaderCarousel: {
          duration: carouselSettings.secondarySlideDuration,
          transition: carouselSettings.secondarySlideTransition
        }
      }
      setHomepageInfoAction(cleanData)
      setLoadersAction(Sections.MAIN_CONTAINER, false)
    } catch (e) {
      console.error(e)
    }
  }

  handleOnUploadFile = async (
    file: any,
    section: string,
    imageType: string,
    index: number = -1
  ) => {
    const { uploadFileAction } = this.props
    await uploadFileAction(file, section, imageType, index)
  }
  handleOnUploadProductFile = async (file: File, index: number) => {
    const { uploadProductFileAction } = this.props
    await uploadProductFileAction(file, index)
  }

  handleOnSaveMainHeader = async () => {
    try {
      const {
        setMainHeader,
        mainHeader,
        setLoadersAction,
        updatePlaceHolderListAction,
        formatMessage,
        mainHeaderCarousel: { duration, transition },
        history: {
          location: {
            state: { sportId }
          }
        }
      } = this.props
      setLoadersAction(Sections.MAIN_HEADER, true)

      const homepageImages = mainHeader
        .filter(
          (item: HeaderImagePlaceHolder) =>
            item.id || item.desktopImage || item.mobileImage
        )
        .map((item: HeaderImagePlaceHolder) => ({
          id: item.id,
          image: item.desktopImage,
          image_mobile: item.mobileImage,
          link: item.url,
          sport_id: sportId,
          type: item.assetType
        }))

      const {
        data: { setMainHeader: response }
      } = await setMainHeader({
        variables: {
          homepageImages,
          duration,
          transition
        }
      })

      const mainHeaderList = response.map(
        ({
          id,
          sport_id,
          image,
          image_mobile,
          link,
          type
        }: HeaderImageResponse) => {
          return {
            id,
            sport_id,
            desktopImage: image,
            mobileImage: image_mobile,
            url: link,
            assetType: type
          }
        }
      )
      updatePlaceHolderListAction(mainHeaderList, Sections.MAIN_HEADER)
      message.success(formatMessage(messages.updatedHeaderSuccess))
      setLoadersAction(Sections.MAIN_HEADER, false)
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnSaveSecondaryHeader = async () => {
    try {
      const {
        setSecondaryHeader,
        secondaryHeader,
        setLoadersAction,
        updatePlaceHolderListAction,
        formatMessage,
        secondaryHeaderCarousel: { duration, transition },
        history: {
          location: {
            state: { sportId }
          }
        }
      } = this.props
      setLoadersAction(Sections.SECONDARY_HEADER, true)

      const homepageImages = secondaryHeader
        .filter(
          (item: HeaderImagePlaceHolder) =>
            item.id || item.desktopImage || item.mobileImage
        )
        .map((item: HeaderImagePlaceHolder) => ({
          id: item.id,
          image: item.desktopImage,
          image_mobile: item.mobileImage,
          link: item.url,
          sport_id: sportId,
          type: item.assetType
        }))

      const {
        data: { setSecondaryHeader: response }
      } = await setSecondaryHeader({
        variables: {
          homepageImages,
          duration,
          transition
        }
      })
      const secondaryHeaderList = response.map(
        ({
          id,
          sport_id,
          image,
          image_mobile,
          link,
          type
        }: HeaderImageResponse) => {
          return {
            id,
            sport_id,
            desktopImage: image,
            mobileImage: image_mobile,
            url: link,
            assetType: type
          }
        }
      )
      updatePlaceHolderListAction(
        secondaryHeaderList,
        Sections.SECONDARY_HEADER
      )
      message.success(formatMessage(messages.updatedHeaderSuccess))
      setLoadersAction(Sections.SECONDARY_HEADER, false)
    } catch (e) {
      message.error(e.message)
    }
  }
  // TODO
  handleOnChangePage = async (page: number = 1) => {
    const { limit } = this.props
    const offset = page > 1 ? (page - 1) * limit : 0
    try {
      this.fetchDesigns(offset, page)
    } catch (e) {
      console.error(e)
    }
  }
  fetchDesigns = async (offsetParam?: number, pageParam?: number) => {
    const {
      client: { query },
      offset: offsetProp,
      currentPage: pageProp,
      limit,
      setProductsData
    } = this.props
    let offset = offsetParam !== undefined ? offsetParam : offsetProp
    let currentPage = pageParam !== undefined ? pageParam : pageProp

    if (!offsetParam && !pageParam) {
      const fullPage = !(offset % limit)
      const maxPageNumber = offset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        offset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }

    try {
      const data = await query({
        query: productsQuery,
        variables: { limit, offset },
        fetchPolicy: 'network-only'
      })
      setProductsData(data, offset, currentPage)
    } catch (e) {
      throw e
    }
  }
  handleOnSelectItem = (item: any, checked: boolean) => {
    const { setItemSelectedAction, deleteItemSelectedAction } = this.props
    if (!checked) {
      return deleteItemSelectedAction(item.product.id)
    }
    setItemSelectedAction(item, checked)
  }
  handleAddNewItems = async () => {
    const {
      setItemsAddAction,
      items,
      selectedItems,
      setFeaturedProducts,
      history: {
        location: {
          state: { sportId }
        }
      }
    } = this.props
    setItemsAddAction()
    const itemsToSave = selectedItems.concat(items)
    const idCollection = itemsToSave.map((item: any) => item.product.id)
    try {
      const response = await setFeaturedProducts({
        variables: {
          products: idCollection,
          sportId
        }
      })
      message.success(get(response, 'data.setFeaturedProducts.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  handleDeleteFromTable = async (index: number, id?: number) => {
    const { deleteFromTableAction, deleteFeaturedProduct } = this.props
    deleteFromTableAction(index)
    try {
      await deleteFeaturedProduct({
        variables: {
          id
        }
      })
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnSaveProductTiles = async () => {
    const {
      productTiles = [],
      setLoadersAction,
      updateProductTiles,
      updateProductTilesListAction,
      formatMessage,
      history: {
        location: {
          state: { sportId }
        }
      }
    } = this.props
    setLoadersAction(Sections.PRODUCT_TILES, true)
    const products = productTiles.map((item: ProductTiles) => ({
      id: item.id,
      image: item.image,
      content_tile: item.contentTile,
      title: item.title,
      sport_id: sportId
    }))
    try {
      const response = await updateProductTiles({
        variables: { products }
      })
      const dataResponse = get(response, 'data.updateProductTiles', {})
      updateProductTilesListAction(dataResponse)
      message.success(formatMessage(messages.updatedProducTilesMsg))
    } catch (e) {
      message.error(e.message)
    }
    setLoadersAction(Sections.PRODUCT_TILES, false)
  }

  handleGoback = () => {
    const { history } = this.props
    history.goBack()
  }

  handleAddCarouselItem = (assetType: string) => {
    const {
      addCarouselItemAction,
      mainHeader,
      history: {
        location: {
          state: { sportId }
        }
      }
    } = this.props
    if (mainHeader.length < 6) {
      const newPlaceholder = {
        ...EMPTY_HEADER,
        sport_id: sportId || null,
        assetType
      }
      addCarouselItemAction(newPlaceholder)
    }
  }

  handleAddMoreImages = (assetType: string) => {
    const {
      addMoreImagesAction,
      secondaryHeader,
      history: {
        location: {
          state: { sportId }
        }
      }
    } = this.props
    if (secondaryHeader.length < 6) {
      const newPlaceholder = {
        ...EMPTY_HEADER,
        sport_id: sportId || null,
        assetType
      }
      addMoreImagesAction(newPlaceholder)
    }
  }

  handleAddMoreTiles = () => {
    const {
      addMoreTilesAction,
      productTiles,
      history: {
        location: {
          state: { sportId }
        }
      }
    } = this.props
    if (!productTiles || productTiles.length < 3) {
      const newTile = { ...EMPTY_TILE, sportId }
      addMoreTilesAction(newTile)
    }
  }

  getRouteParam = () => {
    const {
      history: {
        location: { pathname }
      }
    } = this.props
    return pathname.split('/').pop()
  }

  render() {
    const {
      formatMessage,
      desktopImage,
      mainHeader,
      mainHeaderLoading,
      secondaryHeaderLoading,
      products,
      currentPage,
      fullCount,
      limit,
      loaders: {
        mainContainer,
        mainHeader: mainHeaderLoader,
        secondaryHeader: secondaryHeaderLoader,
        productTiles: productTilesLoader
      },
      secondaryHeader,
      selectedItems,
      productsModalOpen,
      items,
      openModalAction,
      setUrlListAction,
      productTiles,
      setTilesTextAction,
      removeTileDataAction,
      removeHeaderAction,
      removeMainHeaderAction,
      previewOpen,
      togglePreviewModalAction,
      setDurationAction,
      setTransitionAction,
      mainHeaderCarousel,
      secondaryHeaderCarousel,
      currentPreview,
      history: {
        location: {
          state: { sportName }
        }
      }
    } = this.props

    return mainContainer ? (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    ) : (
      <Container>
        <Goback onClick={this.handleGoback}>
          <Icon type="left" />
          <FormattedMessage {...messages.backToEditNavigation} />
        </Goback>
        <ScreenTitle>
          <FormattedMessage
            {...messages.title}
            values={{
              title: sportName || HOMEPAGE_LABEL
            }}
          />
        </ScreenTitle>
        <MainHeader
          onUploadFile={this.handleOnUploadFile}
          setUrl={setUrlListAction}
          onSaveHeader={this.handleOnSaveMainHeader}
          saving={mainHeaderLoader}
          handleAddMoreImages={this.handleAddCarouselItem}
          removeImage={removeMainHeaderAction}
          openPreview={togglePreviewModalAction}
          onSetDuration={setDurationAction}
          setTransition={setTransitionAction}
          carouselSettings={mainHeaderCarousel}
          {...{
            desktopImage,
            formatMessage,
            mainHeader,
            loading: mainHeaderLoading,
            mainHeaderLoader
          }}
        />
        <SecondaryHeader
          onUploadFile={this.handleOnUploadFile}
          setUrl={setUrlListAction}
          onSaveHeader={this.handleOnSaveSecondaryHeader}
          saving={secondaryHeaderLoader}
          removeImage={removeHeaderAction}
          handleAddMoreImages={this.handleAddMoreImages}
          openPreview={togglePreviewModalAction}
          onSetDuration={setDurationAction}
          setTransition={setTransitionAction}
          carouselSettings={secondaryHeaderCarousel}
          {...{
            desktopImage,
            formatMessage,
            loading: secondaryHeaderLoading,
            secondaryHeader
          }}
        />
        <FeaturedProducts
          {...{
            formatMessage,
            products,
            currentPage,
            fullCount,
            limit,
            selectedItems,
            productsModalOpen,
            items
          }}
          changePage={this.handleOnChangePage}
          onSelectItem={this.handleOnSelectItem}
          onPressDelete={this.handleDeleteFromTable}
          openModal={openModalAction}
          setItemsAdd={this.handleAddNewItems}
        />
        <Tiles
          onUploadFile={this.handleOnUploadProductFile}
          {...{ formatMessage, productTiles }}
          saving={productTilesLoader}
          onSave={this.handleOnSaveProductTiles}
          onChangeText={setTilesTextAction}
          removeImage={removeTileDataAction}
          handleAddMoreTiles={this.handleAddMoreTiles}
        />
        <CarouselModal
          visible={previewOpen}
          items={
            currentPreview === Sections.MAIN_HEADER
              ? mainHeader
              : secondaryHeader
          }
          carouselSettings={
            currentPreview === Sections.MAIN_HEADER
              ? mainHeaderCarousel
              : secondaryHeaderCarousel
          }
          requestClose={togglePreviewModalAction}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('homepageAdmin').toJS()
const mapDispatchToProps = {
  ...HomepageAdminActions,
  ...homepageAdminApiActions
}

const HomepageAdminEnhance = compose(
  withApollo,
  setMainHeaderMutation,
  setSecondaryHeaderMutation,
  setFeaturedProductsMutation,
  deleteFeaturedProductMutation,
  updateProductTilesMutation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomepageAdmin)

export default HomepageAdminEnhance
