/**
 * Styled Components - Created by eduardo on 11/01/19.
 */
import styled from 'styled-components'
import { WHITE, RED, GRAY } from '../../../theme/colors'
import { WHITE as WHITE_TEXT } from '../../../screens/DesignCenter/constants'
import { PREDYED_TRANSPARENT } from '../../../constants'
import transparentGrid from '../../../assets/transparent_grid.png'

export const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & .ant-tabs-tab {
    margin: 0;
  }
`

interface ColorProps {
  color?: string
  selected?: boolean
}

export const ColorWheel = styled.img`
  cursor: pointer;
  width: 34px;
  height: 34px;
  padding-bottom: 2px;
  border-radius: 50%;
  transform: scale(${({ selected }: ColorProps) => (selected ? '0.8' : '1')});
  transition: transform 0.3s ease-in-out;
`

export const Color = styled.div`
  border: 1px solid
    ${({ color }: ColorProps) =>
      color && (color.toUpperCase() !== WHITE && color !== WHITE_TEXT)
        ? 'transparent'
        : GRAY};
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: ${({ color }: ColorProps) => color === PREDYED_TRANSPARENT ?
    `url(${transparentGrid})` : (color || WHITE)};
  transform: scale(${({ selected }: ColorProps) => (selected ? '0.8' : '1')});
  transition: transform 0.3s ease-in-out;
`

export const Border = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  border: 2px solid
    ${({ selected }: ColorProps) => (selected ? RED : 'transparent')};
`

export const Col = styled.div`
  display: inline-block;
  list-style: none;
  margin-bottom: 6px;
  text-align: center;
`
