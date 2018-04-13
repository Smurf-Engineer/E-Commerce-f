/**
 * ButtonShadow Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import { Container, Text } from './styledComponents'

interface Props {
  label: string
  selected: boolean
  onClick?: () => void
}

const ButtonShadow = ({ label, selected, onClick = () => {} }: Props) => {
  return (
    <Container {...{ selected, onClick }}>
      <Text>{label}</Text>
    </Container>
  )
}

export default ButtonShadow
