/**
 * Styled Components - Created by cazarez on 07/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'

interface InputProps {
  inputhWidth?: string
}

export const Container = styled.div`
  padding-top: 30px;
`

export const Text = styled.div`
  color: #fff;
`
export const Title = styled.div`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const ShippingFormContainer = styled.div`
  margin: 23px 0 50px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 22px;
`

export const Column = styled.div`
  width: ${({ inputhWidth }: InputProps) =>
    inputhWidth ? inputhWidth : '400px'};
`

export const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
`
export const RequiredSpan = styled.span`
  color: #e61737;
  margin: 0 5px;
`
export const InputTitleContainer = styled.div`
  display: flex;
`
export const Label = styled.div`
  height: 19px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ShippingMethodContainer = styled.div`
  margin-bottom: 50px;
`

export const ShippinPriorityText = styled.div`
  height: 46px;
  width: 281px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-style: italic;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 23px 0 20px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
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
export const ErrorMsg = styled.div`
  height: 16px;
  width: 127.9px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`
