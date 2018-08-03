/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import { Container, Color, Row, Col } from './styledComponents'
import colors from './colors'
import stitchingColors from './stitchingColors'
import { StitchingColor } from '../../../types/common'

interface Props {
  onSelectColor?: (color: string) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  height?: number
  stitching?: boolean
  stitchingColor?: StitchingColor
}

const ColorList = ({
  onSelectColor = () => {},
  onSelectStitchingColor = () => {},
  height = 40,
  stitching = false,
  stitchingColor = { value: '', name: '' }
}: Props) => {
  const setColor = (color: string) => () => onSelectColor(color)
  const setStitchingColor = (color: StitchingColor) => () =>
    onSelectStitchingColor(color)
  const arrayColors = !stitching ? colors : stitchingColors
  const colorsList = arrayColors.map(({ value, name }, index) => (
    <Tooltip key={index} title={name}>
      <Col>
        <Color
          selected={value === stitchingColor.value}
          color={value}
          onClick={
            stitching ? setStitchingColor({ name, value }) : setColor(value)
          }
        />
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
