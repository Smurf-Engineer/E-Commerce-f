import * as React from 'react'
import { StyledButton } from './styledComponents'

interface Props {
  label: string
  onClick?: () => void
}

const MyButton = ({ label, onClick }: Props) => {
  return (
    <StyledButton type="primary" {...{ onClick }}>
      {label}
    </StyledButton>
  )
}

export default MyButton
