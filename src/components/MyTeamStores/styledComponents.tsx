/**
 * Styled Components - Created by cazarez on 14/05/18.
 */
import styled, { keyframes } from 'styled-components'
import Button from 'antd/lib/button'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  margin-top: 15px;
  opacity: 0;
  animation: ${fadeIn} 0.6s cubic-bezier(0.67, 0.35, 0.565, 1) both;
`

export const Text = styled.div`
  color: #fff;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 22px;
`

export const ResellerIcon = styled.img`
  max-width: 344px;
  margin-left: -8px;
  object-fit: cover;
  margin-top: -52px;
  margin-bottom: 14px;
  @media (max-width: 767px) {
    max-width: 264px;
  }
`

export const AddTeamStoreButton = styled(Button)`
  height: 50px;
  border: 2px solid #e61737;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e61737;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const PaginationRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
`

export const CreateTeamStoreLegend = styled.div`
  max-width: 658px;
  color: #5f6062;
  font-size: 15px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 24px 0;

  @media (max-width: 480px) {
    width: auto;
    height: auto;
  }
`

export const DeleteConfirmMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
