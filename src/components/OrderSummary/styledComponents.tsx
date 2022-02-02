/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, BLUE, GRAY_LIGHT, GRAY_DARK, RED, GREEN, GRAY_SOFT } from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface TotalProps {
  onlyRead?: boolean
  simpleDesign?: boolean
  withoutMarginBottom?: boolean
  showCouponInput?: boolean
}

export const Container = styled.div`
  position: relative;
  ${({ showCouponInput }: TotalProps) => showCouponInput ? `
    box-shadow: 0px 2px 7px -1px lightgrey;
    padding: 14px 19px;
    border-radius: 10px;
  ` : ''}
  @media (max-width: 480px) {
    margin-top: 30px;
  }
`

export const Text = styled.div`
  color: ${WHITE};
`
export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  .ant-btn-primary {
    background-color: ${BLUE};
    border-color: ${BLUE};
    width: 100%;
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
`
export const CheckoutButton = styled(Button)`
  height: 40px;
  width: 100%;
`

export const SummaryTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  height: 25px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 25px;
  display: inline-flex;
`

interface DividerProps {
  withMargin?: boolean
}

export const Divider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  background-color: ${GRAY_LIGHT};
  margin-bottom: ${({ withMargin }: DividerProps) =>
    withMargin ? '10px' : '0'};
`

interface DisplayProps {
  hide?: boolean
  secondary?: boolean
  crossed?: boolean
}

export const OrderItem = styled.div`
  display: ${({ hide }: DisplayProps) => (hide ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  color: ${({ secondary }: DisplayProps) => secondary ? GREEN : GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const ShippingValue = styled.div`
  text-decoration: ${({ crossed }: DisplayProps) => crossed ? 'line-through' : 'unset'};
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const TaxDiv = styled.div`
  display: flex;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  color: ${GRAY_DARK};
`

export const PercentDiv = styled.div`
  margin-left: 10px;
  color: ${GRAY_SOFT};
  font-size: 14px;
`

export const DeleteLabel = styled.div`
  color: ${RED};
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 16px;
  margin-left: 10px;
  cursor: pointer;
`

export const TotalOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ withoutMarginBottom }: TotalProps) =>
    withoutMarginBottom ? '4px' : '20px'};
  margin-top: ${({ onlyRead, showCouponInput }: TotalProps) =>
    onlyRead || !showCouponInput ? '10px' : '0'};
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  ${({ simpleDesign }: TotalProps) => !simpleDesign ? `
    color: #83b37b;
    padding: 6px 10px;
    border-radius: 5px;
    border: 1px solid;
  ` : ''}
`

export const InvoiceLink = styled.a`
  width: 110px;
  display: flex;
  position: absolute;
  top: -38px;
  justify-content: space-between;
  align-items: center;
  color: ${BLUE};
  transition: all .25s;
  &:hover {
    i {
      color: ${RED} !important;
    }
    color: ${RED} !important;
    text-decoration: underline;
  }
`

export const InvoiceIcon = styled(Icon)`
  margin-bottom: 1px;
  color: ${BLUE};
  font-size: 16px;
  transition: all .25s;
`

export const YouSavedOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: ${({ onlyRead }: TotalProps) => (onlyRead ? '10px' : '0')};
  color: ${RED};
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
    background-color: ${BLUE};
    border-color: ${BLUE};
    &:hover {
      background-color: ${BLUE};
      border-color: ${BLUE};
    }
  }
`

export const CouponIcon = styled(Icon)`
  margin-left: -3px;
  color: ${BLUE};
`

export const SummaryIcon = styled(Icon)`
  margin-right: 10px;
  font-size: 18px;
  color: ${BLUE};
`

export const CollapseWrapper = styled.div`
  margin-bottom: 10px;
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: ${GRAY_DARK};
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
export const CalculationsWrapper = styled.div`
  display: 'flex';
  flex-direction: column;
`

export const DiscountAmout = styled.div`
  color: ${RED};
`

export const CouponName = styled.div`
  font-weight: 600;
`
