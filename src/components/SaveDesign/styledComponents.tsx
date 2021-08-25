/**
 * Styled Components - Created by gustavomedina on 21/03/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Spin from 'antd/lib/spin'
import AntdButton from 'antd/lib/button'
import {
  BLUE,
  BLUE_SHADOW,
  GRAY_DARK,
  GRAY_LIGHT,
  DARKER_GRAY,
  RED_TRANSPARENT,
  WHITE,
  WHITE_BG
} from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

export const Container = styled.div``

export const Title = styled.div`
  height: 27px;
  width: 210px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const Text = styled.span`
  height: 42px;
  width: 303.78px;
  color: ${DARKER_GRAY};
  font-size: 14px;
  line-height: 21px;
  margin-top: 10px;
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
`
export const StyledSaveAs = styled.div`
  margin-top: 10px;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 100%;
`

type PropsButton = {
  color: string
}

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  .ant-btn-primary {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
    width: 100%;
  }
  .ant-btn-ghost:hover,
  .ant-btn-ghost:focus,
  .ant-btn-primary:hover {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
  }
`
export const CheckWrapper = styled.div`
  margin-bottom: 10px;
  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${BLUE};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: ${BLUE};
  }
`

export const InputWrapper = styled.div`
  padding: 4px 0px;
  .ant-input:hover {
    border-color: ${BLUE};
  }

  .ant-input:focus {
    border-color: ${BLUE};
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px ${BLUE_SHADOW};
    box-shadow: 0 0 0 2px ${BLUE_SHADOW};
  }

  .ant-input::selection {
    background: ${BLUE};
  }
`

export const SpinWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${WHITE_BG};
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`

export const StyledSpin = styled(Spin)`
  position: absolute;
  left: 0;
  right: 0;
  top: 35%;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 12px 0 12px -38px;
`
export const buttonStyle = {
  background: RED_TRANSPARENT,
  color: WHITE,
  border: 'none',
  boxShadow: 'none'
}

export const cancelButtonStyle = {
  background: WHITE,
  color: GRAY_DARK,
  borderColor: GRAY_LIGHT,
  boxShadow: 'none'
}
