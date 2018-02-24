/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

interface HeaderProps {
  hideBottom?: boolean
}

export const Header = styled.div`
  background: #ffffff;
  padding: 0px;
  height: ${({ hideBottom }: HeaderProps) => (hideBottom ? 38 : 110)};
  line-height: 0px;
`
