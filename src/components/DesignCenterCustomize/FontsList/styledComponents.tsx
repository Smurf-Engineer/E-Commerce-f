/**
 * Styled Components - Created by david on 29/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

interface TextProps {
  font: string
}

export const Text = styled.div`
  color: #5f6062;
  font-family: ${({ font }: TextProps) => font};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
`
