/**
 * Styled Components - Created by david on 06/04/18.
 */
import styled from 'styled-components'

export const Footer = styled.div`
  padding: 4px;
`

export const Type = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;
  text-align: start;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Description = styled.div`
  user-select: none;
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  padding 2px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;
  text-align: start;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Bottom = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Label = styled.div`
  user-select: none;
  color: #5f6062;
  padding 4px 0px;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  text-align: start;
`

export const Price = styled.div`
  user-select: none;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`

export const Delete = styled.div`
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
`

export const Private = styled.span`
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
`
