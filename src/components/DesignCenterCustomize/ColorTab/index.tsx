/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Divider from 'antd/lib/divider'
import ColorButton from '../ColorButton'
import nextIcon from '../../../assets/rightarrow.svg'
import messages from './messages'
import {
  Container,
  TextColors,
  Text,
  Top,
  Row,
  NextIcon,
  ColorButtons
} from './styledComponents'

interface Props {
  onSelectColorBlock: (index: number) => void
  colorBlock: number
}

const colors = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5']

const ColorTab = ({ onSelectColorBlock, colorBlock }: Props) => {
  const colorButtons = colors.map((label, index) => (
    <ColorButton
      key={index}
      {...{ index, label, onSelectColorBlock }}
      currentColor={index === 1 ? '#E53636' : ''}
      selected={colorBlock === index}
    />
  ))
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
      <ColorButtons>{colorButtons}</ColorButtons>
      <Divider />
    </Container>
  )
}

export default ColorTab
