/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;

  &:hover {
    color: #e61737;
  }
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 64px;
  margin-top: 48px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`
