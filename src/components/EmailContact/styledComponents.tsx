/**
 * Styled Components - Created by gustavomedina on 16/04/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const Title = styled.div`
  height: 27px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const Label = styled.div`
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  margin-top: 15px;
  margin-bottom: 5px;
`

export const TitleLabel = styled.div`
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  margin-top: 15px;
  margin-bottom: 5px;
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
`

export const StyledInputBox = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
  height: 40%;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 93px;
`

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 15px;
  text-align: right;
  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 93px;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`
