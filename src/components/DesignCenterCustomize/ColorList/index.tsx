/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import {
  Container,
  Color,
  Row,
  Col,
  ColorTitle,
  SyledDivider
} from './styledComponents'
import { StitchingColor, QueryProps, Colors } from '../../../types/common'
import messages from './messages'
import Message from 'antd/lib/message'
interface Color {
  value: string
  name: string
  type?: string
}

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface Props {
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  formatMessage: (messageDescriptor: any) => string
  height?: number
  wide?: boolean
  stitching?: boolean
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
  colors?: Color[]
  colorsList: ColorsData
}

const ColorList = ({
  onSelectColor = () => {},
  onSelectStitchingColor = () => {},
  formatMessage,
  height = 40,
  stitching = false,
  wide,
  stitchingColor = { value: '', name: '' },
  colors = [],
  colorsList
}: Props) => {
  const setColor = (color: string, name: string, index: number) => () =>
    onSelectColor(color, name, index)
  const setStitchingColor = (color: StitchingColor) => () => {
    // tslint:disable-next-line:curly
    if (color.value !== stitchingColor.value) onSelectStitchingColor(color)
  }
  let arrayColors: Color[] = colors

  if (!colors.length && colorsList && !colorsList.loading) {
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
  }
  const regularColors: React.ReactNodeArray = []
  const fluorescentColors: React.ReactNodeArray = []

  arrayColors.forEach(({ value, type, name }: Color, index: number) => {
    if (type) {
      const node = (
        <Col key={index} className="custom-tooltip">
          <Color
            selected={value === stitchingColor.value}
            color={value}
            onClick={setColor(value, name, index)}
          />
          {!!name && <div className="tooltip-content">{name}</div>}
        </Col>
      )
      fluorescentColors.push(node)
    } else {
      const node = (
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
      regularColors.push(node)
    }
  })

  return (
    <Container {...{ wide, height }}>
      <Row>{regularColors.length && regularColors}</Row>
      {!stitching && !!fluorescentColors.length && (
        <div>
          <ColorTitle>{formatMessage(messages.fluorescent)}</ColorTitle>
          <SyledDivider />
          <Row>{fluorescentColors}</Row>
        </div>
      )}
    </Container>
  )
}

export default ColorList
