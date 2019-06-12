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
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import { stepsArray } from './constants'
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './Steps'
import * as ProductFormActions from './actions'
import * as ApiActions from './api'
import { getFileExtension, getFileName } from '../../utils/utilsFiles'
import { QueryProps, Product, PriceRange } from '../../types/common'
import omitDeep from 'omit-deep'
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
import { currencies, quantities } from './Steps/ThirdStep/constants'
interface DataProduct extends QueryProps {
  product: Product
}
interface DataExtra extends QueryProps {
  categories: object[]
  sports: object[]
}

interface Props {
  bannerMaterials: any[]
  product: Product
  history: any
  match: any
  fixed: boolean
  dataProduct: DataProduct
  loading: boolean
  loadingMessage: string
  dataExtra: DataExtra
  resetData: () => void
  uploadFilesAction: (
    formatMessage: (messageDescriptor: any) => string,
    productImages: any[],
    productMaterials: any[],
    bannerMaterials: any[],
    mediaFiles: any[]
  ) => Promise<any>
  upsertProductAction: (variables: {}) => Promise<any>
  setValue: (field: string, value: any) => void
  setBannerActions: (banners: any) => void
  setGenderActions: (genders: any) => void
  setCurrencies: (currencies: any) => void
  setProductAction: (product: Product) => void
  formatMessage: (messageDescriptor: any) => string
}
const Step = Steps.Step
export class ProductForm extends React.Component<Props, {}> {
  state = {
    openedModel: false,
    currentStep: 0
  }
  componentDidUpdate(prevProps: Props) {
    const {
      dataProduct,
      setProductAction,
      dataExtra,
      setCurrencies,
      setValue,
      product: reduxProduct,
      match,
      fixed,
      setBannerActions
    } = this.props
    const productId = get(prevProps, 'product.id', '')
    if (
      dataProduct &&
      !dataProduct.loading &&
      dataProduct.product &&
      dataProduct.product.id !== parseInt(productId, 10)
    ) {
      const product = dataProduct.product
      setProductAction(product)
      const productImages = product.pictures || []
      const productMaterials = product.productMaterials || []
      const mediaFiles = product.mediaFiles
        ? product.mediaFiles.map((file: any, index: number) => ({
            toUpload: false,
            url: file.url,
            id: index,
            extension: getFileExtension(file.url),
            name: getFileName(file.url)
          }))
        : []
      setValue('pictures', productImages)
      setValue('mediaFiles', mediaFiles)
      setValue('productMaterials', productMaterials)
    }
    if (dataExtra && !dataExtra.loading && !fixed) {
      const bannerMaterials = get(dataExtra, 'extraData.bannerMaterials', [])
      const detailedBanners = bannerMaterials.map((banner: any) => ({
        ...banner,
        active: true
      }))
      setBannerActions(detailedBanners)
    }
    if (
      !parseInt(get(match, 'params.id', ''), 10) &&
      !reduxProduct.priceRange
    ) {
      const currenciesProduct: PriceRange[] = []
      currencies.forEach(shortName => {
        quantities.forEach(quantity => {
          currenciesProduct.push({
            price: 0,
            quantity,
            shortName
          })
        })
      })
      setCurrencies(currenciesProduct)
    }
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
      dataProduct,
      dataExtra,
      bannerMaterials,
      setBannerActions,
      setGenderActions,
      loadingMessage,
      product,
      loading,
      setValue
    } = this.props
    const productId = get(match, 'params.id', '')
    const loadingProduct = get(dataProduct, 'loading', false)
    const loadingExtra = get(dataExtra, 'loading', false)
    const categories = get(dataExtra, 'extraData.categories', [])
    const sports = get(dataExtra, 'extraData.sports', [])
    const sizes = get(dataExtra, 'extraData.sizes', [])
    const fitStyles = get(dataExtra, 'extraData.fitStyles', [])
    const materials = get(dataExtra, 'extraData.materials', [])
    const relatedTags = get(dataExtra, 'extraData.relatedTags', [])
    const colors = get(dataExtra, 'extraData.colors', [])
    const seasons = get(dataExtra, 'extraData.seasons', [])
    const genders = get(dataExtra, 'extraData.genders', [])
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
        {loadingProduct || loadingExtra ? (
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
      product: { pictures: productImages, productMaterials, mediaFiles },
      bannerMaterials,
      formatMessage,
      upsertProductAction,
      uploadFilesAction
    } = this.props
    const success = await uploadFilesAction(
      formatMessage,
      productImages || [],
      productMaterials || [],
      bannerMaterials || [],
      mediaFiles || []
    )
    if (success) {
      const { product, history } = this.props
      omitDeep(product, '__typename')
      omitDeep(bannerMaterials, '__typename')
      const response = await upsertProductAction({
        variables: { body: product, bannerMaterials }
      })
      const id = get(response, 'data.productResult.id', '')
      if (id) {
        if (!onlySave) {
          const code = get(product, 'code', '')
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
  handleOpenModel = () => {
    this.setState({ openedModel: true })
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

interface OwnProps {
  match?: any
}

const mapStateToProps = (state: any) => state.get('productForm').toJS()

const ProductFormEnhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    { ...ProductFormActions, ...ApiActions }
  ),
  graphql(upsertProduct, { name: 'upsertProductAction' }),
  graphql(getProductQuery, {
    options: ({ match }: OwnProps) => ({
      skip: !parseInt(get(match, 'params.id', ''), 10),
      fetchPolicy: 'network-only',
      variables: { id: parseInt(get(match, 'params.id', ''), 10) }
    }),
    name: 'dataProduct'
  }),
  graphql(getExtraData, {
    options: { fetchPolicy: 'network-only' },
    name: 'dataExtra'
  })
)(ProductForm)

export default ProductFormEnhance
