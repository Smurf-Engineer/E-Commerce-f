/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'

interface ContainerProps {
  height: number
}

export const Container = styled.div`
  overflow: auto;
  height: ${({ height }: ContainerProps) => height}vh;
  padding: 0px 32px 32px 32px;

  @media (min-height: 800px) {
    height: 50vh;
  }
`

export const Dot = styled.div`
  height: 6px;
  width: 6px;
  background-color: #ffffff;
`

interface ColorProps {
  color: string
  selected?: boolean
}

export const Color = styled.div`
  cursor: pointer;
  height: 32.28px;
  width: 32.28px;
  border: 1px solid
    ${({ selected }: ColorProps) => (selected ? '#E61737' : '#bebebe')};
  background-color: ${({ color }: ColorProps) => color};
`

export const Row = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
`

export const Col = styled.li`
  list-style: none;
  display: inline-block;
  width: calc(100% / 7);
  height: 32px;
  text-align: center;
  margin-bottom: 6px;
`
