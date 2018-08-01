/**
 * FitAndSizing Screen - Created by jorge on 01/08/18.
 */
import * as React from 'react'
import {
  FormattedMessage,
  injectIntl,
  InjectedIntl,
  FormattedHTMLMessage
} from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import zenscroll from 'zenscroll'
import Divider from 'antd/lib/divider'
import messages from './messages'
import {
  Container,
  TitleSectionRow,
  Title,
  AnchorsRow,
  AnchorButton,
  ContentSection,
  SectionTitle,
  SectionDescription
} from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

const sectionTitles = ['Body Size Chart', 'Fit Styles']

export class FitAndSizing extends React.Component<Props, {}> {
  private bodySize: any
  private fitStyles: any

  render() {
    const { intl, history } = this.props

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
      <Layout {...{ intl, history }}>
        <Container>
          <TitleSectionRow>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <AnchorsRow>{buttons}</AnchorsRow>
          </TitleSectionRow>
          <Divider />
          <ContentSection>
            <SectionTitle>
              <div ref={section => (this.bodySize = section)}>
                <FormattedMessage {...messages.bodySizeTitle} />
              </div>
            </SectionTitle>
            <SectionDescription>
              <FormattedHTMLMessage {...messages.bodySizeDescription} />
            </SectionDescription>
            <SectionTitle>
              <FormattedMessage {...messages.sizingChart} />
            </SectionTitle>
          </ContentSection>
          <Divider />
          <ContentSection>
            <SectionTitle>
              <div ref={section => (this.fitStyles = section)}>
                <FormattedMessage {...messages.fitStylesTitle} />
              </div>
            </SectionTitle>
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
        zenscroll.to(this.bodySize)
        break
      case '1':
        zenscroll.to(this.fitStyles)
        break
      default:
        break
    }
  }
}

const FitAndSizingEnhance = compose(injectIntl)(FitAndSizing)

export default FitAndSizingEnhance
