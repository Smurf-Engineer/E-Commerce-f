/**
 * Styled Components - Created by eduardoquintero on 29/03/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

export const LoginContainer = styled.div`
  padding: 0 50px;
  width: 70%;
  position: relative;
  box-shadow: 2px 2px 10px rgba(100, 100, 100, 0.3);
`

export const JakrooLogo = styled.img`
  display: block;
  margin: 0 auto;
`

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
  margin: 30px 0 30px 0;
`
export const FormContainer = styled.div``

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  height: 40px;
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

export const StyledLoginButton = styled(Button)`
  background-color: #fff;
  border-color: #e61737;
  border-radius: 0px;
  height: 50px;
  margin-bottom: 10px;
  width: 100%;
`

export const ForgotPasswordLabel = styled.div`
  &:hover {
    cursor: pointer;
  }
`
