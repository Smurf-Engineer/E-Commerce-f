/**
 * DesignCenterHeader Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import backIcon from '../../assets/rightarrow.svg'
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

interface Props {
  deliveryDays: string
  onPressBack: () => void
}

const DesignCenterHeader = ({ onPressBack, deliveryDays }: Props) => (
  <Container>
    <Row>
      <BackButton onClick={onPressBack}>
        <BackIcon src={backIcon} />
        <Back>
          <FormattedMessage {...messages.back} />
        </Back>
      </BackButton>
      <Logo src={expressLogo} />
      <Date>
        {deliveryDays && (
          <FormattedMessage {...messages.date} values={{ deliveryDays }} />
        )}
      </Date>
    </Row>
    <Divider />
  </Container>
)

export default DesignCenterHeader
