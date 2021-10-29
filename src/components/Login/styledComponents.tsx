/**
 * Styled Components - Created by cazarez on 20/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { GRAY_DARK, RED, BLUE, WHITE } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: all .25s;
`

export const LoginLabel = styled.div`
  height: 25px;
  width: 100%;
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
  margin-bottom: 40px;
`

export const FormContainer = styled.div`
  transition: all .25s;
`

export const StyledInput = styled(Input)`
  border-radius: 0px;
  margin-bottom: 20px;
`

export const RememberMeRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 19px;
  color: ${GRAY_DARK};
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
  background-color: ${WHITE};
  border-color: ${RED};
  border-radius: 0px;
  height: 50px;
  margin-bottom: 10px;
  width: 100%;
`

export const NotAMemberLabel = styled.div`
  height: 22px;
  width: 100%;
  color: ${GRAY_DARK};
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

export const LoginFailedView = styled.div`
  animation: fade-in-bottom 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  text-align: center;
  @keyframes fade-in-bottom {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const LoginFailed = styled.div`
  margin: 0 10px;
  font-size: 15px;
  p {
    margin-bottom: 2px;
  }
`

export const OkButton = styled(Button)`
  background: ${BLUE};
  color: ${WHITE};
  margin-top: 10px;
  align-items: center;
`