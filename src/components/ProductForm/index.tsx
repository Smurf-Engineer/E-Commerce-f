/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { Icon, Button, Steps } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import find from 'lodash/find'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import { stepsArray } from './constants'
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './Steps'
import Render3D from '../../components/Render3D'
import * as ProductFormActions from './actions'
import { QueryProps, Product } from '../../types/common'
import { getProductQuery, getExtraData } from './data'
import {
  Container,
  ScreenTitle,
  BackLabel,
  BackText,
  Loader,
  HeaderRow,
  FormBody,
  BlueButton,
  RowImage,
  Footer,
  BackButton,
  NextButton,
  RenderBackground,
  Separator,
  ScreenSubTitle,
  Row,
  DetailsContainer,
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
  product: Product
  dataProduct: DataProduct
  dataExtra: DataExtra
  resetData: () => void
  goBack: (id: string, screen: string) => void
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
      product,
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
              {currentStep < 3 && (
                <NextButton onClick={this.changeStep(currentStep + 1)}>
                  <FormattedMessage {...messages.next} />
                  <Icon type="right" />
                </NextButton>
              )}
            </Footer>
          </MainBody>
        )}
      </Container>
    )
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
    { ...ProductFormActions }
  ),
  graphql(getProductQuery, {
    options: ({ productId: id }: OwnProps) => ({
      skip: !id,
      variables: { id }
    }),
    name: 'dataProduct'
  }),
  graphql(getExtraData, { name: 'dataExtra' })
)(ProductForm)

export default ProductFormEnhance
