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
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 64px;

  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
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
