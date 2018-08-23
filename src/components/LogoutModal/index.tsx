/**
 * LogoutModal Component - Created by jorge on 22/08/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import messages from './messages'
import { DeleteConfirmMessage } from './styledComponents'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'

interface Props {
  open: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  openLogoutModalAction: (open: boolean) => void
  onLogout: () => void
}

const LogoutModal = (props: Props) => {
  const { open, formatMessage } = props

  const handleOnLogout = () => {
    const { onLogout, openLogoutModalAction } = props
    onLogout()
    openLogoutModalAction(false)
  }

  const handleOnCancel = () => {
    const { openLogoutModalAction } = props
    openLogoutModalAction(false)
  }

  return (
    <Modal
      visible={open}
      title={<ModalTitle title={formatMessage(messages.title)} />}
      footer={
        <ModalFooter
          okText={formatMessage(messages.confirm)}
          onOk={handleOnLogout}
          onCancel={handleOnCancel}
          {...{ formatMessage }}
        />
      }
      destroyOnClose={false}
      maskClosable={false}
      closable={false}
    >
      <DeleteConfirmMessage>
        {formatMessage(messages.logout)}
      </DeleteConfirmMessage>
    </Modal>
  )
}

export default LogoutModal
