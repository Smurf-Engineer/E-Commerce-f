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
import teamkits from '../../assets/teamkits.jpg'
import teamkits1 from '../../assets/teamkits1.jpg'
import teamkits2 from '../../assets/teamkits2.jpg'
import teamkits3 from '../../assets/teamkits3.jpg'

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
            <StyledImg src={teamkits} />
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
              <DesignImage src={teamkits1} />
              <SectionText>
                <SectionSubtitle>
                  <FormattedMessage {...messages.profesionalDesign} />
                </SectionSubtitle>
                <FormattedMessage {...messages.profesionalDesignText} />
              </SectionText>
            </DesignRow>
            <OrderingAndFabricRow>
              <Section>
                <OrderingAndFabricImage src={teamkits2} />
                <OrderAndFabricText>
                  <SectionSubtitle>
                    <FormattedMessage {...messages.orderingTitle} />
                  </SectionSubtitle>
                  <FormattedMessage {...messages.orderingText} />
                </OrderAndFabricText>
              </Section>
              <Section>
                <OrderingAndFabricImage src={teamkits3} />
                <OrderAndFabricText>
                  <SectionSubtitle>
                    <FormattedMessage {...messages.technologyTitle} />
                  </SectionSubtitle>
                  <FormattedMessage {...messages.technologyText} />
                  <FullDetailsRow onClick={this.handleFullDetailsClick}>
                    <FormattedMessage {...messages.fullDetailsLabel} />
                    <ArrowRight src={RightArrowIcon} />
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
