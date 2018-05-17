/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

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
