/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { Container, Text, Item, Font } from './styledComponents'

// TODO: Dummie data
const fonts = [
  'Arial Black',
  'Avenir',
  'Bangla',
  'Baskerville',
  'Circular Std',
  'Courier New',
  'Fira Code',
  'Gill Sans',
  'Luminari',
  'Sathu',
  'Trattatello',
  'Verdana'
]

interface Props {
  text: string
  onSelectFont?: (font: string) => void
}

const FontsList = ({ text, onSelectFont = () => {} }: Props) => {
  const handleOnSelect = (font: string) => () => onSelectFont(font)
  const list = fonts.map((font, index) => (
    <Item key={index} onClick={handleOnSelect(font)}>
      <Text {...{ font }}>{text}</Text>
      <Font>{font}</Font>
    </Item>
  ))
  return <Container>{list}</Container>
}

export default FontsList
