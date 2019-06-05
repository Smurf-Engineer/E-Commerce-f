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
import { quantities } from './constants'
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
    let USD = get(product, 'priceRange', [])
    if (USD) {
      USD = USD.filter(item => item.shortName === 'USD')
    }
    let GBP = get(product, 'priceRange', [])
    if (GBP) {
      GBP = GBP.filter(item => item.shortName === 'GBP')
    }
    let EUR = get(product, 'priceRange', [])
    if (EUR) {
      EUR = EUR.filter(item => item.shortName === 'EUR')
    }
    let CAD = get(product, 'priceRange', [])
    if (CAD) {
      CAD = CAD.filter(item => item.shortName === 'CAD')
    }
    let AUD = get(product, 'priceRange', [])
    if (AUD) {
      AUD = AUD.filter(item => item.shortName === 'AUD')
    }
    const currencies = [
      {
        label: 'USD',
        amounts: quantities.map(quantity =>
          find(USD, item => item.quantity === quantity)
        )
      },
      {
        label: 'GBP',
        amounts: quantities.map(quantity =>
          find(GBP, item => item.quantity === quantity)
        )
      },
      {
        label: 'EUR',
        amounts: quantities.map(quantity =>
          find(EUR, item => item.quantity === quantity)
        )
      },
      {
        label: 'CAD',
        amounts: quantities.map(quantity =>
          find(CAD, item => item.quantity === quantity)
        )
      },
      {
        label: 'AUD',
        amounts: quantities.map(quantity =>
          find(AUD, item => item.quantity === quantity)
        )
      }
    ]

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
          {quantities.map(quantity => (
            <InputDiv isFlex={true} flex={1}>
              <Label>{quantity}</Label>
            </InputDiv>
          ))}
        </RowInput>
        {currencies.map((currencyItem, index) => (
          <RowInput>
            <InputDiv left={true} isFlex={true} flex={1}>
              <Label>{currencyItem.label}</Label>
            </InputDiv>
            {currencyItem.amounts.map(amount => (
              <InputDiv isFlex={true} flex={1}>
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
    var lastChar = value[value.length - 1]
    const index = priceRange.findIndex(
      item => item.quantity === quantity && item.shortName === currency
    )

    const cleanValue = value.replace(/,/g, '')
    const filteredValue =
      lastChar === '.' ? cleanValue : parseFloat(cleanValue || 0)
    var regex = new RegExp(/^-?(\d+)[\.]?(\d{0,3})$/g)

    if (regex.test(filteredValue.toString())) {
      priceRange[index].price = filteredValue
      setValue('priceRange', priceRange)
      this.forceUpdate()
    }
  }
}

export default ThirdStep
