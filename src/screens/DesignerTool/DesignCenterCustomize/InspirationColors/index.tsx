/**
 * InspirationColors Component - Created by david on 11/07/18.
 */
import * as React from 'react'
import PaletteCard from '../../../../components/PaletteCard'
import { Container, ListContainer } from './styledComponents'
import { DesignObject } from '../../../../types/common'

interface Props {
  palettes: DesignObject[]
  onSelectPalette: (index: number) => void
}
const InspirationColors = ({ palettes, onSelectPalette }: Props) => {
  const handleOnSelectPalette = (index: number) => () => onSelectPalette(index)
  const list = palettes.map(({ name, colors }, index) => (
    <PaletteCard
      id={index}
      key={index}
      {...{ name, colors }}
      onSelectPalette={handleOnSelectPalette(index)}
    />
  ))
  return (
    <Container>
      <ListContainer>{list}</ListContainer>
    </Container>
  )
}

export default InspirationColors
