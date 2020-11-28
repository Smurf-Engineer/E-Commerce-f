/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import { WHITE, DARK_TEXT } from '../../theme/colors'

export const Container = styled.div`
  align-items: center;
  display: flex;
  color: ${({ darkMode }: ThemeProps) =>
    darkMode ? WHITE : DARK_TEXT};
`

interface ThemeProps {
  darkMode?: boolean
}

export const Text = styled.div`
  color: ${({ darkMode }: ThemeProps) =>
    darkMode ? WHITE : DARK_TEXT};
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 991px) {
    align-items: center;
    display: flex;
    font-weight: 600;
    height: 40px;
    margin: 2px 0;
  }
`

export const Icon = styled(icon)`
  color: #5f6062;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 600;
`

export const menuStyle = {
  marginTop: 15,
  borderRadius: 0,
  paddingBottom: 20
}

export const OverviewStyle = { border: 'none' }
