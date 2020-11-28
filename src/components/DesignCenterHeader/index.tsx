/**
 * DesignCenterHeader Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import backIcon from '../../assets/rightarrow.svg'
import whiteBackIcon from '../../assets/rightarrowwhite.svg'

import {
  Container,
  Row,
  BackButton,
  Back,
  Date,
  Logo,
  Divider,
  BackIcon
} from './styledComponents'
import expressLogo from '../../assets/JakrooDesignLogo.png'
import proDesignLogo from '../../assets/Jakroo_Pro_White.png'

interface Props {
  deliveryDays?: string
  proDesign?: boolean
  onPressBack: () => void
}

const DesignCenterHeader = ({ onPressBack, deliveryDays, proDesign = false }: Props) => (
  <Container dark={proDesign}>
    <Row>
      <BackButton onClick={onPressBack}>
        <BackIcon src={proDesign ? whiteBackIcon : backIcon} />
        <Back>
          <FormattedMessage {...messages.back} />
        </Back>
      </BackButton>
      <Logo src={!proDesign ? expressLogo : proDesignLogo} />
      {!proDesign && <Date>
        {deliveryDays && (
          <FormattedMessage {...messages.date} values={{ deliveryDays }} />
        )}
      </Date>}
    </Row>
    <Divider />
  </Container>
)

export default DesignCenterHeader
