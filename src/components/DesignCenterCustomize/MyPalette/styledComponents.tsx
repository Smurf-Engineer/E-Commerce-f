/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const Input = styled(AntdInput)`
  border-radius: 0px;
`

export const Padding = styled.div`
  padding: 12px 32px 0px 32px;
`

export const Divider = styled(AntDivider)`
  margin-top: 16px;
  margin-bottom: 16px;
`

export const Button = styled.div`
  cursor: pointer;
  user-select: none;
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
`
