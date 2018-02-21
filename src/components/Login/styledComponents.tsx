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
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
  margin-bottom: 40px;
`
export const FormContainer = styled.div``
export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 0px;
`

export const RememberMeRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 19px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  margin-bottom: 20px;
`

export const JoinNowLabel = styled.span`
  font-weight: 600;
`
export const StyledLoginButton = styled(Button)`
  border-radius: 0px;
  width: 100%;
  height: 44px;
  border-color: #e61737;
  background-color: #fff;
  margin-bottom: 10px;
`

export const NotAMemberLabel = styled.div`
  height: 22px;
  width: 100%;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 50px;
`
