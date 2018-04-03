/**
 * PriceQuantity Component - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import { Container, PriceLabel, QuantityLabel } from './styledComponents'

interface Props {
  price: number
  quantity: string
  index: number
}

const PriceQuantity = ({ price, quantity, index }: Props) => {
  return (
    <Container>
      <PriceLabel>{`$ ${price}`}</PriceLabel>
      <QuantityLabel>{`${quantity} ${index > 0 ? 'pcs' : ''}`}</QuantityLabel>
    </Container>
  )
}

export default PriceQuantity
