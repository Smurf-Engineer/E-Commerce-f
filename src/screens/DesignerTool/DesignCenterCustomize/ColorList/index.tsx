/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
interface Color {
  value: string
  name: string
}
interface Props {
  onSelectColor?: (color: string) => void
  height?: string
  colorsList: any
  stitching: boolean
}

const ColorList = ({
  onSelectColor = () => {},
  height,
  stitching,
  colorsList
}: Props) => {
  const handleOnSelectColor = (color: string) => () => onSelectColor(color)
  const arrayColors: any = !stitching
    ? JSON.parse(get(colorsList, 'colorsResult.colors', []))
    : JSON.parse(get(colorsList, 'colorsResult.stitchingColors', []))
  const colorList = arrayColors.map(({ value, name }: Color, index: number) => (
    <Tooltip key={index} title={name}>
      <Col>
        <Color color={value} onClick={handleOnSelectColor(value)} />
      </Col>
    </Tooltip>
  ))
  return (
    <Container height={height}>
      <Row>{colorList}</Row>
    </Container>
  )
}

export default ColorList
