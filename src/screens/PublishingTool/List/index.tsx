/**
 * List - Created by eduardoquintero on 09/12/19.
 */

import * as React from 'react'
import Item from '../Item'
import AntdButton from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import Group from 'antd/lib/radio/group'
import {
  Container,
  Title,
  Button,
  ListContainer,
  Input,
  TextRed,
  ImageInput,
  Types
} from './styledComponents'
import { DragDropContext } from 'react-dnd'
import {
  UploadFile,
  DesignItem as DesignItemType,
  Message
} from '../../../types/common'
import HTML5Backend from 'react-dnd-html5-backend'

const NONE = -1

interface Props {
  themeImage?: UploadFile[]
  title: string
  subtitle: string
  buttonLabel: string
  items: DesignItemType[]
  disableList?: boolean
  selectedItem: number
  isNewItem?: boolean
  withImageInput?: boolean
  itemName: string
  editable?: boolean
  section: string
  onEditItem?: (id: number) => void
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onUpdateName?: (name: string) => void
  onDropRow: (dragIndex: number, dropIndex: number) => void
  formatMessage: (messageDescriptor: Message) => string
}

interface State {
  isEditing: boolean
}

class List extends React.PureComponent<Props, State> {
  state = {
    isEditing: false
  }
  render() {
    const {
      itemName,
      subtitle,
      buttonLabel,
      items,
      selectedItem,
      onEditItem,
      onDeleteItem,
      withImageInput = false,
      themeImage,
      onDeleteImage,
      editable,
      onDropRow,
      section,
      formatMessage
    } = this.props
    const { isEditing } = this.state

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

    const imageComponent = withImageInput && (
      <ImageInput>
        <Upload
          listType="picture"
          fileList={themeImage}
          multiple={false}
          supportServerRender={true}
          beforeUpload={this.beforeUpload}
          onRemove={onDeleteImage}
        >
          <AntdButton>
            <Icon type="upload" /> Click to Upload
          </AntdButton>
        </Upload>
        <Types>302 x 302 px. Files jpg, jpeg, png.</Types>
      </ImageInput>
    )
    const label = withImageInput ? 'Theme' : 'Design'

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
        <Button onClick={this.toogleIsEditing} type="ghost">
          <Icon type="plus" />
          {buttonLabel}
        </Button>
        {isEditing && (
          <div>
            <Title>
              New {label} <TextRed>*</TextRed>
            </Title>
            <Input
              value={itemName}
              onChange={this.handleOnUpdateName}
              placeholder={`${label} Name`}
            />
            {imageComponent}
          </div>
        )}
        {itemList}
      </Container>
    )
  }

  handleOnSelectItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSelectItem } = this.props
    console.log(event.target)
    const {
      target: { value }
    } = event
    const { isEditing } = this.state
    if (isEditing) {
      this.toogleIsEditing()
    }
    const id = Number(value)
    onSelectItem(id)
  }

  toogleIsEditing = () => {
    this.setState(({ isEditing }) => {
      if (!isEditing) {
        const { onSelectItem } = this.props
        onSelectItem(NONE)
      }
      return { isEditing: !isEditing }
    })
  }

  handleOnUpdateName = (evt: React.FormEvent<HTMLInputElement>) => {
    const { onUpdateName } = this.props
    const {
      currentTarget: { value }
    } = evt
    if (onUpdateName) {
      onUpdateName(value)
    }
  }

  beforeUpload = (file: UploadFile) => {
    const { onSelectImage = () => {} } = this.props
    onSelectImage(file)
    return false
  }

  handleOnDropRow = (dragIndex: number, dropIndex: number) => {
    const { onDropRow } = this.props
    onDropRow(dragIndex, dropIndex)
  }
}

export default DragDropContext(HTML5Backend)(List)
