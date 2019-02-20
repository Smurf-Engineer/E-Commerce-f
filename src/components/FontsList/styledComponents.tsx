/**
 * Styled Components - Created by david on 29/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  overflow: auto;
  height: 55vh;
  padding: 12px;
`

interface TextProps {
  font: string
}

export const Text = styled.div`
  color: #5f6062;
  font-family: ${({ font }: TextProps) => font};
  font-size: 30px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const FontName = styled.div`
  color: #5f6062;
  font-size: 16px;
  padding-top: 4px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const Item = styled.div`
  text-align: center;
  padding: 8px;
  margin-bottom: 34px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }

  -webkit-transition: background-color 200ms linear;
  -moz-transition: background-color 200ms linear;
  -o-transition: background-color 200ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;
`
