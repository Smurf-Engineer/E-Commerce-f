/**
 * CustomModal Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { Container, Header, CloseIcon, Logo, Title } from './styledComponents'
import closeIcon from '../../../assets/cancel-button.svg'
import JakRooLogo from '../../../assets/Jackroologo.svg'

interface Props {
  open: boolean
  width?: string | number
  requestClose?: () => void
  withCross?: boolean | undefined
  withLogo?: boolean | undefined
  children?: any
  title?: string
  style?: any
  maskStyle?: any
  class?: boolean
  wrapClassName?: string
}

const CustomModal = ({
  open,
  requestClose,
  children,
  title,
  style,
  width,
  withCross = true,
  withLogo = true,
  maskStyle,
  wrapClassName
}: Props) => {
  return (
    <Container>
      <Modal
        {...{ style, width, maskStyle, wrapClassName }}
        visible={open}
        footer={null}
        closable={false}
        destroyOnClose={true}
      >
        {withCross && <CloseIcon src={closeIcon} onClick={requestClose} />}
        {withLogo && (
          <Header>
            <Logo src={JakRooLogo} />
          </Header>
        )}
        {title ? <Title>{title}</Title> : ''}
        {children}
      </Modal>
    </Container>
  )
}

export default CustomModal
