/**
 * FilesModal Component - Created by Jesús Apodaca on 17/12/19.
 */
import * as React from 'react'
import Upload, { UploadChangeParam } from 'antd/lib/upload'
import message from 'antd/lib/message'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import {
  Title,
  FormContainer,
  RowInput,
  Modal,
  NameInput,
  Label,
  maskStyles,
  Input,
  IconInput,
  UploadContainer,
  ModelIcon,
  Loading,
  SaveSection,
  SaveButton,
  CloseIcon
} from './styledComponents'
import { Message, ModelVariant } from '../../../types/common'
import messages from './messages'
import FileSection from './FileSection'
import closeIcon from '../../../assets/cancel-button.svg'
import { validIcons } from '../constants'

interface Props {
  openModal: boolean
  tempModel: ModelVariant
  defaultVariant: boolean
  saveInfoAction: () => void
  changeDefault: (checked: boolean) => void
  setFileAction: (key: string, url: string) => void
  uploadFile: (file: File, key: string) => void
  uploadImageModel: (file: File) => void
  changeNameAction: (name: string) => void
  requestClose: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class FilesModal extends React.Component<Props, {}> {
  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    const { changeNameAction } = this.props
    changeNameAction(value)
  }
  beforeUpload = (file: File) => {
    const isValidType = validIcons.includes(file.type)
    if (!isValidType) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isValidType && isLt2M
  }
  handleUploadIcon = (event: UploadChangeParam) => {
    const { file } = event
    const { uploadImageModel } = this.props
    uploadImageModel(file)
  }
  handleCheck = (event: CheckboxChangeEvent) => {
    const {
      target: { checked }
    } = event
    const { changeDefault } = this.props
    changeDefault(checked)
  }
  render() {
    const {
      openModal,
      formatMessage,
      uploadFile,
      setFileAction,
      defaultVariant,
      saveInfoAction,
      requestClose,
      tempModel
    } = this.props
    const { icon, name, default: isDefault } = tempModel
    return (
      <Modal
        visible={openModal}
        footer={null}
        closable={false}
        maskStyle={maskStyles}
        maskClosable={false}
        onCancel={requestClose}
      >
        <Title>
          {formatMessage(messages.title)}
          <CloseIcon src={closeIcon} onClick={requestClose} />
        </Title>
        <FormContainer>
          <RowInput>
            <NameInput>
              <Label>{formatMessage(messages.modelName)}</Label>
              <Input
                value={name}
                onChange={this.handleChangeName}
                placeholder={formatMessage(messages.namePlaceholder)}
              />
            </NameInput>
            <IconInput>
              <Label>{formatMessage(messages.addIcon)}</Label>
              <UploadContainer>
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={this.handleUploadIcon}
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                >
                  {icon === 'loading' ? (
                    <Loading size="small" />
                  ) : (
                    <ModelIcon src={icon} />
                  )}
                </Upload>
              </UploadContainer>
            </IconInput>
          </RowInput>
          <FileSection
            handleCheck={this.handleCheck}
            {...{
              setFileAction,
              uploadFile,
              tempModel,
              isDefault,
              defaultVariant,
              formatMessage
            }}
          />
          <SaveSection onClick={saveInfoAction}>
            <SaveButton>{formatMessage(messages.saveModel)}</SaveButton>
          </SaveSection>
        </FormContainer>
      </Modal>
    )
  }
}

export default FilesModal
