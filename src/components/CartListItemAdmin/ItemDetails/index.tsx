/**
 * CartListItemAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import * as numeral from 'numeral'
import {
  ItemDetailsHeader,
  ItemDetailsHeaderName,
  ItemDetailsHeaderPrice,
  ItemDetailsHeaderNameDetail,
  ItemDetailsHeaderPriceDetail,
  NameContainer,
  PriceContainer,
  HeaderPriceDetailEmpty
} from './styledComponents'
import messages from '../../ProductInfo/messages'
import { FormattedMessage } from 'react-intl'

interface Props {
  title: string
  description: string
  designCode: string | undefined
  mpnCode: string
  symbol: string
  total: number
  onlyRead: boolean | undefined
  designId: string | undefined
  nextPrice: any
  unitaryPrice: number
  formatMessage: (messageDescriptor: any) => string
}

class ItemDetails extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      title,
      description,
      onlyRead,
      total,
      designCode,
      mpnCode,
      symbol,
      unitaryPrice,
      designId,
      nextPrice
    } = this.props
    return (
      <ItemDetailsHeader>
        <NameContainer>
          <ItemDetailsHeaderName>{title}</ItemDetailsHeaderName>
          <ItemDetailsHeaderNameDetail>
            {description}
          </ItemDetailsHeaderNameDetail>
          <div>{designCode || mpnCode}</div>
        </NameContainer>
        <PriceContainer>
          <ItemDetailsHeaderPrice>
            {`${symbol} ${numeral(total || 0).format('0,0.00')}`}
          </ItemDetailsHeaderPrice>
          <ItemDetailsHeaderPriceDetail>
            {`${formatMessage(messages.unitPrice)} ${symbol} ${numeral(
              unitaryPrice || 0
            ).format('0,0.00')}`}
          </ItemDetailsHeaderPriceDetail>
          {!onlyRead && designId && nextPrice.items > 0 ? (
            <ItemDetailsHeaderPriceDetail highlighted={true}>
              <FormattedMessage
                {...messages.addMoreFor}
                values={{
                  price: `${symbol}  ${numeral(nextPrice.price).format(
                    '0,0.00'
                  )}`,
                  products: nextPrice.items
                }}
              />
            </ItemDetailsHeaderPriceDetail>
          ) : (
            <HeaderPriceDetailEmpty />
          )}
        </PriceContainer>
      </ItemDetailsHeader>
    )
  }
}

export default ItemDetails
