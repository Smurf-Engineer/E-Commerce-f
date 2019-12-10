/**
 * Styled Components - Created by Jesús Apodaca on 04/12/19.
 */
import styled from 'styled-components'
import { GRAY_LIGHT, WHITE, GRAY_DARK, GRAY_STRONG } from '../../theme/colors'

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
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 19px;
`

export const TopMenu = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${GRAY_LIGHT};
`

export const Layout = styled.div`
  display: flex;
  position: relative;
`

export const SaveContainer = styled.div`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-flow: column;
`

export const JakrooLogo = styled.img``

export const SaveButton = styled.div`
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 2px;
  padding: 8px 38px;
  color: ${GRAY_STRONG};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`
