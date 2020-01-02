/**
 * Styled Components - Created by eduardoquintero on 18/12/19.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import {
  GRAY_LIGHTEST,
  GRAY_DARK,
  WHITE,
  RED,
  BLUE,
  BLUE_BRIGHT
} from '../../../theme/colors'

export const Container = styled.div`
  background-color: #fff;
  width: 400px;
  z-index: 1;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.24);
  overflow-y: scroll;
  height: 100vh;
`

export const Content = styled.div``

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  min-height: 45px;
  align-items: center;
`

export const Title = styled.p`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  margin: 0;
`

export const IdeasButton = styled(AntdButton)`
  margin: 10px;
  width: 90%;
  height: 50px;
  border: 2px solid ${RED};
  border-radius: 2px;
  background-color: ${WHITE};
  color: ${RED};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const Subtitle = styled.p`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  margin: 0 10px;
`

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
`

export const ExportButton = styled(AntdButton)`
  color: ${WHITE} !important;
  background-color: ${BLUE};
  border-color: ${BLUE};
  &:hover,
  :focus,
  :active {
    background-color: ${BLUE_BRIGHT};
    border-color: ${BLUE_BRIGHT};
  }
  display: flex;
  align-items: center;
`
