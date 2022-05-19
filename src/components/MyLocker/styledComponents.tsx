/**
 * Styled Components - Created by david on 06/04/18.
 */
import styled from 'styled-components'
import DatePicker from 'antd/lib/date-picker'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import {
  BLUE,
  BLUE_SHADOW,
  GRAY_LIGHT,
  GRAY_SHADOW,
  GRAY_DARK,
  WHITE,
  WHITE_SMOKE,
  WHITE_TRANSPARENT,
  GRAY,
  BLACK
} from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface DivProps {
  admin?: boolean
  secondary?: Boolean
}

export const Container = styled.div`
  padding-bottom: 16px;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const TransparentLoader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${WHITE_TRANSPARENT};
  height: 100vh;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const PaginationRow = styled.div`
  text-align: right;
  padding-right: 36px;

  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    text-align: center;
  }
`

export const TitleError = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const MessageError = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const ConfirmMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const MessageText = styled.div`
  max-width: ${({ admin }: DivProps) => admin ? '100%' : '500px'};
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 20px;
  margin-top: ${({ admin }: DivProps) => admin ? `20px` : 'none'};
  padding-bottom: ${({ admin }: DivProps) => admin ? `12px` : 'none'};;
  font-weight: ${({ admin }: DivProps) => admin ? `bold` : 'none'};;
  border-bottom: ${({ admin }: DivProps) => admin ? `1px solid ${GRAY}` : 'none'};
  animation: fade-in-hor 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-hor {
    0% {
      transform: translateX(-5px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

export const MessagePrevent = styled.div`
  color: ${BLACK};
  margin-bottom: 18px;
  margin-top: -4px;
  animation: fade-in-hor 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-hor {
    0% {
      transform: translateX(-5px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 12px;
  }
`

export const InputWrapper = styled.div`
  padding: 4px 0px;
  .ant-input:hover {
    border-color: ${BLUE};
  }

  .ant-input:focus {
    border-color: ${BLUE};
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px ${BLUE_SHADOW};
    box-shadow: 0 0 0 2px ${BLUE_SHADOW};
  }

  .ant-input::selection {
    background: ${BLUE};
  }
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
`

// Filter Related

const Search = Input.Search

export const SearchInput = styled(Search)`
  border-radius: 0;
  margin-left: 4px;
  width: 100%;
  max-width: 274px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 98%;
    max-width: 100%;
    margin: 1%;
  }
`

export const FilterTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 10px;
  }
`

export const Filters = styled.div`
  border: 1px solid ${GRAY_LIGHT};
  margin-left: 4px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  margin-right: 36px;
  box-shadow: 2px 2px 7px ${GRAY_SHADOW};
  flex-direction: column;
  animation: fade-in-top 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.15s both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-5px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 10px;
    margin-right: 12px;
  }
`

export const StyledSelect = styled(Select)`
  width: 20%;
  height: 40px;
  margin-right: 15px;
  & .ant-select-selection {
    border-radius: 0;
    height: 40px;
    line-height: 40px;
    & div {
      line-height: 40px;
    }
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 48%;
    margin: 1%;
  }
`

export const Options = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 320px) and (max-width: 768px) {
    flex-flow: wrap;
  }
`

export const SubOptions = styled.div`
  display: flex;
  align-items: center;
  animation: fade-in-top 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.3s both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-5px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex-flow: column;
  }
`

export const StyledDatePicker = styled(DatePicker)`
  width: 20%;
  height: 40px;
  margin-right: 15px;
  input {
    border-radius: 0;
    height: 40px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 48%;
    margin: 1%;
  }
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 0px;

  @media (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`

export const ButtonWrapper = styled.div`
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

  @media (min-width: 320px) and (max-width: 768px) {
    margin: 1%;
    width: 100%;
  }
`

export const HelpWrapper = styled.div`
  position: absolute;
  margin-top: -90px;
  right: 50px;
  font-size: 16px;
  @media (min-width: 320px) and (max-width: 1023px) {
    position: inherit;
    margin-top: -20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    text-align: end;
  }
`

export const HelpMessage = styled.span`
  margin-right: 8px;
  @media (min-width: 320px) and (max-width: 768px) {
    margin-right: 0;
  }
`

export const HelpLink = styled.span`
  color: ${BLUE};
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 4px;
  }
`

export const AnimatedDiv = styled.div`
  position: fixed;
  bottom: 24px;
  left: 30px;
  z-index: 3;
`

export const BounceDiv = styled.div`
  ${({ secondary }: DivProps) => secondary ? `
  animation: wobble-hor-bottom 0.8s 0s 2 both;
  @keyframes wobble-hor-bottom {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-7px);
      filter: grayscale(0.7);
    }
  }
  ` : ''}
`

export const CartIcon = styled.div`
  background: ${WHITE};
  border-radius: 50%;
  width: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  box-shadow: 0px 1px 9px -2px #6e6e6e;
  transition: all .25s;
  .ant-badge-count {
    transform: translateX(30%);
  }
  animation: fade-in-leftDesuZ 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;
  @keyframes fade-in-leftDesuZ {
    0% {
      transform: translateX(-30px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  &:hover {
    cursor: pointer;
    filter: opacity(0.7);
  }
`

export const ShoppingCartIcon = styled(Icon)`
  font-size: 32px;
  color: ${BLACK};
`

export const CartDiv = styled.div`
  position: fixed;
  background: white;
  height: 100vh;
  max-width: 428px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 1px 0px 14px 4px #b8b8b8;
  animation: slide-in-left 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @keyframes slide-in-left {
    0% {
      transform: translateX(-450px);
    }
    100% {
      transform: translateX(0);
    }
  }

`

export const CartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 22px 26px;
  background: #202020;
  color: ${WHITE};
`

export const CartTitleLabel = styled.div`
  display: flex;
  align-items: center;
`

export const CloseIcon = styled(Icon)`
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const CartIconMini = styled(Icon)`
  font-size: 18px;
  margin-right: 12px;
  margin-top: -3px;
  color: #fff7da;
`

export const CartList = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 30px;
  overflow-y: scroll;
  height: calc(100% - 141px);
`

export const CartItemDiv = styled.div`
  display: flex;
  margin-bottom: 18px;
  margin-left: 8px;
  margin-right: 8px;
`

export const CartThumbnail = styled.img`
  max-width: 128px;
  width: 100%;
  object-fit: cover;
  height: 100px;
`

export const CartInfo = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  flex: 1;
  padding-right: 54px;
`

export const DesignName = styled.div`
  font-weight: bold;
  font-size: 16px;
  font-family: Avenir;
`

export const DesignCode = styled.div`
  margin-top: 4px;
`

export const ProductName = styled.div`
  font-size: 12px;
  margin-top: 4px;
`

export const Quantity = styled.div`
  position: absolute;
  right: 13px;
  top: calc(50% - 5px);
  background: #202020;
  height: 22px;
  border-radius: 50px;
  color: white;
  font-size: 10px;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DeleteIcon = styled(Icon)`
  position: absolute;
  right: 13px;
  top: 1px;
  height: 22px;
  border-radius: 50px;
  color: #202020;
  font-size: 10px;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    border: 1px solid gray;
  }
`

export const CartButtonOpen = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 90%;
  background: #202020;
  color: white;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 9px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
