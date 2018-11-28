/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { Container, Color, Row, Col } from './styledComponents'
import colors from './colors'
import stitchingColors from './stitchingColors'
import { StitchingColor } from '../../../types/common'

interface Props {
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  height?: number
  stitching?: boolean
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
}

const ColorList = ({
  onSelectColor = () => { },
  onSelectStitchingColor = () => { },
  height = 40,
  stitching = false,
  stitchingColor = { value: '', name: '' }
}: Props) => {
  const setColor = (color: string, name: string, index: number) => () =>
    onSelectColor(color, name, index)
  const setStitchingColor = (color: StitchingColor) => () => {
    // tslint:disable-next-line:curly
    if (color.value !== stitchingColor.value) onSelectStitchingColor(color)
  }
  const arrayColors = !stitching ? colors : stitchingColors
  const colorsList = arrayColors.map(({ value, name }, index) => (
    <Col key={index} className="custom-tooltip">
      <Color
        selected={value === stitchingColor.value}
        color={value}
        onClick={
          stitching
            ? setStitchingColor({ name, value })
            : setColor(value, name, index)
        }
      />
      {!!name && <div className="tooltip-content">{name}</div>}
    </Col>
  ))
  return (
    <Container {...{ height }}>
      <Row>{colorsList}</Row>
    </Container>
  )
}

export default ColorList
