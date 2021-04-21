/**
 * Styled Components - Created by david on 06/04/18.
 */
import styled, { keyframes } from 'styled-components'
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

interface DivProps {
  admin?: boolean
}

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.6s cubic-bezier(0.67, 0.35, 0.565, 1) both;
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
`

export const MessagePrevent = styled.div`
  color: ${BLACK};
  margin-bottom: 18px;
  margin-top: -4px;
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
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0;
  margin-left: 4px;
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const FilterTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const Filters = styled.div`
  border: 1px solid ${GRAY_LIGHT};
  margin-left: 4px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  width: 98%;
  box-shadow: 2px 2px 7px ${GRAY_SHADOW};
  flex-direction: column;
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
`

export const Options = styled.div`
  display: flex;
  align-items: center;
`

export const StyledDatePicker = styled(DatePicker)`
  width: 20%;
  height: 40px;
  margin-right: 15px;
  input {
    border-radius: 0;
    height: 40px;
  }
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 0px;
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
`