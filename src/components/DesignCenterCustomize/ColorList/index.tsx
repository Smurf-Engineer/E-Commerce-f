/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Color, Row, Col } from './styledComponents'
import colors from './colors'

interface Props {
  onSelectColor: (color: string) => void
}

const ColorList = ({ onSelectColor }: Props) => {
  const colorsList = colors.map(({ value, name }, index) => (
    <Tooltip key={index} title={name}>
      <Col>
        <Color color={value} onClick={() => onSelectColor(value)} />
      </Col>
    </Tooltip>
  ))
  return (
    <Container>
      <Row>{colorsList}</Row>
    </Container>
  )
}

export default ColorList
