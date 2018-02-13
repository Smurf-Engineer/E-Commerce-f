/**
 * PriceQuantity Component - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import { Container, Text, PriceLabel, QuantityLabel } from './styledComponents'

interface Props {
  price: number
  quantity: string
}

const PriceQuantity = (props: Props) => {
  const { price, quantity } = props
  return (
    <Container>
      <PriceLabel>{`$ ${price}`}</PriceLabel>
      <QuantityLabel>{`QTY. ${quantity}`}</QuantityLabel>
    </Container>
  )
}

export default PriceQuantity
