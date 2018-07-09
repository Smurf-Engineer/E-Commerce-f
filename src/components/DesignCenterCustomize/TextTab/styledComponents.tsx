/**
 * Styled Components - Created by david on 17/04/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Input = styled(AntdInput)`
  border-radius: 0px;
  height: 32px;
`

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

export const ArrowIcon = styled.img`
  padding-right: 8px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

export const Header = styled.div`
  background-color: #f1f4f5;
  padding: 10px 30px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

export const Text = styled.div`
  color: #fff;
`

interface ButtonProps {
  disabled: boolean
}

export const Button = styled.div`
  cursor: ${({ disabled }: ButtonProps) =>
    disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  color: ${({ disabled }: ButtonProps) => (disabled ? '#A0A0A0' : '#ffffff')};
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
`
