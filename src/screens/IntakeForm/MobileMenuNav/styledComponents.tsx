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

export const MobileNavContainer = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${BLACK_SEMILIGHT};
  color: ${WHITE};
  display: flex;
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
  position: fixed;
  bottom: 0;
  z-index: 1000;
  left: 0;
  border-radius: 0;
  text-align: center;
  text-transform: uppercase;
  height: 50px;
  justify-content: center;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  &::after {
    content: ${({ text }: ButtonProps) => `"${text}"`};
  }
`