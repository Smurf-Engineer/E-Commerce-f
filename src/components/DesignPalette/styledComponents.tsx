/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const ColorButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`

export const Name = styled.div`
  color: #5f6062;
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
`

export const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  align-items: center;
`

interface OvalProps {
  currentColor?: string
}

export const Oval = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 1px solid;
  ${({ currentColor }: OvalProps) =>
    currentColor && currentColor.toLowerCase() !== '#ffffff'
      ? currentColor
      : '#bebebe'};
  background-color: ${({ currentColor }: OvalProps) => currentColor || '#fff'};
  align-self: center;
`

export const Image = styled.img`
  margin: 0 8px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  background-color: #f1f4f5;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`
