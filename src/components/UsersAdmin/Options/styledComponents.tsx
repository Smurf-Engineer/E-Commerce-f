/**
 * Styled Components - Created by eduardoquintero on 21/01/20.
 */
import styled from 'styled-components'
import Radio from 'antd/lib/radio'
import { WHITE, GRAY_DARK, BLUE, GRAY, RED, WHITE_SMOKE } from '../../../theme/colors'
import Switch from 'antd/lib/switch'
import { AVENIR_MEDIUM } from '../../../theme/fonts'
import Input from 'antd/lib/input/Input'
import Checkbox from 'antd/lib/checkbox'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button/button'
import Select from 'antd/lib/select'
const RadioButtonComponent = Radio.Button

interface DivProps {
  secondary?: boolean
}

export const RadioButton = styled(RadioButtonComponent)`
  margin-right: 26px;
  height: 50px;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  width: 158px;
  border-radius: 2px !important;
  background-color: ${WHITE};
  margin-bottom: 20px;
`

export const BackLabel = styled.div`
  height: 22px;
  width: 203px;
  cursor: pointer;
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 15px;
`
export const BackText = styled.span`
  display: inline-block;
  margin-left: 6px;
`

export const CheckboxStyled = styled(Checkbox)`
  margin-left: 27px;
  margin-right: 55px;
  text-align: center;
  margin-top: 10px;
`

export const TaxesDiv = styled.div`
  display: flex;
  margin-bottom: 34px;
`

export const TaxesInput = styled(Select)`
  width: 145px;
  & .ant-select-selection {
    border-radius: 0;
  }
`

export const UserLabel = styled.div`
  display: flex;
  margin-bottom: 18px;
  align-items: center;
`

export const StatusLabel = styled.div`
  margin-left: 16px;
  color: ${BLUE};
  font-style: italic;
`

export const Stats = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid ${GRAY};
  padding-top: 32px;
  margin-bottom: 32px;
  margin-top: 32px;
`

export const StatsTitle = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`

export const StatsValue = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({ secondary }: DivProps) => secondary ? RED : GRAY_DARK}
  font-family: ${AVENIR_MEDIUM};
  text-transform: uppercase;
`

export const WarningIcon = styled(Icon)`
  font-size: 18px;
  color: ${RED};
  margin-right: 8px;
`

export const StatsLabel = styled.div`
  margin-right: 98px;
  font-size: 12px;
  display: flex;
  flex-flow: column;
`

export const NameLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
`

export const EnableSection = styled.div`
  display: inline-flex;
  margin-right: 38px;
  flex-flow: column;
  justify-content: flex-start;
  align-items: start;
  margin-right: 98px;
`

export const EditButton = styled.div`
  display: inline-block;
  margin-left: 16px;
  color: ${RED};
  cursor: pointer;
`

export const StyledSwitch = styled(Switch)`
  margin-top: 8px;
`

export const FormContainer = styled.div`
  padding: 0 77px;

  @media (min-width: 320px) {
    padding: 0;
  }
`

export const StyledButton = styled(Button)`
  border-radius: 2px;
  height: 33px;
  width: 74px;
  margin-left: 16px;
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 0px;
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const ButtonWrapper = styled.div`
  margin-top: 10px;
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
