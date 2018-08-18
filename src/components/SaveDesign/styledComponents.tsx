/**
 * Styled Components - Created by gustavomedina on 21/03/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import AntdButton from 'antd/lib/button'
import { BLUE, BLUE_SHADOW } from '../../theme/colors'

export const Container = styled.div``

export const Title = styled.div`
  height: 27px;
  width: 210px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const Text = styled.span`
  height: 42px;
  width: 303.78px;
  color: #8c8c8c;
  font-family: 'Avenir Next';
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
