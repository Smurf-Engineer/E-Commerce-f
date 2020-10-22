/**
 * Styled Components - Created by cazarez on 20/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import Checkbox from 'antd/lib/checkbox'
import Upload from 'antd/lib/upload'
import { BLUE, GRAY, GRAY_DARK, GRAY_STRONG, RED, WHITE, WHITE_TRANSPARENT } from '../../theme/colors'
import Icon from 'antd/lib/icon'
import { AVENIR_MEDIUM } from '../../theme/fonts'

interface DivProps {
  visible: boolean
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 744px;
  width: 100%;
  margin: 0 auto;
  margin-top: 38px;
  margin-bottom: 58px;
`

export const TopSection = styled.section``

export const TopDiv = styled.div``

export const FeatureBox = styled.div``

export const FeatureTitle = styled.div``

export const FeatureImage = styled.img``

export const FeatureDesc = styled.div``

export const LearnMore = styled.div``

export const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
`

export const Signup = styled.div`
  display: ${({ visible }: DivProps) => visible ? 'block' : 'none'};
  animation: slide-in-top 0.25s ease both;
  @keyframes slide-in-top {
    0% {
      height: 0px;
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      height: 100%;
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoText = styled.div`
  margin-left: -38px;
  margin-top: 22px;
`

export const LoginLabel = styled.div`
  height: 50px;
  width: 100%;
  color: ${WHITE};
  font-size: 18px;
  font-family: ${AVENIR_MEDIUM};
  line-height: 25px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  background: ${BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-top: 24px;
`

export const SavingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10000;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingContainer = styled.div`
  width: 100%;
`

export const BillingSelect = styled(Select)`
  width: 100%;
  .ant-select-selection--single {
    padding-top: 2px;
    font-weight: normal;
    border-radius: 0;
  }
`

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InfoLabel = styled.div`
font-style: italic;
color: ${GRAY};
margin-left: 6px;
`

export const Notifications = styled.div`
  margin-top: 28px;
`

export const Advertisement = styled.div`
  width: 100%;
  margin-bottom: 12px;
  color: red;
`

export const Checkboxes = styled.div`
  display: flex;
  flex-flow: column;
`

export const CheckboxStyled = styled(Checkbox)`
  color: ${GRAY_STRONG};
  display: flex;
  width: 100%;
  &:last-child {
    margin-bottom: 14px;
  }
  &.ant-checkbox-wrapper {
    margin-left: 0px;
  }
`

export const TermsCheckbox = styled(Checkbox)`
  color: ${GRAY_STRONG};
  display: flex;
  width: 100%;
  margin-top: 16px;
  &.ant-checkbox-wrapper {
    margin-left: 0px;
  }
`

export const ButtonsContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  text-align: right;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 767px) {
    flex-flow: column-reverse;
    margin-top: 12px;
  }
`

export const CancelButton = styled(Button)`
  width: 128px;
  margin-right: 18px;
  border-radius: 2px;
  height: 38px;
`

export const SaveButton = styled(Button)`
  width: 142px;
  margin-right: 18px;
  border-radius: 2px;
  height: 38px;
  color: ${WHITE};
  background: ${BLUE};
  @media (max-width: 767px) {
    margin-top: 28px;
    width: 100%;
    margin-right: 0;
    height: 50px;
  }
`

export const StyledUpload = styled(Upload)`
  margin-top: 4px;
  width: 100%;
  margin-bottom: 8px;
  .ant-upload-select-picture-card {
    border: 1px solid ${RED};
    width: 268px;
    height: 44px;
    margin-top: 10px;
    background: ${WHITE};
    border-radius: 1px;
    @media (max-width: 767px) {
      width: 100%;
      height: 54px;
    }
  }
`

export const Clip = styled(Icon)`
  color: ${RED};
  margin-right: 12px;
`

export const FileLabel = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 14px;
`

export const FileName = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const UploadButton = styled.div`
  color: ${RED};
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 20px;
`

export const StyledIcon = styled(Icon)`
  margin-right: 16px;
`

export const RequiredSymbol = styled.div`
  margin-left: 4px;
  color: red;
`

export const InputDiv = styled.div`
  margin-right: 28px;
  width: 100%;
  &:last-child {
    margin-right: 0px;
  }
`

export const GSTInput = styled.div`
  margin-right: 28px;
  width: 100%;
  margin-top: 16px;
  &:last-child {
    margin-right: 0px;
  }
`

export const Label = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  display: flex;
  color: ${GRAY_STRONG};
`

export const StyledInput = styled(Input)`
  border-radius: 0px;
  margin-bottom: 20px;
`

export const StyledInputPassword = styled(Input.Password)`
  border-radius: 0px;
  margin-bottom: 20px;
  .ant-input {
    border-radius: 0px;
  }
`

export const TitleDesc = styled.div`
  width: 100%;
`

export const FormTitle = styled.div`
  display: block;
  width: 100%;
  font-weight: bold;
  margin-top: 8px;
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

export const layoutStyle = {
  background: WHITE
}

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}
