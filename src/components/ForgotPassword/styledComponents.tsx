/**
 * Styled Components - Created by cazarez on 20/02/18.
 */
import styled from 'styled-components'

import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
const blueColor = '#4A90E2'
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 79px 0 81px;
`

export const ForgotPasswordLabel = styled.div`
  height: 25px;
  width: 196px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  margin-bottom: 10px;
`
export const EnterEmailLabel = styled.div`
  height: 42px;
  width: 356px;
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  margin-bottom: 29px;
`
export const StyledInput = styled(Input)``

export const StyledButtonSend = styled(Button)`
  color: #fff;
  background-color: ${blueColor};
  background-color: ${blueColor};
  margin: 25px 0 15px;
  &:hover {
    border-color: ${blueColor};
    background-color: ${blueColor};
    color: #fff;
  }
`

export const ReturnToLogin = styled.div`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
  width: 100%;
  margin-bottom: 47px;
  &:hover {
    cursor: pointer;
  }
`
