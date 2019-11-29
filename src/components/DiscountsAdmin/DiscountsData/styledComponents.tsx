/**
 * Styled Components - Created by eduardoquintero on 27/05/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Search from 'antd/lib/auto-complete'
import Button from 'antd/lib/button'
import Switch from 'antd/lib/switch'
import InputNumber from 'antd/lib/input-number'
import DatePicker from 'antd/lib/date-picker'
import { GRAY_LIGHTEST } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .ant-modal-content {
    border-radius: 0;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 10px;
  margin-top: 20px;
`

export const Label = styled.p`
  margin: 10px 0 10px 0;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  width: 250px;
`

export const StyledSelect = styled(Select)`
  margin-right: 10px;
  & .ant-select-selection {
    border-radius: 0;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &.margin {
    margin-top: 10px;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`

export const StyledButton = styled(Button)`
  background-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
  border-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
  border-radius: 0;
  height: 40px;
  width: 120px;
`

type PropsButton = {
  color: string
}

export const ButtonWrapper = styled.div`
  margin-left: 10px;
  .ant-btn-primary {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
    width: 100%;
  }
  .ant-btn-ghost:hover,
  .ant-btn-ghost:focus,
  .ant-btn-primary:hover {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
  }
  width: 120px;
`

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 0;
  margin-right: 10px;
`

export const StyledDatePicker = styled(DatePicker)`
  & input {
    border-radius: 0;
  }
  margin-right: 10px;
`

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    color: #e61737;
  }
`

export const SectionButton = styled.div`
  align-content: center;
  background-color: #ffffff;
  border: ${({ selected }: ButtonProps) =>
    selected ? '2px solid #e61737' : '0.5px solid #dcdcdc'};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  height: 50px;
  margin-right: 14px;
  padding: 14px;
  justify-content: center;
  width: ${({ large }: ButtonProps) => (large ? '139px;' : '55px;')};

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 15px;
  }
`

export const RestrictionContainer = styled.div`
  justify-content: flex-start;
  display: flex;
`

export const StyledSwitch = styled(Switch)`
  max-width: 50px;
`

export const StyledSearch = styled(Search)`
  width: 350px;
  margin-bottom: 20px;
  input {
    border-radius: 0;
  }
`

export const SearchButton = styled(Button)`
  height: 100%;
  border: none;
  width: 35px;
`

export const CheckboxContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-top: 40px;
`

export const CheckboxLabel = styled.p`
  margin: 10px 0 10px 0;
  display: inline-block;
`
