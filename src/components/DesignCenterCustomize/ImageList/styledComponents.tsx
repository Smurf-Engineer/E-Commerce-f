/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'
import {
  GRAY_LIGHTEST,
  WHITE,
  RED,
  GRAY,
  TRANSPARENT,
  GRAY_DARK
} from '../../../theme/colors'

export const Container = styled.div`
  height: 200px;
  overflow: auto;
  padding: 15px 32px 32px 32px;
  padding-top: 16px;

  @media (min-width: 768px) and (max-width: 991px) {
    height: 350px;
    padding: 5px 5px 0px;
  }
`
type RowProps = {
  selected: boolean
}

export const Row = styled.div`
  border: 1px solid
    ${({ selected }: RowProps) => (selected ? GRAY : TRANSPARENT)};
  display: flex;
  flex: 1;
  padding: 4px;

  @media (min-width: 768px) and (max-width: 991px) {
    flex-wrap: wrap;
  }
`

export const Col = styled.li`
  display: inline-block;
  height: 88px;
  list-style: none;
  margin-bottom: 6px;
  text-align: center;
  width: calc(100% / 3);
`

export const Image = styled.img`
  background-color: ${GRAY_LIGHTEST};
  cursor: pointer;
  height: 88px;
  object-fit: contain;
  width: 88px;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 100%;
  }
`

export const Text = styled.div`
  color: ${WHITE};
`
interface InfoProps {
  vector: boolean
}

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 24px;
  width: 70%;

  @media (min-width: 768px) and (max-width: 991px) {
    ${({ vector }: InfoProps) => (vector ? 'flex-direction: row' : '')};
    padding-left: 0px;
    width: 100%;
  }
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Size = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 10px;
  padding-bottom: 4px;
`

export const Delete = styled.div`
  color: ${RED};
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`
