/**
 * Styled Components - Created by Jesús Apodaca on 04/12/19.
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
  font-weight: bold;
  background-color: #eff2f4;
`

export const Row = styled.div`
  display: flex;
  flex-direction: ${({ isFirstPage }: PageProps) =>
    isFirstPage ? 'row' : 'row-reverse'};
  align-items: center;
  cursor: pointer;
`

export const Text = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin: 0px 8px;
`

export const ArrowIcon = styled.img``

export const TabsContainer = styled.div`
  text-align: center;
`
