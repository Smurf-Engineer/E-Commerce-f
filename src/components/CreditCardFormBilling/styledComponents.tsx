/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'
import { GRAY, RED, GRAY_DARK, BLUE, WHITE, ORANGE } from '../../theme/colors'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  width: 100%;
`
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 100%;
`

export const Column = styled.div`
  width: 70%;

 @media (max-width: 768px) {
    width: 100%;
  }
`

export const ContainerInput = styled.div`
  border: 1px solid ${GRAY};
  border-radius: 0;
  height: 40px;
  margin-top: 5px;
  padding: 9px 16px;
  width: 100%;
`

export const StyledInput = styled(Input)`
  border: 1px solid ${GRAY};
  border-radius: 0;
  height: 40px;
  margin-top: 5px;
  width: 100%;
`

export const RequiredSpan = styled.span`
  color: ${RED};
  margin: 0 5px;
`
export const InputTitleContainer = styled.div`
  display: flex;
`
export const Label = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  height: 19px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ContainerBilling = styled.div`
  margin-bottom: 24px;
  margin-top: 16px;
`

export const StyledCheckbox = styled(Checkbox)`
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 36px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;

  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${BLUE};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: ${BLUE};
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 24px 0;
`
export const ErrorMsg = styled.div`
  color: ${RED};
  font-size: 12px;
  height: 16px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const MyCardsRow = styled.div`
  margin-bottom: 20px;
`
export const ContinueButton = styled(Button)`
  background-color: ${BLUE};
  border-radius: 2px;
  color: ${WHITE};
  height: 40px;
  width: 138.23px;

  &:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
    color: ${WHITE};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const StripeCardElement = {
  base: {
    fontSize: '16px',
    color: GRAY_DARK
  }
}

export const modalStyle = { top: 20, paddingBottom: '96px' }

export const CardContainer = styled.div`
  width: 100%;
  border-radius: 3px;
  box-shadow: 0px 2px 6px -1px ${GRAY_DARK};
  max-width: 288px;
  height: auto;
  margin-right: 3.75%;
  margin-bottom: 48px;
  display: flex;
  flex-flow: column;
  @media (max-width: 1024px) {
    margin-right: unset;
  }
  animation: fade-in-fwd 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-fwd {
    0% {
      transform: translateZ(-80px);
      opacity: 0;
    }
    100% {
      transform: translateZ(0);
      opacity: 1;
    }
  }
`

export const DataDiv = styled.div`
  margin-top: -16px;
  margin-top: 20px;
  background: ${WHITE};
  width: 100%;
  padding: 0px 18px;
  padding-bottom: 16px;
  height: 100%;
  display: flex;
  flex-flow: column;
`

export const CardText = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
`

export const TitleDiv = styled.div`
  color: #b5b5b5;
  font-size: 12px;
`

export const ValueDiv = styled.div`
  font-size: 12px;
  margin-left: 10px;
  max-width: 123px;
  text-align: right;
`

export const NewAddressDiv = styled.div`
  position: absolute;
  border: 1px solid ${BLUE};
  border-radius: 25px;
  padding: 4px 8px;
  top: -10px;
  right: -9px;
  background: white;
  color: blue;
  font-size: 12px;
`

export const NoPaymentRequired = styled.div`
  margin: 60px;
  font-family: Avenir;
  margin-left: 30px;
`

export const CheckCircle = styled(Icon)`
  margin-right: 12px;
  color: ${BLUE};
  font-size: 16px;
  vertical-align: sub;
`

export const TitleBilling = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 24px 0;
`

export const DisabledText = styled.div`
  display: inline-block;
  font-weight: normal;
  margin-left: 136px;
  font-size: 14px;
  @media (max-width: 800px) {
    display: block;
    font-weight: normal;
    margin-top: 32px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
  }
`

export const WarningIcon = styled(Icon)`
  margin-right: 14px;
  color: ${ORANGE};
`