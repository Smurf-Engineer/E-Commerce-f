/**
 * Styled Components - Created by cazarez on 08/02/18.
 */
import styled from 'styled-components'
interface StyleProps {
  priceColor?: string
}
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
  color: ${({ priceColor }: StyleProps) =>
    priceColor ? priceColor : '#5f6062'};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;

  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 16px;
  }
`
export const QuantityLabel = styled.div`
  color: #5f6062;
  font-size: 12px;
  line-height: 16px;
`
