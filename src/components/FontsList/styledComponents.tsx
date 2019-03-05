/**
 * Styled Components - Created by david on 29/05/18.
 */
import styled from 'styled-components'
import { WHITE, RED } from '../../theme/colors'
import AntdInput from 'antd/lib/input'

export const Container = styled.div`
  height: 60vh;
  padding: 12px;
`

interface TextProps {
  font: string
}

export const Text = styled.div`
  color: #5f6062;
  font-family: ${({ font }: TextProps) => font};
  font-size: 30px;
  letter-spacing: 0.11px;
  line-height: 23px;
  &.white {
    color: ${WHITE};
  }
`

export const Item = styled.div`
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 13px;

  &:hover {
    background-color: #fafafa;
  }
  &.active {
    background: ${RED};
    border-radius: 9px;
  }

  -webkit-transition: background-color 200ms linear;
  -moz-transition: background-color 200ms linear;
  -o-transition: background-color 200ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;
`

export const ScrollView = styled.div`
  margin-top: 10px;
  overflow: auto;
  height: 55vh;
`

export const Input = styled(AntdInput)`
  border-radius: 0px;
  height: 32px;
`
