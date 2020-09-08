/**
 * SimpleTable Component - Created by eduardoquintero on 21/11/19.
 */
import * as React from 'react'
import messsages from './messages'
import { Table, HeaderRow, Cell, Title } from './styledComponents'

import { Message, User, Header } from '../../types/common'
import Row from './Row'

interface Props {
  formatMessage: (messageDescriptor: Message) => string
  users: User[]
  data: any
  headerTitles: Header[]
  targetGroup: string
  canDelete?: boolean
  notifications?: boolean
  onPressDelete: (index: number) => void
  onPressRow?: (notificationId: number, url: string) => void
}

class SimpleTable extends React.PureComponent<Props, {}> {
  render() {
    const {
      formatMessage,
      onPressDelete,
      headerTitles,
      data,
      targetGroup,
      canDelete = true,
      notifications = false,
      onPressRow,
    } = this.props

    const itemsSelected = data.map((item: any, index: number) => (
      <Row
        {...{
          index,
          item,
          headerTitles,
          formatMessage,
          onPressDelete,
          targetGroup,
          canDelete,
          onPressRow
        }}
        key={index}
        unread={notifications && !item.read}
        clickable={notifications}
      />
    ))

    const renderTable = data.length > 0 && itemsSelected
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
