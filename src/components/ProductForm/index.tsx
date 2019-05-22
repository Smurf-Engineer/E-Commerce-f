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
import { FirstStep } from './Steps'
import Render3D from '../../components/Render3D'
import * as ProductFormActions from './actions'
import { QueryProps, Product } from '../../types/common'
import { getProductQuery, getCategories } from './data'
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
interface DataCategory extends QueryProps {
  categories: object[]
}

interface Props {
  productId: string
  dataProduct: DataProduct
  dataCategories: DataCategory
  goBack: (id: string, screen: string) => void
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
    if (dataProduct && dataProduct !== prevProps.dataProduct) {
      setProductAction(dataProduct.product)
    }
  }
  render() {
    const { currentStep } = this.state
    const { formatMessage, productId, dataProduct, dataCategories } = this.props
    const loading = get(dataProduct, 'loading', false)
    const categories = get(dataCategories, 'categories', [])
    const screenSteps = [
      { content: <FirstStep {...{ categories, formatMessage }} /> }
    ]
    return (
      <Container>
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
              {screenSteps[currentStep].content}
            </HeaderRow>
          </MainBody>
        )}
      </Container>
    )
  }
  handleOpenModel = () => {
    this.setState({ openedModel: true })
  }
  handleOnClickBack = () => {
    const { goBack, productId } = this.props
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
      skip: false,
      variables: { id }
    }),
    name: 'dataProduct'
  }),
  graphql(getCategories, { name: 'dataCategories' })
)(ProductForm)

export default ProductFormEnhance
