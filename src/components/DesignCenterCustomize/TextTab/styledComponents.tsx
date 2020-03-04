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
  GRAY_SOFT,
  RED,
  GRAY_LIGHT
} from '../../../theme/colors'
import { AVENIR_NEXT } from '../../../theme/fonts'
import { TextFormat } from '../../../types/common'

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

export const Button = styled(
  AntdButton as React.ComponentClass<AntdButtonProps>
)`
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

export const AddTextButton = styled.div`
  cursor: pointer;
  height: 40px;
  max-width: 100%;
  border: 2px solid ${RED};
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  color: ${RED};
  display: flex;
  margin: 16px;
  transition: all 0.2s;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`

export const LayersText = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.09px;
  line-height: 22px;
  margin: 0 16px 16px;
`

export const Layers = styled.div`
  display: flex;
  flex-flow: column;
`

export const LayerBlock = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${GRAY_LIGHT};
  align-items: center;
`

export const TitleLayer = styled.div`
  flex: 1;
  font-size: 18px;
  -webkit-text-stroke-width: ${({ strokeWidth }: TextFormat) => strokeWidth}px;
  -webkit-text-stroke-color: ${({ stroke }: TextFormat) => stroke};
  color: ${({ fill }: TextFormat) => fill};
  font-family: ${({ fontFamily }: TextFormat) => fontFamily};
`

export const DeleteLayer = styled.div`
  color: ${RED};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  letter-spacing: 0.09px;
  cursor: pointer;
  margin-right: 8px;
  text-align: center;
  transition: all 0.2s;
  border-radius: 2px;
  padding: 1px 7px;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`

export const EditLayer = styled.div`
  width: 54px;
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  transition: all 0.2s;
  &:hover {
    background: ${GRAY_DARK};
    color: ${WHITE};
  }
`
