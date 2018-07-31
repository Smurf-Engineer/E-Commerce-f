/**
 * DesignForm Component - Created by david on 12/07/18.
 */
import * as React from 'react'
import DesignItem from '../DesignItem'
import AntdButton from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import {
  Container,
  Title,
  Subtitle,
  Button,
  List,
  Input,
  TextRed,
  ImageInput,
  Types
} from './styledComponents'
import { UploadFile, DesignItem as DesignItemType } from '../../types/common'

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
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onUpdateName: (name: string) => void
}

interface State {
  isEditing: boolean
}

class DesignForm extends React.PureComponent<Props, State> {
  state = {
    isEditing: false
  }
  render() {
    const {
      title,
      itemName,
      subtitle,
      buttonLabel,
      items,
      selectedItem,
      onDeleteItem,
      withImageInput = false,
      themeImage,
      onDeleteImage
    } = this.props
    const { isEditing } = this.state

    const list = items.map(({ id, name }, index) => (
      <DesignItem
        key={index}
        selected={id === selectedItem}
        onSelectItem={this.handleOnSelectItem}
        {...{ id, name, onDeleteItem }}
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
        <Subtitle>{subtitle}</Subtitle>
        <List>{list}</List>
      </div>
    )

    // TODO: This will be temporary
    if (!withImageInput) {
      return (
        <Container>
          {!!list.length && <Title>{title}</Title>}
          {itemList}
        </Container>
      )
    }

    return (
      <Container>
        <Title>{title}</Title>
        <Button onClick={this.toogleIsEditing} type="ghost">
          <Icon type="plus" />
          {buttonLabel}
        </Button>
        {isEditing && (
          <div>
            <Subtitle>
              New {label} <TextRed>*</TextRed>
            </Subtitle>
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

  handleOnSelectItem = (id: number) => {
    const { onSelectItem } = this.props
    const { isEditing } = this.state
    if (isEditing) {
      this.toogleIsEditing()
    }
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
    onUpdateName(value)
  }

  beforeUpload = (file: UploadFile) => {
    const { onSelectImage = () => {} } = this.props
    onSelectImage(file)
    return false
  }
}

export default DesignForm
