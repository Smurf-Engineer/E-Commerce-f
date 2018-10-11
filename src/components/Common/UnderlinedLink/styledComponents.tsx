/**
 * Styled Components - Created by cazarez on 02/03/18.
 */
import styled, { css } from 'styled-components'
import { WHITE, RED } from '../../../theme/colors'

const BaseStyle = css`
  cursor: pointer;
  text-decoration: none;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    border-bottom: 1px solid ${RED};
    transition: 0.4s;
  }
  &:hover:after {
    width: 100%;
  }
  :hover {
    color: ${WHITE};
  }
`

export const StyledA = styled.a`
  color: ${WHITE};
  ${BaseStyle}
`
export const StyledSpan = styled.span`
  ${BaseStyle}
  a {
    color: ${WHITE};
  }
`
