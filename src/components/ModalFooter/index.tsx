/**
 * ModalFooter Component - Created by miguelcanobbio on 06/07/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container } from './styledComponents'
import Button from 'antd/lib/button'

interface Props {
  cancelText?: string
  okText?: string
  onOk: any
  onCancel: any
  confirmLoading?: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
}

const ModalFooter = ({
  formatMessage,
  cancelText,
  okText,
  onOk,
  onCancel,
  confirmLoading
}: Props) => {
  const cancel = cancelText ? cancelText : formatMessage(messages.cancel)
  const confirm = okText ? okText : formatMessage(messages.confirm)
  return (
    <Container>
      <Button onClick={onCancel}>{cancel}</Button>
      <Button loading={confirmLoading} onClick={onOk} type="primary">
        {confirm}
      </Button>
    </Container>
  )
}

export default ModalFooter
