/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import { WHITE, RED, GRAY } from '../../../theme/colors'

interface ContainerProps {
  height: number
}

export const Container = styled.div`
  height: ${({ height }: ContainerProps) => height}vh;
  overflow: auto;
  padding: 0px 32px 32px 32px;

  @media (min-height: 800px) {
    height: 50vh;
  }
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

export const Color = styled.div`
  background-color: ${({ color }: ColorProps) => color};
  border: 1px solid ${({ selected }: ColorProps) => (selected ? RED : GRAY)};
  cursor: pointer;
  width: 32.28px;
  height: 32.28px;
`

export const Row = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  width: 100%;
`

export const Col = styled.li`
  display: inline-block;
  height: 32px;
  list-style: none;
  margin-bottom: 6px;
  text-align: center;
  width: calc(100% / 7);

  @media (min-width: 768px) and (max-width: 991px) {
    width: 25%;
  }
`
