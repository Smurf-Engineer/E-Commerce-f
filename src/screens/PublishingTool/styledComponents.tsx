/**
 * Styled Components - Created by eduardoquintero on 02/12/19.
 */
import styled from 'styled-components'
import { GRAY_LIGHT, WHITE, GRAY_DARK, GRAY_BLUE } from '../../theme/colors'

export const Container = styled.div`
  background-color: ${WHITE};
  width: 100%;
`

export const Header = styled.div`
  border-bottom: 1px solid ${GRAY_LIGHT};
  padding: 15px;
  display: flex;
  align-items: center;
`

export const Logo = styled.img`
  margin-right: 20px;
`

export const Title = styled.p`
  margin: 0;
  font-size: 17px;
`

export const BackIcon = styled.img`
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  margin-right: 10px;
`

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: row;
  margin-left: 32px;
  margin-right: 40px;
`

export const Back = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 19px;
`

export const TopMenu = styled.div`
  border-bottom: 1px solid ${GRAY_LIGHT};
  display: flex;
`

export const Layout = styled.div`
  display: flex;
  position: relative;
`

export const View = styled.div`
  flex: 1;
`

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  background-color: ${GRAY_BLUE};
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`