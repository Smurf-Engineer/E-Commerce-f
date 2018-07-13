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
import { UploadFile } from '../../types/common'

interface Props {
  themeImage?: UploadFile[]
  title: string
  subtitle: string
  buttonLabel: string
  items: string[]
  disableList?: boolean
  selectedItem: number
  isNewItem: boolean
  withImageInput?: boolean
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: (file: UploadFile) => void
}

class DesignForm extends React.PureComponent<Props, {}> {
  render() {
    const {
      title,
      subtitle,
      buttonLabel,
      items,
      selectedItem,
      onSelectItem,
      onDeleteItem,
      isNewItem,
      withImageInput = false,
      themeImage,
      onDeleteImage
    } = this.props

    const list = items.map((name, index) => (
      <DesignItem
        id={index}
        key={index}
        selected={index === selectedItem}
        {...{ name, onSelectItem, onDeleteItem }}
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
    const label = withImageInput ? 'Theme' : 'Style'

    return (
      <Container>
        <Title>{title}</Title>
        <Button type="ghost">
          <Icon type="plus" />
          {buttonLabel}
        </Button>
        {isNewItem && (
          <div>
            <Subtitle>
              New {label} <TextRed>*</TextRed>
            </Subtitle>
            <Input placeholder={`${label} Name`} />
            {imageComponent}
          </div>
        )}
        <Subtitle>{subtitle}</Subtitle>
        <List>{list}</List>
      </Container>
    )
  }

  beforeUpload = (file: UploadFile) => {
    const { onSelectImage = () => {} } = this.props
    onSelectImage(file)
    return false
  }
}

export default DesignForm
