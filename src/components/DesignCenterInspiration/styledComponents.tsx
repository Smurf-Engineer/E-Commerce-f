/**
 * Styled Components - Created by gustavomedina on 23/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;
  background-color: #fff;
  align-items: center;
`

export const EmptyContainer = styled.div`
  display: flex;
  height: 25vh;
  justify-content: center;
  align-items: center;
`

export const EmptyMessage = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`
