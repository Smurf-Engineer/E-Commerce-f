/**
 * Technology Screen - Created by gustavomedina on 06/06/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import zenscroll from 'zenscroll'
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
  private tech: any
  private fabrics: any

  handleOnButtonClick = (event: any, index: number) => {
    switch (index) {
      case 0:
        zenscroll.to(this.tech)
        break
      case 1:
        zenscroll.to(this.fabrics)
        break
      default:
        break
    }
  }

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
                <TopImageButton onClick={e => this.handleOnButtonClick(e, 0)}>
                  <FormattedMessage {...messages.chamoisTitle} />
                </TopImageButton>
                <TopImageButton onClick={e => this.handleOnButtonClick(e, 1)}>
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
          <div
            ref={section => {
              this.tech = section
            }}
          >
            <SecondTitle>
              <FormattedMessage {...messages.chamoisTitle} />
            </SecondTitle>
          </div>
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
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/standard.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.standardContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Tri.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.triContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Youth.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.youthContent)
                }}
              />
            </ProItem>
          </ProContainer>
          <LineCopy />
          <div
            ref={section => {
              this.fabrics = section
            }}
          >
            <SecondTitle>
              <FormattedMessage {...messages.fabricsTitle} />
            </SecondTitle>
          </div>
          <ProContainer>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Fullmoon.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.fullMoonContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Timeout.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.timeOutContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Saphire.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.saphireContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Diamond.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.diamondContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Onyx.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.onyxContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/Fastflow.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.fastFlowContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/airsteam.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.airStreamContent)
                }}
              />
            </ProItem>
            <ProItem>
              <ImgItem
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/tech/atom85.webp'
                }
              />
              <ProText
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(messages.atomContent)
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
