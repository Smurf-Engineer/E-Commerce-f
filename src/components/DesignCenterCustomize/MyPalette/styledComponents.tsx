/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'
import AntdInput from 'antd/lib/input'
import {
  WHITE,
  WHITE_SMOKE,
  BLUE,
  GRAY_SOFT,
  GRAY_DARK
} from '../../../theme/colors'

export const Container = styled.div``

export const Text = styled.div`
  color: ${WHITE};
`

export const Input = styled(AntdInput)`
  border-radius: 0px;
`

export const InputWrapper = styled.div`
  .ant-input-group-addon {
    background-color: ${({ disabled }: ButtonProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border: 0px;
  }

  .ant-input:hover {
    border-color: ${BLUE};
  }

  .ant-input:focus {
    border-color: ${BLUE};
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  .ant-input::selection {
    background: ${BLUE};
  }
`

export const Padding = styled.div`
  padding: 12px 32px 0px;

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 12px 10px 0px;
  }
`

export const Divider = styled(AntDivider)`
  margin-bottom: 16px;
  margin-top: 16px;
`

interface ButtonProps {
  disabled: boolean
}

export const Button = styled.div`
  color: ${({ disabled }: ButtonProps) => (disabled ? GRAY_SOFT : WHITE)};
  cursor: ${({ disabled }: ButtonProps) =>
    disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  line-height: 19px;
  user-select: none;
`

export const ListContainer = styled.div`
  overflow: auto;
  height: 392px;
`

export const ModalMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
