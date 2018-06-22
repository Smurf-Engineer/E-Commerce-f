/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  overflow: auto;
  padding-top: 16px;
`

export const Row = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
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
  object-fit: cover;
  cursor: pointer;
`

export const Text = styled.div`
  color: #fff;
`
