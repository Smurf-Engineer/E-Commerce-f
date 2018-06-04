/**
 * TeamKits Screen - Created by cazarez on 01/06/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import messages from './messages'
import {
  Container,
  Content,
  SectionTitle,
  SectionSubtitle,
  ImageTitleContainer,
  HeaderTextContainer,
  StyledImg,
  DesignRow,
  OrderingAndFabricRow,
  TeamsKitsTitle,
  TopImageButton,
  DesignImage,
  OrderingAndFabricImage,
  SectionText,
  OrderAndFabricText,
  Section,
  FullDetailsRow,
  ButtonRow,
  FreeDesignButton,
  ArrowRight
} from './styledComponents'
import Layout from '../../components/MainLayout'
import RightArrowIcon from '../../assets/rightarrow.svg'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class TeamKits extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <ImageTitleContainer>
            <StyledImg
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/teamkits.webp'
              }
            />
            <HeaderTextContainer>
              <TeamsKitsTitle>
                <FormattedMessage {...messages.title} />
              </TeamsKitsTitle>
              <TopImageButton onClick={this.handleFreeDesignClick}>
                <FormattedMessage {...messages.freeDesignButtonLabel} />
              </TopImageButton>
            </HeaderTextContainer>
          </ImageTitleContainer>
          <Content>
            <SectionTitle>
              <FormattedMessage {...messages.cyclingToTriathlon} />
            </SectionTitle>
            <DesignRow>
              <DesignImage
                src={
                  'https://storage.googleapis.com/jakroo-storage/screens/teamkits1.webp'
                }
              />
              <SectionText>
                <SectionSubtitle>
                  <FormattedMessage {...messages.profesionalDesign} />
                </SectionSubtitle>
                <FormattedMessage {...messages.profesionalDesignText} />
              </SectionText>
            </DesignRow>
            <OrderingAndFabricRow>
              <Section>
                <OrderingAndFabricImage
                  src={
                    'https://storage.googleapis.com/jakroo-storage/screens/teamkits2.webp'
                  }
                />
                <OrderAndFabricText>
                  <SectionSubtitle>
                    <FormattedMessage {...messages.orderingTitle} />
                  </SectionSubtitle>
                  <FormattedMessage {...messages.orderingText} />
                </OrderAndFabricText>
              </Section>
              <Section>
                <OrderingAndFabricImage
                  src={
                    'https://storage.googleapis.com/jakroo-storage/screens/teamkits3.webp'
                  }
                />
                <OrderAndFabricText>
                  <SectionSubtitle>
                    <FormattedMessage {...messages.technologyTitle} />
                  </SectionSubtitle>
                  <FormattedMessage {...messages.technologyText} />
                  <FullDetailsRow>
                    <FormattedMessage {...messages.fullDetailsLabel} />
                    <ArrowRight
                      src={RightArrowIcon}
                      onClick={this.handleFullDetailsClick}
                    />
                  </FullDetailsRow>
                </OrderAndFabricText>
              </Section>
            </OrderingAndFabricRow>
          </Content>
          <ButtonRow>
            <FreeDesignButton onClick={this.handleFreeDesignClick}>
              <FormattedMessage {...messages.freeDesignButtonLabel} />
            </FreeDesignButton>
          </ButtonRow>
        </Container>
      </Layout>
    )
  }

  handleFreeDesignClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleFullDetailsClick = () => {
    const { history } = this.props
    history.push('/technology')
  }
}

const TeamKitsEnhanced = compose(injectIntl)(TeamKits)

export default TeamKitsEnhanced
