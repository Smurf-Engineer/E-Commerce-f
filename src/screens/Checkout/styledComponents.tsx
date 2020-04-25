/**
 * Styled Components - Created by cazarez on 05/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import { BLUE, WHITE, GRAY_DARK, BLACK_SHADOW } from '../../theme/colors'

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
  width: 25%;
  padding-left: 20px;

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
`

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}
