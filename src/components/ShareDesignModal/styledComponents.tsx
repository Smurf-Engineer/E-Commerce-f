/**
 * Styled Components - Created by cazarez on 21/03/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 2px;
`

export const Text = styled.div`
  color: #fff;
`

export const ShareLinkRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-flow: row;
  @media (max-width: 425px) {
    flex-flow: column;
    align-items: center;
  }
`

export const ShareLinkContainer = styled.div`
  flex: 2;
  width: 100%;
`

export const Title = styled.div`
  margin-bottom: 5px;
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;
`
export const Asterisk = styled.span`
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
  margin-left: 5px;
`
export const ShareInputWrapper = styled.div`
  input {
    border-radius: 0;
  }
  .ant-btn {
    border-radius: 0;
    background-color: #4a90e2;
    border-color: #4a90e2;
    &:hover {
      background-color: #4a90e2;
      border-color: #4a90e2;
    }
  }
`

export const InputWrapper = styled.div`
  .ant-input {
    margin-bottom: 26px;
    height: 40px;
    border-radius: 0;
    color: #bebebe;
    font-size: 16px;
    line-height: 22px;
  }
`

export const ShareSocialMediaContainer = styled.div`
  margin-left: 27px;
  margin-top: 0;
  @media (max-width: 425px) {
    margin-left: 0;
    margin-top: 22px;
  }
`
export const ShareByMailRow = styled.div``

export const IconsRow = styled.div`
  margin-top: 15px;
`

export const FacebookIconImg = styled.img`
  width: 28px;
  &:hover {
    cursor: pointer;
  }
`
export const TwitterIconImg = styled.img`
  margin-left: 27px;
  width: 28px;
  &:hover {
    cursor: pointer;
  }
`

export const SendButtonWrapper = styled.div`
  text-align: right;
  .ant-btn {
    height: 40px;
    width: 138.23px;
    border-radius: 2px;
    background-color: #4a90e2;
    color: #fff;
  }
`
