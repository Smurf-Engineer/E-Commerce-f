/**
 * Styled Components - Created by miguelcanobbio on 28/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

type StyledProps = {
  listForMyAccount: boolean
}

export const Container = styled.div`
  width: 100%;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const MyCardsList = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const ButtonWrapper = styled.div`
  .ant-btn {
    background-color: #fff;
    border-color: ${({ listForMyAccount }: StyledProps) =>
      listForMyAccount ? '#e61737' : '#4A90E2'};
    color: ${({ listForMyAccount }) =>
      listForMyAccount ? '#e61737' : '#4A90E2'};
  }
  .ant-btn:hover {
    background-color: ${({ listForMyAccount }) =>
      listForMyAccount ? '#e61737' : '#4A90E2'};
    color: #fff;
  }
`

export const StyledEmptyButton = styled(Button)`
  border-radius: 0px;
  border-width: 2px;
  font-family: 'Avenir Next';
  font-size: 18px;
  height: 50px;
  margin-bottom: 24px;
`

export const DeleteConfirmMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
