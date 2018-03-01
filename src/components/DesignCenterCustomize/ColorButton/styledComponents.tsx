/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'

interface OvalProps {
  currentColor?: string
}

interface OvalSelected {
  selected: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  margin-top: 12px;
`

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ currentColor }: OvalProps) =>
      currentColor && currentColor !== '#FFFFFF' ? currentColor : '#bebebe'};
  background-color: ${({ currentColor }: OvalProps) => currentColor || '#fff'};
  align-self: center;
`

export const OvalSelected = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid
    ${({ selected }: OvalSelected) => (selected ? '#E61737' : '#fff')};
  align-self: center;
`
