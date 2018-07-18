/**
 * Styled Components - Created by miguelcanobbio on 16/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 32px;
  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    align-items: center;
  }
`
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom 24px;
`

export const Row = styled.tr``

interface HeaderProps {
  textAlign?: string
}

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 0 8px 8px 8px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
    line-height: 15px;
  }
`

export const EmptyContainer = styled.div`
  widht: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EmptyMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`
