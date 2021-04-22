/**
 * RenameModal
 */
import * as React from 'react'
import messages from './messages'
import Modal from 'antd/lib/modal'
import {
  ConfirmMessage,
  InputWrapper,
  StyledInput
} from './styledComponents'
import ModalFooter from '../../../../components/ModalFooter'
import ModalTitle from '../../../../components/ModalTitle'
import { Message } from '../../../../types/common'

interface Props {
  open: boolean
  name?: string
  newFileName: string
  loading: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  openRenameModal: (open: boolean) => void
  onRenameChange: (value: string) => void
  handleOnSaveName: () => void
}

const RenameModal = ({
  open,
  formatMessage,
  name,
  newFileName,
  loading,
  openRenameModal,
  onRenameChange,
  handleOnSaveName
}: Props) => {
  const closeModal = () => openRenameModal(false)
  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    onRenameChange(value)
  }
  return (
    <Modal
      visible={open}
      title={
        <ModalTitle title={formatMessage(messages.titleRenameModal)} />
      }
      footer={
        <ModalFooter
          okText={formatMessage(messages.rename)}
          onOk={handleOnSaveName}
          onCancel={closeModal}
          confirmLoading={loading}
          {...{ formatMessage }}
        />
      }
      destroyOnClose={false}
      maskClosable={false}
      closable={false}
    >
      <ConfirmMessage>{formatMessage(messages.renameText)}</ConfirmMessage>
      <InputWrapper>
        <StyledInput
          value={newFileName}
          placeholder={formatMessage(messages.renamePlaceholder, {
            fileName: name
          })}
          onChange={handleInputChange}
          maxLength={15}
        />
      </InputWrapper>
    </Modal>
  )
}

export default RenameModal
