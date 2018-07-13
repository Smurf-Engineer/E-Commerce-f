/**
 * InspirationColors Component - Created by david on 11/07/18.
 */
import * as React from 'react'
import PaletteCard from '../../../../components/PaletteCard'
import { Container, ListContainer } from './styledComponents'

interface Props {}

const InspirationColors = (props: Props) => {
  return (
    <Container>
      <ListContainer>
        <PaletteCard
          key={10}
          id={12}
          onSelectPalette={() => {}}
          name={'DAVID'}
          colors={['#123', '#321', '#456', '#654', '#987']}
        />
      </ListContainer>
    </Container>
  )
}

export default InspirationColors
