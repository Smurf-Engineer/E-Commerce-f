/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import Input from '../Common/CustomInput'
import Button from 'antd/lib/button'

export const Container = styled.div`
  width: 100%;
`

export const InputRow = styled.div``

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 0px;
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
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  padding-left: 10px;
`

export const CreateAccountContainer = styled.div`
  text-align: center;
`
export const CreateAccountText = styled.div`
  height: 32px;
  color: #5f6062;
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
