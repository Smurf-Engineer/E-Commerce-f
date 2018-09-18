/**
 * Styled Components - Created by david on 10/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

export const List = styled.div`
  padding-top: 22px;
  height: 70vh;
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 320px) and (max-width: 480px) {
    height: auto;
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ErrorTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const modalStyle = { top: 20 }