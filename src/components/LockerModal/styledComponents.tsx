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
  justify-content: center;
  width: 100%;
  align-items: center;

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

export const modalStyle = { top: 20, paddingBottom: '96px' }

export const bodyStyle = { padding: '12px' }

export const PaginationRow = styled.div`
  text-align: right;
  padding-right: 2%;
  margin-top: 10px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0;
    text-align: center;
  }
`

export const NotFound = styled.div`
  font-size: 18px;
`
