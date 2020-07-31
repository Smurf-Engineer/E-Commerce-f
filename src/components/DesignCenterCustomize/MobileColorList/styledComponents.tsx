/**
 * Styled Components - Created by eduardo on 21/12/18.
 */
import styled from 'styled-components'
import { WHITE, RED, GRAY } from '../../../theme/colors'
import { ACCESSORY_TRANSPARENT } from '../../../constants'
import transparentGrid from '../../../assets/transparent_grid.png'

export const Container = styled.div`
  overflow: auto;
`

export const Dot = styled.div`
  background-color: ${WHITE};
  height: 6px;
  width: 6px;
`

interface ColorProps {
  color?: string
  selected?: boolean
}

interface ColorSliderProps {
  totalWidth: number
}
export const Color = styled.div`
background: ${({ color }: ColorProps) => color === ACCESSORY_TRANSPARENT ?
    `url(${transparentGrid})` : (color || WHITE)};
  border: 1px solid
    ${({ color }: ColorProps) =>
    color && color.toUpperCase() !== WHITE ? 'transparent' : GRAY};
  cursor: pointer;
  width: 32px;
  height: 32px;
  transform: scale(${({ selected }: ColorProps) => (selected ? '0.8' : '1')});
  transition: transform 0.3s ease;
`

export const Border = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  border: 2px solid
    ${({ selected }: ColorProps) => (selected ? RED : 'transparent')};
  margin-left: 12px;
  transition: all 0.3s ease;
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
  display: flex;
  -webkit-overflow-scrolling: touch;
  width: ${({ totalWidth }: ColorSliderProps) => totalWidth};
  );
`
