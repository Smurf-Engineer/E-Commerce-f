/**
 * Styled Components - Created by eduardoquintero on 30/09/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Search from 'antd/lib/auto-complete'
import { GRAY_DARK, WHITE_SMOKE, BLUE } from '../../theme/colors'

export const Container = styled.div``

export const Title = styled.div`
  margin-bottom: 25px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  display: flex;
  align-items: center;
`

export const StyledButton = styled(Button)`
  height: 40px;
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const ButtonWrapper = styled.div`
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

export const StyledSearch = styled(Search)`
  width: 100%;
`

export const Label = styled.p`
  margin: 10px 0;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  input {
    border-radius: 0;
    width: 100%;
  }
`

export const SearchButton = styled(Button)`
  height: 100%;
  border: none;
  width: 35px;
`
