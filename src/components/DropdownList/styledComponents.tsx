/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled, { keyframes } from 'styled-components'
import { GRAY_DARK, RED } from '../../theme/colors'
import Menu from 'antd/lib/menu'
import Divider from 'antd/lib/divider'

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
  bold?: boolean
  index?: number
}

export const OptionDropdown = styled.h1`
  color: ${({ selected }: OptionDropdownProps) => (selected ? RED : GRAY_DARK)};
  font-size: 16.5px;
  cursor: pointer;
  padding-top: 5px;
  text-transform: uppercase;
  font-family: Avenir;
  font-weight: ${({ bold }: OptionDropdownProps) => bold ? 'bold' : 'normal'};
  @media (max-width: 1240px) {
    font-size: 14px;
  }
  animation: fade-in-left 0.25s cubic-bezier(0.390, 0.575, 0.565, 1.000) 
  ${({ index }: OptionDropdownProps) => index ? `${index * 0.07}s` : '0s'} both;
  @keyframes fade-in-left {
    0% {
      transform: translateX(-7px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
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

export const StyledDivider = styled(Divider)`
  height: 45px;
  background: #b7b7b7;
`