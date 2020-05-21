/**
 * Styled Components - Created by miguelcanobbio on 31/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Switch from 'antd/lib/switch'
import Checkbox from 'antd/lib/checkbox'
import { WHITE_TRANSPARENT } from '../../theme/colors'

interface InputProps {
  inputhWidth?: string
}

interface RowProps {
  marginBottom?: string
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 24px 0;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const SectionContainer = styled.div`
  width: 50%;
  margin-bottom: 40px;

  @media (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    margin-bottom: 24px;
  }

  @media (min-width: 769px) and (max-width: 900px) {
    width: 100%;
    padding-right: 20px;
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ marginBottom }: RowProps) =>
    marginBottom ? marginBottom : '16px'};
`

export const Column = styled.div`
  width: ${({ inputhWidth }: InputProps) =>
    inputhWidth ? inputhWidth : '400px'};
`

export const InputTitleContainer = styled.div`
  display: flex;
`
export const Label = styled.div`
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  width: 100%;
  border-radius: 2px;
`

export const StyledInputGroup = styled(Input.Group)`
  height: 40px;
  border-radius: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const StyledInputAmount = styled(Input)`
  height: 40px;
  border-radius: 0;
  width: 80%;
`

export const StyledInputUnity = styled(Input)`
  height: 40px;
  border-radius: 0;
  border-left: 0;
  pointer-events: none;
  background-color: #fff;
  width: 20%;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 36px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
`

export const DropDownPlaceHolder = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
  &:hover {
    border: 1px solid #bebebe;
    color: #bebebe;
  }
`

export const LoadingErrorContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const ErrorMessage = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const StyledSwitch = styled(Switch)`
  margin-left: 24px;
`

export const SwitchWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`