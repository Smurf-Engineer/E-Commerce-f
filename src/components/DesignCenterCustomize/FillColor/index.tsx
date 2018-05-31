/**
 * FillColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import ColorList from '../ColorList'
import messages from './messages'
import { Container, Text } from './styledComponents'

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
