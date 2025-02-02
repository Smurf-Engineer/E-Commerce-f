/**
 * ThemeModal Component - Created by david on 29/11/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import messages from './messages'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import set from 'lodash/set'
import { Theme, Message } from '../../types/common'
import Upload from 'antd/lib/upload'
import { compose, graphql } from 'react-apollo'
import {
  Container,
  Image,
  Info,
  DraggerContainer,
  SaveButtonStyle,
  DisableSaveStyle
} from './styledComponents'
import { uploadThemeImage } from '../../screens/DesignerTool/api'
import { upsertThemeMutation } from './data'
import { getProductFromCode } from '../../screens/PublishingTool/Themes/data'

const { Dragger } = Upload

const NEW_THEME = -1

interface Props {
  theme: Theme | null
  productCode: number
  onCancel: () => void
  onUpdateName: (name: string) => void
  upsertTheme: (variables: {}) => Promise<Theme>
  formatMessage: (messageDescriptor: Message, params?: any) => string
}

interface State {
  file: any
  update: boolean
  loading: boolean
  imagePreview: string
}

class ThemeModal extends React.PureComponent<Props, State> {
  state = {
    file: null,
    update: false,
    loading: false,
    imagePreview: ''
  }
  render() {
    const { theme, formatMessage } = this.props
    const { imagePreview, loading } = this.state
    const open = !!theme
    let content = null
    if (open) {
      content = (
        <Container>
          <Info>
            <Input value={theme!.name} onChange={this.handleOnUpdateName} />
            <DraggerContainer>
              <Dragger
                multiple={false}
                supportServerRender={true}
                beforeUpload={this.beforeUpload}
              >
                <p className="ant-upload-drag-icon">
                  <Icon style={{ fontSize: 24 }} type="upload" />
                </p>
                <p className="ant-upload-text">
                  {formatMessage(messages.clickOrDrag)}
                </p>
                <p className="ant-upload-hint">
                  {formatMessage(messages.imageInstruction)}
                </p>
              </Dragger>
            </DraggerContainer>
          </Info>
          {(imagePreview || theme!.image) && (
            <Image src={imagePreview || theme!.image} />
          )}
        </Container>
      )
    }
    const disabledSave =
      !theme || (!theme.name && (!imagePreview || !theme!.image))
    return (
      <Modal
        okText={formatMessage(messages.save)}
        okButtonProps={{
          style: disabledSave ? DisableSaveStyle : SaveButtonStyle,
          disabled: disabledSave
        }}
        width={'50%'}
        visible={open}
        title={
          theme && theme.id > 0
            ? formatMessage(messages.editTheme)
            : formatMessage(messages.newTheme)
        }
        destroyOnClose={true}
        onOk={this.handleOnSave}
        confirmLoading={loading}
        onCancel={this.handleOnCancel}
      >
        {content}
      </Modal>
    )
  }

  handleOnCancel = () => {
    const { onCancel } = this.props
    this.setState({ file: null, imagePreview: '' })
    onCancel()
  }

  handleOnSave = async () => {
    try {
      const { file } = this.state
      const { theme, upsertTheme, productCode, formatMessage } = this.props
      const { id, name } = theme!
      this.setState({ loading: true })
      let image = theme!.image
      if (!!file) {
        const responseImage = await uploadThemeImage(file)
        image = responseImage.image
      }
      const updatedTheme = {
        id,
        image,
        name
      }
      await upsertTheme({
        variables: { theme: updatedTheme },
        update: (store: any, insertedThemeData: Theme) => {
          const data = store.readQuery({
            query: getProductFromCode,
            variables: { code: productCode }
          })
          const themes = get(data, 'product.themes', [])
          if (updatedTheme.id !== NEW_THEME) {
            const themeIndex = findIndex(
              themes,
              ({ id: themeId }) => id === themeId
            )
            set(data, `product.themes[${themeIndex}].name`, name)
            set(data, `product.themes[${themeIndex}].image`, image)
          } else {
            const insertedTheme = get(insertedThemeData, 'data.theme', {})
            if (insertedTheme) {
              themes.push({
                ...insertedTheme,
                styles: [],
                itemOrder: null
              })
            }
          }
          store.writeQuery({
            data,
            query: getProductFromCode,
            variables: { code: productCode }
          })
          message.success(formatMessage(messages.themeUpdated))
          this.handleOnCancel()
        }
      })
      this.setState({ loading: false })
    } catch (e) {
      this.setState({ loading: false })
      message.error(e.message)
    }
  }

  beforeUpload = (file: any) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ file, imagePreview: reader.result as string })
    }

    if (file) {
      reader.readAsDataURL(file)
    }

    return false
  }

  handleOnUpdateName = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    const { onUpdateName } = this.props
    onUpdateName(value)
  }
}

const ThemeModalEnhance = compose(
  graphql(upsertThemeMutation, { name: 'upsertTheme' })
)(ThemeModal)

export default ThemeModalEnhance
