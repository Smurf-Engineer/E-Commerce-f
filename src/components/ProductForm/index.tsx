/**
 * ProductForm Component - Created by Apodaca on 15/05/19.
 */
import * as React from 'react'
import { Icon, Steps } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import { stepsArray } from './constants'
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './Steps'
import * as ProductFormActions from './actions'
import * as ApiActions from './api'
import { QueryProps, Product } from '../../types/common'
const omitDeep = require('omit-deep')
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
interface DataProduct extends QueryProps {
  product: Product
}
interface DataExtra extends QueryProps {
  categories: object[]
  sports: object[]
}

interface Props {
  productId: string
  bannerMaterials: any[]
  product: Product
  history: any
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
  goBack: (id: string, screen: string) => void
  upsertProductAction: (variables: {}) => Promise<any>
  setValue: (field: string, value: any) => void
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
    const { dataProduct, setProductAction } = this.props
    if (
      dataProduct &&
      !dataProduct.loading &&
      dataProduct.product &&
      dataProduct.product.id !== prevProps.product.id
    ) {
      setProductAction(dataProduct.product)
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
      productId,
      dataProduct,
      dataExtra,
      loadingMessage,
      product,
      loading,
      setValue
    } = this.props
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
    const bannerMaterials = get(dataExtra, 'extraData.bannerMaterials', [])
    const screenSteps = [
      {
        content: (
          <FirstStep
            {...{
              categories,
              setValue,
              seasons,
              product,
              materials,
              genders,
              relatedTags,
              sports,
              formatMessage
            }}
          />
        )
      },
      {
        content: (
          <SecondStep
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
          />
        )
      },
      {
        content: (
          <ThirdStep
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
          />
        )
      },
      {
        content: (
          <FourthStep
            {...{
              product,
              bannerMaterials,
              setValue,
              genders,
              formatMessage
            }}
          />
        )
      }
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
              {screenSteps[currentStep].content}
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
  handleSave = (onlySave: boolean) => () => {
    const {
      product: {
        pictures: productImages,
        product_materials: productMaterials,
        media_files: mediaFiles
      },
      bannerMaterials,
      formatMessage,
      upsertProductAction,
      goBack,
      uploadFilesAction
    } = this.props
    uploadFilesAction(
      formatMessage,
      productImages || [],
      productMaterials || [],
      bannerMaterials || [],
      mediaFiles || []
    )
      .then(success => {
        if (success) {
          console.log('Proceed 3D Model')
          const { product, history } = this.props
          omitDeep(product, '__typename')
          omitDeep(bannerMaterials, '__typename')
          upsertProductAction({
            variables: { body: product, bannerMaterials }
          })
            .then(response => {
              const id = get(response, 'data.productResult.id', '')
              if (id) {
                if (!onlySave) {
                  const code = get(product, 'code', '')
                  if (code) {
                    history.push(`/publishing-tool?code=${code}`)
                  }
                } else {
                  goBack(id, 'list')
                }
              } else {
                message.error(formatMessage(messages.errorUpdating))
              }
            })
            .catch(error => message.error(error))
        } else {
          message.error(formatMessage(messages.errorUploading))
        }
      })
      .catch(error => message.error(error.message))
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
    const { goBack, productId, resetData } = this.props
    resetData()
    goBack(productId, productId ? 'details' : 'list')
  }
}

interface OwnProps {
  productId?: string
}

const mapStateToProps = (state: any) => state.get('productForm').toJS()

const ProductFormEnhance = compose(
  connect(
    mapStateToProps,
    { ...ProductFormActions, ...ApiActions }
  ),
  graphql(upsertProduct, { name: 'upsertProductAction' }),
  graphql(getProductQuery, {
    options: ({ productId: id }: OwnProps) => ({
      skip: !id,
      fetchPolicy: 'network-only',
      variables: { id }
    }),
    name: 'dataProduct'
  }),
  graphql(getExtraData, {
    options: { fetchPolicy: 'network-only' },
    name: 'dataExtra'
  })
)(ProductForm)

export default ProductFormEnhance
