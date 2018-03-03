/**
 * Styled Components - Created by cazarez on 02/03/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const Span = styled.a`
  text-decoration: none;
  position: relative;
  color: #fff;
  :hover {
    color: #fff;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    border-bottom: 1px solid #e61737;
    transition: 0.4s;
  }
  &:hover:after {
    width: 100%;
  }
`
