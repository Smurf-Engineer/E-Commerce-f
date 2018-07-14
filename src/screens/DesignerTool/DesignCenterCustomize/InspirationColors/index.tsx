/**
 * InspirationColors Component - Created by david on 11/07/18.
 */
import * as React from 'react'
import PaletteCard from '../../../../components/PaletteCard'
import { Container, ListContainer } from './styledComponents'
import { DesignObject } from '../../../../types/common'

interface Props {
  palettes: DesignObject[]
}
const InspirationColors = ({ palettes }: Props) => {
  const list = palettes.map(({ name, colors }, index) => (
    <PaletteCard
      id={index}
      key={index}
      {...{ name, colors }}
      onSelectPalette={() => {}}
    />
  ))
  return (
    <Container>
      <ListContainer>{list}</ListContainer>
    </Container>
  )
}

export default InspirationColors
