/**
 * Styled Components - Created by eduardoquintero on 19/09/19.
 */
import styled from 'styled-components'
import {
  GRAY_LIGHT,
  WHITE,
  BLUE,
  WHITE_SMOKE,
  GRAY_DARK
} from '../../theme/colors'
import AntdTabs from 'antd/lib/tabs'
import AntdButton from 'antd/lib/button'

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

export const StyledTabs = styled(AntdTabs)`
  flex: 1;
  text-align: center;
`

export const Render3DContainer = styled.div`
  flex: 3;
`

export const StyledButton = styled(AntdButton)`
  height: 40px;
  width: 150px;
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  text-align: right;
  align-self: right;
  .ant-btn-primary {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
  }
`
