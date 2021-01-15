/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { BLUE, GRAY, WHITE_SMOKE } from '../../../theme/colors'

interface ButtonProps {
  disabled?: boolean
  show?: boolean
}

export const MenuContainer = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  padding: 10px 100px;
  position: absolute;
  pointer-events: none;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const ButtonWrapper = styled.div`
  pointer-events: all;
  visibility: ${({ show }: ButtonProps) => show ? 'visible' : 'hidden'};
  margin-top: 25px;
  text-align: right;
  align-self: right;
  .ant-btn-primary {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
  }
`

export const GrayButtonWrapper = styled.div`
  pointer-events: all;
  visibility: ${({ show }: ButtonProps) => show ? 'visible' : 'hidden'};
  margin-top: 25px;
  text-align: right;
  align-self: right;
  .ant-btn-primary {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : GRAY};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : GRAY};
  }
  .ant-btn-primary:hover {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : GRAY};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : GRAY};
  }
`

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 0;
`
