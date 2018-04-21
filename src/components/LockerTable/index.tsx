/**
 * LockerTable Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import messsages from './messages'
import { Table, HeaderRow, Cell, Title } from './styledComponents'
import findIndex from 'lodash/findIndex'
import { DesignType, PriceRange } from '../../types/common'
import Product from './ProductRow'

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: '', width: 40 },
  { message: 'starting' },
  { message: 'target' },
  { message: 'orders' },
  { message: 'current' },
  { message: 'visible', width: 20 }
]

interface Props {
  formatMessage: (messageDescriptor: any) => string
  items: DesignType[]
  teamSizeRange: string
  onPressDelete: (index: number) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
}

class LockerTable extends React.PureComponent<Props, {}> {
  getTierPrice = (prices: PriceRange[], range = '2-5'): number => {
    const index = findIndex(prices, ({ quantity }) => quantity === range)
    return prices[index] ? prices[index].price : 0
  }

  render() {
    const {
      formatMessage,
      items,
      onPressDelete,
      onPressQuickView,
      onPressVisible,
      teamSizeRange
    } = this.props
    const header = headerTitles.map(({ width, message }, key) => (
      <Cell {...{ key, width }}>
        <Title>{message ? formatMessage(messsages[message]) : ''}</Title>
      </Cell>
    ))

    const itemsSelected = items.map(
      (
        {
          image,
          name,
          visible,
          product: { type, description, id: productId, yotpoId, priceRange }
        },
        index
      ) => {
        const startingPrice = this.getTierPrice(priceRange)
        const targetPrice = this.getTierPrice(priceRange, teamSizeRange)

        return (
          <Product
            {...{
              index,
              image,
              name,
              description,
              productId,
              startingPrice,
              targetPrice,
              onPressDelete,
              onPressQuickView,
              onPressVisible,
              yotpoId
            }}
            key={index}
            description={`${type} ${description}`}
            currentOrders={0} // TODO: Get from the query
            currentPrice={startingPrice}
            visible={!!visible}
          />
        )
      }
    )

    return (
      <Table>
        <HeaderRow>{header}</HeaderRow>
        {itemsSelected}
      </Table>
    )
  }
}

export default LockerTable
