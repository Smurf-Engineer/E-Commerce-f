/**
 * FitAndSizing Screen - Created by jorge on 01/08/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import messages from './messages'
import { Container } from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class FitAndSizing extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props

    return (
      <Layout {...{ intl, history }}>
        <Container>
          <FormattedMessage {...messages.title} />
        </Container>
      </Layout>
    )
  }
}

const FitAndSizingEnhance = compose(injectIntl)(FitAndSizing)

export default FitAndSizingEnhance
