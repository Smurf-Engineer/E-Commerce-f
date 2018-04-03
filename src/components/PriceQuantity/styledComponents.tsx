/**
 * Styled Components - Created by cazarez on 08/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`
export const AvailablePrices = styled.div`
  margin-right: 26px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 5px;
  }
`

export const PriceLabel = styled.div`
  height: 25px;

  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 16px;
  }
`
export const QuantityLabel = styled.div`
  height: 16px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
`
