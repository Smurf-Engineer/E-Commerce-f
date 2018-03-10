/**
 * Product Screen - Created by cazarez on 09/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { ReducersObject } from '../../store/rootReducer'
import Layout from '../../components/MainLayout'
import * as productActions from './actions'
import messages from './messages'
import { Container, Text } from './styledComponents'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class Product extends React.Component<Props, {}> {
  render() {
    const { history, intl } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <FormattedMessage {...messages.title} />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ product }: ReducersObject) => product.toJS()

const ProductEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...productActions })
)(Product)

export default ProductEnhance
