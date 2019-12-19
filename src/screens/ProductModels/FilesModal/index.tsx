/**
 * FilesModal Component - Created by Jesús Apodaca on 17/12/19.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import message from 'antd/lib/message'
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
  SaveButton
} from './styledComponents'
import { Message, ModelVariant } from '../../../types/common'
import messages from './messages'
import FileSection from './FileSection'
import { validIcons } from '../constants'

interface Props {
  openModal: boolean
  tempModel: ModelVariant
  saveInfoAction: () => void
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
  handleUploadIcon = async (event: any) => {
    const { file } = event
    const { uploadImageModel } = this.props
    uploadImageModel(file)
  }
  render() {
    const {
      openModal,
      formatMessage,
      uploadFile,
      setFileAction,
      saveInfoAction,
      requestClose,
      tempModel
    } = this.props
    const { icon, name } = tempModel
    return (
      <Modal
        visible={openModal}
        footer={null}
        closable={false}
        maskStyle={maskStyles}
        maskClosable={true}
        onCancel={requestClose}
      >
        <Title>{formatMessage(messages.title)}</Title>
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
            {...{ setFileAction, uploadFile, tempModel, formatMessage }}
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
