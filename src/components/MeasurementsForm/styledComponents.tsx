/**
 * Styled Components - Created by miguelcanobbio on 05/06/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import inputGroup from 'antd/lib/input/Group'
import Button from 'antd/lib/button'
import radioButton from 'antd/lib/radio/radioButton'

interface InputProps {
  inputhWidth?: string
}

interface RowProps {
  marginBottom?: string
}

export const Container = styled.div`
  width: 100%;
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
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const InputGroup = styled(inputGroup)`
  border-radius: 0px;
`

export const RadioButton = styled(radioButton)`
  padding: 0 8px;
`

export const StyledInput = styled(Input)`
  height: 40px;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
`

export const LabeledInput = styled(Input)`
  height: 40px;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
  background-color: #fff;
`

export const StyledButton = styled(Button)`
  height: 40px;
  width: 100%;
  border-radius: 2px;
`
