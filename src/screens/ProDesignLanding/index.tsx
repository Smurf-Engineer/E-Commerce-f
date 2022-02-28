/**
 * ProDesignLanding Screen - Created by eduardoquintero on 18/02/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import {
  BigImage,
  BottomButton,
  BottomSection,
  BottomText,
  CarouselContainer,
  CarouselItem,
  Container,
  DataContainer,
  FlexSide,
  FlexSideLeft,
  FlexSideRight,
  FullImage,
  LeftText,
  ListItem,
  ListItemMobile,
  LogoIcon,
  MediumImage,
  PhotoImage,
  PhotoImageFull,
  PhotoImageNormal,
  ProDesignLogo,
  RightText,
  Section,
  SectionFlex,
  SectionFlexInverted,
  SmallImage,
  Subtitle,
  SubtitleNormal,
  SubtitleSpecial,
  TitleText,
  TitleTextFirst,
  TopBar
} from './styledComponents'
import Carousel from 'antd/lib/carousel'
import logo from '../../assets/jakroo_logo.svg'
import { injectIntl, InjectedIntl } from 'react-intl'
import Helmet from 'react-helmet'

interface Props {
  intl: InjectedIntl
  history: any
}

class ProDesignLanding extends React.Component<Props, {}> {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      setTimeout(() => { window.scrollTo(0, 0) }, 1000)
    }
  }
  goToProDesign = () => {
    const { history } = this.props
    history.push('/pro-design')
  }
  goToHomePage = () => {
    window.location.replace('/')
  }
  render() {    
    return (
      <Container>
        <Helmet
          meta={[
            { property: 'og:title', content: 'ProDesign by Jakroo' },
            { property: 'og:url', content: 'https://jakroo.com/prodesign' },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: 'https://storage.googleapis.com/jakroo/homepage/01.jpg' }
          ]}
          title={'ProDesign by Jakroo'}
        >
          <title>ProDesign by Jakroo</title>
        </Helmet>
        <TopBar>
          <LogoIcon onClick={this.goToHomePage} src={logo} />
        </TopBar>
        <DataContainer>
          <CarouselContainer>
            <Carousel
              autoplaySpeed={300}
              fade={true}
              autoplay={true}
              pauseOnHover={false}
            >
              {/* tslint:disable-next-line: max-line-length */}
              <CarouselItem src="https://storage.googleapis.com/jakroo/homepage/home-landing.png" />
            </Carousel>
          </CarouselContainer>
          <Section>
            <LeftText>
              <ProDesignLogo src="https://storage.googleapis.com/jakroo/homepage/Pro-Design.svg" />
              <TitleTextFirst>COLLABORATE WITH THE PROS</TitleTextFirst>
              <SubtitleSpecial>Work together with the Jakroo Design Team to create your custom kit.</SubtitleSpecial>
              <ListItem>Ideal for competitive teams or clubs requiring multiple products.</ListItem>
              <ListItem>Advanced design for color aesthetic to match your branding requirements.</ListItem>
              <ListItem>Dedicated Account Manager to assist with design and ordering.</ListItem>
              <ListItem>Team Collaboration tool to gather feedback from Team members.</ListItem>
              <ListItem>Design dashboard to easily view, add or approve your designs.</ListItem>
              <ListItemMobile>Ideal for competitive teams</ListItemMobile>
              <ListItemMobile>Advanced design options</ListItemMobile>
              <ListItemMobile>Dedicated Account Manager</ListItemMobile>
              <ListItemMobile>Team Collaboration Feature</ListItemMobile>
              <ListItemMobile>Design Dashboard</ListItemMobile>
            </LeftText>
            <FullImage src="https://storage.googleapis.com/jakroo/homepage/prodesign.jpg" />  
          </Section>
          <SectionFlex>
            <FlexSide>
              <TitleText>IT STARTS WITH AN IDEA...</TitleText>
              <Subtitle>
                Use the inspiration gallery to brainstorm and provide our Pro Designers with an 
                idea of what you're visualizing, along with any sketches, logos or art files.
              </Subtitle>
              <BigImage src="https://storage.googleapis.com/jakroo/homepage/idea.png" />
            </FlexSide>
            <FlexSide>
              <PhotoImage src="https://storage.googleapis.com/jakroo/homepage/Moodboard.png" />
            </FlexSide>
          </SectionFlex>
          <SectionFlexInverted>
            <FlexSide>
              <PhotoImage src="https://storage.googleapis.com/jakroo/homepage/commentsboard.png" />
            </FlexSide>
            <FlexSide>
              <TitleText>THE BEST IDEAS COME FROM TEAMWORK.</TitleText>
              <Subtitle>
                Collaborate with your team members using the Comments Board 
                and work with the Jakroo Design Team to bring your ideas into reality.
              </Subtitle>
              <BigImage src="https://storage.googleapis.com/jakroo/homepage/Team.png" />
            </FlexSide>
          </SectionFlexInverted>
          <Section>
            <RightText>
              <TitleText>QUALITY ASSURED</TitleText>
              <Subtitle>
                After 20 years of designing performance endurance apparel, we've seen 
                it worn under virtually every condition, and build products to meet the 
                challenges of the road, mountain or track.
              </Subtitle>
              <SmallImage src="https://storage.googleapis.com/jakroo/homepage/Quality3.png" />
            </RightText>
            <FullImage src="https://storage.googleapis.com/jakroo/homepage/Quality.jpg" />  
          </Section>
          <SectionFlex>
            <FlexSide>
              <TitleText>CUSTOM STORES FOR TEAMS.</TitleText>
              <SubtitleNormal>FLEXIBLE. CONVENIENT. SAFE.</SubtitleNormal>
              <Subtitle>Fast and convenient individual ordering, checkout and shipping for each member</Subtitle>
              <MediumImage src="https://storage.googleapis.com/jakroo/homepage/Two%20Types.png" />
            </FlexSide>
            <FlexSide>
              <PhotoImageNormal src="https://storage.googleapis.com/jakroo/homepage/Team%20Store%20Computer.png" />
            </FlexSide>
          </SectionFlex>
          <SectionFlex>
            <FlexSideLeft>
              <PhotoImageFull src="https://storage.googleapis.com/jakroo/homepage/ServiceAftercare.jpg" />
            </FlexSideLeft>
            <FlexSide>
              <TitleText>SERVICE & AFTERCARE</TitleText>
              <Subtitle>
                <p>
                We place the highest value on building trust and being honest and transparent. Our aim is 
                to be responsive and respectful, creating positive interactions with all our customers.
                </p>
                <p>
                From personalized size recommendations at time of order, through to aftercare service 
                with our warranty and crash replacement programs, we are there to support you and provide 
                the assurance that your investment is protected.
                </p>
              </Subtitle>
              <BigImage src="https://storage.googleapis.com/jakroo/homepage/Aftercare.png" />
            </FlexSide>
          </SectionFlex>
          <SectionFlexInverted>
            <FlexSide>
              <TitleText>TURNAROUND</TitleText>
              <Subtitle>
                <p>
                Our proprietary on-demand, just-in-time manufacturing system vertically integrates all core business 
                functions, from design and customer service through to production and delivery.
                </p>
                <p>
                The result is the <strong>world's fastest turnaround time</strong> for customized technical apparel.
                <br/>
                Only 2 weeks or less from order to arrival at your door.
                </p>
              </Subtitle>
              <BigImage src="https://storage.googleapis.com/jakroo/homepage/calendar.svg" />
            </FlexSide>
            <FlexSideRight>
              <PhotoImageFull src="https://storage.googleapis.com/jakroo/homepage/Turnaround.jpg" />
            </FlexSideRight>
          </SectionFlexInverted>
          <BottomSection>
            <BottomText>
              Pro Design includes an initial free design + 2 free edits per product
            </BottomText>
            <BottomButton onClick={this.goToProDesign}>
              GET STARTED TODAY
            </BottomButton>
          </BottomSection>
        </DataContainer>
      </Container>
    )
  }
}

const ProDesignLandingEnhanced = compose(
  injectIntl
)(ProDesignLanding)
export default ProDesignLandingEnhanced
