/**
 * ContactAndLinks Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import ContactInfo from '../ContactInfo'
import CustomerSupport from '../CustomerSupport'
import SportsFooter from '../SportsFooter'
import ProductsFooter from '../ProductsFooter'
import DesignSupport from '../DesignSupport'
import MediaQuery from 'react-responsive'
import AboutUs from '../AboutUs'
// TODO: commented code is for hiding the teams section in the footer, delete when confirm it woun'd be needed anymore
import Teams from '../Teams'
import {
  Container,
  ComplianceLogos,
  StyledImg,
  ContainerMobile,
  Row,
  RewardLogo,
} from './styledComponents'
import BSCILogo from '../../assets/BSCI_logo.svg'
import CaliPropLogo from '../../assets/californiaprop65.svg'
import PeopleForBikesLogo from '../../assets/people-for-bikes.png'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openReseller?: () => void
  fakeWidth: number
  history?: any
  currentRegion: string
  currentLanguage: string
  currentCurrency?: string
}

const ContactAndLinks = ({
  formatMessage,
  fakeWidth,
  history,
  currentRegion,
  currentLanguage,
  currentCurrency,
  openReseller = () => {},
}: Props) => {
  return (
    <MediaQuery
      minWidth={769}
      values={{ width: fakeWidth, deviceWidth: fakeWidth }}
    >
      {(matches) => {
        if (matches) {
          return (
            <Container>
              <ContactInfo {...{ history, formatMessage, currentRegion }} />
              <SportsFooter {...{ history, formatMessage, currentCurrency, currentLanguage, currentRegion }} />
              <ProductsFooter {...{ history, formatMessage, currentCurrency, currentLanguage, currentRegion }} />
              <CustomerSupport {...{ history, formatMessage }} />
              <DesignSupport {...{ history, formatMessage }} />
              <AboutUs {...{ history, formatMessage }} />
              <Teams {...{ history, formatMessage, openReseller }} />
              <RewardLogo>
                <div id="y-badges" className="yotpo yotpo-badge badge-init" />
              </RewardLogo>
              <ComplianceLogos>
                <a href="/compliance">
                  <StyledImg alt="logo" src={PeopleForBikesLogo} />
                </a>
                <a href="/compliance">
                  <StyledImg alt="logo" src={BSCILogo} />
                </a>
                <a href="/compliance">
                  <StyledImg alt="logo" src={CaliPropLogo} />
                </a>
              </ComplianceLogos>
            </Container>
          )
        } else {
          return (
            <ContainerMobile>
              <ContactInfo {...{ history, formatMessage, currentRegion }} />
              <Row>
                <div>
                  <CustomerSupport {...{ history, formatMessage }} /><br/>
                  <DesignSupport {...{ history, formatMessage }} /><br/>
                  <Teams {...{ history, formatMessage, openReseller }} />
                </div>
                <div>
                  <SportsFooter {...{ history, formatMessage, currentCurrency, currentLanguage, currentRegion }} /><br/>
                  <AboutUs {...{ history, formatMessage }} />
                  <RewardLogo>
                    <div id="y-badges" className="yotpo yotpo-badge badge-init" />
                  </RewardLogo>
                </div>
              </Row>
              <ComplianceLogos>
                <StyledImg alt="logo" src={PeopleForBikesLogo} />
                <StyledImg alt="logo" src={BSCILogo} />
                <StyledImg alt="logo" src={CaliPropLogo} />
              </ComplianceLogos>
            </ContainerMobile>
          )
        }
      }}
    </MediaQuery>
  )
}

export default ContactAndLinks
