/**
 * CartListItemTable Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import messages from './messages'
import { Table, HeaderRow, Cell, Title } from './styledComponents'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: 'gender' },
  { message: 'size' },
  { message: 'fit' },
  { message: 'label' },
  { message: 'quantity' },
  { message: '', width: 10 }
]

class CartListItemTable extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    const header = (
      <MediaQuery minDeviceWidth={480}>
        {matches => {
          if (matches) {
            const head = headerTitles.map(({ width, message }, key) => (
              <Cell {...{ key, width }}>
                <Title>
                  {/* {message ? 'hola' : ''}{' '} */}
                  {message ? formatMessage(messages[message]) : ''}
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
    return (
      <Table>
        <HeaderRow>{header}</HeaderRow>
      </Table>
    )
  }
}

export default CartListItemTable
