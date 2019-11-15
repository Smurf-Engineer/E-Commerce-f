/**
 * LockerSimpleTable Component - Created by eduardoquintero on 11/11/19.
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
import MediaQuery from 'react-responsive'

import { LockerTableType } from '../../types/common'
import Product from './ProductRow'

interface Header {
  message: string
  width?: number
  tabletWidth?: number
}

const headerTitles: Header[] = [
  { message: '', width: 20, tabletWidth: 20 },
  { message: 'name', width: 40, tabletWidth: 65 },
  { message: '', width: 15, tabletWidth: 15 }
]

interface Props {
  formatMessage: (messageDescriptor: any) => string
  items: LockerTableType[]
  hideQuickView?: boolean
  onPressDelete: (index: number) => void
}

class LockerSimpleTable extends React.PureComponent<Props, {}> {
  render() {
    const { formatMessage, items, hideQuickView, onPressDelete } = this.props

    const itemsSelected = items.map(
      ({ design, visible, totalOrders }: LockerTableType, index) => {
        const name = get(design, 'name')
        const product = get(design, 'product')

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
              hideQuickView,
              productId,
              onPressDelete,
              yotpoId,
              totalOrders,
              formatMessage
            }}
            key={index}
            description={`${type} ${description}`}
            currentOrders={totalOrders}
            visible={visible}
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
        <HeaderRow>
          {headerTitles.map(({ width, tabletWidth, message }, key) => (
            <Cell {...{ key, width, tabletWidth }}>
              <Title>{message ? formatMessage(messsages[message]) : ''}</Title>
            </Cell>
          ))}
        </HeaderRow>
        {renderTable}
      </Table>
    )
  }
}

export default LockerSimpleTable
