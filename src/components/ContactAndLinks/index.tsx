/**
 * ContactAndLinks Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import ContactInfo from '../ContactInfo'
import CustomerSupport from '../CustomerSupport'
import DesignSupport from '../DesignSupport'
import MediaQuery from 'react-responsive'
import AboutUs from '../AboutUs'
import Teams from '../Teams'
import { Container, ComplianceLogos, StyledImg } from './styledComponents'
import BSCILogo from '../../assets/BSCI_logo.svg'
import CaliPropLogo from '../../assets/californiaprop65.svg'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  fakeWidth: number
}

const ContactAndLinks = ({ formatMessage, fakeWidth }: Props) => {
  return (
    <MediaQuery
      minWidth={992}
      values={{ width: fakeWidth, deviceWidth: fakeWidth }}
    >
      {matches => {
        if (matches) {
          return (
            <Container>
              <ContactInfo {...{ formatMessage }} />
              <CustomerSupport {...{ formatMessage }} />
              <DesignSupport {...{ formatMessage }} />
              <AboutUs {...{ formatMessage }} />
              <Teams {...{ formatMessage }} />
              <ComplianceLogos>
                <StyledImg alt="logo" src={BSCILogo} />
                <StyledImg alt="logo" src={CaliPropLogo} />
              </ComplianceLogos>
            </Container>
          )
        } else {
          return <div>MOBILE CONTACT LINKS</div>
        }
      }}
    </MediaQuery>
  )
}

export default ContactAndLinks
