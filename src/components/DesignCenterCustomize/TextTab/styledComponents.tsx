/**
 * Styled Components - Created by david on 17/04/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'
import AntdButton, { ButtonProps as AntdButtonProps } from 'antd/lib/button'
import {
  WHITE_SMOKE,
  BLUE,
  WHITE,
  GRAY_LIGHTEST,
  GRAY_DARK,
  GRAY_SOFT
} from '../../../theme/colors'

export const Container = styled.div``

const { TextArea } = AntdInput
export const Input = styled(TextArea)`
  border-radius: 0px;
  height: 32px;
`

export const InputWrapper = styled.div`
  padding: 12px 32px;

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
    -webkit-box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    outline: 0;
  }

  .ant-input::selection {
    background: ${BLUE};
  }

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 12px 10px 0px;
  }
`

export const ArrowIcon = styled.img`
  padding-right: 8px;
`

export const Row = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  min-height: 55px;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

export const Text = styled.div`
  color: ${WHITE};
`

interface ButtonProps {
  disabled: boolean
}

export const Button = styled(AntdButton as React.ComponentClass<
  AntdButtonProps
>)`
  color: ${({ disabled }: ButtonProps) => (disabled ? GRAY_SOFT : WHITE)};
  cursor: ${({ disabled }: ButtonProps) =>
    disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  line-height: 19px;
  user-select: none;
  background-color: ${BLUE};
  &.ant-btn-clicked,
  &.ant-btn-clicked::after,
  &:active,
  &:focus,
  &:hover {
    background: ${BLUE};
    background-color: ${BLUE};
    color: ${WHITE};
    border-color: ${WHITE};
  }
  &::after {
    border-color: ${BLUE};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`

export const LockContainer = styled.div`
  cursor: pointer;
  padding: 2px;
  display: inline-block;
  font-size: 20px;
`
