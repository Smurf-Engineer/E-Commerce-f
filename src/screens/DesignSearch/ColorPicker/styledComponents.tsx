/**
 * Styled Components - Created by eduardo on 11/01/19.
 */
import styled from 'styled-components'
import { WHITE, RED, GRAY } from '../../../theme/colors'

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

export const Color = styled.div`
  background-color: ${({ color }: ColorProps) => color};
  border: 1px solid
    ${({ color }: ColorProps) =>
      color && color.toUpperCase() !== WHITE ? 'transparent' : GRAY};
  cursor: pointer;
  width: 32px;
  height: 32px;
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
