/**
 * FilesModal Component - Created by Jesús Apodaca on 17/12/19.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
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
  Loading
} from './styledComponents'
import { Message } from '../../../types/common'
import messages from './messages'
import FileSection from './FileSection'

interface Props {
  openModal: boolean
  icon: string
  uploadingIcon: boolean
  requestClose: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class FilesModal extends React.Component<Props, {}> {
  render() {
    const {
      openModal,
      formatMessage,
      requestClose,
      icon,
      uploadingIcon
    } = this.props
    return (
      <Modal
        visible={openModal}
        footer={null}
        closable={false}
        maskStyle={maskStyles}
        maskClosable={true}
        destroyOnClose={true}
        onCancel={requestClose}
      >
        <Title>{formatMessage(messages.title)}</Title>
        <FormContainer>
          <RowInput>
            <NameInput>
              <Label>{formatMessage(messages.modelName)}</Label>
              <Input placeholder={formatMessage(messages.namePlaceholder)} />
            </NameInput>
            <IconInput>
              <Label>{formatMessage(messages.addIcon)}</Label>
              <UploadContainer>
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={() => {}}
                  showUploadList={false}
                  beforeUpload={() => {}}
                >
                  {uploadingIcon ? (
                    <Loading size="small" />
                  ) : (
                    <ModelIcon src={icon} />
                  )}
                </Upload>
              </UploadContainer>
            </IconInput>
          </RowInput>
          <FileSection {...{ formatMessage }} />
        </FormContainer>
      </Modal>
    )
  }
}

export default FilesModal
