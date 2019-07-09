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
  newSport: string
  newSportEnabled: boolean
  match: any
  client: any
  bannersLoading: boolean
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
  enableNewSportAction: (value: boolean) => void
  setNewSport: (value: string) => void
  upsertProductAction: (variables: {}) => Promise<any>
  getDataProduct: (variables: {}) => Promise<any>
  getExtraDataAction: () => Promise<any>
  setValue: (field: string, value: any) => void
  removeBanner: (index: number) => void
  setDesignCenter: (checked: boolean) => void
  setColors: (id: number, value: boolean) => void
  addBanner: (item: any) => void
  setBanner: (index: number, field: string, value: any) => void
  removeFile: (array: string, index: number) => void
  moveFile: (array: string, index: number, indexTo: number) => void
  addFile: (array: string, item: any) => void
  setFileField: (
    selected: string,
    id: string,
    name: string,
    value: string
  ) => void
  setBannersLoading: (value: boolean) => void
  setGenderAction: (id: number, value: boolean) => void
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
      enableNewSportAction,
      setNewSport,
      setCheck,
      bannersLoading,
      newSport,
      newSportEnabled,
      setBannersLoading,
      removeFile,
      addFile,
      setDesignCenter,
      removeBanner,
      setColors,
      moveFile,
      addBanner,
      setBanner,
      setFileField,
      setGenderAction,
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
    const selectedGenders = get(product, 'genders', {})
    const colorsProducts = get(product, 'colors', {})
    const screenSteps = [
      <FirstStep
        key={0}
        {...{
          categories,
          setValue,
          setDesignCenter,
          setCheck,
          newSport,
          newSportEnabled,
          seasons,
          enableNewSportAction,
          setNewSport,
          setGenderAction,
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
          bannersLoading,
          setBanner,
          customizable,
          moveFile,
          setCheck,
          genders,
          colors,
          pictures,
          setBannersLoading,
          bannerMaterials,
          setValue,
          selectedGenders,
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
    const { product, newSport, newSportEnabled } = this.props
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
          description,
          weight,
          shortDescription
        } = product
        const hasNewSport = newSportEnabled && newSport
        const sportSelected =
          sports && Object.keys(sports).some(key => sports[key])
        return (
          name &&
          mpn &&
          tags &&
          season &&
          yotpoId &&
          code &&
          details &&
          genders &&
          Object.keys(genders).some(key => genders[key].selected) &&
          product.hasOwnProperty('designCenter') &&
          materials &&
          categoryName &&
          (sportSelected || hasNewSport) &&
          description &&
          weight &&
          shortDescription
        )
      case SECOND_STEP:
        const { sizeRange, colors, designCenter } = product
        return (
          sizeRange &&
          Object.keys(sizeRange).some(key => sizeRange[key]) &&
          ((!designCenter &&
            colors &&
            Object.keys(colors).some(key => colors[key].selected)) ||
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
    const { setUploadingAction, formatMessage } = this.props
    try {
      const {
        product,
        history,
        bannerMaterials,
        upsertProductAction,
        newSport,
        newSportEnabled
      } = this.props
      const {
        sports,
        productMaterials,
        sizeRange,
        fitStyles,
        colors,
        mediaFiles,
        designCenter,
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
            if (colors[colorId].selected) {
              arr.push({ id: colorId })
            }
            return arr
            // tslint:disable-next-line: align
          }, [])
        : []
      const gendersDet = genders
        ? Object.keys(genders).reduce((arr: any[], genderId: string) => {
            if (genders[genderId].selected) {
              arr.push({ id: genderId })
            }
            return arr
            // tslint:disable-next-line: align
          }, [])
        : []
      const arrayType = designCenter ? genders : colors
      const picturesDet = Object.keys(arrayType).map((imageId: string) => ({
        front_image: arrayType[imageId].front_image || '',
        back_image: arrayType[imageId].back_image || '',
        left_image: arrayType[imageId].left_image || '',
        right_image: arrayType[imageId].right_image || '',
        color_id: !designCenter ? imageId : null,
        gender_id: designCenter ? imageId : gendersDet[0].id
      }))

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
        genders: gendersDet,
        season,
        new_sport: newSportEnabled ? newSport : '',
        content_tile: contentTile,
        pictures: picturesDet,
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
      setUploadingAction(true, formatMessage(messages.savingProduct))
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
    { ...ProductFormActions }
  )
)(ProductForm)

export default ProductFormEnhance
