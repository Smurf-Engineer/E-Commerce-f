/**
 * Styled Components - Created by david on 09/04/18.
 */
import styled from 'styled-components'

interface ContainerProps {
  selected: boolean
}

export const Container = styled.div`
  padding: 16px 0px;
  width: 166px;
  border: ${({ selected }: ContainerProps) =>
    selected ? '0.5px solid #e61737' : '0.5px solid #dcdcdc'};
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  cursor: pointer;

  &:hover {
    box-shadow: ${({ selected }: ContainerProps) =>
      selected
        ? '0 1px 4px 0 rgba(0, 0, 0, 0.07)'
        : '0 8px 14px rgba(0, 0, 0, 0.07), 0 5px 5px rgba(0, 0, 0, 0.22)'};
  }
`

export const Text = styled.div`
  user-select: none;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  postition: absolute;
`
