/**
 * TermsOfUse Screen - Created by cazarez on 31/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import Divider from 'antd/lib/divider'
import zenscroll from 'zenscroll'
import messages from './messages'
import {
  Container,
  Text,
  AnchorButton,
  ButtonsRow,
  SectionContainder,
  SectionTitle,
  SectionText
} from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class TermsOfUse extends React.Component<Props, {}> {
  private termsAndConditions: any
  private privacyPolicy: any
  render() {
    const { history, intl } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Text>
            <FormattedMessage {...messages.title} />
          </Text>
          <ButtonsRow>
            <AnchorButton id="terms" onClick={this.handleClickButton}>
              <FormattedMessage {...messages.termsConditionsBtnLabel} />
            </AnchorButton>
            <AnchorButton id="privacy" onClick={this.handleClickButton}>
              <FormattedMessage {...messages.privacyPolicyBtnLabel} />
            </AnchorButton>
          </ButtonsRow>
          <Divider />
          <SectionContainder>
            <div
              ref={section => {
                this.termsAndConditions = section
              }}
            >
              <SectionTitle id="TermsAndConditions">
                {intl
                  .formatMessage(messages.termsConditionsBtnLabel)
                  .toLocaleUpperCase()}
              </SectionTitle>
            </div>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.termsAndConditionsText)
              }}
            />
          </SectionContainder>
          <Divider />
          <SectionContainder>
            <div
              ref={section => {
                this.privacyPolicy = section
              }}
            >
              <SectionTitle id="PrivacyPolicy">
                {intl
                  .formatMessage(messages.privacyPolicyBtnLabel)
                  .toLocaleUpperCase()}
              </SectionTitle>
            </div>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatHTMLMessage(messages.privacyAndPolicyText)
              }}
            />
          </SectionContainder>
        </Container>
      </Layout>
    )
  }

  handleClickButton = (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = evt

    switch (id) {
      case 'terms':
        zenscroll.to(this.termsAndConditions)
        break
      case 'privacy':
        zenscroll.to(this.privacyPolicy)
        break
      default:
        break
    }
  }
}

const TermsOfUseEnhanced = compose(injectIntl)(TermsOfUse)

export default TermsOfUseEnhanced
