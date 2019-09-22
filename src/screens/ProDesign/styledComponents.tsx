/**
 * Styled Components - Created by eduardoquintero on 19/09/19.
 */
import styled from 'styled-components'
import { GRAY_LIGHT, WHITE } from '../../theme/colors'

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
  display: inline-flex;
  cursor: pointer;
  flex-direction: row;
  left: 32px;
`

export const Back = styled.div`
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;
`

export const TopMenu = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${GRAY_LIGHT};
`

export const Layout = styled.div`
  display: flex;
`
