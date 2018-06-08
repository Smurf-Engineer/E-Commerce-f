/**
 * WarrantyProgram Screen - Created by gustavomedina on 07/06/18.
 */
// tslint:disable:max-line-length
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import * as warrantyProgramActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  SectionContainder,
  SectionTitle,
  SectionText,
  SectionSubTitle
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Divider from 'antd/lib/divider'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class WarrantyProgram extends React.Component<Props, {}> {
  render() {
    const { history, intl } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <SectionContainder>
            <Text>
              <FormattedMessage {...messages.title} />
            </Text>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.titleText)
              }}
            />
          </SectionContainder>
          <Divider />
          <SectionContainder>
            <SectionTitle id="TermsAndConditions">
              {intl.formatMessage(messages.warrantyTitle).toLocaleUpperCase()}
            </SectionTitle>
            <SectionSubTitle>
              {intl.formatMessage(messages.warrantySubtitle)}
            </SectionSubTitle>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.warrantyText)
              }}
            />
          </SectionContainder>
          <Divider />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('warrantyProgram').toJS()

const WarrantyProgramEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...warrantyProgramActions }
  )
)(WarrantyProgram)

export default WarrantyProgramEnhance
