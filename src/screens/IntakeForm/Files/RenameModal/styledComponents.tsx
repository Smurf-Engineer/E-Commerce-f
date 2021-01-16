import { BLUE, BLUE_SHADOW, GRAY_DARK } from '../../../../theme/colors'
import Input from 'antd/lib/input'
import styled from 'styled-components'

export const ConfirmMessage = styled.div`
    color: ${GRAY_DARK};
    font-size: 16px;
    letter-spacing: 0.2px;
    line-height: 22px;
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

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
`
