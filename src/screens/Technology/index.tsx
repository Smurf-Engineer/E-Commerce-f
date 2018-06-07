/**
 * Technology Screen - Created by gustavomedina on 06/06/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import messages from './messages'
import {
  Container,
  ImageTitleContainer,
  StyledImg,
  HeaderTextContainer,
  TopImageButton,
  Title,
  ButtonsContainer,
  Paragraph,
  ParagraphContainer,
  OkoeImg,
  LineCopy,
  SecondTitle,
  Subtitle,
  TechContainer,
  TechImg,
  ProContainer,
  ProItem,
  ImgItem,
  ProText
} from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class Technology extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <ImageTitleContainer>
            <StyledImg
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/tech/header-tech.webp'
              }
            />
            <HeaderTextContainer>
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
              <ButtonsContainer>
                <TopImageButton>
                  {/* <TopImageButton onClick={this.handleFreeDesignClick}> */}
                  <FormattedMessage {...messages.chamoisTitle} />
                </TopImageButton>
                <TopImageButton>
                  {/* <TopImageButton onClick={this.handleFreeDesignClick}> */}
                  <FormattedMessage {...messages.fabricsTitle} />
                </TopImageButton>
              </ButtonsContainer>
            </HeaderTextContainer>
          </ImageTitleContainer>
          <ParagraphContainer>
            <OkoeImg
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/tech/oeko-tex.webp'
              }
            />
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.oeko)
              }}
            />
          </ParagraphContainer>
          <LineCopy />
          <SecondTitle>
            <FormattedMessage {...messages.chamoisTitle} />
          </SecondTitle>
          <Subtitle>
            <FormattedMessage {...messages.chamoisSubTitle} />
          </Subtitle>
          <TechContainer>
            <TechImg
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/tech/tech1.webp'
              }
            />
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.chamoisTech)
              }}
            />
          </TechContainer>
          <TechContainer>
            <TechImg
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
              }
            />
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.proContent)
              }}
            />
          </TechContainer>
          <ProContainer>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
          </ProContainer>
          <LineCopy />
          <SecondTitle>
            <FormattedMessage {...messages.fabricsTitle} />
          </SecondTitle>
          <ProContainer>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/JakrooPRO.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.proContent)
                }}
              />
            </ProItem>
          </ProContainer>
        </Container>
      </Layout>
    )
  }
}

const TechnologyEnhance = compose(injectIntl)(Technology)

export default TechnologyEnhance
