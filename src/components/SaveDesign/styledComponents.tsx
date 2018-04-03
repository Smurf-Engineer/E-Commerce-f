/**
 * Styled Components - Created by gustavomedina on 21/03/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  background-color: #222;
`

export const Title = styled.div`
  height: 27px;
  width: 210px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const Text = styled.div`
  height: 42px;
  width: 303.78px;
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 21px;
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 0px;
  width: 100%;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 100%;
`

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  .ant-btn-primary  {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 100%;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`
