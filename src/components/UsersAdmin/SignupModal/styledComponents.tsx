/**
 * Styled Components - Created by eduardoquintero on 28/01/20.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Input from '../../Common/CustomInput'
import { WHITE_SMOKE, BLUE } from '../../../theme/colors'

export const FormContainer = styled.div`
  padding: 0 77px;

  @media (min-width: 320px) {
    padding: 0;
  }
`

export const StyledButton = styled(Button)`
  height: 44px;
  border-radius: 0px;
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 0px;
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const ButtonWrapper = styled.div`
  margin-top: 10px;
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
