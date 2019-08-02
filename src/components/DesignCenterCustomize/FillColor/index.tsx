/**
 * FillColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import ColorList from '../ColorList'
import { Container } from './styledComponents'

interface Props {
  colorsList: any
  formatMessage: (messageDescriptor: any) => string
  onSelectFill: (color: string) => void
}

const FillColor = ({ onSelectFill, colorsList, formatMessage }: Props) => {
  return (
    <Container>
      <ColorList
        onSelectColor={onSelectFill}
        height={52}
        {...{ colorsList, formatMessage }}
      />
    </Container>
  )
}

export default FillColor
