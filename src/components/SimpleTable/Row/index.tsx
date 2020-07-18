/**
 * Row Component - Created by eduardoquintero on 21/11/19.
 */
import * as React from 'react'
import { TableRow, Cell, DeleteButton, Thumbnail } from '../styledComponents'
import messages from '../messages'
import { Message, Header } from '../../../types/common'

interface Props {
  index: number
  item: any
  headerTitles: Header[]
  targetGroup: string
  onPressDelete: (index: number, section: string) => void
  formatMessage: (messageDescriptor: Message) => string
}

class Row extends React.PureComponent<Props, {}> {
  render() {
    const {
      index,
      onPressDelete,
      formatMessage,
      item,
      headerTitles,
      targetGroup
    } = this.props

    const handleOnClick = () => {
      onPressDelete(index, targetGroup)
    }

    return (
      <div>
        <TableRow>
          {headerTitles.map(
            (header) =>
              header.fieldName && (
                <Cell width={header.tabletWidth}>
                  {header.fieldName !== 'image' ? (
                    item[header.fieldName] || item
                  ) : (
                    <Thumbnail src={item[header.fieldName]} />
                  )}
                </Cell>
              )
          )}
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
