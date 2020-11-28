/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled from 'styled-components'
import { WHITE, DARK_TEXT } from '../../theme/colors'

export const Container = styled.div`
  background-color: #222;
`

type ThemeProps = {
  darkMode: boolean
}

export const Text = styled.div`
color: ${({ darkMode }: ThemeProps) =>
darkMode ? WHITE : DARK_TEXT};
cursor: pointer;
  font-size: 14px;
`

export const TextOption = styled.div`
  color: ${({ darkMode }: ThemeProps) =>
  darkMode ? WHITE : DARK_TEXT};
  font-size: 16px;
  line-height: 25px;
`

export const Link = styled.a`
  color: ${({ darkMode }: ThemeProps) =>
  darkMode ? WHITE : DARK_TEXT};
  font-size: 16px;
  line-height: 25px;
`

export const menuStyle = {
  borderRadius: 0,
  marginTop: 15,
}
