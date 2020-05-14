/**
 * HomepageAdminActions Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Icon from 'antd/lib/icon'
import {
  setMainHeaderMutation,
  productsQuery,
  setFeaturedProductsMutation,
  deleteFeaturedProductMutation,
  getHomepageInfo,
  updateProductTilesMutation,
  saveBannersMutation,
} from './data'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { FormattedMessage } from 'react-intl'
import CarouselModal from '../CarouselModal'
import * as HomepageAdminActions from './actions'
import { Sections, validTypes } from './constants'
import * as homepageAdminApiActions from './api'
import CarouselHeader from './CarouselHeader'
import FeaturedProducts from './FeaturedProducts'
import Tiles from './Tiles'
import {
  Container,
  ScreenTitle,
  SpinContainer,
  Goback,
  MediaSection,
  Buttons,
  AddButton,
  RowInput,
  Label,
  SaveSection,
  SaveButton,
  LoadingContainer,
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
  CarouselSettings,
  Message,
  UserPermissions,
  ProductFile,
  UploadFile,
} from '../../types/common'
import { History } from 'history'
import { EDIT_NAVIGATION } from '../AdminLayout/constants'
import MediaBlock from '../ProductForm/Steps/FourthStep/MediaBlock'
import Draggable from '../Draggable'

interface Props {
  history: History
  desktopImage: string
  client: any
  mainHeader: HeaderImagePlaceHolder[]
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
  permissions: UserPermissions
  featuredBanners: [ProductFile]
  loadingBanner: boolean
  setLoading: (loading: boolean) => void
  addMedia: (value: ProductFile) => void
  removeMedia: (index: number) => void
  moveFile: (index: number, indexTo: number) => void
  uploadMediaAction: (
    event: UploadFile
  ) => void
  setLoadingAction: (loading: boolean) => void
  formatMessage: (messageDescriptor: Message) => string
  setMainHeader: (variables: {}) => Promise<any>
  saveBanners: (variables: {}) => Promise<MessagePayload>
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
    file: File,
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
  removeHeaderAction: (index: number, type: string, section: string) => void
  addMoreTilesAction: (tilePlaceholder: ProductTilePlaceHolder) => void
  updatePlaceHolderListAction: (
    list: [HeaderImagePlaceHolder],
    section: string
  ) => void
  updateProductTilesListAction: (tilesList: [ProductTilePlaceHolder]) => void
  addCarouselItemAction: (
    imagePlaceholder: HeaderImagePlaceHolder,
    section: string
  ) => void
  togglePreviewModalAction: (section?: string) => void
  setDurationAction: (section: string, duration: string) => void
  setTransitionAction: (section: string, transition: string) => void
}

const MAX_ITEMS = 8
class HomepageAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      setLoadersAction,
      setHomepageInfoAction,
      client: { query },
    } = this.props
    const routeParam = this.getRouteParam()
    try {
      setLoadersAction(Sections.MAIN_CONTAINER, true)
      const response = await query({
        query: getHomepageInfo,
        variables: { route: routeParam },
        fetchPolicy: 'network-only',
      })
      await this.handleOnChangePage()
      const {
        id,
        featuredProducts,
        homepageImages,
        mainHeaderImages,
        productTiles,
        featuredBanners,
        carouselSettings,
      } = response.data.getHomepageContent
      const items = featuredProducts.map((item: Product) => {
        return { visible: true, product: item }
      })
      const cleanData = {
        id,
        items,
        homepageImages,
        featuredBanners,
        mainHeaderImages,
        headerImageLink: '',
        headerImage: '',
        headerImageMobile: '',
        productTiles,
        mainHeaderCarousel: {
          duration: carouselSettings.slideDuration,
          transition: carouselSettings.slideTransition,
        },
        secondaryHeaderCarousel: {
          duration: carouselSettings.secondarySlideDuration,
          transition: carouselSettings.secondarySlideTransition,
        },
      }
      setHomepageInfoAction(cleanData)
      setLoadersAction(Sections.MAIN_CONTAINER, false)
    } catch (e) {
      console.error(e)
    }
  }

  handleOnUploadFile = async (
    file: File,
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
            state: { sportId },
          },
        },
      } = this.props
      setLoadersAction(Sections.MAIN_HEADER, true)

      const homepageImages = mainHeader.reduce(
        (filtered: HeaderImagePlaceHolder[], item: HeaderImagePlaceHolder) => {
          if (item.id || item.desktopImage || item.mobileImage) {
            filtered.push({
              id: item.id,
              image: item.desktopImage,
              image_mobile: item.mobileImage,
              link: item.url,
              sport_id: sportId,
              type: item.assetType,
            })
          }
          return filtered
        },
        []
      )

      const {
        data: { setMainHeader: response },
      } = await setMainHeader({
        variables: {
          homepageImages,
          duration,
          transition,
          mainHeader: true,
        },
      })

      const mainHeaderList = response.map(
        ({
          id,
          sport_id,
          image,
          image_mobile,
          link,
          type,
        }: HeaderImageResponse) => {
          return {
            id,
            sport_id,
            desktopImage: image,
            mobileImage: image_mobile,
            url: link,
            assetType: type,
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
        setMainHeader,
        secondaryHeader,
        setLoadersAction,
        updatePlaceHolderListAction,
        formatMessage,
        secondaryHeaderCarousel: { duration, transition },
        history: {
          location: {
            state: { sportId },
          },
        },
      } = this.props
      setLoadersAction(Sections.SECONDARY_HEADER, true)

      const homepageImages = secondaryHeader.reduce(
        (filtered: HeaderImagePlaceHolder[], item: HeaderImagePlaceHolder) => {
          if (item.id || item.desktopImage || item.mobileImage) {
            filtered.push({
              id: item.id,
              image: item.desktopImage,
              image_mobile: item.mobileImage,
              link: item.url,
              sport_id: sportId,
              type: item.assetType,
            })
          }
          return filtered
        },
        []
      )

      const {
        data: { setMainHeader: response },
      } = await setMainHeader({
        variables: {
          homepageImages,
          duration,
          transition,
          mainHeader: false,
        },
      })
      const secondaryHeaderList = response.map(
        ({
          id,
          sport_id,
          image,
          image_mobile,
          link,
          type,
        }: HeaderImageResponse) => {
          return {
            id,
            sport_id,
            desktopImage: image,
            mobileImage: image_mobile,
            url: link,
            assetType: type,
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
      setProductsData,
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
        fetchPolicy: 'network-only',
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
          state: { sportId },
        },
      },
    } = this.props
    setItemsAddAction()
    const itemsToSave = selectedItems.concat(items)
    const idCollection = itemsToSave.map((item: any) => item.product.id)
    try {
      const response = await setFeaturedProducts({
        variables: {
          products: idCollection,
          sportId,
        },
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
          id,
        },
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
          state: { sportId },
        },
      },
    } = this.props
    setLoadersAction(Sections.PRODUCT_TILES, true)
    const products = productTiles.map((item: ProductTiles) => ({
      id: item.id,
      image: item.image,
      content_tile: item.contentTile,
      title: item.title,
      sport_id: sportId,
    }))
    try {
      const response = await updateProductTiles({
        variables: { products },
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

  handleAddCarouselItem = (assetType: string, section: string) => {
    const {
      addCarouselItemAction,
      mainHeader,
      secondaryHeader,
      history: {
        location: {
          state: { sportId },
        },
      },
    } = this.props
    const currentSection =
      section === Sections.MAIN_HEADER ? mainHeader : secondaryHeader
    if (currentSection.length < MAX_ITEMS) {
      const newPlaceholder = {
        ...EMPTY_HEADER,
        sport_id: sportId || null,
        assetType,
      }
      addCarouselItemAction(newPlaceholder, section)
    }
  }

  handleAddMoreTiles = () => {
    const {
      addMoreTilesAction,
      productTiles,
      history: {
        location: {
          state: { sportId },
        },
      },
    } = this.props
    if (!productTiles || productTiles.length < 3) {
      const newTile = { ...EMPTY_TILE, sportId }
      addMoreTilesAction(newTile)
    }
  }

  getRouteParam = () => {
    const {
      history: {
        location: { pathname },
      },
    } = this.props
    return pathname.split('/').pop()
  }

  handleAddImage = () => {
    const { addMedia, featuredBanners } = this.props
    const id = featuredBanners.length + 1
    addMedia({ id, isVideo: false })
  }

  beforeUploadMedia = (file: any) => {
    const { formatMessage } = this.props
    const isValidType = validTypes.includes(file.type)
    if (!isValidType) {
      message.error(formatMessage(messages.invalidFile))
    }
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
      message.error(formatMessage(messages.sizeError))
    }
    return isValidType && isLt2M
  }

  handleOnDropRow = (dragIndex: number, dropIndex: number) => {
    const { moveFile } = this.props
    moveFile(dragIndex, dropIndex)
  }

  removeMediaFile = (index: number) => {
    const { removeMedia } = this.props
    removeMedia(index)
  }

  handleSaveBanners = async () => {
    const {
      featuredBanners: localBanners,
      saveBanners,
      setLoadingAction,
      history: {
        location: {
          state: { sportId },
        },
      },
    } = this.props
    try {
      setLoadingAction(true)
      const featuredBanners = localBanners.map(
        ({ isVideo, url, urlMobile }: ProductFile) => ({ isVideo, url, urlMobile }))
      const response = await saveBanners({
        variables: { featuredBanners, sportId }
      })
      message.success(get(response, 'data.saveBanners.message', ''))
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoadingAction(false)
    }
  }

  handleAddVideo = () => {
    const { addMedia, featuredBanners } = this.props
    const id = featuredBanners.length + 1
    addMedia({ id, isVideo: true })
  }

  render() {
    const {
      formatMessage,
      desktopImage,
      uploadMediaAction,
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
        productTiles: productTilesLoader,
      },
      secondaryHeader,
      selectedItems,
      loadingBanner,
      productsModalOpen,
      items,
      featuredBanners = [],
      permissions,
      openModalAction,
      setUrlListAction,
      productTiles,
      setTilesTextAction,
      removeTileDataAction,
      removeHeaderAction,
      previewOpen,
      togglePreviewModalAction,
      setDurationAction,
      setTransitionAction,
      mainHeaderCarousel,
      secondaryHeaderCarousel,
      currentPreview,
      history: {
        location: {
          state: { sportName },
        },
      },
    } = this.props
    const access = permissions[EDIT_NAVIGATION] || {}
    if (!access.edit) {
      return null
    }
    let videoCount = 1
    let imageCount = 1
    const counter = featuredBanners.reduce(
      (count: number[], item: ProductFile, index: number) => {
        if (item.isVideo) {
          count[index] = videoCount
          videoCount++
        } else {
          count[index] = imageCount
          imageCount++
        }
        return count
        // tslint:disable-next-line: align
      },
      []
    )
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
                title: sportName || HOMEPAGE_LABEL,
              }}
            />
          </ScreenTitle>
          <CarouselHeader
            section={Sections.MAIN_HEADER}
            onUploadFile={this.handleOnUploadFile}
            setUrl={setUrlListAction}
            onSaveHeader={this.handleOnSaveMainHeader}
            saving={mainHeaderLoader}
            handleAddMoreImages={this.handleAddCarouselItem}
            removeImage={removeHeaderAction}
            openPreview={togglePreviewModalAction}
            onSetDuration={setDurationAction}
            setTransition={setTransitionAction}
            carouselSettings={mainHeaderCarousel}
            items={mainHeader}
            loading={mainHeaderLoading}
            {...{
              desktopImage,
              formatMessage,
            }}
          />
          <CarouselHeader
            section={Sections.SECONDARY_HEADER}
            onUploadFile={this.handleOnUploadFile}
            setUrl={setUrlListAction}
            onSaveHeader={this.handleOnSaveSecondaryHeader}
            saving={secondaryHeaderLoader}
            handleAddMoreImages={this.handleAddCarouselItem}
            removeImage={removeHeaderAction}
            openPreview={togglePreviewModalAction}
            onSetDuration={setDurationAction}
            setTransition={setTransitionAction}
            carouselSettings={secondaryHeaderCarousel}
            items={secondaryHeader}
            loading={secondaryHeaderLoading}
            {...{
              desktopImage,
              formatMessage,
            }}
          />
          <RowInput>
            <Label>
              <FormattedMessage {...messages.featuredBanner} />
            </Label>
            <Buttons>
              <AddButton onClick={this.handleAddImage}>
                <FormattedMessage {...messages.addImages} />
              </AddButton>
              <AddButton onClick={this.handleAddVideo}>
                <FormattedMessage {...messages.addVideos} />
              </AddButton>
            </Buttons>
          </RowInput>
          {loadingBanner &&
            <LoadingContainer>
              <Spin />
            </LoadingContainer>}
          {!!featuredBanners.length && (
            <MediaSection>
              {featuredBanners.map((mediaFile: ProductFile, index: number) => (
                <Draggable
                  {...{ index }}
                  key={index}
                  id={mediaFile.id}
                  section="banner"
                  onDropRow={this.handleOnDropRow}
                >
                  <MediaBlock
                    {...{ index, mediaFile, counter }}
                    uploadMediaFile={uploadMediaAction}
                    beforeUpload={this.beforeUploadMedia}
                    removeMediaFile={this.removeMediaFile}
                  />
                </Draggable>
              ))}
            </MediaSection>
          )}
          <SaveSection>
            <SaveButton
              onClick={this.handleSaveBanners}
            >
              {formatMessage(messages.save)}
            </SaveButton>
          </SaveSection>
          <FeaturedProducts
            {...{
              formatMessage,
              products,
              currentPage,
              fullCount,
              limit,
              selectedItems,
              productsModalOpen,
              items,
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
  ...homepageAdminApiActions,
}

const HomepageAdminEnhance = compose(
  withApollo,
  setMainHeaderMutation,
  setFeaturedProductsMutation,
  deleteFeaturedProductMutation,
  updateProductTilesMutation,
  saveBannersMutation,
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(HomepageAdmin)

export default HomepageAdminEnhance
