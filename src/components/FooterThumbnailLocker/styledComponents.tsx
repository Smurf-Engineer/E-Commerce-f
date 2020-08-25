/**
 * Styled Components - Created by david on 06/04/18.
 */
import styled from 'styled-components'

export const Footer = styled.div`
  padding: 4px;
`

export const Type = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Description = styled.div`
  color: #8c8c8c;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const Label = styled.div`
  color: #5f6062;
  padding 4px 0px;
  font-size: 12px;
  line-height: 16px;
  text-align: start;
`

export const Price = styled.div`
  color: #5f6062;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`

export const Delete = styled.div`
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
`

export const Private = styled.span`
  color: #8c8c8c;
  font-size: 12px;
  line-height: 16px;
`

export const ActionButton = styled.div`
  line-height: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: #4a90e2;
`

export const ShareContainer = styled.div`
  text-align: right;
`
