/**
 * Styled Components - Created by david on 12/07/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'
import AntdButton from 'antd/lib/button'

export const Input = styled(AntdInput)`
  margin-bottom: 16px;
`

export const Button = styled(AntdButton)`
  align-self: flex-end;
`

export const Container = styled.div`
  padding: 16px;
  height: 100vh;
  overflow: auto;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
  padding-bottom: 20px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding-bottom: 16px;
`
