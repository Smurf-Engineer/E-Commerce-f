/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
import Message from 'antd/lib/message'

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

  const colorList =
    arrayColors &&
    arrayColors.map(({ value, name }: Color, index: number) => (
      <Tooltip key={index} title={name}>
        <Col>
          <Color color={value} onClick={handleOnSelectColor(value)} />
        </Col>
      </Tooltip>
    ))
  return (
    <Container height={height}>
      <Row>{arrayColors && arrayColors.length && colorList}</Row>
    </Container>
  )
}

export default ColorList
