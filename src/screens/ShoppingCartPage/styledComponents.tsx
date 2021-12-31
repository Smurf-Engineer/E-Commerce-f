/**
 * Styled Components - Created by gustavomedina on 02/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import {
  RED,
  GRAY_DARK,
  GRAY_LIGHT,
  BLUE,
  WHITE,
  GRAY,
  BLUE_BRIGHT
} from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: #fff;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    min-height: 0px;
  }
`

export const EmptyContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #fff;
`

export const PageContent = styled.div`
  background-color: #fff;
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
`

export const EmptyItems = styled.div`
  margin-top: 40px;
`

export const SideBar = styled.div`
  width: 20%;
  padding-left: 15px;
  padding-right: 20px;
  max-width: 390px;
  @media (max-width: 1024px) {
    width: 23%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const EmptyTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const StyledEmptyButton = styled(Button)`
  border-radius: 0px;
  width: 100%;
  height: 50px;
  border-color: ${RED};
  background-color: #fff;
`

export const EmptyDescription = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
`

export const OptionMenu = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding-top: 8px;
`

export const Content = styled.div`
  width: 80%;
  padding-left: 36px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`

export const SummaryTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 20px;
`

export const Divider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid ${GRAY_LIGHT};
  margin-bottom: 10px;
`

export const CodeDivider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid ${GRAY_LIGHT};
  margin-bottom: 0;
`

export const OrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const TotalOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-transform: uppercase;
  padding-top: 36px;
  padding-left: 36px;
  padding-bottom: 36px;
  background-color: #fff;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 20px 0 41px 7px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding-left: 15px;
  }
`

export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

interface ButtonWrapperProps {
  disabled: boolean
}

const disabledBorder = '#D9D9D9'
const disabledBackground = '#F5F5F5'

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 18px;
  .ant-btn-primary {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? disabledBackground : '#69a1e3'};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? disabledBorder : '#69a1e3'};
    box-shadow: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? 'none' : '0px 2px 5px 0px #c3c3c3'};
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-btn-primary:hover {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? disabledBackground : BLUE_BRIGHT};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? disabledBorder : BLUE_BRIGHT};
  }
`

export const CheckoutIcon = styled(Icon)`
  margin-right: 8px;
`

interface CheckoutButtonProps {
  disabledButton: boolean
}

export const CheckoutButton = styled(Button)`
  height: 40px;
  width: 100%;
  color: ${({ disabledButton }: CheckoutButtonProps) =>
    disabledButton ? GRAY : WHITE};
  text-shadow: ${({ disabledButton }: CheckoutButtonProps) =>
    disabledButton ? 'none' : WHITE};
  &:hover,
  :focus-within {
    color: ${({ disabledButton }: CheckoutButtonProps) =>
      disabledButton ? GRAY : WHITE};
    cursor: ${({ disabledButton }: CheckoutButtonProps) =>
      disabledButton ? 'default' : 'pointer'};
  }
`

export const InputWrapper = styled.div`
  .ant-input {
    margin-bottom: 26px;
    height: 40px;
    border-radius: 0;
    color: #bebebe;
    font-size: 16px;
    line-height: 22px;
  }
`

export const ZipCodeInputWrapper = styled.div`
  margin-bottom: 10px;
  input {
    border-radius: 0;
  }
  .ant-btn {
    border-radius: 0;
    background-color: ${BLUE};
    border-color: ${BLUE};
    &:hover {
      background-color: ${BLUE};
      border-color: ${BLUE};
    }
  }
`

export const CollapseWrapper = styled.div`
  margin-bottom: 10px;
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: #5f6062;
    font-size: 12px;
    letter-spacing: 0.15px;
    line-height: 16px;
    padding: 14px 0 12px 0;
  }
  .ant-collapse .ant-collapse-item .ant-collapse-header .arrow {
    position: absolute;
    left: 95%;
    display: inline;
    width: auto;
  }

  .ant-collapse-borderless .ant-collapse-item .ant-collapse-content {
    padding: 0;
  }
`

export const CartList = styled.ul`
  padding: 0;
  height: 100%;
`

export const menuStyle = { width: '100%', marginLeft: -24, paddingTop: 52 }

export const DeleteConfirmMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const ModalHeader = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const CloseIcon = styled.img`
  cursor: pointer;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  justify-content: flex-end;
`

export const ContinueButton = styled(Button)`
  background: ${BLUE};
  border: none;
  height: 40px;
  color: ${WHITE};
  max-width: 140px;
  transition: all 0.25s;
  width: 100%;
  &:hover {
    border: 1px solid ${RED};
  }
`

export const StoreInfo = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 42px;
  margin-bottom: 24px;
`

export const buttonStyle = {
  background: BLUE,
  border: 'none'
}

export const MaintenanceLayout = styled.div`
  min-height: calc(100vh - 192px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${WHITE};
  flex-flow: column;
  padding: 64px 18px;
`

export const MaintenanceImage = styled.img`
  max-width: 440px;
  width: 100%;
`

export const MaintenaceLink = styled.div`
  margin-top: 38px;
  box-shadow: 0px 2px 5px -3px black;
  border-radius: 53px;
  padding: 8px 14px;
  background: white;
  color: #577395;
  font-weight: bold;
  font-family: Avenir;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`