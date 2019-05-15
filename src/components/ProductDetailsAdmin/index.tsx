/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import RowField from './RowField'
import * as ProductDetailsAdminActions from './actions'
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
    const {
      formatMessage,
      data: { loading, product }
    } = this.props
    const name = get(product, 'name', '')
    const mpn = get(product, 'mpn', '')
    const code = get(product, 'code', '')
    const description = get(product, 'shortDescription', '')
    const yotpoId = get(product, 'yotpoId', '')
    return (
      <Container>
        <BackLabel onClick={this.handleOnClickBack}>
          <Icon type="left" />
          <BackText>
            <FormattedMessage {...messages.backToProducts} />
          </BackText>
        </BackLabel>
        <MainBody>
          {!product && loading ? (
            <Loader>
              <Spin size="large" />
            </Loader>
          ) : (
            <DetailsContainer>
              <HeaderRow>
                <ScreenTitle>
                  {name}
                  <ScreenSubTitle>{mpn}</ScreenSubTitle>
                </ScreenTitle>
                <div>
                  <BlueButton size="large">
                    <FormattedMessage {...messages.editProduct} />
                  </BlueButton>
                  <Button size="large">
                    <FormattedMessage {...messages.openPublishingTool} />
                  </Button>
                </div>
              </HeaderRow>
              <FormBody>
                <Row>
                  <RowField
                    label={formatMessage(messages.productCode)}
                    value={code}
                  />
                  <RowField
                    label={formatMessage(messages.productDescription)}
                    value={description}
                  />
                  <RowField
                    label={formatMessage(messages.productModel)}
                    value={yotpoId}
                  />
                </Row>
              </FormBody>
            </DetailsContainer>
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
