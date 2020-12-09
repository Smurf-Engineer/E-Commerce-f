/**
 * Styled Components - Created by miguelcanobbio on 05/06/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

interface InputProps {
  inputhWidth?: string
}

interface RowProps {
  marginBottom?: string
}

export const Container = styled.div``

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

export const Advise = styled.div`
  font-size: 12px;
  margin: -8px 0 14px;
  font-style: italic;
`

export const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  width: 100%;
  border-radius: 2px;
`
