/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

const HEADER_TOP_SIZE = 72
const HEADER_BOTTOM_SIZE = 38
const HEADER_MAX_SIZE = 110

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

interface HeaderProps {
  hideTop?: Boolean
  hideBottom?: boolean
}

const HEADER_HEIGHT = ({ hideTop, hideBottom }: HeaderProps) => {
  let height = HEADER_MAX_SIZE
  if (hideTop) {
    height -= HEADER_TOP_SIZE
  }
  if (hideBottom) {
    height -= HEADER_BOTTOM_SIZE
  }
  return height
}

export const Header = styled.div`
  background: #ffffff;
  padding: 0px;
  height: ${HEADER_HEIGHT};
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

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 24px;
  }
`
