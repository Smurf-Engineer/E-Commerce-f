/**
 * Styled Components - Created by david on 20/02/18.
 */
import styled from 'styled-components'
import Divider from 'antd/lib/divider'

export const Container = styled.div``

export const Label = styled.div`
  text-align: center;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  margin-bottom: 13px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface TextProps {
  selected: boolean
}

export const Text = styled.div`
  color: ${({ selected }: TextProps) => (selected ? '#e61737' : ' #5f6062')};
  text-align: center;
  cursor: pointer;
  font-family: 'Avenir Next';
  font-size: 18px;
  line-height: 25px;
  padding: 0px 10px;
`

export const LineVertical = styled(Divider)`
  height: 20px;
`
