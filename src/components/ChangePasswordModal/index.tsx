/**
 * ChangePasswordModal Component - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  StyledInput,
  RequiredSpan
} from './styledComponents'

interface Props {
  showPasswordModal: boolean
  passwordModalLoading: boolean
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  formatMessage: (messageDescriptor: any) => string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  toggleModalPassword: () => void
}

const ChangePasswordModal = ({
  showPasswordModal,
  passwordModalLoading,
  currentPassword,
  newPassword,
  newPasswordConfirm,
  formatMessage,
  handleInputChange,
  toggleModalPassword
}: Props) => {
  return (
    <Modal
      visible={showPasswordModal}
      title={formatMessage(messages.title)}
      confirmLoading={passwordModalLoading}
      okText={formatMessage(messages.save)}
      onOk={() => {}}
      onCancel={toggleModalPassword}
      closable={false}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Container>
        <Row>
          <Column inputhWidth={'100%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.currentPassword)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="currentPassword"
              value={currentPassword}
              onChange={handleInputChange}
              type="Password"
            />
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'100%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.newPassword)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              type="Password"
            />
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'100%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.currentPassword)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="newPasswordConfirm"
              value={newPasswordConfirm}
              onChange={handleInputChange}
              type="Password"
            />
          </Column>
        </Row>
      </Container>
    </Modal>
  )
}

export default ChangePasswordModal
