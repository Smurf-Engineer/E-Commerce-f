/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import { BLACK_SEMILIGHT, BLUE, GRAY, WHITE, GRAY_LIGHT, DARKER_GRAY, BLACK } from '../../../theme/colors'

interface ButtonProps {
  disabled?: boolean
  show?: boolean
  text?: string
  active?: boolean
}

export const MobileNavContainer = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${BLACK_SEMILIGHT};
  color: ${WHITE};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const Button = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ disabled }: ButtonProps) =>
  disabled ? GRAY_LIGHT : BLUE};
  visibility: ${({ show }: ButtonProps) =>
  show ? 'visible' : 'hidden'};
`

const GrayButton = styled.div`
  padding: 10px;
  border-radius: 4px;
  color: ${({ disabled }: ButtonProps) =>
  disabled ? WHITE : BLACK};
  background-color: ${({ disabled }: ButtonProps) =>
  disabled ? GRAY_LIGHT : GRAY};
  visibility: ${({ show }: ButtonProps) =>
  show ? 'visible' : 'hidden'};
`

export const Previous = styled(GrayButton)`
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

export const StyledDropdown = styled(Dropdown)`
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  text-align: center;
  max-width: 180px;
  color: ${WHITE};
`

export const StyledMenu = styled(Menu)`
  left: 0;
  right: 0;
  position: absolute;
  margin: 0 auto;
  max-width: 180px;
`

export const Image = styled.img`
  margin-left: 5px;
`

export const ItemText = styled.div`
  color: ${({ active }: ButtonProps) => active ? DARKER_GRAY : GRAY_LIGHT};
  &.selected{
    font-weight: 600;
  }
`