/**
 * Styled Components - Created by miguelcanobbio on 15/08/18.
 */
import styled from 'styled-components'
import { WHITE, GRAY_HEADER, GRAY_DARK } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: ${WHITE};
`

export const Header = styled.div`
  height: 70px;
  widht: 100%;
  background-color: ${GRAY_HEADER};
`

export const ContentHeader = styled.div`
  max-width: 1024px;
  margin: auto;
  padding: 18px 36px;
  display: flex;
  align-items: center;
`

export const LogoIcon = styled.img``

export const DesignerLink = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 18px;
  cursor: pointer;
`

export const Content = styled.div`
  width: 50%;
  max-width: 800px;
  align-self: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 10vh;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
`

export const Subtitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  margin: 20px 0 16px;
`

export const LoadErrContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  margin-top: 48px;
`
