/**
 * Styled Components - Created by eduardoquintero on 30/12/19.
 */
import styled from 'styled-components'
import { GRAY_DARK, WHITE, RED } from '../../../theme/colors'

interface OvalProps {
  currentColor?: string
}

interface OvalSelected {
  selected: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

export const Text = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ currentColor }: OvalProps) =>
      currentColor && currentColor.toLowerCase() !== WHITE
        ? currentColor
        : GRAY};
  background-color: ${({ currentColor }: OvalProps) => currentColor || WHITE};
  align-self: center;
`

export const OvalSelected = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${({ selected }: OvalSelected) => (selected ? RED : WHITE)};
  align-self: center;
`
