/**
 * FillColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import ColorList from '../ColorList'
import { Container } from './styledComponents'

interface Props {
  onSelectFill: (color: string) => void
  formatMessage: (messageDescriptor: any) => string
}

const FillColor = ({ onSelectFill, formatMessage }: Props) => {
  return (
    <Container>
      <ColorList
        onSelectColor={onSelectFill}
        height={52}
        {...{ formatMessage }}
      />
    </Container>
  )
}

export default FillColor
