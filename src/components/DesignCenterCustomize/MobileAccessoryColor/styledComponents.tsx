/**
 * Styled Components - Created by eduardo on 21/12/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 4px 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Colors = styled.div`
  display: flex;
  align-items: center;
`

interface OvalProps {
  color?: string
  selected?: boolean
}

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: OvalProps) =>
      color && color.toLowerCase() !== '#ffffff' ? color : '#bebebe'};
  background-color: ${({ color }: OvalProps) => color || '#fff'};
  align-self: center;
  cursor: pointer;
`

export const OvalSelected = styled.div`
  height: 34px;
  width: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid
    ${({ selected }: OvalProps) => (selected ? '#E61737' : '#fff')};
  margin-left: 8px;
  align-self: center;
`
