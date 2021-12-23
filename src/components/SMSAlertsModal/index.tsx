import * as React from 'react'
import {
  ModalContainer,
  Title,
  Description,
  Strong,
  EditButton,
  BodyContent,
} from './styledComponents'
import Modal from 'antd/lib/modal'

interface Props {}

const SMSAlertsModal = ({  }: Props) => {
  return (
    <Modal
      visible={true}
      footer={null}
      closable={false}
      width={'600px'}
      bodyStyle={{ padding: 0 }}
    >
      <ModalContainer>
        <Title>STAY CONNECTED WITH SMS ALERTS</Title>
        <BodyContent>
          <Description>Get notified about key events on your design project</Description>
        </BodyContent>
      </ModalContainer>
    </Modal>
  )
}

export default SMSAlertsModal
