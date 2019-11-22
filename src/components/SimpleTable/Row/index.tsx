/**
 * Row Component - Created by eduardoquintero on 21/11/19.
 */
import * as React from 'react'
import { TableRow, Cell, DeleteButton } from '../styledComponents'
import messages from '../messages'
import { Message } from '../../../types/common'

interface Props {
  index: number
  name: string
  userId: string
  email: string
  onPressDelete: (index: number, section: string) => void
  formatMessage: (messageDescriptor: Message) => string
}

class Row extends React.PureComponent<Props, {}> {
  render() {
    const {
      index,
      name,
      userId,
      email,
      onPressDelete,
      formatMessage
    } = this.props

    const handleOnClick = () => {
      onPressDelete(index, 'selectedUsers')
    }

    return (
      <div>
        <TableRow>
          <Cell width={20}>{userId}</Cell>
          <Cell width={40}>{name}</Cell>
          <Cell width={20}>{email}</Cell>
          <Cell>
            <DeleteButton onClick={handleOnClick}>
              {formatMessage(messages.delete)}
            </DeleteButton>
          </Cell>
        </TableRow>
      </div>
    )
  }
}

export default Row
