/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { Container, Text, Item, Font } from './styledComponents'
import { SimpleFont } from '../../../types/common'

interface Props {
  text: string
  fonts: SimpleFont[]
  onSelectFont?: (font: string) => void
}

const FontsList = ({ text, onSelectFont = () => {}, fonts }: Props) => {
  const handleOnSelect = (font: string) => () => onSelectFont(font)
  const list = fonts.map((fontObject: SimpleFont, index: number) => {
    return (
      <Item key={index} onClick={handleOnSelect(fontObject.font)}>
        <Text font={fontObject.font}>{text}</Text>
        <Font>{fontObject.font}</Font>
      </Item>
    )
  })
  return <Container>{list}</Container>
}

export default FontsList
