/**
 * Styled Components - Created by miguelcanobbio on 17/08/18.
 */
import styled from 'styled-components'
import { GRAY_DARK, WHITE, GRAY } from '../../../theme/colors'

export const Container = styled.div`
  padding: 4px 0;
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
  margin-bottom: 18px;
`

export const ColorLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  margin-right: 8px;
`

export const Stitching = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

interface OvalProps {
  color?: string
}

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: OvalProps) =>
      color && color.toLowerCase() !== WHITE.toLowerCase() ? color : GRAY};
  background-color: ${({ color }: OvalProps) => color || WHITE};
  align-self: center;
`

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-flow: column;
`

export const Color = styled.div`
  min-height: 30px;
  height: 100%;
  width: 30px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-right: 10px;
  border: 1px solid
    ${({ color }: OvalProps) =>
    color && color.toLowerCase() !== WHITE.toLowerCase() ? color : GRAY};
  background-color: ${({ color }: OvalProps) => color || WHITE};
  align-self: center;
`

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 18px;
  transition: all .25s;
  align-items: center;
  box-shadow: 1px 1px 5px -2px #585858;
  margin-bottom: 14px;
  border-radius: 5px;
  padding-right: 8px;
  min-width: 148px;
`
export const ColorName = styled.p`
  margin: 0;
  font-size: 11px;
  text-align: center;
  word-break: break-all;
  width: calc(100% - 40px);
  text-transform: uppercase;
`