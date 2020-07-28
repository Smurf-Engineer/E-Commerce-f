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
  RED,
  BLUE_SOFT
} from '../../theme/colors'
import AntdTabs from 'antd/lib/tabs'
import AntdButton from 'antd/lib/button'

interface DivProps {
  background?: boolean
  active?: boolean
}

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
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`

export const TopMessage = styled.div`
  background-color: ${({ background }: DivProps) =>
    background ? GRAY_LIGHTEST : 'none'};
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
  padding: 9px 0;
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
  &:hover {
    background: ${BLUE_SOFT};
    color: ${WHITE};
  }
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

export const ModelsContainers = styled.div`
  margin-top: 28px;
  width: 100%;
  overflow-y: auto;
`

export const ModelBlock = styled.div`
  margin: 8px 28px;
  display: flex;
  transition: all 0.7s;
  border-bottom: ${({ active }: DivProps) =>
    active ? `2px solid ${RED}` : `1px solid ${GRAY_LIGHT}`};
  padding-bottom: 12px;
`

export const Thumbnail = styled.img`
  max-width: 85px;
  width: 100%;
  max-height: 85px;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
`

export const Details = styled.div`
  margin-left: 16px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 100%;
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`

export const EditButton = styled.div`
  width: 85px;
  height: 24px;
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 16px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: ${GRAY_LIGHTEST};
  }
`

export const TitleModal = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  margin-bottom: 14px;
`

export const Message = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-bottom: 32px;
`

export const AddDesigns = styled.div`
  border-radius: 2px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  transition: all 0.25s;
  background: ${BLUE};
  color: ${WHITE};
  &:hover {
    background: ${BLUE_SOFT};
    color: ${WHITE};
  }
`

export const ProductInfo = styled.div`
  border-radius: 2px;
  margin-top: 16px;
  border: 1px solid ${GRAY_LIGHT};
  width: 100%;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  transition: all 0.25s;
  &:hover {
    background: ${BLUE_SOFT};
    color: ${WHITE};
  }
`

export const DeleteButton = styled.div`
  color: ${RED};
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
`

export const LoadingContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ active }: DivProps) => (active ? 2 : -1)};
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  transition: all 0.2s;
  opacity: ${({ active }: DivProps) => (active ? 1 : 0)};
  justify-content: center;
  align-items: center;
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

export const NavTabs = styled(AntdTabs)`
  max-width: 384px;
  border-right: 1px solid ${GRAY_LIGHT};
  width: 100%;
  .ant-tabs-nav-scroll {
    text-align: center;
  }
  .ant-tabs-content {
    height: 100%;
  }
  .ant-tabs-bar {
    margin-bottom: 0;
  }
`
