/**
 * DesignCenterHeader Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import moment from 'moment'
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
import expressLogo from '../../assets/JakrooExpressLogo.svg'

interface Props {
  onPressBack: () => void
}

const getDeliveryDate = (): string => {
  const currentDate = moment().add(10, 'days')
  return currentDate.format('MMMM DD')
}

const DesignCenterHeader = ({ onPressBack }: Props) => {
  const date = getDeliveryDate()
  return (
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
          <FormattedMessage {...messages.date} values={{ date }} />
        </Date>
      </Row>
      <Divider />
    </Container>
  )
}

export default DesignCenterHeader
