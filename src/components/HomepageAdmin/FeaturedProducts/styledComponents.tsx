/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  margin-bottom: 30px;
  width: 100%;
`

export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const AddProductButton = styled(Button)`
  height: 50px;
  border: 2px solid #e61737;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e61737;
  margin-right: 22px;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`
