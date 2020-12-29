/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'
import { WHITE, BLACK_SEMILIGHT, DARK_TEXT } from '../../theme/colors'

type ContainerProps = {
  dark: boolean
}

export const HeaderContainer = styled.div`
  flex: 1;
  background-color: ${({ dark }: ContainerProps) =>
  dark ? BLACK_SEMILIGHT : WHITE};
  color: ${({ dark }: ContainerProps) =>
  dark ? WHITE : DARK_TEXT};
`

export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #dcdcdc;
`

export const Logo = styled.img`
  align-self: center;
  height: 34px;
`

export const BackButton = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  position: absolute;
  left: 32px;
`

export const Back = styled.div`
  font-size: 14px;
  line-height: 19px;
`

export const BackIcon = styled.img`
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  margin-right: 10px;
`

export const Date = styled.div`
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;
  position: absolute;
  right: 32px;
`
