/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  list-style: none;
  display: inline-block;
  width: calc(100% / 2);
  margin-bottom: 25px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: calc(95% / 2);
    margin-left: 0;
  }
`

export const Footer = styled.div`
  padding: 4px;
`

export const QuickView = styled.img``

export const Type = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const Description = styled.div`
  user-select: none;
  color: #8c8c8c;
  font-size: 12px;
  line-height: 16px;
  padding 2px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const InfoContainer = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Date = styled.div`
  user-select: none;
  color: #5f6062;
  font-size: 12px;
  line-height: 16px;
`
