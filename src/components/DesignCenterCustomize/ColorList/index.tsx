/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import { Container, Color, Row, Col } from './styledComponents'
import colors from './colors'

interface Props {
  onSelectColor: (color: string) => void
  height?: number
}

const ColorList = ({ onSelectColor, height = 40 }: Props) => {
  const setColor = (color: string) => () => onSelectColor(color)
  const colorsList = colors.map(({ value, name }, index) => (
    <Tooltip key={index} title={name}>
      <Col>
        <Color color={value} onClick={setColor(value)} />
      </Col>
    </Tooltip>
  ))
  return (
    <Container {...{ height }}>
      <Row>{colorsList}</Row>
    </Container>
  )
}

export default ColorList
