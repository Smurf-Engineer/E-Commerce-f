/**
 * Styled Components - Created by Jesús Apodaca on 16/12/19.
 */
import styled from 'styled-components'
import {
  GRAY_LIGHT,
  WHITE,
  BLUE,
  WHITE_SMOKE,
  GRAY_DARK,
  GRAY_LIGHTEST,
  RED
} from '../../theme/colors'
import AntdTabs from 'antd/lib/tabs'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  background-color: ${WHITE};
  width: 100%;
`

export const Header = styled.div`
  border-bottom: 1px solid ${GRAY_LIGHT};
  padding: 15px 32px;
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
  padding: 10px 32px;
  border-bottom: 1px solid ${GRAY_LIGHT};
`

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 109px);
  flex-flow: row;
`

export const Side = styled.div`
  max-width: 334px;
  width: 100%;
  display: flex;
  flex-flow: column;
  border-right: 1px solid ${GRAY_LIGHT};
  align-items: center;
`

export const TopMessage = styled.div`
  background-color: ${GRAY_LIGHTEST};
  width: 100%;
  padding: 12px 32px;
  color: ${GRAY_DARK};
  font-family: "Avenir Next";
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 19px;
}
`

export const ModelContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
`

export const AddModel = styled.div`
  height: 40px;
  width: 270.46px;
  border: 2px solid ${RED};
  border-radius: 2px;
  color: ${RED};
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`

export const SaveButton = styled(AntdButton)`
  position: absolute;
  top: 24px;
  right: 26px;
  max-width: 224px;
  border: none;
  width: 100%;
  height: 40px;
  background: ${BLUE};
  color: ${WHITE};
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
