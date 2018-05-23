/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'

interface InputProps {
  inputhWidth?: string
}

export const Container = styled.div`
  width: 100%;
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

export const ContainerInput = styled.div`
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
  padding: 9px 16px;
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

export const ContainerBilling = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 36px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
`

export const ErrorMsg = styled.div`
  height: 16px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 24px 0;
`

export const ContinueButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border-radius: 2px;
  background-color: #4a90e2;
  color: #fff;

  &:hover {
    border-color: #4a90e2;
    background-color: #4a90e2;
    color: #fff;
  }
`
export const StripeCardElement = {
  base: {
    fontSize: 'medium',
    fontFamily: 'Avenir Next',
    color: '#5f6062'
  }
}
