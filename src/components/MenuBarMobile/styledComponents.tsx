/**
 * Styled Components - Created by david on 02/04/18.
 */
import styled from 'styled-components'
import { WHITE, BLUE, DARK_TEXT, BLACK_SEMILIGHT } from '../../theme/colors'
import AntButton from 'antd/lib/button'

interface ThemeProps {
  hide?: boolean
  darkMode?: boolean
}

export const Container = styled.div`
  align-items: center;
  background-color: ${({ darkMode }: ThemeProps) =>
  darkMode ? BLACK_SEMILIGHT : WHITE};
  border-bottom: 1px solid gainsboro;
  display: ${({ hide }: ThemeProps) => (!hide ? 'flex' : 'none')};
  height: 70px;
  justify-content: space-between;
  line-height: 16px;
  z-index: 9;
  padding: 0px 16px 0 10px;
  position: fixed;
  width: 100%;
  -webkit-transform:translateZ(10px);
`

export const Logo = styled.img`
  width: 47%;
`

export const Icon = styled.img``

export const Text = styled.div`
  color: ${({ darkMode }: ThemeProps) =>
  darkMode ? WHITE : DARK_TEXT};
`

export const Button = styled(AntButton)`
  position: absolute;
  right: 2%;
  color: ${WHITE};
  border-color: ${BLUE};
  background-color: ${BLUE};
  width: 110px;
  height: 50px;

  ${Container}:hover & {
    display: block;
    color: ${WHITE};
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  ${Container}:active & {
    display: block;
    color: ${WHITE};
    background-color: ${BLUE};
  }
`
