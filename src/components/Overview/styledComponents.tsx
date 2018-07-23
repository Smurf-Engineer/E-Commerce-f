/**
 * Styled Components - Created by miguelcanobbio on 17/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 32px 80px 0;

  @media (max-width: 768px) and (min-width: 320px) {
    padding: 0 0 36px 0;
  }
`

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

interface ColumnProps {
  width?: string
}

export const Column = styled.div`
  width: ${({ width }: ColumnProps) => (width ? width : '32%')};
  display: flex;
  flex-direction: column;
`

export const EmptyContainer = styled.div`
  display: flex;
  height: 25vh;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`

export const EmptyMessage = styled.div`
  color: #bebebe;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.11px;
  text-align: center;
`
