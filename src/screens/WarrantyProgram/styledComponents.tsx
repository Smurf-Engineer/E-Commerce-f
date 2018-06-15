/**
 * Styled Components - Created by gustavomedina on 07/06/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

export const Container = styled.div`
  padding: 27px 0;
  background-color: #fff;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-align: center;
`

export const ButtonsRow = styled.div`
  padding: 90px 0 40px;
  display: flex;
  justify-content: center;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 30px 0px 20px;
    flex-direction: column;
  }
`
export const AnchorButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 220.37px;
  margin-left: 51px;
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 10px;
  }
`
export const SectionContainder = styled.div`
  margin-bottom: 60px;
`

export const SectionTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
`

export const SectionSubTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
`

export const SectionText = styled.div`
  padding: 30px 40px 0;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  .highlight {
    color: red;
    font-style: italic;
  }

  b {
    font-weight: 700;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 30px 10px 0px;
    flex-direction: column;
  }
`

export const TextExpand = styled.div`
  color: #5f6062;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 15px;
  }
`

export const ExpandContainter = styled.div`
  padding: 30px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 22px;
`

interface InputProps {
  inputhWidth?: string
}

export const Column = styled.div`
  width: ${({ inputhWidth }: InputProps) =>
    inputhWidth ? inputhWidth : '400px'};
`

export const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
`

export const RequiredSpan = styled.span`
  color: #e61737;
  margin: 0 5px;
`
export const InputTitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Label = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ErrorMsg = styled.div`
  height: 16px;
  width: 127.9px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const FormInfo = styled.div`
  width: 30%;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  margin-top: 24px;
  align-items: flex-end;
`

export const InputsContainer = styled.div`
  width: 50%;
  margin-top: 5px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const SmallInputsContainer = styled.div`
  width: 45%;
  margin-top: 5px;
`

export const TwoInputsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 30px;
  text-align: left;
  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 93px;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const UploadedFile = styled.div`
  color: #bebebe;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  margin-top: 10px;
`
