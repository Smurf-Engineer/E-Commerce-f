/**
 * Row Component - Created by eduardoquintero on 21/11/19.
 */
import * as React from 'react'
import { TableRow, Cell, DeleteButton, Thumbnail } from '../styledComponents'
import moment from 'moment'
import messages from '../messages'
import { Message, Header } from '../../../types/common'
import { DATE, SIMPLE_DATE_FORMAT } from '../../../constants'

interface Props {
  index: number
  item: any
  headerTitles: Header[]
  targetGroup: string
  canDelete: boolean
  unread?: boolean
  clickable?: boolean
  onPressDelete: (index: number, section: string) => void
  formatMessage: (messageDescriptor: Message) => string
  onPressRow?: (notificationId: number, url: string) => void
}

class Row extends React.PureComponent<Props, {}> {
  render() {
    const {
      index,
      onPressDelete,
      formatMessage,
      item,
      headerTitles,
      targetGroup,
      canDelete,
      unread = false,
      clickable = false,
      onPressRow
    } = this.props

    const handleOnClick = () => {
      onPressDelete(index, targetGroup)
    }

    const handleOnClickRow = () => {
      if (onPressRow && clickable) {
        onPressRow(item.id, item.url)
      }
    }
    return (
      <div>
        <TableRow className={clickable && 'clickable'} onClick={handleOnClickRow}>
          {headerTitles.map(
            (header, rowIndex) => {
              const currentItem = item[header.fieldName] || item
              const value = header.dataType === DATE ? moment(currentItem).format(SIMPLE_DATE_FORMAT) : currentItem

              return header.fieldName ? (
                <Cell
                  key={rowIndex}
                  width={header.tabletWidth}
                  className={unread && header.fieldName === 'message' && 'unread'}
                >
                  {header.fieldName !== 'image' ? (
                    value
                  ) : (
                      <Thumbnail src={currentItem} />
                    )}
                </Cell>
              ) :
                <Cell key={rowIndex} width={header.tabletWidth} className={unread && 'badge'} />
            }
          )}
          {canDelete && <Cell>
            <DeleteButton onClick={handleOnClick}>
              {formatMessage(messages.delete)}
            </DeleteButton>
          </Cell>}
        </TableRow>
      </div>
    )
  }
}

export default Row
