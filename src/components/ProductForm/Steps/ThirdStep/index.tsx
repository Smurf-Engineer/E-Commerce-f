/**
 * ThirdStep Component - Created by Apodaca on 16/05/19.
 */
import * as React from 'react'
import get from 'lodash/get'
import find from 'lodash/find'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  Separator,
  RowInput,
  Label,
  NumberInput,
  InputDiv
} from './styledComponents'
import { quantities, currencies } from './constants'
import {
  Product,
  ItemDetailType,
  FitStyle,
  ProductColors
} from '../../../../types/common'

interface Props {
  product: Product
  sizes: ItemDetailType[]
  colors: ProductColors[]
  fitStyles: FitStyle[]
  setValue: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}
export class ThirdStep extends React.Component<Props, {}> {
  render() {
    const { product } = this.props
    const priceRange = get(product, 'priceRange', [])
    const currenciesValues = currencies.reduce((acc: any[], currency) => {
      acc.push({
        label: currency,
        amounts: quantities.map(quantity =>
          find(
            priceRange,
            item => item.quantity === quantity && item.shortName === currency
          )
        )
      })
      return acc
      // tslint:disable-next-line: align
    }, [])
    return (
      <Container>
        <Separator>
          <FormattedMessage {...messages.title} />
        </Separator>
        <RowInput boldText={true} boldBorder={true}>
          <InputDiv left={true} isFlex={true} flex={1}>
            <Label>
              <FormattedMessage {...messages.currency} />
            </Label>
          </InputDiv>
          {quantities.map((quantity, index) => (
            <InputDiv isFlex={true} flex={1} key={index}>
              <Label>{quantity}</Label>
            </InputDiv>
          ))}
        </RowInput>
        {currenciesValues.map((currencyItem, index) => (
          <RowInput key={index}>
            <InputDiv left={true} isFlex={true} flex={1}>
              <Label>{currencyItem.label}</Label>
            </InputDiv>
            {currencyItem.amounts.map((amount: any, amountIndex: number) => (
              <InputDiv key={amountIndex} isFlex={true} flex={1}>
                <NumberInput
                  name={`${currencyItem.label}@${
                    amount ? amount.quantity : ''
                  }`}
                  size="large"
                  placeholder="$000"
                  value={amount ? this.formatCurrency(amount.price) : 0}
                  onChange={this.handleChangeValue}
                />
              </InputDiv>
            ))}
          </RowInput>
        ))}
      </Container>
    )
  }
  formatCurrency = (value: Number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  handleChangeValue = (event: any) => {
    const {
      setValue,
      product: { priceRange }
    } = this.props
    const name = get(event, 'target.name', '')
    const value = get(event, 'target.value', '')
    const parameters = name.split('@')
    const currency = parameters[0]
    const quantity = parameters[1]
    const lastChar = value[value.length - 1]
    const index = priceRange.findIndex(
      item => item.quantity === quantity && item.shortName === currency
    )

    const cleanValue = value.replace(/,/g, '')
    const filteredValue =
      lastChar === '.' ? cleanValue : parseFloat(cleanValue || 0)
    const regex = new RegExp(/^-?(\d+)[\.]?(\d{0,3})$/g)

    if (regex.test(filteredValue.toString())) {
      priceRange[index].price = filteredValue
      setValue('priceRange', priceRange)
    }
  }
}

export default ThirdStep
