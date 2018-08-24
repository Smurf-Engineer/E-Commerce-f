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
  ProText,
  TechParagraph
} from './styledComponents'
import Layout from '../../components/MainLayout'
import fullmoon from '../../assets/Fullmoon.png'
import timeOut from '../../assets/Timeout.png'
import saphire from '../../assets/Saphire.png'
import diamond from '../../assets/diamond.png'
import onyx from '../../assets/onix.png'
import fastFlow from '../../assets/fastflow.png'
import airsteam from '../../assets/airsteam.png'
import atom85 from '../../assets/atom-85.png'
import standard from '../../assets/standard.png'
import tri from '../../assets/Tri.png'
import youth from '../../assets/Youth.png'
import jakrooPro from '../../assets/jakroopro.png'
import tech1 from '../../assets/tech1.png'
import oekoTex from '../../assets/oeko-tex.png'
import techHeader from '../../assets/Tech-header.jpg'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

const fabricsArray = [
  {
    url: fullmoon,
    id: 'fullMoonContent'
  },
  {
    url: timeOut,
    id: 'timeOutContent'
  },
  {
    url: saphire,
    id: 'saphireContent'
  },
  {
    url: diamond,
    id: 'diamondContent'
  },
  {
    url: onyx,
    id: 'onyxContent'
  },
  {
    url: fastFlow,
    id: 'fastFlowContent'
  },
  {
    url: airsteam,
    id: 'airStreamContent'
  },
  {
    url: atom85,
    id: 'atomContent'
  }
]

const techArray = [
  {
    url: standard,
    id: 'standardContent'
  },
  {
    url: tri,
    id: 'triContent'
  },
  {
    url: youth,
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
            <StyledImg src={techHeader} />
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
            <OkoeImg src={oekoTex} />
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
            <TechImg src={tech1} />
            <TechParagraph
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.chamoisTech)
              }}
            />
          </TechContainer>
          <TechContainer>
            <TechImg src={jakrooPro} />
            <TechParagraph
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
