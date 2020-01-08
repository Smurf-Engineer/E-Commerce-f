/**
 * ColorList Component - Created by eduardoquintero on 30/12/19.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import Divider from 'antd/lib/divider'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
import Message from 'antd/lib/message'
import { ColorsDataResult } from '../../../types/common'

interface Color {
  value: string
  name: string
  type?: string
}
interface Props {
  onSelectColor?: (color: string) => void
  height?: string
  colorsList: ColorsDataResult
  stitching: boolean
}

const ColorList = ({
  onSelectColor = () => {},
  stitching = false,
  colorsList
}: Props) => {
  const handleOnSelectColor = (color: string) => () => onSelectColor(color)
  let arrayColors = []
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
      Message.error(e)
    }
  }
  const regularColors: React.ReactNodeArray = []
  const fluorescentColors: React.ReactNodeArray = []

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
    <Container>
      <Row>{regularColors.length && regularColors}</Row>
      {!stitching && !!fluorescentColors.length && (
        <div>
          <Divider />
          <Row>{fluorescentColors}</Row>
        </div>
      )}
    </Container>
  )
}

export default ColorList
