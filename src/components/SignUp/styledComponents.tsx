/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import Input from '../Common/CustomInput'
import Divider from 'antd/lib/divider'
import Button from 'antd/lib/button'
import {
  GRAY_DARK,
  GRAY_LIGHT
} from '../../theme/colors'

export const Container = styled.div`
  width: 100%;
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
  margin-bottom: 16px;
  width: 42%;
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
  color: ${GRAY_LIGHT};
  font-size: 18px;
  line-height: 25px;
  text-align: center;
`

export const InputRow = styled.div``
export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 0px;
`

export const SocialMediaContainer = styled.div`
  padding: 0 81px;
  @media (min-width: 320px) {
    padding: 0;
  }
`

export const FormContainer = styled.div`
  padding: 0 77px;

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
  border-radius: 0px;
`

export const HaveAnAccountRow = styled.div`
  padding: 10px 0 10px;
  text-align: center;
`

export const LogInLabel = styled.span`
  font-weight: 600;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const CountryContainer = styled.div`
  width: 50%;
  margin-bottom: 20px;
  margin: 0 auto 15px;
`

export const Label = styled.div`
  padding-bottom: 5px;
  color: ${GRAY_DARK};
  font-size: 14px;
`
