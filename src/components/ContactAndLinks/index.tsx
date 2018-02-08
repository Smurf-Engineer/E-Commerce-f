/**
 * ContactAndLinks Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import ContactInfo from '../ContactInfo'
import CustomerSupport from '../CustomerSupport'
import DesignSupport from '../DesignSupport'
import AboutUs from '../AboutUs'
import Teams from '../Teams'
import { Container, Text, ComplianceLogos, StyledImg } from './styledComponents'
import BSCILogo from '../../assets/BSCI_logo.svg'
import CaliPropLogo from '../../assets/californiaprop65.svg'

interface Props {}

const ContactAndLinks = (props: Props) => {
  return (
    <Container>
      <ContactInfo />
      <CustomerSupport />
      <DesignSupport />
      <AboutUs />
      <Teams />
      <ComplianceLogos>
        <StyledImg alt="logo" src={BSCILogo} />
        <StyledImg alt="logo" src={CaliPropLogo} />
      </ComplianceLogos>
    </Container>
  )
}

export default ContactAndLinks
