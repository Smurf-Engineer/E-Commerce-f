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

interface Props {
  onPressBack: () => void
}

const DesignCenterHeader = ({ onPressBack }: Props) => {
  return (
    <Container>
      <Row>
        <BackButton onClick={onPressBack}>
          <BackIcon src={backIcon} />
          <Back>
            <FormattedMessage {...messages.back} />
          </Back>
        </BackButton>
        {/* TODO: Logo */}
        <Logo>LOGO</Logo>
        <Date>
          {/* TODO: Date from query */}
          <FormattedMessage {...messages.date} values={{ date: 'March 10' }} />
        </Date>
      </Row>
      <Divider />
    </Container>
  )
}

export default DesignCenterHeader
