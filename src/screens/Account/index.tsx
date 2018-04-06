/**
 * Account Screen - Created by david on 05/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as accountActions from './actions'
import messages from './messages'
import Layout from '../../components/MainLayout'
import { Container } from './styledComponents'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class Account extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <FormattedMessage {...messages.title} />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('account').toJS()

const AccountEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...accountActions })
)(Account)

export default AccountEnhance
