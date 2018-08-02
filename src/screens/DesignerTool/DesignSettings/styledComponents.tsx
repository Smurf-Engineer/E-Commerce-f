/**
 * Styled Components - Created by david on 12/07/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'
import AntdButton from 'antd/lib/button'

const { Search } = AntdInput

export const Input = styled(Search)``

export const Button = styled(AntdButton)`
  align-self: flex-end;
`

export const Container = styled.div`
  padding: 16px;
  height: 100vh;
  overflow: auto;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputContainer = styled.div`
  position: relative;
  padding-bottom: 16px;
`

interface ButtonProps {
  disabled: boolean
}

export const InputWrapper = styled.div`
  padding: 12px 32px;

  .ant-input-group-addon {
    background-color: ${({ disabled }: ButtonProps) =>
      disabled ? '#F5F5F5' : '#4a90e2'};
    border: 0px;
  }

  .ant-input:hover {
    border-color: #4a90e2;
  }

  .ant-input:focus {
    border-color: #4a90e2;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  .ant-input::selection {
    background: #4a90e2;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding-bottom: 16px;
`

export const ErrorLabel = styled.div`
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  position: absolute;
  bottom: -16px;
  left: 8px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-bottom: 20px;
`
