/**
 * LockerTable Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import messsages from './messages'
import {
  Table,
  HeaderRow,
  Cell,
  Title,
  MobileEmtpytable
} from './styledComponents'
import findIndex from 'lodash/findIndex'
import MediaQuery from 'react-responsive'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { PriceRange, LockerTableType } from '../../types/common'
import Product from './ProductRow'

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: '', width: 40 },
  { message: 'visible', width: 20 }
]

interface Props {
  formatMessage: (messageDescriptor: any) => string
  items: LockerTableType[]
  teamSizeRange: string
  onPressDelete: (index: number) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
  onMoveRow: (index: number, hoverIndex: number, row: any) => void
}

class LockerTable extends React.PureComponent<Props, {}> {
  getTierPrice = (prices: PriceRange[], range = '2-5'): number => {
    const index = findIndex(prices, ({ quantity }) => quantity === range)
    return index < 0 ? prices[prices.length - 1].price : prices[index].price
  }

  moveRow = (dragIndex: number, hoverIndex: number) => {
    const { items, onMoveRow } = this.props
    const dragRow = items[dragIndex]
    onMoveRow(dragIndex, hoverIndex, dragRow)
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

    const header = (
      <MediaQuery minDeviceWidth={480}>
        {matches => {
          if (matches) {
            const head = headerTitles.map(({ width, message }, key) => (
              <Cell {...{ key, width }}>
                <Title>
                  {message ? formatMessage(messsages[message]) : ''}
                </Title>
              </Cell>
            ))
            return head
          } else {
            return null
          }
        }}
      </MediaQuery>
    )

    const itemsSelected = items.map(
      ({ design, visible, totalOrders }: LockerTableType, index) => {
        const name = get(design, 'name')
        const product = get(design, 'product')
        const pricesArray = get(product, 'priceRange')
        const startingPrice = this.getTierPrice(pricesArray)
        const targetPrice = this.getTierPrice(pricesArray, teamSizeRange)
        const image = get(design, 'image')
        const description =
          get(product, 'shortDescription', false) || get(product, 'description')
        const productId = get(product, 'id')
        const yotpoId = get(product, 'yotpoId')
        const type = get(product, 'type')
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
              yotpoId,
              totalOrders,
              formatMessage
            }}
            key={index}
            description={`${type} ${description}`}
            currentOrders={totalOrders}
            currentPrice={startingPrice}
            visible={visible}
            moveRow={this.moveRow}
          />
        )
      }
    )

    const renderTable =
      items.length > 0 ? (
        itemsSelected
      ) : (
        <MediaQuery maxDeviceWidth={480}>
          <MobileEmtpytable>There are no items in your store</MobileEmtpytable>
        </MediaQuery>
      )
    return (
      <Table>
        <HeaderRow>{header}</HeaderRow>
        {renderTable}
      </Table>
    )
  }
}

export default DragDropContext(HTML5Backend)(LockerTable)
