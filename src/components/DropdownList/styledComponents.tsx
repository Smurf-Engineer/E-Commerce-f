/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled, { keyframes } from 'styled-components'
import { GRAY_DARK, RED } from '../../theme/colors'
import Menu from 'antd/lib/menu'

const showMenu = keyframes`
  from { opacity: 0};
  to {opacity: 1, visibility: visible};
`

export const Container = styled.div`
  display: flex;
  width: 72%;
  justify-content: space-between;
  flex-direction: row;
  transition: all .25s;
`

interface OptionDropdownProps {
  selected?: boolean
}

export const OptionDropdown = styled.div`
  color: ${({ selected }: OptionDropdownProps) => (selected ? RED : GRAY_DARK)};
  font-size: 18px;
  cursor: pointer;
  text-transform: uppercase;
`
export const Option = styled.div`
  height: 100%;
`

export const overStyle = {
  paddingTop: 4,
  width: '100%'
}

export const menuStyle = {
  backgroundColor: 'transparent',
  borderBottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
} as React.CSSProperties

export const StyledMenu = styled(Menu)`
  background-color: transparent;
  border-bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  transition: all 1s ease-in;
  animation: ${showMenu} 1s ease-in;
`
