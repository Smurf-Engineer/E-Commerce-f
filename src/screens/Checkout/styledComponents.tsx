/**
 * Styled Components - Created by cazarez on 05/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

const primaryColor = '#4a90e2'

export const Container = styled.div`
  padding: 40px 32px;
  background-color: #fff;

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
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  margin-bottom: 40px;
`

export const SummaryTitle = styled.div`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
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
    background: ${primaryColor};
  }
  .ant-steps-item-process .ant-steps-item-icon {
    border-color: ${primaryColor};
  }
  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: rgba(0, 0, 0, 0.25);
    background-color: #fff;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${primaryColor};
    background-color: #fff;
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${primaryColor};
  }
  .ant-steps-item-finish
    > .ant-steps-item-content
    > .ant-steps-item-title:after {
    background-color: ${primaryColor};
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
  background-color: ${primaryColor};
  color: #fff;

  &:hover {
    border-color: ${primaryColor};
    background-color: ${primaryColor};
    color: #fff;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const PlaceOrderButton = styled(Button)`
  height: 40px;
  width: 100%;
  border-radius: 2px;
  background-color: ${primaryColor};
  color: #fff;

  &:hover {
    border-color: ${primaryColor};
    background-color: ${primaryColor};
    color: #fff;
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

export const paypalButtonStyle = {
  label: 'paypal',
  size: 'responsive',
  color: 'blue',
  shape: 'rect',
  tagline: false
}
