/**
 * Styled Components - Created by cazarez on 11/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  margin-top: 42px;
  flex-flow: column;
  align-items: center;
  flex-wrap: wrap;
`

export const Text = styled.div`
  color: #fff;
`

export const ListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1382px;
  @media (max-width: 1375px) {
    justify-content: center;
  }
`

export const PaginationRow = styled.div`
  margin-top: 24px;
`

export const LoadingContainer = styled.div`
  height: 256px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TeamStoreContainer = styled.div`
  width: auto;
  @media (max-width: 480px) {
    width: 100%;
  }
`

export const Notfound = styled.div`
  height: 45px;
  width: 100%;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
`
