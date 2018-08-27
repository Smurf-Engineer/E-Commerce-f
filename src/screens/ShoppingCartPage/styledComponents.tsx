/**
 * Styled Components - Created by gustavomedina on 02/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { GREEN, RED, GRAY_DARK, GRAY_LIGHT, BLUE } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: #fff;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    min-height: 0px;
  }
`

export const EmptyContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #fff;
`

export const PageContent = styled.div`
  background-color: #fff;
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
`

export const EmptyItems = styled.div`
  margin-top: 40px;
`

export const SideBar = styled.div`
  width: 20%;
  padding-left: 15px;
  padding-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const AddOneMoreMessage = styled.div`
  color: ${GREEN};
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  margin-bottom: 8px;
`

export const EmptyTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const StyledEmptyButton = styled(Button)`
  border-radius: 0px;
  width: 100%;
  height: 50px;
  border-color: ${RED};
  background-color: #fff;
`

export const EmptyDescription = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
`

export const OptionMenu = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding-top: 8px;
`

export const Content = styled.div`
  width: 80%;
  padding-left: 36px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`

export const SummaryTitle = styled.div`
  color: ${GRAY_DARK};
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
  border: 1px solid ${GRAY_LIGHT};
  margin-bottom: 10px;
`

export const CodeDivider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  border: 1px solid ${GRAY_LIGHT};
  margin-bottom: 0;
`

export const OrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const TotalOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-transform: uppercase;
  padding-top: 36px;
  padding-left: 36px;
  padding-bottom: 36px;
  background-color: #fff;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 20px 0 41px 7px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding-left: 15px;
  }
`

export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

interface ButtonWrapperProps {
  disabled: boolean
}

const disabledBorder = '#D9D9D9'
const disabledBackground = '#F5F5F5'

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  .ant-btn-primary {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
    disabled ? disabledBackground : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
    disabled ? disabledBorder : BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
    disabled ? disabledBackground : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
    disabled ? disabledBorder : BLUE};
  }
`

export const CheckoutButton = styled(Button)`
  height: 40px;
  width: 100%;
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

export const CollapseWrapper = styled.div`
  margin-bottom: 10px;
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: #5f6062;
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
    padding: 0;
  }
`

export const CartList = styled.ul`
  padding: 0;
  height: 100%;
`

export const menuStyle = { width: '100%', marginLeft: -24, paddingTop: 52 }

export const DeleteConfirmMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const OptionalLabel = styled.span`
  color: #5f6062;
  font-size: 16px;
  font-style: italic;
  letter-spacing: 0.25px;
  line-height: 22px;
  font-weight: normal;
`

export const ProReviewTitle = styled.div`
  margin-top: 25px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const PleaseReadLabel = styled.div`
  margin: 16px 0 0;
  color: #e61737;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const ProDesignReviewContent = styled.div`
  margin: 40px 0 55px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;

  .additional-charge-note {
    color: #e61737;
    font-style: italic;
  }

  ul,
  ul > li {
    list-style: none;
    padding-left: 0;
  }
`

export const ModalButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 25px;
  grid-template-areas: '. review continue';

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'review' 'continue';
  }
`

export const ContinueButton = styled(Button)`
  grid-area: continue;
  border-color: #e61737;
  color: #e61737;
  height: 50px;
  width: 220px;
  font-size: 16px;

  @media (max-width: 550px) {
    width: 100%;
  }
`

export const ReviewButton = styled(Button)`
  grid-area: review;
  height: 50px;
  width: 220px;
  font-size: 16px;
  font-weight: 300;

  @media (max-width: 550px) {
    width: 100%;
  }
`
