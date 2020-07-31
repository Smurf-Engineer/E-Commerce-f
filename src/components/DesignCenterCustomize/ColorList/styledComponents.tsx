/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import Divider from 'antd/lib/divider'
import { WHITE, RED, GRAY } from '../../../theme/colors'
import transparentGrid from '../../../assets/transparent_grid.png'
import { PREDYED_TRANSPARENT } from '../../../constants'

interface ContainerProps {
  height: number
  wide?: boolean
}

export const Container = styled.div`
  height: ${({ height, wide }: ContainerProps) =>
    wide ? 'auto' : `${height}vh`};
  padding: ${({ wide }: ContainerProps) =>
    wide ? '32px 32px 0 38px;' : '0px 32px 32px 32px'};
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
  background: ${({ color }: ColorProps) => color === PREDYED_TRANSPARENT ?
    `url(${transparentGrid})` : (color || WHITE)};
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

export const ColorTitle = styled.p`
  margin: 0;
  font-weight: 600;
`
export const SyledDivider = styled(Divider)`
  margin: 5px 0;
`
