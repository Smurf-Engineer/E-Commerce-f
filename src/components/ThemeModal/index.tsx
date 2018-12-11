/**
 * ThemeModal Component - Created by david on 29/11/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import set from 'lodash/set'
import { Theme } from '../../types/common'
import Upload from 'antd/lib/upload'
import { compose, graphql } from 'react-apollo'
import { Container, Image, Info, DraggerContainer } from './styledComponents'
import { uploadThemeImage } from '../../screens/DesignerTool/api'
import { updateThemeMutation } from './data'
import { getProductFromCode } from '../../screens/DesignerTool/DesignCenterCustomize/data'

const { Dragger } = Upload

interface Props {
  theme: Theme | null
  productCode: number
  onCancel: () => void
  onUpdateName: (name: string) => void
  updateTheme: (variables: {}) => Promise<Theme>
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
    const { theme } = this.props
    const { imagePreview, loading } = this.state
    const open = !!theme
    let content = null
    if (open) {
      content = (
        <Container>
          <Image src={imagePreview || theme!.image} />
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
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  302 x 302 px. Files jpg, jpeg, png.
                </p>
              </Dragger>
            </DraggerContainer>
          </Info>
        </Container>
      )
    }
    return (
      <Modal
        okText="Save"
        width={'50%'}
        visible={open}
        title="Edit theme"
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
      const { theme, updateTheme, productCode } = this.props
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
      await updateTheme({
        variables: { theme: updatedTheme },
        update: (store: any) => {
          const data = store.readQuery({
            query: getProductFromCode,
            variables: { code: productCode }
          })
          const themes = get(data, 'product.themes', [])
          const themeIndex = findIndex(
            themes,
            ({ id: themeId }) => id === themeId
          )
          set(data, `product.themes[${themeIndex}].name`, name)
          set(data, `product.themes[${themeIndex}].image`, image)
          store.writeQuery({
            data,
            query: getProductFromCode,
            variables: { code: productCode }
          })
          message.success('Your theme was updated')
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
  graphql(updateThemeMutation, { name: 'updateTheme' })
)(ThemeModal)

export default ThemeModalEnhance
