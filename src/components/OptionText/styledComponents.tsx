/**
 * Styled Components - Created by david on 17/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  margin: 0px 32px;
  padding: 12px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`

export const Title = styled.div`
  user-select: none;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`
export const Option = styled.div`
  user-select: none;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  text-align: right;
`

interface CircleProps {
  color: string
}

export const Circle = styled.div`
  user-select: none;
  height: 30px;
  width: 30px;
  border: 1px solid #bebebe;
  margin-left: 8px;
  background-color: ${({ color }: CircleProps) => color};
  border-radius: 50%;
`

export const Row = styled.div`
  user-select: none;
  padding-left: 12px;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const Icon = styled.img`
  user-select: none;
  padding-left: 12px;
`
