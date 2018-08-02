/**
 * Styled Components - Created by miguelcanobbio on 31/07/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'

export const Container = styled.div``

export const Arrow = styled(Icon)`
  color: #5f6062;
  font-size: 16px;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
  background-color: #eff2f4;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`
interface PageProps {
  isFirstPage: boolean
}

export const TextColors = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  margin-left: ${({ isFirstPage }: PageProps) => (isFirstPage ? '0' : '6px')};
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  margin: 0px 8px;
`

export const StitchingList = styled.div`
  padding-top: 12px;
`
