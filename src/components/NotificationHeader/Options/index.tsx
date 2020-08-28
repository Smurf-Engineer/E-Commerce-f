/**
 * Options Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import { Language } from '../../../types/common'
import { Container, Description, Date, Title } from './styledComponents'

interface Props {
  title: string
  options: Language[]
  onPress: (index: number) => void
}

const Options = ({ title, options, onPress }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{title}</Description>
      <Date>{title}</Date>
    </Container>
  )
}

export default Options
