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
  RequiredSpan,
  ErrorMsg
} from './styledComponents'
import ModalFooter from '../ModalFooter'
import ModalTitle from '../ModalTitle'

interface Props {
  hasError: boolean
  showPasswordModal: boolean
  passwordModalLoading: boolean
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  formatMessage: (messageDescriptor: any) => string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  toggleModalPassword: () => void
  onChangePassword: () => void
  resetPasswordForm: () => void
}

const ChangePasswordModal = ({
  showPasswordModal,
  passwordModalLoading,
  currentPassword,
  newPassword,
  newPasswordConfirm,
  formatMessage,
  handleInputChange,
  toggleModalPassword,
  hasError,
  onChangePassword,
  resetPasswordForm
}: Props) => {
  return (
    <Modal
      visible={showPasswordModal}
      title={<ModalTitle title={formatMessage(messages.title)} />}
      footer={
        <ModalFooter
          confirmLoading={passwordModalLoading}
          okText={formatMessage(messages.save)}
          onOk={onChangePassword}
          onCancel={toggleModalPassword}
          {...{ formatMessage }}
        />
      }
      closable={false}
      maskClosable={false}
      destroyOnClose={true}
      afterClose={resetPasswordForm}
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
            {!currentPassword &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredField)}</ErrorMsg>
              )}
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
            {!newPassword &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredField)}</ErrorMsg>
              )}
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'100%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.reEnterPassword)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="newPasswordConfirm"
              value={newPasswordConfirm}
              onChange={handleInputChange}
              type="Password"
            />
            {(!newPasswordConfirm || newPasswordConfirm !== newPassword) &&
              hasError && (
                <ErrorMsg>
                  {formatMessage(messages.confirmPasswordError)}
                </ErrorMsg>
              )}
          </Column>
        </Row>
      </Container>
    </Modal>
  )
}

export default ChangePasswordModal
