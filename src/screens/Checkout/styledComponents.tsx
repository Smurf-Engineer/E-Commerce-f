/**
 * Styled Components - Created by cazarez on 05/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import { BLUE, WHITE, GRAY_DARK, BLACK_SHADOW, GREEN } from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'
import Spin from 'antd/lib/spin'

export const Container = styled.div`
  padding: 40px 32px;
  background-color: ${WHITE};

  @media (max-width: 480px) {
    padding: 20px 10px 40px 10px;
  }
`
export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`
export const CheckoutTitle = styled.div`
  height: 27px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  margin-bottom: 40px;
`

export const SummaryTitle = styled.div`
  height: 22px;
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const StepsContainer = styled.div`
  width: 70%;

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const SummaryContainer = styled.div`
  width: 26%;
  padding-left: 20px;
  @media (max-width: 1024px) {
    width: 29%;
  }
  @media (max-width: 480px) {
    width: 100%;
    padding: 0;
    margin-top: 20px;
  }
`
export const StepWrapper = styled.div`
  .ant-steps-item-process .ant-steps-item-icon {
    background: ${BLUE};
  }
  .ant-steps-item-process .ant-steps-item-icon {
    border-color: ${BLUE};
  }
  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: ${BLACK_SHADOW};
    background-color: ${WHITE};
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${BLUE};
    background-color: ${WHITE};
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${BLUE};
  }
  .ant-steps-item-finish
    > .ant-steps-item-content
    > .ant-steps-item-title:after {
    background-color: ${BLUE};
  }

  @media (max-width: 480px) {
    .ant-steps-horizontal.ant-steps-label-horizontal {
      display: flex;
    }
    .ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-title {
      font-size: 12px;
    }
    .ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-icon {
      margin-right: 5px;
    }
  }
`

export const ContinueButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border-radius: 2px;
  background-color: ${BLUE};
  color: ${WHITE};

  &:hover {
    border-color: ${BLUE};
    background-color: ${BLUE};
    color: ${WHITE};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

interface StepProps {
  clickable?: boolean
}

export const StepIcon = styled.div`
  background-color: ${({ clickable }: StepProps) =>
    !clickable ? '#4a90e2' : '#fff'};
  color: #fff;
  width: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: ${({ clickable }: StepProps) => (clickable ? 'pointer' : 'default')};
`

export const CheckIcon = styled(Icon)`
  color: #4a90e2;
  font-size: 27px;
`

export const CurrencyWarningText = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const PlaceOrderLoading = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${BLACK_SHADOW};
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fade-in-bottom 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-bottom {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBatch = styled.div`
  display: flex;
  flex-flow: column;
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  align-items: center;
  justify-content: center;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 30px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const StyledSpin = styled(Spin)`
  margin-top: 34px;
  margin-bottom: -28px;
`

export const InfoDescription = styled.div`
  text-align: center;
  font-size: 14px;
`

export const InvoiceAnimation = styled.img`
  max-width: 230px;
  width: 100%;
  object-fit: contain;
`

export const ModalLoading = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: white;
  padding: 8px;
  border-radius: 14px;
  box-shadow: 0px 3px 8px -2px ${GRAY_DARK};
  padding-bottom: 18px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const ProcessingDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: Avenir-Medium;
  align-items: center;
`

export const SpinStyled = styled(Spin)`
  margin-left: 16px;
`

export const InfoText = styled.div``

export const CheckList = styled.div``

export const CheckLabel = styled.div``

export const CheckGreen = styled(Icon)`
  color: ${GREEN};
  font-size: 16px;
  margin-right: 8px;
`

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}

export const MaintenanceLayout = styled.div`
  min-height: calc(100vh - 192px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${WHITE};
  flex-flow: column;
  padding: 64px 18px;
`

export const MaintenanceImage = styled.img`
  max-width: 440px;
  width: 100%;
`

export const MaintenaceLink = styled.div`
  margin-top: 38px;
  box-shadow: 0px 2px 5px -3px black;
  border-radius: 53px;
  padding: 8px 14px;
  background: white;
  color: #577395;
  font-weight: bold;
  font-family: Avenir;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`