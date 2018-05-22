/**
 * Styled Components - Created by cazarez on 05/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

const primaryColor = '#4a90e2'

export const Container = styled.div`
  padding: 40px 32px;
  background-color: #fff;
`
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
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
`

export const SummaryContainer = styled.div`
  width: 25%;
  padding-left: 20px;
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
