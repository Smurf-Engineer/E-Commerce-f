/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import { BLACK_SEMILIGHT, BLUE, GRAY, WHITE } from '../../../theme/colors'

interface ButtonProps {
  disabled?: boolean
  show?: boolean
}

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${BLACK_SEMILIGHT};
  color: ${WHITE};
  display: inline-flex;
  justify-content: space-between;
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
    content: "Previous";
  }
`

export const Continue = styled(Button)`
  &::after {
    content: "Continue";
  }
`