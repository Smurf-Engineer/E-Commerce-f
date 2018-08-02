/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import { Container, Color, Row, Col } from './styledComponents'
import colors from './colors'
import stitchingColors from './stitchingColors'

interface Props {
  onSelectColor: (color: string) => void
  height?: number
  stitching?: boolean
}

const ColorList = ({
  onSelectColor,
  height = 40,
  stitching = false
}: Props) => {
  const setColor = (color: string) => () => onSelectColor(color)
  const arrayColors = !stitching ? colors : stitchingColors
  const colorsList = arrayColors.map(({ value, name }, index) => (
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
