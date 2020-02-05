/**
 * Styled Components - Created by eduardoquintero on 21/01/20.
 */
import styled from 'styled-components'
import { GRAY_LIGHTEST, GRAY_DARK, RED, BLACK } from '../../../theme/colors'

export const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  background: ${GRAY_LIGHTEST};
`

export const Container = styled.div`
  height: 270px;
  @media (min-width: 481px) {
    justify-content: center;
    width: 50%;
  }

  @media (min-width: 698px) {
    width: calc(100% / 3);
  }

  @media (min-width: 769px) {
    width: 50%;
  }

  @media (min-width: 990px) {
    padding-bottom: 20px;
    width: 33%;
  }

  @media (min-width: 1260px) {
    width: 25%;
  }
`

export const FileName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  font-size: 14px;
  color: ${GRAY_DARK};
  margin: 5px 0;
  font-weight: 600;
`

export const Actions = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Delete = styled.span`
  cursor: pointer;
  color: ${RED};
`

export const Download = styled.span`
  cursor: pointer;
`

export const Link = styled.a`
  color: ${GRAY_DARK};
  &:hover {
    color: ${BLACK};
  }
`
