/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
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
  let arrayColors: any = []
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
  const regularColors: JSX.Element[] = []
  const fluorescentColors: JSX.Element[] = []

  arrayColors.forEach(({ value, type }: Color, index: number) => {
    if (type) {
      const node = (
        <Tooltip key={index} title={name}>
          <Col>
            <Color color={value} onClick={handleOnSelectColor(value)} />
          </Col>
        </Tooltip>
      )
      fluorescentColors.push(node)
    } else {
      const node = (
        <Tooltip key={index} title={name}>
          <Col>
            <Color color={value} onClick={handleOnSelectColor(value)} />
          </Col>
        </Tooltip>
      )
      regularColors.push(node)
    }
  })

  return (
    <Container height={height}>
      <Row>{regularColors.length && regularColors}</Row>
      {!stitching && (
        <div>
          <Divider />
          <Row>{fluorescentColors.length && fluorescentColors}</Row>
        </div>
      )}
    </Container>
  )
}

export default ColorList
