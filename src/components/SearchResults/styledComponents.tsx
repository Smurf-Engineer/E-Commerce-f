/**
 * Styled Components - Created by cazarez on 14/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px 34px 44px 32px;
  background-color: #fff;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  line-height: 23px;
`

export const CloseImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
