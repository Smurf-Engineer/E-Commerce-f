/**
 * HomepageAdminActions Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
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
import * as HomepageAdminActions from './actions'
import { Sections } from './constants'
import * as homepageAdminApiActions from './api'
import MainHeader from './MainHeader'
import SecondaryHeader from './SecondaryHeader'
import FeaturedProducts from './FeaturedProducts'
import Tiles from './Tiles'
import { Container, ScreenTitle, SpinContainer } from './styledComponents'
import messages from './messages'
import {
  Product,
  ProductType,
  ProductTiles,
  MessagePayload
} from '../../types/common'

interface Props {
  history: any
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
  setUrlAction: (value: string) => void
  setLoadersAction: (section: string, loading: boolean) => void
  setHomepageInfoAction: (data: any) => void
  setUrlListAction: (value: string, index: number) => void
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
  updateProductTiles: (variables: {}) => Promise<MessagePayload>
  setTilesTextAction: (index: number, section: string, value: string) => void
  removeTileDataAction: (index: number) => void
  removeHeaderAction: (index: number) => void
}

class HomepageAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      setLoadersAction,
      setHomepageInfoAction,
      client: { query }
    } = this.props
    try {
      setLoadersAction(Sections.MAIN_CONTAINER, true)
      const response = await query({
        query: getHomepageInfo,
        fetchPolicy: 'network-only'
      })
      await this.handleOnChangePage()
      const {
        featuredProducts,
        homepageImages,
        headerImageLink,
        headerImage,
        headerImageMobile,
        productTiles
      } = response.data.getHomepageContent
      const items = featuredProducts.map((item: Product) => {
        return { visible: true, product: item }
      })
      const cleanData = {
        items,
        homepageImages,
        headerImageLink,
        headerImage,
        headerImageMobile,
        productTiles
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
      const { setMainHeader, mainHeader, setLoadersAction } = this.props
      setLoadersAction(Sections.MAIN_HEADER, true)
      const response = await setMainHeader({
        variables: {
          headerImage: mainHeader.desktopImage,
          headerImageMobile: mainHeader.mobileImage,
          headerImageLink: mainHeader.url
        }
      })
      message.success(get(response, 'data.setMainHeader.message', ''))
      setLoadersAction(Sections.MAIN_HEADER, false)
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnSaveSecondaryHeader = async () => {
    try {
      const {
        setSecondaryHeader,
        setLoadersAction,
        secondaryHeader
      } = this.props
      setLoadersAction(Sections.SECONDARY_HEADER, true)
      const homepageImages = secondaryHeader.map((item: any) => ({
        id: item.id
        image: item.desktopImage,
        image_mobile: item.mobileImage,
        link: item.url
      }))
      const response = await setSecondaryHeader({
        variables: {
          homepageImages
        }
      })
      message.success(get(response, 'data.setSecondaryHeader.message', ''))
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
      setFeaturedProducts
    } = this.props
    setItemsAddAction()
    const itemsToSave = selectedItems.concat(items)
    const idCollection = itemsToSave.map((item: any) => item.product.id)
    try {
      const response = await setFeaturedProducts({
        variables: {
          products: idCollection
        }
      })
      message.success(get(response, 'data.setFeaturedProducts.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  handleDeleteFromTable = async (index: number, id: number) => {
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
    const { productTiles, setLoadersAction, updateProductTiles } = this.props
    setLoadersAction(Sections.PRODUCT_TILES, true)
    const products = productTiles.map((item: ProductTiles) => ({
      id: item.id,
      image: item.image,
      content_tile: item.contentTile,
      title: item.title
    }))
    try {
      const response = await updateProductTiles({
        variables: { products }
      })
      message.success(get(response, 'data.updateProductTiles.message', ''))
    } catch (e) {
      message.error(e.message)
    }
    setLoadersAction(Sections.PRODUCT_TILES, false)
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
      setUrlAction,
      setUrlListAction,
      productTiles,
      setTilesTextAction,
      removeTileDataAction,
      removeHeaderAction
    } = this.props

    return mainContainer ? (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    ) : (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <MainHeader
          onUploadFile={this.handleOnUploadFile}
          setUrl={setUrlAction}
          onSaveHeader={this.handleOnSaveMainHeader}
          saving={mainHeaderLoader}
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
