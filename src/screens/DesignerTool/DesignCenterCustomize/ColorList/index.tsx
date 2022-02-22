/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import Divider from 'antd/lib/divider'
import get from 'lodash/get'
import { Container, Color, Row, Col, ColorTitle } from './styledComponents'
import { Message } from '../../../../types/common'
import messages from './messages'

interface Color {
  value: string
  name: string
  type?: string
}
interface Props {
  onSelectColor?: (color: string) => void
  height?: string
  formatMessage: (messageDescriptor: Message) => string
  colorsList: any
  stitching: boolean
}

const ColorList = ({
  onSelectColor = () => { },
  stitching = false,
  formatMessage,
  colorsList
}: Props) => {
  const handleOnSelectColor = (color: string) => () => onSelectColor(color)
  let arrayColors: any = []
  if (colorsList) {
    try {
      arrayColors = JSON.parse(
        get(
          colorsList,
          !stitching ? 'colorsResult.colors' : 'colorsResult.stitchingColors',
          []
        )
      )
    } catch (e) {
      console.error(e)
    }
  }
  const regularColors: React.ReactNodeArray = []
  const fluorescentColors: React.ReactNodeArray = []

  arrayColors.forEach(({ value, type, name }: Color, index: number) => {
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
    <Container>
      <Row>{regularColors.length && regularColors}</Row>
      {!stitching && !!fluorescentColors.length && (
        <div>
          <Divider />
          <ColorTitle>{formatMessage(messages.fluorescent)}</ColorTitle>
          <Row>{fluorescentColors}</Row>
        </div>
      )}
    </Container>
  )
}

export default ColorList
