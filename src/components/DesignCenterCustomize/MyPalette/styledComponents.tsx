/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const Input = styled(AntdInput)`
  border-radius: 0px;
`

export const InputWrapper = styled.div`
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

export const Padding = styled.div`
  padding: 12px 32px 0px 32px;
`

export const Divider = styled(AntDivider)`
  margin-top: 16px;
  margin-bottom: 16px;
`

interface ButtonProps {
  disabled: boolean
}

export const Button = styled.div`
  cursor: ${({ disabled }: ButtonProps) =>
    disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  color: ${({ disabled }: ButtonProps) => (disabled ? '#A0A0A0' : '#ffffff')};
  font-size: 14px;
  line-height: 19px;
`

export const ListContainer = styled.div`
  overflow: auto;
  height: 392px;
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
