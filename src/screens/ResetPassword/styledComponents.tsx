/**
 * Styled Components
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { WHITE, GRAY_DARK, GRAY_LIGHT, RED, BLUE } from '../../theme/colors'

export const Container = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const Header = styled.div`
  background-color: ${WHITE};
  height: 70px;
  width: 100%;

  @media (max-width: 991px) {
    display: none;
  }
`
export const ContentHeader = styled.div`
  align-items: center;
  display: flex;
  margin: auto;
  max-width: 1024px;
  padding: 18px 36px;
`
export const LogoIcon = styled.img``
export const Divider = styled.div`
  background-color: ${GRAY_LIGHT};
  height: 1px;
  width: 100%;
`
export const FormContainer = styled.div`
  height: 343.1px;
  margin-top: 40px;
  width: 60%;

  @media (min-width: 1440px) {
    max-width: 1024px;
  }
`
export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 25px;
`
export const InputTitleContainer = styled.div`
  display: flex;
  margin: 2px 0px 5px;
`
export const Label = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  height: 19px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
export const RequiredSpan = styled.span`
  color: ${RED};
  margin: 0 5px;
`
export const StyledInput = styled(Input)`
  border-radius: 2px;
  height: 40px;
  margin-bottom: 20px;
`
export const RememberMeRow = styled.div`
  display: flex;
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
export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 550px) {
    width: 70%;
  }

  @media (min-width: 771px) {
    width: 50%;
  }

  @media (min-width: 971px) {
    width: 40%;
  }
`
export const StyledChangePasswordButton = styled(Button)`
  background-color: ${BLUE};
  border-color: ${BLUE};
  border-radius: 0px;
  height: 50px;
  margin-bottom: 10px;
  width: 100%;

  @media (min-width: 550px) {
    width: initial;
  }
`
export const StyledCancelButton = styled(Button)`
  border-radius: 0px;
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 50px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 10px;
  width: 100%;

  @media (min-width: 550px) {
    width: initial;
  }
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
