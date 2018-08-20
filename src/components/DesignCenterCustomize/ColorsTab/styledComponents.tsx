/**
 * Styled Components - Created by david on 26/02/18.
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
  isFirstTab: boolean
}

export const TextColors = styled.div`
  color: #5f6062;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  margin-left: ${({ isFirstTab }: PageProps) => (isFirstTab ? '0' : '6px')};
`

export const Text = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin: 0px 8px;
`

export const StitchingList = styled.div`
  padding-top: 12px;
`
