/**
 * ColorList Component - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import Divider from 'antd/lib/divider'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
import Message from 'antd/lib/message'
import { Color as ColorType } from '../../../types/common'
interface Props {
  height?: string
  colorsList: any
  colors: ColorType[]
  stitching: boolean
}

const ColorList = ({ stitching = false, colorsList, colors = [] }: Props) => {
  let arrayColors = colors
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
      Message.error(e.message)
    }
  }
  const regularColors: React.ReactNodeArray = []
  const fluorescentColors: React.ReactNodeArray = []
  arrayColors.forEach(({ value, type, name }: ColorType, index: number) => {
    if (type) {
      const node = (
        <Tooltip key={index} title={name}>
          <Col>
            <Color color={value} />
          </Col>
        </Tooltip>
      )
      fluorescentColors.push(node)
    } else {
      const node = (
        <Tooltip key={index} title={name}>
          <Col>
            <Color color={value} />
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
        <>
          <Divider />
          <Row>{fluorescentColors}</Row>
        </>
      )}
    </Container>
  )
}

export default ColorList
