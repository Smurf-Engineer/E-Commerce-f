/**
 * ProductForm Component - Created by Apodaca on 15/05/19.
 */
import * as React from 'react'
import { Icon, Steps } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'
import message from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import { graphql, compose, withApollo } from 'react-apollo'
import messages from './messages'
import {
  stepsArray,
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  FOURTH_STEP
} from './constants'
import { FirstStep, SecondStep, ThirdStep, FourthStep, Stepper } from './Steps'
import * as ProductFormActions from './actions'
import * as ApiActions from './api'
import { QueryProps, Product } from '../../types/common'
import { getProductQuery, getExtraData, upsertProduct } from './data'
import {
  Container,
  ScreenTitle,
  BackLabel,
  BackText,
  Loader,
  HeaderRow,
  FullLoader,
  LoadingMessage,
  MainBody
} from './styledComponents'

interface DataExtra extends QueryProps {
  categories: object[]
  sports: object[]
}

interface Props {
  bannerMaterials: any[]
  product: Product
  history: any
  match: any
  client: any
  fixed: boolean
  loading: boolean
  loadingMessage: string
  dataExtra: DataExtra
  resetData: () => void
  uploadFilesAction: (
    formatMessage: (messageDescriptor: any) => string,
    productImages: any[],
    bannerMaterials: any[],
    mediaFiles: any[],
    isCustom: boolean
  ) => Promise<any>
  upsertProductAction: (variables: {}) => Promise<any>
  getDataProduct: (variables: {}) => Promise<any>
  getExtraDataAction: () => Promise<any>
  setValue: (field: string, value: any) => void
  removeBanner: (index: number) => void
  setDesignCenter: (checked: boolean) => void
  setColors: () => void
  addBanner: (item: any) => void
  addPicture: (index: number, item: any) => void
  setBanner: (index: number, field: string, value: any) => void
  removeFile: (array: string, index: number) => void
  addFile: (array: string, item: any) => void
  setFileField: (
    array: string,
    index: number,
    field: string,
    value: any
  ) => void
  setBannerActions: (banners: any) => void
  setGenderActions: (genders: any) => void
  setCheck: (selected: string, id: number, checked: boolean) => void
  setCurrencies: (currencies: any) => void
  setProductAction: (product: Product | {}, extraData: any) => void
  formatMessage: (messageDescriptor: any) => string
  setUploadingAction: (loading: boolean, loadingMessage: string) => void
}
const Step = Steps.Step
export class ProductForm extends React.Component<Props, {}> {
  state = {
    currentStep: 0
  }
  async componentDidMount() {
    const {
      setProductAction,
      match,
      client: { query }
    } = this.props
    let product = {}
    const id = parseInt(get(match, 'params.id', ''), 10)
    if (id) {
      const result = await query({
        query: getProductQuery,
        variables: { id },
        fetchPolicy: 'network-only'
      })
      product = get(result, 'data.product', {})
    }
    const dataExtra = await query({
      query: getExtraData,
      fetchPolicy: 'network-only'
    })
    const extraData = get(dataExtra, 'data.extraData', [])
    setProductAction(product, extraData)
  }
  componentWillUnmount() {
    const { resetData } = this.props
    resetData()
  }
  render() {
    const { currentStep } = this.state
    const {
      formatMessage,
      match,
      dataExtra,
      bannerMaterials,
      setCheck,
      setBannerActions,
      removeFile,
      addFile,
      addPicture,
      setDesignCenter,
      removeBanner,
      setColors,
      addBanner,
      setBanner,
      setFileField,
      setGenderActions,
      loadingMessage,
      product,
      loading,
      setValue
    } = this.props
    const productId = get(match, 'params.id', '')
    const categories = get(dataExtra, 'categories', [])
    const sports = get(dataExtra, 'sports', [])
    const sizes = get(dataExtra, 'sizes', [])
    const fitStyles = get(dataExtra, 'fitStyles', [])
    const materials = get(dataExtra, 'materials', [])
    const relatedTags = get(dataExtra, 'relatedTags', [])
    const colors = get(dataExtra, 'colors', [])
    const seasons = get(dataExtra, 'seasons', [])
    const genders = get(dataExtra, 'genders', [])
    const productMaterials = get(product, 'productMaterials', [])
    const mediaFiles = get(product, 'mediaFiles', [])
    const customizable = get(product, 'designCenter', null)
    const pictures = get(product, 'pictures', [])
    const gendersArray = get(product, 'genders', [])
    const colorsProducts = get(product, 'colors', {})
    const screenSteps = [
      <FirstStep
        key={0}
        {...{
          categories,
          setValue,
          setDesignCenter,
          setCheck,
          seasons,
          setGenderActions,
          product,
          materials,
          genders,
          relatedTags,
          sports,
          formatMessage
        }}
      />,
      <SecondStep
        key={1}
        {...{
          categories,
          setValue,
          seasons,
          colors,
          setCheck,
          setColors,
          fitStyles,
          sizes,
          product,
          materials,
          genders,
          relatedTags,
          sports,
          formatMessage
        }}
      />,
      <ThirdStep
        key={2}
        {...{
          categories,
          setValue,
          seasons,
          colors,
          fitStyles,
          sizes,
          product,
          materials,
          genders,
          relatedTags,
          sports,
          formatMessage
        }}
      />,
      <FourthStep
        key={3}
        {...{
          productMaterials,
          mediaFiles,
          removeFile,
          addFile,
          setFileField,
          colorsProducts,
          removeBanner,
          addBanner,
          addPicture,
          setBanner,
          customizable,
          setCheck,
          pictures,
          setBannerActions,
          bannerMaterials,
          setValue,
          gendersArray,
          formatMessage
        }}
      />
    ]
    const validNext = this.validateFields()
    return (
      <Container>
        {loadingMessage && (
          <FullLoader>
            <Spin size="large" />
            <LoadingMessage>{loadingMessage}</LoadingMessage>
          </FullLoader>
        )}
        <BackLabel onClick={this.handleOnClickBack}>
          <Icon type="left" />
          <BackText>
            <FormattedMessage {...messages.backToProducts} />
          </BackText>
        </BackLabel>
        {loading && !loadingMessage ? (
          <Loader>
            <Spin size="large" />
          </Loader>
        ) : (
          <MainBody>
            <HeaderRow>
              <ScreenTitle>
                {formatMessage(
                  productId ? messages.editProduct : messages.addNewProduct
                )}
              </ScreenTitle>
              <Steps current={currentStep}>
                {stepsArray.map(step => (
                  <Step title={step.title} />
                ))}
              </Steps>
              {screenSteps[currentStep]}
            </HeaderRow>
            <Stepper
              {...{ currentStep, validNext }}
              changeStep={this.changeStep}
              showMissingFields={this.showMissingFields}
              handleSave={this.handleSave}
            />
          </MainBody>
        )}
      </Container>
    )
  }
  showMissingFields = () => {
    const { formatMessage } = this.props
    message.error(formatMessage(messages.missingFields))
  }
  validateFields = () => {
    const { currentStep } = this.state
    const { product } = this.props
    switch (currentStep) {
      case FIRST_STEP:
        const {
          name,
          mpn,
          tags,
          season,
          yotpoId,
          genders,
          details,
          materials,
          code,
          categoryName,
          sports,
          relatedItemTag,
          description,
          weight,
          shortDescription
        } = product
        return (
          name &&
          mpn &&
          tags &&
          season &&
          yotpoId &&
          code &&
          details &&
          genders &&
          product.hasOwnProperty('designCenter') &&
          genders.length &&
          materials &&
          categoryName &&
          sports &&
          Object.keys(sports).some(key => sports[key]) &&
          relatedItemTag &&
          description &&
          weight &&
          shortDescription
        )
      case SECOND_STEP:
        const { sizeRange, fitStyles, colors, designCenter } = product
        return (
          sizeRange &&
          Object.keys(sizeRange).some(key => sizeRange[key]) &&
          fitStyles &&
          Object.keys(fitStyles).some(key => fitStyles[key]) &&
          ((!designCenter &&
            colors &&
            Object.keys(colors).some(key => colors[key])) ||
            designCenter)
        )
      case THIRD_STEP:
        const { priceRange } = product
        return priceRange.every(item => item.price > 0)
      case FOURTH_STEP:
        return true
      default:
        return true
    }
  }
  handleSave = (onlySave: boolean) => async () => {
    const {
      product: { pictures: productImages, mediaFiles, designCenter },
      bannerMaterials,
      formatMessage,
      upsertProductAction,
      uploadFilesAction,
      setUploadingAction
    } = this.props
    try {
      await uploadFilesAction(
        formatMessage,
        productImages || [],
        bannerMaterials || [],
        mediaFiles || [],
        designCenter
      )

      const { product, history } = this.props
      const {
        sports,
        productMaterials,
        sizeRange,
        fitStyles,
        colors,
        id,
        code,
        name,
        shortDescription,
        yotpoId,
        categoryName,
        description,
        obj,
        mtl,
        details,
        materials,
        genders,
        season,
        contentTile,
        pictures,
        priceRange,
        retailMen,
        retailWomen,
        relatedItemTag,
        weight,
        mpn,
        tags,
        active
      } = product
      const sportsProduct = sports
        ? Object.keys(sports).reduce((arr: any[], sportId: string) => {
            if (sports[sportId]) {
              arr.push({ id: sportId })
            }
            return arr
            // tslint:disable-next-line: align
          }, [])
        : []
      const productMaterialsDet = productMaterials
        ? Object.keys(productMaterials).reduce(
            (arr: any[], materialId: string) => {
              if (productMaterials[materialId]) {
                arr.push({ id: materialId })
              }
              return arr
              // tslint:disable-next-line: align
            },
            []
          )
        : []
      const sizeRangeDet = sizeRange
        ? Object.keys(sizeRange).reduce((arr: any[], sizeId: string) => {
            if (sizeRange[sizeId]) {
              arr.push({ id: sizeId })
            }
            return arr
            // tslint:disable-next-line: align
          }, [])
        : []
      const fitStylesDet = fitStyles
        ? Object.keys(fitStyles).reduce((arr: any[], fitId: string) => {
            if (fitStyles[fitId]) {
              arr.push({ id: fitId })
            }
            return arr
            // tslint:disable-next-line: align
          }, [])
        : []
      const colorsDet = colors
        ? Object.keys(colors).reduce((arr: any[], colorId: string) => {
            if (colors[colorId]) {
              arr.push({ id: colorId })
            }
            return arr
            // tslint:disable-next-line: align
          }, [])
        : []
      // TODO: Handle all the camelCase variables (this is a hotfix for production)
      const productToSave = {
        id,
        code,
        name,
        short_description: shortDescription,
        yotpo_id: yotpoId,
        media_files: mediaFiles,
        category_name: categoryName,
        design_center: designCenter,
        description,
        obj,
        mtl,
        details,
        materials,
        genders,
        season,
        content_tile: contentTile,
        pictures,
        price_range: priceRange,
        retail_men: retailMen,
        retail_women: retailWomen,
        related_item_tag: relatedItemTag,
        weight,
        mpn,
        tags,
        active,
        sports: sportsProduct,
        fit_styles: fitStylesDet,
        size_range: sizeRangeDet,
        colors: colorsDet,
        product_materials: productMaterialsDet
      }
      await upsertProductAction({
        variables: { body: productToSave, bannerMaterials }
      })
      if (!onlySave) {
        if (code) {
          history.push(`/publishing-tool?code=${code}`)
        }
      } else {
        history.push('/admin/products')
      }
    } catch (error) {
      setUploadingAction(false, '')
      message.error(formatMessage(messages.errorUploading))
    }
  }
  changeStep = (currentStep: Number) => () => {
    this.setState({ currentStep })
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }
  handleOnClickBack = () => {
    const { history, match } = this.props
    const productId = get(match, 'params.id', '')
    if (parseInt(productId, 10)) {
      history.push(`/admin/products/details/${productId}`)
    } else {
      history.push(`/admin/products`)
    }
  }
}

const mapStateToProps = (state: any) => state.get('productForm').toJS()

const ProductFormEnhance = compose(
  withRouter,
  withApollo,
  graphql(upsertProduct, { name: 'upsertProductAction' }),
  connect(
    mapStateToProps,
    { ...ProductFormActions, ...ApiActions }
  )
)(ProductForm)

export default ProductFormEnhance
