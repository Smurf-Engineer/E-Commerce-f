/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import { BLACK_SEMILIGHT, BLUE, GRAY, WHITE } from '../../../theme/colors'

interface ButtonProps {
  disabled?: boolean
  show?: boolean
  text?: string
}

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${BLACK_SEMILIGHT};
  color: ${WHITE};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ disabled }: ButtonProps) =>
  disabled ? GRAY : BLUE};
  visibility: ${({ show }: ButtonProps) =>
  show ? 'visible' : 'hidden'};
`

export const Previous = styled(Button)`
  &::after {
    content: ${({ text }: ButtonProps) => `"${text}"`};  
  }
`

export const Continue = styled(Button)`
  &::after {
    content: ${({ text }: ButtonProps) => `"${text}"`};  
  }
`