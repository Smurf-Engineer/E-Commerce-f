/**
 * Styled Components - Created by eduardoquintero on 30/12/19.
 */
import styled from 'styled-components'
import { GRAY, WHITE } from '../../../theme/colors'

export const Container = styled.div`
  overflow: auto;
  padding: 0px 32px;
`

export const Dot = styled.div`
  height: 6px;
  width: 6px;
  background-color: ${WHITE};
`

interface ColorProps {
  color: string
}

export const Color = styled.div`
  cursor: pointer;
  height: 32.28px;
  width: 32.28px;
  border: 1px solid ${GRAY};
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
