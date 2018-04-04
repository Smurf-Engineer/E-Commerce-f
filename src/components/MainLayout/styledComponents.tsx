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

export const Footer = styled.div`
  background: #231f20;
  padding: 24px 50px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 16px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 24px;
  }
`
