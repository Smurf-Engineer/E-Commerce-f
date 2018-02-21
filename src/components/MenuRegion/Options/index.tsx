/**
 * Options Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import range from 'lodash/range'
import { Container, Label, Row, Text, LineVertical } from './styledComponents'

interface Props {
  title: string
  options: string[]
}

const insertDividers = (items: React.ReactNode[]) => {
  const updatedItems = items
  for (let index = 1; index < updatedItems.length; index += 2) {
    updatedItems.splice(
      index,
      0,
      <LineVertical type="vertical" key={`${index}-line`} />
    )
  }
  return updatedItems
}

const Options = ({ title, options }: Props) => {
  const items = options.map((option, index) => (
    <Text key={index}>{option.toUpperCase()}</Text>
  ))
  const itemWithDivider = insertDividers(items)
  return (
    <Container>
      <Label>{title}</Label>
      <Row>{itemWithDivider}</Row>
    </Container>
  )
}

export default Options
