import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import includes from 'lodash/includes'
import get from 'lodash/get'
import { Container, Color, Row, Col } from './styledComponents'
import Message from 'antd/lib/message'
import { ColorsDataResult } from '../../types/common'

interface Color {
  value: string
  name: string
  type?: string
}
interface Props {
  onSelect: (color: string) => void
  onDeselect: (color: string) => void
  height?: string
  isMobile?: boolean
  colorsList: ColorsDataResult
  selectedColors: string[]
}

const ColorList = ({
  colorsList,
  selectedColors,
  onSelect,
  onDeselect,
  isMobile
}: Props) => {
  let arrayColors = []

  const fillColors = () => {
    try {
      return JSON.parse(get(colorsList, 'colorsResult.colors', []))
    } catch (e) {
      Message.error(e)
    }
  }
  if (colorsList) {
    arrayColors = fillColors()
  }
  const regularColors: React.ReactNodeArray = []
  const fluorescentColors: React.ReactNodeArray = []

  arrayColors.forEach(({ value, type, name }: Color, index: number) => {
    const isSelected = includes(selectedColors, value) 
    const handleOnSelectColor = () =>  !isSelected ? onSelect(value) : onDeselect(value)
    if (type) {
      const node = !isMobile ? (
        <Tooltip key={index} title={name}>
          <Col>
            <Color color={value} onClick={handleOnSelectColor} selected={isSelected} />
          </Col>
        </Tooltip>
      ) : <Col><Color color={value} onClick={handleOnSelectColor} selected={isSelected} /></Col>
      fluorescentColors.push(node)
    } else {
      const node = !isMobile ? (
        <Tooltip key={index} title={name}>
          <Col>
            <Color color={value} onClick={handleOnSelectColor} selected={isSelected} />
          </Col>
        </Tooltip>
      ) : <Col><Color color={value} onClick={handleOnSelectColor} selected={isSelected} /></Col>
      regularColors.push(node)
    }
  })
  return (
    <Container>
      <Row>{regularColors.length && regularColors}</Row>
      {!!fluorescentColors.length && (
        <Row>{fluorescentColors}</Row>
      )}
    </Container>
  )
}

export default ColorList
