/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import Input from '../Common/CustomInput'
import Divider from 'antd/lib/divider'
import Button from 'antd/lib/button'
import {
  BLACK,
  BLUE,
  BLUE_LIGHT,
  BLUE_SKY,
  GRAY_DARK,
  WHITE,
} from '../../theme/colors'

interface DivProps {
  countrySelected?: string
}

export const Container = styled.div`
  width: 100%;
  transition: all 0.25s;
`

export const SignUpLabel = styled.div`
  height: 25px;
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
`
export const Text = styled.div`
  height: 46px;
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  margin: 10px 0 30px;
`

export const DividerRow = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 42%;
  animation: fade-in-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0px auto;
    justify-content: center;
  }
`
export const RightDivider = styled(Divider)``
export const LeftDivider = styled(Divider)``
export const OrLabel = styled.div`
  height: 27px;
  margin: 0 24px;
  color: ${GRAY_DARK};
  font-size: 18px;
  line-height: 25px;
  text-align: center;
`

export const InputRow = styled.div``
export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 0px;
`

export const LocationContainer = styled.div`
  margin-bottom: 20px;
  padding: 0 81px;
  transition: all 0.25s;
  animation: fade-in-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media (min-width: 320px) {
    padding: 0;
  }
`

export const FormContainer = styled.div`
  padding: 0 77px;
  animation: fade-in-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media (min-width: 320px) {
    padding: 0;
  }
`

export const NewsLetterRow = styled.div`
  display: flex;
  justify-content: center;
`
export const NewsLetterText = styled.div`
  width: 301.35px;
  color: ${GRAY_DARK};
  font-size: 16px;
  line-height: 22px;
  padding-left: 10px;
`

export const CreateAccountContainer = styled.div`
  text-align: center;
`
export const CreateAccountText = styled.div`
  height: 32px;
  color: ${GRAY_DARK};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin: 10px 0 17px;
`

export const StyledButton = styled(Button)`
  width: 100%;
  height: 44px;
  background-color: ${BLUE_SKY};
  border-radius: 0px;
  border: none;
  color: ${WHITE};

  &:hover {
    background-color: ${BLUE_LIGHT};
    color: ${WHITE};
    cursor: pointer;
  }
`

export const HaveAnAccountRow = styled.div`
  color: ${BLACK};
  padding: 10px 0 10px;
  text-align: center;
  font-size: 16px;
  animation: fade-in-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
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

export const LogInLabel = styled.span`
  color: ${BLUE};
  font-weight: 600;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const CountryContainer = styled.div`
  width: 100%;
  margin: 0 auto 15px;
  transition: all 0.25s;
  margin-bottom: ${({ countrySelected }: DivProps) =>
    countrySelected ? '32px' : '12px'};
`

export const Label = styled.div`
  padding-bottom: 5px;
  color: ${GRAY_DARK};
  font-size: 14px;
`
