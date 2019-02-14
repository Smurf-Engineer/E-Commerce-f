/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'

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
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`

export const Text = styled.div`
  color: #5f6062;
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

export const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 8px;
`

export const Icon = styled(icon)`
  margin-right: 8px;
`
