/**
 * Styled Components - Created by david on 20/02/18.
 */
import styled from 'styled-components'
import { WHITE, DARK_TEXT } from '../../theme/colors'

export const Regions = styled.div`
  display: flex;
  width: 68px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  cursor: pointer;

  @media (max-width: 991px) {
    height: 40px;
  }
`

type ThemeProps = {
  darkMode: boolean
}

export const TopText = styled.div`
  color: ${({ darkMode }: ThemeProps) =>
  darkMode ? WHITE : DARK_TEXT};
  font-size: 14px;
  cursor: pointer;
`

export const overStyle = {
  width: 276,
  paddingTop: 7
}
