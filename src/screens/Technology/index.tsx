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

const fabricsArray = [
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/Fullmoon.webp',
    id: 'fullMoonContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/Timeout.webp',
    id: 'timeOutContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/Saphire.webp',
    id: 'saphireContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/Diamond.webp',
    id: 'diamondContent'
  },
  {
    url: 'https://storage.googleapis.com/jakroo-storage/screens/tech/Onyx.webp',
    id: 'onyxContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/Fastflow.webp',
    id: 'fastFlowContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/airsteam.webp',
    id: 'airStreamContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/atom85.webp',
    id: 'atomContent'
  }
]

const techArray = [
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/standard.webp',
    id: 'standardContent'
  },
  {
    url: 'https://storage.googleapis.com/jakroo-storage/screens/tech/Tri.webp',
    id: 'triContent'
  },
  {
    url:
      'https://storage.googleapis.com/jakroo-storage/screens/tech/Youth.webp',
    id: 'youthContent'
  }
]

export class Technology extends React.Component<Props, {}> {
  private tech: any
  private fabrics: any

  handleOnButtonClick = (index: number) => () => {
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
    const fabricsList = fabricsArray.map((fabric, index) => {
      return (
        <ProItem key={index}>
          <ImgItem src={fabric.url} />
          <ProText
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(messages[fabric.id])
            }}
          />
        </ProItem>
      )
    })

    const proList = techArray.map((tech, index) => {
      return (
        <ProItem key={index}>
          <ImgItem src={tech.url} />
          <ProText
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(messages[tech.id])
            }}
          />
        </ProItem>
      )
    })

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
                <TopImageButton onClick={this.handleOnButtonClick(0)}>
                  <FormattedMessage {...messages.chamoisTitle} />
                </TopImageButton>
                <TopImageButton onClick={this.handleOnButtonClick(1)}>
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
          <ProContainer>{proList}</ProContainer>
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
          <ProContainer>{fabricsList}</ProContainer>
        </Container>
      </Layout>
    )
  }
}

const TechnologyEnhance = compose(injectIntl)(Technology)

export default TechnologyEnhance
