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
  onPressDelete: (index: number) => void
}

class SimpleTable extends React.PureComponent<Props, {}> {
  render() {
    const { formatMessage, onPressDelete, headerTitles, data, targetGroup } = this.props

    const itemsSelected = data.map(
      (item: any, index: number) => (
        <Row
          {...{
            index,
            item,
            headerTitles,
            formatMessage,
            onPressDelete,
            targetGroup
          }}
          key={index}
        />
      )
    )

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
