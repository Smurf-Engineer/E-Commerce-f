/**
 * DesignModal Component - Created by eduardoquintero on 17/12/19.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import messages from './messages'
import { getFileExtension } from '../../utils/utilsFiles'
import { Message, Style, UploadFile } from '../../types/common'
import Upload from 'antd/lib/upload'
import { compose, graphql } from 'react-apollo'
import {
  Container,
  Info,
  DraggerContainer,
  SaveButtonStyle,
  DisableSaveStyle,
  Label,
  StyledInput
} from './styledComponents'
import { addDesignMutation } from './data'
import { Extension } from './config'

const { Dragger } = Upload

interface Props {
  productCode: number
  open: boolean
  name: string
  uploading: boolean
  colorBlock: number
  productId: number
  onCancel: () => void
  onUpdateName: (name: string) => void
  addDesign: (variables: {}) => Promise<Style>
  formatMessage: (messageDescriptor: Message, params?: any) => string
  onSave: (areas: UploadFile[], config: UploadFile, productId: number) => void
}

interface State {
  areas: UploadFile[]
  config?: UploadFile | null
}

class DesignModal extends React.PureComponent<Props, State> {
  state = {
    areas: [],
    config: null
  }
  render() {
    const { formatMessage, open, name, uploading } = this.props
    const { areas } = this.state
    const content = (
      <Container>
        <Info>
          <Label>{formatMessage(messages.name)}</Label>
          <StyledInput
            value={name}
            onChange={this.handleOnUpdateName}
            placeholder={formatMessage(messages.namePlaceholder)}
          />
          <Label>{formatMessage(messages.addConfigFile)}</Label>
          <DraggerContainer>
            <Dragger
              multiple={false}
              supportServerRender={true}
              beforeUpload={this.beforeUploadJson}
            >
              <p className="ant-upload-drag-icon">
                <Icon style={{ fontSize: 24 }} type="upload" />
              </p>
              <p className="ant-upload-text">
                {formatMessage(messages.addConfigFilePlaceholder)}
              </p>
            </Dragger>
          </DraggerContainer>
          <Label>{formatMessage(messages.addColorBlocks)}</Label>
          <DraggerContainer>
            <Dragger
              multiple={true}
              supportServerRender={true}
              beforeUpload={this.beforeUploadAreas}
            >
              <p className="ant-upload-drag-icon">
                <Icon style={{ fontSize: 24 }} type="upload" />
              </p>
              <p className="ant-upload-text">
                {formatMessage(messages.addColorBlocksPlaceholder)}
              </p>
              <p className="ant-upload-hint">
                {formatMessage(messages.clickOrDrag)}
              </p>
            </Dragger>
          </DraggerContainer>
        </Info>
      </Container>
    )
    const disabledSave = !name || !areas.length
    return (
      <Modal
        okText={formatMessage(messages.save)}
        okButtonProps={{
          style: disabledSave ? DisableSaveStyle : SaveButtonStyle,
          disabled: disabledSave,
          loading: uploading
        }}
        width={'40%'}
        visible={open}
        title={formatMessage(messages.newDesign)}
        destroyOnClose={true}
        onOk={this.handleOnSave}
        confirmLoading={false}
        onCancel={this.handleOnCancel}
      >
        {content}
      </Modal>
    )
  }

  handleOnCancel = () => {
    const { onCancel } = this.props
    this.setState({ config: null, areas: [] })
    onCancel()
  }

  handleOnSave = async () => {
    try {
      const { config, areas } = this.state
      const { onSave, productId } = this.props
      await onSave(areas, config, productId)
    } catch (e) {
      message.error(e.message)
    }
  }

  beforeUploadAreas = (file: UploadFile) => {
    this.setState(({ areas }) => ({ areas: [...areas, file] }))
    return false
  }
  beforeUploadJson = (file: UploadFile) => {
    const { type, name } = file
    const selectedFileExtension = type || getFileExtension(name)
    if (selectedFileExtension !== Extension.Config) {
      message.error(`Please select a valid ${Extension.Config} file`)
    } else {
      this.setState({ config: file })
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

const DesignModalEnhance = compose(
  graphql(addDesignMutation, { name: 'addDesign' })
)(DesignModal)

export default DesignModalEnhance
