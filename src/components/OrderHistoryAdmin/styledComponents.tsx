/**
 * Styled Components - Created by eduardoquintero on 07/05/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import { GRAY_LIGHT, GRAY_SHADOW, WHITE_SMOKE, BLUE } from '../../theme/colors'

const Search = Input.Search

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

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

export const StyledInput = styled(Input)`
  margin-top: 0px;
  border-radius: 0;
  width: 20%;
  height: 40px;
  margin-right: 15px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
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
