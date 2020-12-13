/**
 * Styled Components - Created by Jesús on 19/05/20.
 */
import styled from 'styled-components'
import Radio from 'antd/lib/radio'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import { RED, GRAY_SOFT, BLUE } from '../../theme/colors'
import { WHITE } from '../../screens/DesignerTool/constants'
import Icon from 'antd/lib/icon'

const RadioGroup = Radio.Group

export const Container = styled.section`
`

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 36px;
`

export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
`

export const Description = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`

export const Label = styled.div`
  font-weight: bold;
`

export const CurrencyContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  max-width: 338px;
  width: 100%;
`

export const RadioGroupStyled = styled(RadioGroup)`
`

export const RadioStyled = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
  div {
    display: inline-block;
  }
`

export const Currencies = styled.div`
  height: 45px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`

export const FileLink = styled.button`
  border: none;
  text-align: left;
  color: ${RED};
  text-decoration: underline;
  cursor: pointer;
  background: none;
  :disabled {
    color: ${GRAY_SOFT};
    cursor: default;
  }
`

export const StyledUpload = styled(Upload)`
  margin-top: 4px;
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

export const Clip = styled(Icon)`
  color: ${RED};
  margin-right: 12px;
`

export const FileLabel = styled.div`
  display: flex;
`

export const FileName = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const CheckboxContainer = styled.div`
  margin-top: 20px;
`

export const CheckboxLabel = styled.div`
  display: inline-block;
`

export const TermsLink = styled.span`
  color: ${BLUE};
  text-decoration: underline;
  font-weight: bold;
`

export const TermsLabel = styled.div`
  margin-bottom: 12px;
  max-width: 740px;
  a {
    text-decoration: underline;
    color: ${BLUE};
  }
`

export const ButtonsContainer = styled.div`
  margin-top: 28px;
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

export const LinkButton = styled(Button)`
  width: 168px;
  border-radius: 2px;
  height: 38px;
  color: ${WHITE};
  background: ${BLUE};
`