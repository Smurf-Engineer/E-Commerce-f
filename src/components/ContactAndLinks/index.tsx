/**
 * ContactAndLinks Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import ContactInfo from '../ContactInfo'
import CustomerSupport from '../CustomerSupport'
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
} from './styledComponents'
import BSCILogo from '../../assets/BSCI_logo.svg'
import CaliPropLogo from '../../assets/californiaprop65.svg'
import PeopleForBikesLogo from '../../assets/people-for-bikes.png'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openReseller?: () => void
  fakeWidth: number
  history?: any
}

const ContactAndLinks = ({
  formatMessage,
  fakeWidth,
  history,
  openReseller = () => {},
}: Props) => {
  return (
    <MediaQuery
      minWidth={768}
      values={{ width: fakeWidth, deviceWidth: fakeWidth }}
    >
      {(matches) => {
        if (matches) {
          return (
            <Container>
              <ContactInfo {...{ history, formatMessage }} />
              <CustomerSupport {...{ history, formatMessage }} />
              <DesignSupport {...{ history, formatMessage }} />
              <AboutUs {...{ history, formatMessage }} />
              <Teams {...{ history, formatMessage, openReseller }} />
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
              <ContactInfo {...{ history, formatMessage }} />
              <Row>
                <div>
                  <CustomerSupport {...{ history, formatMessage }} />
                  <DesignSupport {...{ history, formatMessage }} />
                </div>
                <div>
                  <AboutUs {...{ history, formatMessage }} />
                  <Teams {...{ history, formatMessage }} />
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
