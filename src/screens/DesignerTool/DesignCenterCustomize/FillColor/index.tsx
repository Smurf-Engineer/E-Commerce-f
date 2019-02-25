/**
 * FillColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import ColorList from '../ColorList'
import { Container } from './styledComponents'

interface Props {
  onSelectFill: (color: string) => void
}

const FillColor = ({ onSelectFill }: Props) => {
  return (
    <Container>
      <ColorList onSelectColor={onSelectFill} height={52} />
    </Container>
  )
}

export default FillColor
