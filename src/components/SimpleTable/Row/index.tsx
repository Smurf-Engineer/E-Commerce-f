/**
 * Row Component - Created by eduardoquintero on 21/11/19.
 */
import * as React from 'react'
import { TableRow, Cell, DeleteButton, Thumbnail, MarkLabel } from '../styledComponents'
import moment from 'moment'
import messages from '../messages'
import { Message, Header } from '../../../types/common'
import { DATE } from '../../../constants'

interface Props {
  index: number
  item: any
  headerTitles: Header[]
  targetGroup: string
  canDelete: boolean
  unread?: boolean
  clickable?: boolean
  markAsRead?: (notificationId: number) => void
  onPressDelete: (index: number, section: string) => void
  formatMessage: (messageDescriptor: Message) => string
  onPressRow?: (notificationId: number, url: string) => void
}

class Row extends React.PureComponent<Props, {}> {
  render() {
    const {
      onPressDelete,
      formatMessage,
      item,
      headerTitles,
      markAsRead,
      targetGroup,
      canDelete,
      unread = false,
      clickable = false,
      onPressRow
    } = this.props

    const handleOnClick = (event: React.MouseEvent<EventTarget>) => {
      if (event) {
        event.stopPropagation()
      }
      onPressDelete(item.id, targetGroup)
    }

    const handleOnClickRow = () => {
      if (onPressRow && clickable) {
        onPressRow(item.id, item.url)
      }
    }

    const handleClickRead = (event: React.MouseEvent<EventTarget>) => {
      if (event) {
        event.stopPropagation()
      }
      if (markAsRead && item.id) {
        markAsRead(item.id)
      }
    }

    return (
      <div>
        <TableRow className={clickable && 'clickable'} onClick={handleOnClickRow}>
          {headerTitles.map(
            (header, rowIndex) => {
              const currentItem = item[header.fieldName] || item
              const value = header.dataType === DATE ? moment(currentItem).format('MM/DD/YYYY HH:mm') : currentItem

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
          <Cell>
            <MarkLabel onClick={handleClickRead}>
              {formatMessage(messages.markRead)}
            </MarkLabel>
          </Cell>
          {canDelete && <Cell>
            <DeleteButton type="delete" onClick={handleOnClick}>
              {formatMessage(messages.delete)}
            </DeleteButton>
          </Cell>}
        </TableRow>
      </div>
    )
  }
}

export default Row
