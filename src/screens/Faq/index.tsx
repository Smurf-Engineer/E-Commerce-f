/**
 * Faq Screen - Created by cazarez on 28/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import {
  injectIntl,
  InjectedIntl,
  FormattedMessage,
  FormattedHTMLMessage
} from 'react-intl'
import zenscroll from 'zenscroll'
import Divider from 'antd/lib/divider'
import messages from './messages'
import {
  sectionTitles,
  artandDesignQuestions,
  orderingPaymentQuestions,
  productionDeliveryQuestions,
  distributorsQuestions
} from './staticData'
import {
  Container,
  TitleSectionRow,
  Title,
  Subtitle,
  AnchorsRow,
  AnchorButton,
  ContentSection,
  SectionTitle
} from './styledComponents'

import Layout from '../../components/MainLayout'
import Questions from '../../components/FaqQuestions'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class Faq extends React.Component<Props, {}> {
  private artworkDesign: any
  private orderPayment: any
  private productiondelivery: any
  private distributors: any

  render() {
    const { history, intl } = this.props

    const buttons = sectionTitles.map((title, key) => (
      <AnchorButton
        id={key.toString()}
        {...{ key }}
        onClick={this.handleOnButtonClick}
      >
        {title}
      </AnchorButton>
    ))

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <TitleSectionRow>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <Subtitle>
              <FormattedHTMLMessage {...messages.subtitle} />
            </Subtitle>
            <AnchorsRow>{buttons}</AnchorsRow>
          </TitleSectionRow>
          <Divider />
          <ContentSection>
            <SectionTitle>
              <div
                ref={section => {
                  this.artworkDesign = section
                }}
              >
                <FormattedMessage {...messages.artworkAndDesignTitle} />
              </div>
            </SectionTitle>
            <Questions
              questions={artandDesignQuestions}
              formatMessage={intl.formatMessage}
            />
          </ContentSection>
          <ContentSection>
            <SectionTitle>
              <div
                ref={section => {
                  this.orderPayment = section
                }}
              >
                <FormattedMessage {...messages.orderingAndPaymentTitle} />
              </div>
            </SectionTitle>
            <Questions
              questions={orderingPaymentQuestions}
              formatMessage={intl.formatMessage}
            />
          </ContentSection>
          <ContentSection>
            <SectionTitle>
              <div
                ref={section => {
                  this.productiondelivery = section
                }}
              >
                <FormattedMessage {...messages.productionAndDeliveryTitle} />
              </div>
            </SectionTitle>
            <Questions
              questions={productionDeliveryQuestions}
              formatMessage={intl.formatMessage}
            />
          </ContentSection>
          <ContentSection>
            <SectionTitle>
              <div
                ref={distributors => {
                  this.distributors = distributors
                }}
              >
                <FormattedMessage {...messages.distruibutorsTitle} />
              </div>
            </SectionTitle>
            <Questions
              questions={distributorsQuestions}
              formatMessage={intl.formatMessage}
            />
          </ContentSection>
        </Container>
      </Layout>
    )
  }

  handleOnButtonClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = evt
    switch (id) {
      case '0':
        zenscroll.to(this.artworkDesign)
        break
      case '1':
        zenscroll.to(this.orderPayment)
        break
      case '2':
        zenscroll.to(this.productiondelivery)
        break
      case '3':
        zenscroll.to(this.distributors)
        break
      default:
        break
    }
  }
}

const FaqEnhanced = compose(injectIntl)(Faq)

export default FaqEnhanced
