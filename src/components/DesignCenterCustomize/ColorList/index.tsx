/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
import { StitchingColor } from '../../../types/common'

interface Color {
  value: string
  name: string
}
interface Props {
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  height?: number
  stitching?: boolean
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
  colorsList: any
}

const ColorList = ({
  onSelectColor = () => {},
  onSelectStitchingColor = () => {},
  height = 40,
  stitching = false,
  stitchingColor = { value: '', name: '' },
  colorsList
}: Props) => {
  const setColor = (color: string, name: string, index: number) => () =>
    onSelectColor(color, name, index)
  const setStitchingColor = (color: StitchingColor) => () => {
    // tslint:disable-next-line:curly
    if (color.value !== stitchingColor.value) onSelectStitchingColor(color)
  }

  const arrayColors: any = !stitching
    ? JSON.parse(get(colorsList, 'colorsResult.colors', []))
    : JSON.parse(get(colorsList, 'colorsResult.stitchingColors', []))
  const colorList = arrayColors.map(({ value, name }: Color, index: number) => (
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
      <Row>{colorList}</Row>
    </Container>
  )
}

export default ColorList
