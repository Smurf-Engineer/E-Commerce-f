/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled from 'styled-components'
import { WHITE, BLACK_SEMILIGHT } from '../../theme/colors'

type ThemeProps = {
  darkMode: boolean
}
import icon from 'antd/lib/icon'
import { AVENIR_MEDIUM } from '../../theme/fonts'

export const Container = styled.div`
  position: relative;
  background-color: ${({ darkMode }: ThemeProps) =>
    darkMode ? BLACK_SEMILIGHT : WHITE};
`

export const Row = styled.div`
  display: flex;
  padding: 10px 34px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TopRow = styled.div`
  display: flex;
  width: 17%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media (max-width: 1648px) {
    width: 22%;
  }
  @media (max-width: 1440px) {
    width: 27%;
  }
  @media (max-width: 1224px) {
    width: 30%;
  }
`

export const Icon = styled(icon)`
  margin-right: 14px;
  padding-left: 8px;
  font-size: 15px;
`
export const TopText = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: ${({ darkMode }: ThemeProps) =>
    darkMode ? WHITE : '#bb5555'};
  font-family: ${AVENIR_MEDIUM};
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #bb5555;
  color: #bb5555;
  padding-top: 13px;
  padding-right: 11px;
  padding-left: 5px;
  font-size: 11px;
  padding-bottom: 12px;
  margin-top: -14px;
  margin-bottom: -14px;
  border-radius: 25px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: #bb5555;
    color: ${WHITE};
  }
  @media (max-width: 991px) {
    align-items: center;
    display: flex;
    height: 40px;
    margin: 2px 0;
  }
`

export const BottomRow = styled.div`
  display: flex;
  background-color: #f6f6f6;
  padding: 16px 34px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  box-shadow: 0px 4px 5px -3px lightgrey;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #dcdcdc;
`

export const LogoIcon = styled.img`
  cursor: pointer;
  max-width: 134px;
  margin-bottom: 5px;
`

export const CartIcon = styled.img`
  cursor: pointer;
`

export const SearchIcon = styled.img`
  cursor: pointer;
`

export const TeamStoresMenuContainer = styled.div`
  display: flex;
  text-align: left;
`

export const TeamStoresMenuTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  line-height: 25px;
  border-bottom: 4px solid #e61737;
  padding: 21px 0;
  &:hover {
    cursor: pointer;
  }
`

export const notificationStyles = { cursor: 'pointer' }