/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding-right: 0 15px;
  display: grid;
  grid-column-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

  @media (min-width: 426px) and (max-width: 768px) {
    padding-right: 0 12px;
    grid-column-gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 320px) and (max-width: 425px) {
    grid-template-columns: 100%;
  }
`

export const WrapperPalette = styled.div`
  width: 400px;
  @media (min-width: 426px) and (max-width: 768px) {
    width: 300px;
  }

  @media (min-width: 320px) and (max-width: 425px) {
    width: 100%;
  }
`

export const EmptyContainer = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EmptyMessage = styled.div`
  color: #bebebe;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 21px;
  text-align: center;
`
