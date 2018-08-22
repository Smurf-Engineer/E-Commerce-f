/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 16px;
  overflow: auto;
  padding: 15px 32px 32px 32px;
  height: 200px;
`

export const Row = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: 8px;
`

export const Col = styled.li`
  list-style: none;
  display: inline-block;
  width: calc(100% / 3);
  height: 88px;
  text-align: center;
  margin-bottom: 6px;
`

export const Image = styled.img`
  height: 88px;
  width: 88px;
  object-fit: contain;
  background-color: #f1f4f5;
  cursor: pointer;
`

export const Text = styled.div`
  color: #fff;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-left: 24px;
  justify-content: space-between;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Size = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 10px;
  padding-bottom: 4px;
`

export const Delete = styled.div`
  color: #e61737;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  cursor: pointer;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`
