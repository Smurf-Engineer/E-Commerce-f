/**
 * Styled Components - Created by eduardo on 21/12/18.
 */
import styled from 'styled-components'
import { WHITE, RED } from '../../../theme/colors'

export const Container = styled.div`
  overflow: auto;
`

export const Dot = styled.div`
  background-color: ${WHITE};
  height: 6px;
  width: 6px;
`

interface ColorProps {
  color: string
  selected?: boolean
}

interface ColorSliderProps {
  totalColors: number
}
export const Color = styled.div`
  background-color: ${({ color }: ColorProps) => color};
  border: 1px solid
    ${({ color, selected }: ColorProps) =>
      selected
        ? RED
        : color && color.toLowerCase() !== '#ffffff'
        ? 'transparent'
        : '#bebebe'};
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-left: 12px;
`

export const Col = styled.div`
  display: inline-block;
  height: 32px;
  list-style: none;
  margin-bottom: 6px;
  text-align: center;
`

export const ColorSlider = styled.div`
  margin-top: 10px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  white-space: nowrap;
  width: calc(
    (${({ totalColors }: ColorSliderProps) => totalColors} * 44px) + 12px
  );
  &:-webkit-scrollbar {
    display: none;
  }
`
