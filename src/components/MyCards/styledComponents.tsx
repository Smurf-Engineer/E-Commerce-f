/**
 * Styled Components - Created by miguelcanobbio on 28/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

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

export const StyledEmptyButton = styled(Button)`
  border-radius: 0px;
  width: 25%;
  height: 50px;
  border-color: #e61737;
  border-width: 2px;
  background-color: #fff;
  margin-bottom: 24px;
  font-size: 18px;
`

export const DeleteConfirmMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
