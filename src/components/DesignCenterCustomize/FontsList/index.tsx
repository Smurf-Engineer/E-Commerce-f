/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { Container, Text, Item, Font } from './styledComponents'

const fonts = [
  'Advent Pro',
  'Alfa Slab One',
  'Archivo Black',
  'Bangers',
  'Baumans',
  'Black Ops One',
  'Ceviche One',
  'Clicker Script',
  'Creepster',
  'Dancing Script',
  'Fontdiner Swanky',
  'Goudy Bookletter 1911',
  'Great Vibes',
  'Luckiest Guy',
  'Maven Pro',
  'Metal Mania',
  'Oswald',
  'Pacifico',
  'Permanent Marker',
  'Pinyon Script',
  'Racing Sans One',
  'Rancho',
  'Righteous',
  'Rock Salt',
  'Russo One',
  'Sanchez',
  'Satisfy',
  'Slackey',
  'Stardos Stencil',
  'UnifrakturMaguntia',
  'Yellowtail',
  'Yesteryear'
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
