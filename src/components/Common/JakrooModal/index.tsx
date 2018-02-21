/**
 * CustomModal Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { Container, Header, CloseIcon, Logo } from './styledComponents'
import closeIcon from '../../../assets/cancel-button.svg'
import JakRooLogo from '../../../assets/Jackroologo.svg'

interface Props {
  open: boolean
  width?: string
  requestClose?: () => void
  children?: any
}

const CustomModal = ({ open, requestClose, children }: Props) => {
  return (
    <Container>
      <Modal visible={open} footer={null} closable={false}>
        <CloseIcon src={closeIcon} onClick={requestClose} />
        <Header>
          <Logo src={JakRooLogo} />
        </Header>
        {children}
      </Modal>
    </Container>
  )
}

export default CustomModal
