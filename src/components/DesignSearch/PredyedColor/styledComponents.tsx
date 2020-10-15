/**
 * Styled Components - Created by miguelcanobbio on 17/08/18.
 */
import styled from 'styled-components'
import { PREDYED_TRANSPARENT } from '../../../constants'
import { GRAY_DARK, WHITE } from '../../../theme/colors'
import transparentGrid from '../../../assets/transparent_grid.png'

interface OvalProps {
  color?: string
  isPredyed?: boolean
}

export const Container = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-right: 16px;
`

export const ColorWheel = styled.img`
  height: 30px;
  width: 30px;
  align-self: center;
  &:hover {
    cursor: pointer;
  }
`

export const ColorLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-transform: capitalize;
  text-align: right;
  margin-right: 8px;
`

export const Stitching = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${({ color }: OvalProps) => color === PREDYED_TRANSPARENT ?
    `url(${transparentGrid})` : (color || WHITE)};
  align-self: center;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
`
