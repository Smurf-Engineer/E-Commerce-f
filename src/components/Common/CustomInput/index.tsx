/**
 * CustomInput Component - Created by cazarez on 22/02/18.
 */
import * as React from 'react'

import { Container, FloatingText, StyledInput } from './styledComponents'

interface Props {
  placeholder?: string
  topText?: string
  id?: string
  value?: string
  onChange?: any
  type?: string
}

const CustomInput = ({
  placeholder,
  topText,
  id,
  value,
  onChange,
  type
}: Props) => {
  return (
    <Container>
      <FloatingText>{topText}</FloatingText>
      <StyledInput {...{ id, placeholder, value, onChange, type }} />
    </Container>
  )
}

export default CustomInput
