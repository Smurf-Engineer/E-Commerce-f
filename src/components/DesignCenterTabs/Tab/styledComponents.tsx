/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled, { keyframes } from 'styled-components'
import AntdDivider from 'antd/lib/divider'

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
`

interface SelectedProps {
  selected: boolean
}

export const Tab = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;
  background-color: ${({ selected }: SelectedProps) =>
    selected ? '#e61737' : '#fff'};
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ selected }: SelectedProps) =>
      selected ? '#e61737' : '#fafafa'};
  }
`

export const Text = styled.div`
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
  color: ${({ selected }: SelectedProps) => (selected ? '#fff' : '#e61737')};
`

export const Divider = styled(AntdDivider)`
  height: 40px;
  margin: 0px;
`
