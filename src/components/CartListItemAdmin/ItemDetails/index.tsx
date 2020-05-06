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
  HeaderPriceDetailEmpty,
  WarningIcon
} from './styledComponents'
import messages from '../../ProductInfo/messages'
import { Message } from '../../../types/common'

interface Props {
  title: string
  description: string
  designCode: string | undefined
  mpnCode: string
  symbol: string
  preflightCheck: boolean
  total: number
  teamStoreName?: string
  unitaryPrice: number
  formatMessage: (messageDescriptor: Message, params?: MessageParams) => string
}

interface MessageParams {
  symbol?: string
  price?: string
  teamStoreName?: string
}
class ItemDetails extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      title,
      description,
      total,
      designCode,
      mpnCode,
      teamStoreName,
      preflightCheck,
      symbol,
      unitaryPrice
    } = this.props
    return (
      <ItemDetailsHeader>
        <NameContainer>
          <ItemDetailsHeaderName>
            {title}
            {!preflightCheck && <WarningIcon type="warning" theme="filled" />}
          </ItemDetailsHeaderName>
          <ItemDetailsHeaderNameDetail>
            {description}
          </ItemDetailsHeaderNameDetail>
          {!!teamStoreName && <ItemDetailsHeaderNameDetail>
            {formatMessage(messages.from, { teamStoreName })}
          </ItemDetailsHeaderNameDetail>}
          <div>{designCode || mpnCode}</div>
        </NameContainer>
        <PriceContainer>
          <ItemDetailsHeaderPrice>
            {`${symbol} ${numeral(total || 0).format('0,0.00')}`}
          </ItemDetailsHeaderPrice>
          <ItemDetailsHeaderPriceDetail>
            {formatMessage(messages.unitPrice, {
              symbol,
              price: numeral(unitaryPrice || 0).format('0,0.00')
            })}
          </ItemDetailsHeaderPriceDetail>
          <HeaderPriceDetailEmpty />
        </PriceContainer>
      </ItemDetailsHeader>
    )
  }
}

export default ItemDetails
