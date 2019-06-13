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
import { stepsArray } from './constants'
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './Steps'
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
  Footer,
  BackButton,
  FullLoader,
  LoadingMessage,
  NextButton,
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
    mediaFiles: any[]
  ) => Promise<any>
  upsertProductAction: (variables: {}) => Promise<any>
  getDataProduct: (variables: {}) => Promise<any>
  getExtraDataAction: () => Promise<any>
  setValue: (field: string, value: any) => void
  setBannerActions: (banners: any) => void
  setGenderActions: (genders: any) => void
  setCheck: (selected: string, id: number, checked: boolean) => void
  setCurrencies: (currencies: any) => void
  setProductAction: (product: Product | {}, extraData: any) => void
  formatMessage: (messageDescriptor: any) => string
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
    const customizable = get(product, 'customizable', [])
    const pictures = get(product, 'pictures', [])
    const gendersArray = get(product, 'genders', [])
    const screenSteps = [
      <FirstStep
        key={0}
        {...{
          categories,
          setValue,
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
    return (
      <Container>
        {loading && (
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
        {loading ? (
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
            <Footer>
              {currentStep > 0 && (
                <BackButton onClick={this.changeStep(currentStep - 1)}>
                  <Icon type="left" />
                  <FormattedMessage {...messages.back} />
                </BackButton>
              )}
              {currentStep === 3 && (
                <BackButton onClick={this.handleSave(true)}>
                  <FormattedMessage {...messages.saveAndContinue} />
                </BackButton>
              )}

              {currentStep < 3 && (
                <NextButton onClick={this.changeStep(currentStep + 1)}>
                  <FormattedMessage {...messages.next} />
                  <Icon type="right" />
                </NextButton>
              )}
              {currentStep === 3 && (
                <NextButton onClick={this.handleSave(false)}>
                  <FormattedMessage {...messages.submit} />
                </NextButton>
              )}
            </Footer>
          </MainBody>
        )}
      </Container>
    )
  }
  handleSave = (onlySave: boolean) => async () => {
    const {
      product: { pictures: productImages, mediaFiles },
      bannerMaterials,
      formatMessage,
      upsertProductAction,
      uploadFilesAction
    } = this.props
    const success = await uploadFilesAction(
      formatMessage,
      productImages || [],
      bannerMaterials || [],
      mediaFiles || []
    )
    if (success) {
      const { product, history } = this.props
      const { sports, productMaterials, sizeRange, fitStyles, colors } = product
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
      const productToSave = {
        ...product,
        sports: sportsProduct,
        fitStyles: fitStylesDet,
        sizeRange: sizeRangeDet,
        colors: colorsDet,
        productMaterials: productMaterialsDet
      }
      const response = await upsertProductAction({
        variables: { body: productToSave, bannerMaterials }
      })
      const id = get(response, 'data.productResult.id', '')
      if (id) {
        if (!onlySave) {
          const code = get(productToSave, 'code', '')
          if (code) {
            history.push(`/publishing-tool?code=${code}`)
          }
        } else {
          history.push('/admin/products')
        }
      } else {
        message.error(formatMessage(messages.errorUpdating))
      }
    } else {
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
