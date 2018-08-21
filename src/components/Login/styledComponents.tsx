/**
 * Styled Components - Created by cazarez on 20/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const LoginLabel = styled.div`
  height: 25px;
  width: 100%;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
  margin-bottom: 40px;
`
export const FormContainer = styled.div``
export const StyledInput = styled(Input)`
  border-radius: 0px;
  font-family: 'Avenir Next';
  margin-bottom: 20px;
`

export const RememberMeRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  margin-bottom: 20px;
`

export const JoinNowLabel = styled.span`
  font-weight: 600;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`
export const StyledLoginButton = styled(Button)`
  background-color: #fff;
  border-color: #e61737;
  border-radius: 0px;
  font-family: 'Avenir Next';
  height: 50px;
  margin-bottom: 10px;
  width: 100%;
`

export const NotAMemberLabel = styled.div`
  height: 22px;
  width: 100%;
  color: #5f6062;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 50px;
`

export const ForgotPasswordLabel = styled.div`
  &:hover {
    cursor: pointer;
  }
`
