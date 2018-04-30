/**
 * Styled Components - Created by david on 12/04/18.
 */
import styled from 'styled-components'

interface TitleProps {
  align: string
}

interface AlignProps {
  align?: string
  componentWidth?: string
}

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const HeaderRow = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: #8c8c8c;
  border-bottom-style: solid;
  padding-bottom: 4px;
`
export const Title = styled.div`
  width: 58px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`
export const Align = styled.div`
  user-select: none;
  width: ${({ componentWidth }: AlignProps) =>
    componentWidth ? componentWidth : 'auto'};
  text-align: ${({ align }: AlignProps) => (align ? align : 'center')};
`
