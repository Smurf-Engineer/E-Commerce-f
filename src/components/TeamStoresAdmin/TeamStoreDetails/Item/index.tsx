/**
 * RowItem Component - Created by eduardoquintero on 29/07/19.
 */
import * as React from 'react'
import {
  Container,
  Cell,
  Thumbnail,
  HorizontalWrapper,
  VerticalWrapper,
  HeavyText,
  RegularText,
  StyledInput
} from './styledComponents'
import find from 'lodash/find'
import get from 'lodash/get'
import { Currency, PriceRange } from '../../../../types/common'

const quantities = ['Personal', '2-5', '6-24', '25-49', '50-99', '100-249']

interface Props {
  thumbnail: string
  designName: string
  productName: string
  productType: string
  currencies: Currency[]
  index: number
  priceRange: PriceRange[]
  pricesByQuantity: any
  handleOnSetPrice: (
    value: string,
    currency: string,
    itemIndex: number,
    currencyIndex: number
  ) => void
}

const RowItem = ({
  thumbnail,
  designName,
  productName,
  productType,
  currencies,
  priceRange,
  handleOnSetPrice,
  index,
  pricesByQuantity
}: Props) => {
  const inputFields = currencies.map(
    ({ shortName, id: currencyId }, currencyIndex: number) => {
      console.log('prices ', priceRange)
      const onSetPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id: inputId } = event.target
        handleOnSetPrice(value, inputId, index, currencyIndex)
      }
      const price = get(
        find(
          pricesByQuantity[quantities[0]],
          (quantity: any) => quantity.short_name === shortName
        ),
        'price',
        ''
      )
      return (
        <Cell key={currencyId}>
          <StyledInput
            id={shortName}
            placeholder={shortName}
            onChange={onSetPrice}
            value={price}
          />
        </Cell>
      )
    }
  )
  return (
    <Container>
      <Cell>
        <HorizontalWrapper>
          <Thumbnail src={thumbnail} />
          <VerticalWrapper>
            <HeavyText>{designName}</HeavyText>
            <RegularText>{productName}</RegularText>
            <RegularText>{productType}</RegularText>
          </VerticalWrapper>
        </HorizontalWrapper>
      </Cell>
      {inputFields}
    </Container>
  )
}

export default RowItem
