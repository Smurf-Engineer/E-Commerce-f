/**
 * List - Created by eduardoquintero on 09/12/19.
 */

import * as React from 'react'
import Item from '../Item'
import messages from './messages'
import Icon from 'antd/lib/icon'
import Group from 'antd/lib/radio/group'
import {
  Container,
  Title,
  Button,
  ListContainer,
  NextButton,
  NextButtonContainer
} from './styledComponents'
import { DragDropContext } from 'react-dnd'
import {
  DesignItem as DesignItemType,
  Message,
  Theme
} from '../../../types/common'
import HTML5Backend from 'react-dnd-html5-backend'

interface Props {
  subtitle: string
  buttonLabel: string
  items: DesignItemType[]
  disableList?: boolean
  selectedItem: number
  isNewItem?: boolean
  withImageInput?: boolean
  editable?: boolean
  section: string
  onEditItem?: (id: number) => void
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  onDropRow: (dragIndex: number, dropIndex: number) => void
  formatMessage: (messageDescriptor: Message) => string
  onAddNewTheme: (theme: Theme | null) => void
}

class List extends React.PureComponent<Props> {
  render() {
    const {
      subtitle,
      buttonLabel,
      items,
      selectedItem,
      onEditItem,
      onDeleteItem,
      withImageInput = false,
      editable,
      onDropRow,
      section,
      formatMessage
    } = this.props

    const list = items.map(({ id, name }, index) => (
      <Item
        key={index}
        selected={id === selectedItem}
        onDropRow={onDropRow}
        onSelectItem={this.handleOnSelectItem}
        {...{
          id,
          name,
          onDeleteItem,
          editable,
          onEditItem,
          index,
          section,
          formatMessage
        }}
      />
    ))

    const itemList = !!list.length && (
      <div>
        <Title>{subtitle}</Title>
        <ListContainer>
          <Group
            onChange={this.handleOnSelectItem}
            value={selectedItem}
            className={'radioGroup'}
          >
            {list}
          </Group>
        </ListContainer>
      </div>
    )

    if (!withImageInput) {
      return <Container>{itemList}</Container>
    }
    return (
      <Container>
        <Button onClick={this.handleOnAddNewTheme} type="ghost">
          <Icon type="plus" />
          {buttonLabel}
        </Button>
        {itemList}
        <NextButtonContainer>
          <NextButton type="primary" disabled={selectedItem < 0}>
            {formatMessage(messages.next)}
            <Icon type="right" />
          </NextButton>
        </NextButtonContainer>
      </Container>
    )
  }

  handleOnSelectItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSelectItem } = this.props
    const {
      target: { value }
    } = event

    const id = Number(value)
    onSelectItem(id)
  }

  handleOnDropRow = (dragIndex: number, dropIndex: number) => {
    const { onDropRow } = this.props
    onDropRow(dragIndex, dropIndex)
  }
  handleOnAddNewTheme = () => {
    const { onAddNewTheme } = this.props
    const theme = { id: -1, name: '', image: '', itemOrder: 0, styles: [] }
    onAddNewTheme(theme)
  }
}

export default DragDropContext(HTML5Backend)(List)
