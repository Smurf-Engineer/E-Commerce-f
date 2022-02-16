import { Button, Checkbox } from 'antd'
import styled from 'styled-components'
import { LEAF, WHITE, BLUE, GRAY_DARK } from '../../theme/colors'

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const BodyContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

export const InputContainer = styled.div`
  flex: 1;
  padding: 20px 0;
`

export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${LEAF};
  color: ${WHITE};
  padding: 10px;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`

export const Description = styled.div`
  font-size: 16px;
  margin: 10px 0;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`

export const Strong = styled.div`
  font-weight: 600;
  font-size: 15px;
  text-align: center;
`

export const PhoneColumn = styled.div`
  display: block;
  margin-left: 10px;
`

export const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`

export const Label = styled.div`
  height: 19px;
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`

export const ConfirmButton = styled(Button)`
  &.ant-btn:not([disabled]):not(.disabled) {
    background-color: ${BLUE};
    border-color: ${BLUE};
    color: ${WHITE};
  }
  &.ant-btn:not([disabled]):not(.disabled):hover,
  &.ant-btn:not([disabled]):not(.disabled):focus {
    background-color: ${WHITE};
    border-color: ${BLUE};
    color: ${BLUE};
  }
  margin-bottom: 20px;
`

export const BannerImage = styled.img`
  max-width: 350px;
  object-fit: contain;
  @media (max-width: 480px) {
    width: 100%;
  }
`

export const StyledCheckbox = styled(Checkbox)`
  color: ${GRAY_DARK};
  text-indent: -24px;
  margin: 20px 0px 0 24px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`

export const OptOutMessage = styled.div`
  margin: 16px 0 0 24px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`
