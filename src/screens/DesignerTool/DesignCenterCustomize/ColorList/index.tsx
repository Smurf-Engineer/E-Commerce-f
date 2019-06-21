/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import filter from 'lodash/filter'
import Divider from 'antd/lib/divider'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
import Message from 'antd/lib/message'

interface Color {
  value: string
  name: string
  type?: string
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
  let arrayColors: any
  try {
    arrayColors = JSON.parse(
      get(
        colorsList,
        !stitching ? 'colorsResult.colors' : 'colorsResult.stitchingColors',
        []
      )
    )
  } catch (e) {
    Message.error(e)
  }
  const regularColors =
    arrayColors && arrayColors.length
      ? filter(arrayColors, color => !color.type)
      : []
  const fluorescentColors =
    !stitching && arrayColors && arrayColors.length
      ? filter(arrayColors, color => color.type)
      : []

  const colorList = regularColors.map(
    ({ value, name }: Color, index: number) => (
      <Tooltip key={index} title={name}>
        <Col>
          <Color color={value} onClick={handleOnSelectColor(value)} />
        </Col>
      </Tooltip>
    )
  )
  const fluorescentColorList = fluorescentColors.map(
    ({ value, name }: Color, index: number) => (
      <Tooltip key={index} title={name}>
        <Col>
          <Color color={value} onClick={handleOnSelectColor(value)} />
        </Col>
      </Tooltip>
    )
  )
  return (
    <Container height={height}>
      <Row>{arrayColors && arrayColors.length && colorList}</Row>
      {!stitching && (
        <div>
          <Divider />
          <Row>{arrayColors && arrayColors.length && fluorescentColorList}</Row>
        </div>
      )}
    </Container>
  )
}

export default ColorList
