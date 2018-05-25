/**
 * OrderPlaced Screen - Created by cazarez on 22/05/18.
 */
import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
import * as orderPlacedActions from './actions'
import messages from './messages'
import { Container } from './styledComponents'
import OrderDataContent from '../../components/OrderData'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  sendEmailAlert: boolean
  sendSmsAlert: boolean
  // Reducer Actions
  emailAlertCheckedAction: (checked: boolean) => void
  smsAlertCheckedAction: (checked: boolean) => void
}

export class OrderPlaced extends React.Component<Props, {}> {
  render() {
    const {
      intl,
      history,
      location: { search },
      emailAlertCheckedAction,
      smsAlertCheckedAction,
      sendEmailAlert,
      sendSmsAlert
    } = this.props

    const queryParams = queryString.parse(search)
    const orderId = get(queryParams, 'orderId', '')

    if (!orderId) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const title = messages.title.defaultMessage

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <OrderDataContent
            formatMessage={intl.formatMessage}
            {...{
              orderId,
              emailAlertCheckedAction,
              smsAlertCheckedAction,
              sendEmailAlert,
              sendSmsAlert,
              title
            }}
          />
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
