/**
 * Styled Components - Created by gustavomedina on 02/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: #fff;
  min-height: calc(100vh - 200px);
`

export const EmptyContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #fff;
`

export const EmptyItems = styled.div`
  margin-top: 40px;
`

export const SideBar = styled.div`
  width: 20%;
  padding-left: 32px;
  padding-right: 20px;
`

export const EmptyTitle = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
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
  border-color: #e61737;
  background-color: #fff;
`

export const EmptyDescription = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
`

export const OptionMenu = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding-top: 8px;
`

export const Content = styled.div`
  width: 80%;
  padding-left: 36px;
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

export const TotalOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;

  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-transform: uppercase;
  padding-top: 36px;
  padding-left: 36px;
  background-color: #fff;
`

export const ScreenTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
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

export const InputWrapper = styled.div`
  .ant-input {
    margin-bottom: 26px;
    height: 40px;
    border-radius: 0;
    color: #bebebe;
    font-family: 'Avenir Next';
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

export const menuStyle = { width: '100%', marginLeft: -24, paddingTop: 52 }
