/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import ColorButton from '../ColorButton'
import nextIcon from '../../../assets/rightarrow.svg'
import messages from './messages'
import {
  Container,
  TextColors,
  Text,
  Top,
  Row,
  NextIcon
} from './styledComponents'

interface Props {}

const colors = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5']

const ColorTab = (props: Props) => {
  return (
    <Container>
      <Top>
        <TextColors>
          <FormattedMessage {...messages.selectColor} />
        </TextColors>
        <Row>
          <Text>
            <FormattedMessage {...messages.myPalettes} />
          </Text>
          <NextIcon src={nextIcon} />
        </Row>
      </Top>
    </Container>
  )
}

export default ColorTab
