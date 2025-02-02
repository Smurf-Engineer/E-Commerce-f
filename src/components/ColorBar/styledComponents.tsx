/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'
import { GRAY_LIGHT } from '../../theme/colors'

type StyledProps = {
  color?: string
  highlightFields?: boolean
  small?: boolean
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  border: 1px solid ${GRAY_LIGHT};
`

export const ColorContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`

export const ColorLabel = styled.div`
  position: absolute;
  top: 44px;
  font-size: ${({ small }: StyledProps) => small ? '8px' : '12px'};
  
  @media (max-width: 767px) {
    font-size: 8px;
  }
`

export const Color = styled.div`
  width: 100%;
  background-color: ${({ color }: StyledProps) => color || 'none'};
`

export const Text = styled.div`
  flex: 1;
`

export const LegendText = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`