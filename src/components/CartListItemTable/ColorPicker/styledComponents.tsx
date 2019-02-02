/**
 * Styled Components - Created by eduardo on 11/01/19.
 */
import styled from 'styled-components'

export const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  & .ant-tabs-tab {
    margin: 0;
  }
`

interface ColorProps {
  color?: string
  selected?: boolean
}

export const Color = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
  filter: brightness(
    ${({ selected }: ColorProps) => (selected ? '285%' : '100%')}
  );
  transform: scale(${({ selected }: ColorProps) => (selected ? '0.8' : '1')});
  transition: transform 0.3s ease-in-out;
`

export const Col = styled.div`
  display: inline-block;
  list-style: none;
  margin: 0 4px;
  text-align: center;
`

export const ColorModal = styled.div`
  text-align: center;
  overflow: overlay;
  display: flex;
  position: relative;
  transition: all 0.25s ease;
  flex-flow: row;
  background: white;
  padding: 8px;
  box-shadow: 0px 2px 6px -2px black;
  border-radius: 8px;
  margin-bottom: -70px;
  z-index: 2;
  opacity: ${({ selected }: ColorProps) => (selected ? '1' : '0')};
`
