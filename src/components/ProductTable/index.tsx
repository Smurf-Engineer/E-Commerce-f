/**
 * ProductTable Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import get from 'lodash/get'
import messsages from './messages'
import { Table, HeaderRow, Cell, Title } from './styledComponents'
import findIndex from 'lodash/findIndex'
import MediaQuery from 'react-responsive'

import {
  PriceRange,
  LockerTableType,
  ProductTableType
} from '../../types/common'
import Product from './ProductRow'

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: '', width: 15 },
  { message: 'name', width: 20 },
  { message: 'mpn', width: 20 },
  { message: 'productCode', width: 20 },
  { message: 'productType', width: 15 }
]

interface Props {
  formatMessage: (messageDescriptor: any) => string
  items: LockerTableType[]
  teamSizeRange: string
  onPressDelete: (id: number) => void
  onPressVisible: (index: number, checked: boolean) => void
  onMoveRow: (index: number, hoverIndex: number, row: any) => void
}

class ProductTable extends React.PureComponent<Props, {}> {
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
    const { formatMessage, items, onPressDelete, onPressVisible } = this.props

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

    const itemsSelected = items.map(({ product }: ProductTableType, index) => {
      const name = get(product, 'name')
      const id = get(product, 'id')
      const image = get(product, 'images[0].front')
      const code = get(product, 'code')
      const mpn = get(product, 'mpn')
      const description =
        get(product, 'shortDescription', false) || get(product, 'description')
      const type = get(product, 'type')
      return (
        <Product
          {...{
            id,
            index,
            image,
            name,
            description,
            productId: product.id,
            onPressDelete,
            onPressVisible,
            formatMessage,
            code,
            mpn,
            type
          }}
          key={index}
          moveRow={this.moveRow}
        />
      )
    })

    return (
      <Table>
        <HeaderRow>{header}</HeaderRow>
        {itemsSelected}
      </Table>
    )
  }
}

export default ProductTable
