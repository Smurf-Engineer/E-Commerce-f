import styled from 'styled-components'
import Button from 'antd/lib/button'
import { BLUE, WHITE } from '../../theme/colors'

export const BlueButton = styled(Button)`
  &.ant-btn {
    background-color: ${BLUE};
    border-color: ${BLUE};
    color: ${WHITE};
  }
  &.ant-btn-clicked::after {
    border-color: ${BLUE};
  }
`
