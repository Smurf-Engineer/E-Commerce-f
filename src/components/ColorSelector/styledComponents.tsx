/**
 * Styled Components - Created by eduardoquintero on 30/12/19.
 */
import styled from 'styled-components'
import { GRAY, RED, TRANSPARENT, WHITE } from '../../theme/colors'
import Check from '../../assets/Check.svg'

export const Container = styled.div`
  overflow: auto;
  padding: 7px 2px;
`

interface ColorProps {
  color: string
  selected?: boolean
}

export const Color = styled.div`
  position: relative;
  cursor: pointer;
  height: 32.28px;
  width: 32.28px;
  border: ${({ selected }: ColorProps) => selected ? '2px' : '1px'} solid;
  border-color: ${({ color, selected }: ColorProps) => selected ? RED : (color === WHITE ? GRAY : TRANSPARENT)};
  background-color: ${({ color }: ColorProps) => color};
  &::after {
    content: ${({ selected }: ColorProps) => selected ? `url(${Check})` : '""'};
    background: ${RED};
    width: 14px;
    height: 14px;
    position: absolute;
    top: -7px;
    right: -7px;
    display: ${({ selected }: ColorProps) => selected ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    border-radius: 7px;
  }
`

export const Row = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  margin: 0;
  padding: 0;
  justify-items: center;
`

export const Col = styled.li`
  list-style: none;
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  margin-bottom: 6px;
  &:nth-child(7n) {
    column-gap: 0px;
  }
`
