/**
 * Styled Components - Created by david on 17/04/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Input = styled(AntdInput)`
  border-radius: 0px;
  height: 32px;
`

export const InputWrapper = styled.div`
  padding: 12px 32px;
  .ant-input-group-addon  {
    border: 0px;
  }
`

export const Header = styled.div`
  background-color: #f1f4f5;
  padding: 10px 30px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

export const Text = styled.div`
  color: #fff;
`

export const Button = styled.div`
  cursor: pointer;
  user-select: none;
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
`
