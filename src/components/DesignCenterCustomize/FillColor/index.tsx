/**
 * FillColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import ColorList from '../ColorList'
import { Container } from './styledComponents'

interface Props {
  colorsList: any
  onSelectFill: (color: string) => void
}

const FillColor = ({ onSelectFill, colorsList }: Props) => {
  return (
    <Container>
      <ColorList onSelectColor={onSelectFill} height={52} {...{ colorsList }} />
    </Container>
  )
}

export default FillColor
