/**
 * CustomInput Component - Created by cazarez on 22/02/18.
 */
import * as React from 'react'

import { Container, FloatingText, StyledInput } from './styledComponents'

interface Props {
  placeholder?: string
  topText?: string
}

const CustomInput = ({ placeholder, topText }: Props) => {
  return (
    <Container>
      <FloatingText>{topText}</FloatingText>
      <StyledInput placeholder={placeholder} />
    </Container>
  )
}

export default CustomInput
