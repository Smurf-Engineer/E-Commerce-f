/**
 * SimpleTable Component - Created by eduardoquintero on 21/11/19.
 */
import * as React from 'react'
import messsages from './messages'
import { Table, HeaderRow, Cell, Title } from './styledComponents'

import { Message, User } from '../../types/common'
import Row from './Row'

interface Header {
  message: string
  width?: number
  tabletWidth?: number
}

const headerTitles: Header[] = [
  { message: 'clientId', width: 25, tabletWidth: 20 },
  { message: 'name', width: 40, tabletWidth: 40 },
  { message: 'email', width: 20, tabletWidth: 20 },
  { message: '', width: 15, tabletWidth: 15 }
]

interface Props {
  formatMessage: (messageDescriptor: Message) => string
  users: User[]
  onPressDelete: (index: number) => void
}

class SimpleTable extends React.PureComponent<Props, {}> {
  render() {
    const { formatMessage, users, onPressDelete } = this.props

    const itemsSelected = users.map(
      ({ email, name, netsuiteId = '' }: User, index) => (
        <Row
          {...{
            index,
            name,
            email,
            formatMessage,
            onPressDelete
          }}
          userId={netsuiteId}
          key={index}
        />
      )
    )

    const renderTable = users.length > 0 && itemsSelected
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

export default SimpleTable
