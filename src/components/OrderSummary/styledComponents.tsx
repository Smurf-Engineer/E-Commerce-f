/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

interface TotalProps {
  onlyRead?: boolean
  withoutMarginBottom?: boolean
}

export const Container = styled.div`
  @media (max-width: 480px) {
    margin-top: 30px;
  }
`

export const Text = styled.div`
  color: #fff;
`
export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 100%;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`
export const CheckoutButton = styled(Button)`
  height: 40px;
  width: 100%;
`

export const SummaryTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 20px;
`

export const Divider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid #dcdcdc;
  margin-bottom: 10px;
`

export const CodeDivider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid #dcdcdc;
  margin-bottom: 0;
`

export const OrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const DeleteLabel = styled.div`
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 16px;
  margin-left: 10px;
`

export const TotalOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ withoutMarginBottom }: TotalProps) =>
    withoutMarginBottom ? '4px' : '20px'};
  margin-top: ${({ onlyRead }: TotalProps) => (onlyRead ? '10px' : '0')};
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const YouSavedOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: ${({ onlyRead }: TotalProps) => (onlyRead ? '10px' : '0')};
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const ZipCodeInputWrapper = styled.div`
  margin-bottom: 10px;
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

export const CollapseWrapper = styled.div`
  margin-bottom: 10px;
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: #5f6062;
    font-family: Avenir Next;
    font-size: 12px;
    letter-spacing: 0.15px;
    line-height: 16px;
    padding: 14px 0 12px 0;
  }
  .ant-collapse .ant-collapse-item .ant-collapse-header .arrow {
    position: absolute;
    left: 95%;
    display: inline;
    width: auto;
  }

  .ant-collapse-borderless .ant-collapse-item .ant-collapse-content {
    padding: 0 0 0 0;
  }
`

interface DisplayProps {
  show?: boolean
}

export const CalculationsWrapper = styled.div`
  display: ${(props: DisplayProps) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
`
