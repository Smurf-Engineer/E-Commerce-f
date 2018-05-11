/**
 * CustomInput Component - Created by cazarez on 22/02/18.
 */
import * as React from 'react'

import {
  Container,
  FloatingTitleContainer,
  FloatingText,
  StyledInput,
  RequiredSpan
} from './styledComponents'

interface Props {
  placeholder?: string
  topText?: string
  id?: string
  value?: string
  onChange?: any
  type?: string
  required?: boolean
  inputWidth?: string
}

const CustomInput = ({
  placeholder,
  topText,
  id,
  value,
  onChange,
  type,
  required,
  inputWidth
}: Props) => {
  return (
    <Container {...{ inputWidth }}>
      <FloatingTitleContainer>
        <FloatingText>{topText}</FloatingText>
        {required && <RequiredSpan>*</RequiredSpan>}
      </FloatingTitleContainer>
      <StyledInput {...{ id, placeholder, value, onChange, type }} />
    </Container>
  )
}

export default CustomInput
