/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'

interface PageProps {
  isFirstPage: boolean
}

export const Container = styled.div``

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
  background-color: #eff2f4;
`

export const Row = styled.div`
  display: flex;
  flex-direction: ${({ isFirstPage }: PageProps) =>
    isFirstPage ? 'row' : 'row-reverse'};
  align-items: center;
  cursor: pointer;
`

export const TextColors = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  margin: 0px 8px;
`

export const ArrowIcon = styled.img``

export const ColorButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 4px;
`
