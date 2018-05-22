/**
 * OrderPlaced Screen - Created by cazarez on 22/05/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
// import { ReducersObject } from '../../store/rootReducer'
import * as orderPlacedActions from './actions'
import messages from './messages'
import { Container } from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class OrderPlaced extends React.Component<Props, {}> {
  render() {
    const { intl } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <FormattedMessage {...messages.title} />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('orderPlaced').toJS()

const OrderPlacedEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...orderPlacedActions })
)(OrderPlaced)

export default OrderPlacedEnhance
