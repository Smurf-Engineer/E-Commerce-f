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
  NextButtonContainer,
  LoadButton
} from './styledComponents'
import { DragDropContext } from 'react-dnd'
import {
  DesignItem as DesignItemType,
  Message,
  Theme
} from '../../../types/common'
import HTML5Backend from 'react-dnd-html5-backend'
import { DESIGN_PAGE, Sections } from '../constants'

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
  onSelectItem: (id: number, section: string) => void
  onDeleteItem: (id: number) => void
  onDropRow: (dragIndex: number, dropIndex: number) => void
  formatMessage: (messageDescriptor: Message) => string
  onAddNewTheme: (theme: Theme | null) => void
  goToPage: (page: number) => void
  toggleAddDesign: () => void
  loadDesign: () => void
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
      formatMessage,
      toggleAddDesign,
      loadDesign
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
        <Button
          onClick={
            section === Sections.Theme
              ? this.handleOnAddNewTheme
              : toggleAddDesign
          }
          type="ghost"
        >
          <Icon type="plus" />
          {buttonLabel}
        </Button>
        {itemList}
        {section === Sections.Theme && (
          <NextButtonContainer>
            <NextButton
              onClick={this.goToDesigns}
              type="primary"
              disabled={selectedItem < 0}
            >
              {formatMessage(messages.next)}
              <Icon type="right" />
            </NextButton>
          </NextButtonContainer>
        )}
        {section !== Sections.Theme && !!list.length && (
          <LoadButton
            onClick={loadDesign}
            type="primary"
            disabled={selectedItem < 0}
          >
            {formatMessage(messages.loadDesign)}
          </LoadButton>
        )}
      </Container>
    )
  }

  handleOnSelectItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSelectItem, section } = this.props
    const {
      target: { value }
    } = event

    const id = Number(value)
    onSelectItem(id, section)
  }
  handleOnAddNewTheme = () => {
    const { onAddNewTheme } = this.props
    const theme = { id: -1, name: '', image: '', itemOrder: 0, styles: [] }
    onAddNewTheme(theme)
  }
  goToDesigns = () => {
    const { goToPage } = this.props
    goToPage(DESIGN_PAGE)
  }
}

export default DragDropContext(HTML5Backend)(List)
