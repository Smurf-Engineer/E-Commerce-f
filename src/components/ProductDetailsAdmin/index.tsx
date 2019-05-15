/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { Icon } from 'antd'
import { Radio } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import * as ProductDetailsAdminActions from './actions'
import { QueryProps, Product } from '../../types/common'
import { getProductQuery } from './data'
import {
  Container,
  ScreenTitle,
  BackLabel,
  BackText,
  Loader,
  FormBody,
  Row,
  MainBody
} from './styledComponents'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface Data extends QueryProps {
  product: Product
}

interface Props {
  productId: string
  data?: Data
  goBack: (id: number) => void
  setProductAction: (product: Product) => void
  formatMessage: (messageDescriptor: any) => string
}

export class ProductDetailsAdmin extends React.Component<Props, {}> {
  componentDidUpdate(prevProps: Props) {
    const { data, setProductAction } = this.props
    if (data && data !== prevProps.data) {
      setProductAction(data.product)
    }
  }
  render() {
    const { data } = this.props
    return (
      <Container>
        <BackLabel onClick={this.handleOnClickBack}>
          <Icon type="left" />
          <BackText>
            <FormattedMessage {...messages.backToProducts} />
          </BackText>
        </BackLabel>
        <ScreenTitle>
          <FormattedMessage {...messages.addNewProduct} />
        </ScreenTitle>
        <MainBody>
          {data && data.loading ? (
            <Loader>
              <Spin size="large" />
            </Loader>
          ) : (
            <FormBody>
              <Row>
                <FormattedMessage {...messages.productType} />
                <RadioGroup defaultValue="a" size="large">
                  <RadioButton value="a">Custom</RadioButton>
                  <RadioButton value="b">Inline</RadioButton>
                </RadioGroup>
              </Row>
            </FormBody>
          )}
        </MainBody>
      </Container>
    )
  }

  handleOnClickBack = () => {
    const { goBack } = this.props
    goBack(0)
  }
}

interface OwnProps {
  productId?: string
}

const mapStateToProps = (state: any) => state.get('productDetailAdmin').toJS()

const ProductDetailsAdminEnhance = compose(
  connect(
    mapStateToProps,
    { ...ProductDetailsAdminActions }
  ),
  graphql(getProductQuery, {
    options: ({ productId: id }: OwnProps) => ({
      variables: { id }
    })
  })
)(ProductDetailsAdmin)

export default ProductDetailsAdminEnhance
