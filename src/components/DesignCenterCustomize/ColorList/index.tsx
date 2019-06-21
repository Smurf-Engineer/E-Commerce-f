/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import filter from 'lodash/filter'
import {
  Container,
  Color,
  Row,
  Col,
  ColorTitle,
  SyledDivider
} from './styledComponents'
import { StitchingColor } from '../../../types/common'
import messages from './messages'
import Message from 'antd/lib/message'
interface Color {
  value: string
  name: string
  type?: string
}
interface Props {
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  formatMessage: (messageDescriptor: any) => string
  height?: number
  stitching?: boolean
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
  colorsList: any
}

const ColorList = ({
  onSelectColor = () => {},
  onSelectStitchingColor = () => {},
  formatMessage,
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
    )
  )
  const fluorescentColorList = fluorescentColors.map(
    ({ value, name }: Color, index: number) => (
      <Col key={index} className="custom-tooltip">
        <Color
          selected={value === stitchingColor.value}
          color={value}
          onClick={setColor(value, name, index)}
        />
        {!!name && <div className="tooltip-content">{name}</div>}
      </Col>
    )
  )
  return (
    <Container {...{ height }}>
      <Row>{arrayColors.length && colorList}</Row>
      {!stitching && (
        <div>
          <ColorTitle>{formatMessage(messages.fluorescent)}</ColorTitle>
          <SyledDivider />
          <Row>{arrayColors && arrayColors.length && fluorescentColorList}</Row>
        </div>
      )}
    </Container>
  )
}

export default ColorList
