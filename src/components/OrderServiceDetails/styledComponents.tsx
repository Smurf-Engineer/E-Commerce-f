/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import { BLACK, RED, GRAY_DARK, BLUE, GREEN_DARK, GRAY_LIGHT, GRAY_LIGHTEST } from '../../theme/colors'
import Input from 'antd/lib/input/Input'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'

interface DivProps {
  bold?: boolean
}

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35em;
`

export const Container = styled.div``

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;

  &:hover {
    color: #e61737;
  }
`
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
  margin-top: 48px;
  padding-right: 34px;
  position: relative;
  @media (max-width: 768px) and (min-width: 320px) {
    align-items: center;
    margin-bottom: 24px;
    padding-right: 0px;
  }
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`
export const ButtonWrapper = styled.span`
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;

  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`
export const Button = styled(AntdButton)`
  height: 40px;
  width: 93px;
`
export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
  padding-right: 34px;

  @media (max-width: 658px) and (min-width: 320px) {
    display: block;
    padding-right: 0px;
  }
`
export const OrderDelivery = styled.div`
  @media (max-width: 963px) and (min-width: 659px) {
    width: 50%;
  }
`

export const DeliveryDate = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 25px;

  @media (max-width: 768px) and (min-width: 320px) {
    display: flex;
    justify-content: space-between;
  }
`
export const DeliveryInfo = styled.div`
  @media (max-width: 963px) and (min-width: 320px) {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`
export const DeliveryLabels = styled.div`
  color: #5f6062;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  width: 187px;
`
export const DeliveryLabel = styled.div`
  margin-bottom: 12px;
`
export const DeliveryData = styled.div`
  color: #5f6062;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 60px;

  @media (max-width: 963px) and (min-width: 320px) {
    margin-left: 9%;
    width: 100px;
  }
`

interface InfoProps {
  tracking?: boolean
}

export const Info = styled.div`
  color: ${({ tracking }: InfoProps) => (tracking ? RED : GRAY_DARK)};
  height: 22px;
  margin-bottom: 12px;
  &.link {
    text-decoration: underline;
    &:hover {
      color: ${BLACK};
      cursor: pointer;
    }
  }
  &.ondemandLink {
    color: ${GREEN_DARK};
    text-decoration: underline;
    &:hover {
      color: ${BLACK};
      cursor: pointer;
    }
  }
`
export const OrderSummaryContainer = styled.div`
  width: 25%;
  font-size: 16px;
  animation: fade-in-right 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-right {
    0% {
      transform: translateX(5px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @media (max-width: 1375px) and (min-width: 659px) {
    width: 258px;
  }

  @media (max-width: 658px) and (min-width: 320px) {
    margin-top: 50px;
    width: 100%;
  }
`
export const Items = styled.div`
  margin-top: 20px;
  padding-right: 34px;

  @media (max-width: 658px) and (min-width: 320px) {
    padding-right: 0px;
  }
`

export const FedexLabel = styled.div`
  color: ${BLUE};
  text-decoration: underline;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const OpenIcon = styled(Icon)`
  margin-left: 8px;
  transform: scaleX(-1);
  font-size: 12px;
`

export const FedexIcon = styled.img`
  max-width: 32px;
  object-fit: contain;
  margin-left: 8px;
  margin-bottom: 2px;
`

export const NetsuiteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`

export const CartItem = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
`

export const ThumbnailImage = styled.img`
  width: 168px;
  height: 148px;
  object-fit: cover;
  background: ${GRAY_LIGHTEST};
  border-radius: 3px;
`

export const ItemInfo = styled.div`
  margin-left: 32px;
`

export const DescriptionLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`

export const DesignInfo = styled.div`
  margin-bottom: 6px;
`

export const DesignCode = styled.div`
  text-decoration: underline;
  color: ${BLUE};
  &:hover {
    cursor: pointer;
  }
`

export const PriceLabel = styled.div`
  flex: 1;
  text-align: right;
  font-weight: bold;
  font-size: 16px;
  margin-right: 32px;
`

export const NetsuiteTitle = styled.div``

export const NetsuiteValue = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  width: 90px;
  height: 20px;
  font-size: 12px;
  .ant-input {
    border-radius: 0;
  }
`

export const NetsuiteLeft = styled.div``

export const NetsuiteRight = styled.div`
  display: flex;
  align-items: center;
`

export const UpsertButton = styled.div`
  margin-left: 8px;
  font-size: 12px;
  color: red;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const TitleStyled = styled.div`
  color: #5f6062;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  line-height: 22px;
  margin-bottom: 24px;
`
export const CartList = styled.ul`
  padding: 0;
  max-width: 672px;
  width: 100%;
`
export const ShippingBillingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 40px 10% 36px 0;

  @media (max-width: 658px) and (min-width: 320px) {
    flex-wrap: wrap;
    margin-right: 0px;
  }
`
export const ShippingBillingCard = styled.div`
  margin-right: 158px;
  @media (max-width: 658px) and (min-width: 320px) {
    margin-right: 5px;
  }
`

export const DataOrder = styled.div`
  margin-right: 22px;
  @media (max-width: 1024px) {
    margin-right: none;
  }
`

export const SubTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`
export const StyledImage = styled.img`
  margin-left: 8px;
  width: 42px;
  height: 25.5px;
`
export const Date = styled.span`
  margin-left: 5px;
`

export const BadgeStyled = styled(Badge)`
  .ant-badge-count {
    font-size: 12px;
    left: -2px;
    right: auto;
    top: -7px;
    padding: 0px 5px;
    height: 17px;
    line-height: 18px;
  }
`

export const NoteDiv = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 10px;
  line-height: normal;
  color: ${RED};
  margin-left: 8px;
`

export const NoteIcon = styled(Icon)`
  color: ${BLUE};
  font-size: 25px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const InvoiceDiv = styled.div`
  margin-bottom: 40px;
`

export const InvoiceTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 12px;
  font-family: Avenir-Medium;
`

export const InvoiceSubtitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
`

export const InvoiceIcon = styled(Icon)`
  margin-right: 8px;
  color: ${BLUE};
`

export const DownloadInvoice = styled.div`
  position: absolute;
  right: 152px;
  top: 0;
  border: 1px solid ${RED};
  color: ${RED};
  padding: 5px 12px;
  text-align: center;
  height: 27px;
  font-size: 12px;
  border-radius: 3px;
  min-width: 143.38px;
  transition: all .25s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

export const DownloadIcon = styled(Icon)`
  margin-right: 10px;
`

export const SavingContainer = styled.div`
  position: absolute;
  width: 100%;
  background: #ffffffc9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 29;
`

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const DirectLogo = styled.img`
  height: 22px;
  margin-bottom: 12px;
  margin-left: 8px;
`

export const SummaryTitle = styled.div`
  font-weight: bold;
`

export const TotalLabel = styled.div`
  font-weight: ${({ bold }: DivProps) => bold ? 'bold' : 'unset'};
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${GRAY_LIGHT};
  &:last-child {
    border-bottom: none;
  }
`

export const PriceDiv = styled.div``
