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
import RowField from './RowField'
import Render3D from '../../components/Render3D'
import * as ProductFormActions from './actions'
import { QueryProps, Product } from '../../types/common'
import { getProductQuery } from './data'
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
interface Data extends QueryProps {
  product: Product
}

interface Props {
  productId: string
  data: Data
  goBack: (id: string, screen: string) => void
  setProductAction: (product: Product) => void
  formatMessage: (messageDescriptor: any) => string
}
const Step = Steps.Step
export class ProductForm extends React.Component<Props, {}> {
  state = {
    openedModel: false
  }
  componentDidUpdate(prevProps: Props) {
    const { data, setProductAction } = this.props
    if (data && data !== prevProps.data) {
      setProductAction(data.product)
    }
  }
  render() {
    const { formatMessage, productId, data } = this.props
    const loading = get(data, 'loading', false)
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
            <Steps current={1}>
              <Step title="Finished" description="This is a description." />
              <Step title="In Progress" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
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
      skip: true,
      variables: { id }
    })
  })
)(ProductForm)

export default ProductFormEnhance
