/**
 * SignupModal Component - Created by eduardoquintero on 28/01/20.
 */
import * as React from 'react'
import Modal from '../../Common/JakrooModal'
import {
  FormContainer,
  StyledInput,
  StyledButton,
  ButtonWrapper
} from './styledComponents'
import messages from './messages'
import { Message } from '../../../types/common'

interface Props {
  open: boolean
  name: string
  lastName: string
  email: string
  loading: boolean
  formatMessage: (messageDescriptor: Message) => string
  onSaveUser: () => void
  handleOnInputChange: (id: string, value: string) => void
  onClose: () => void
}

export class SignupModal extends React.Component<Props, {}> {
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { handleOnInputChange } = this.props
    const {
      currentTarget: { id, value }
    } = evt
    handleOnInputChange(id, value)
  }

  render() {
    const {
      open,
      formatMessage,
      name,
      lastName,
      email,
      onSaveUser,
      onClose,
      loading
    } = this.props

    return (
      <div>
        <Modal
          {...{ open }}
          withLogo={false}
          title={formatMessage(messages.newUser)}
          requestClose={onClose}
          onCancel={onClose}
        >
          <FormContainer>
            <StyledInput
              id="name"
              topText={formatMessage(messages.firtsNameLabel)}
              value={name}
              onChange={this.handleInputChange}
            />
            <StyledInput
              id="lastName"
              topText={formatMessage(messages.lastNameLabel)}
              value={lastName}
              onChange={this.handleInputChange}
            />
            <StyledInput
              id="email"
              topText={'E-mail'}
              value={email}
              onChange={this.handleInputChange}
            />
          </FormContainer>
          <ButtonWrapper disabled={false}>
            <StyledButton
              {...{ loading }}
              disabled={false}
              type="primary"
              onClick={onSaveUser}
            >
              {formatMessage(messages.add)}
            </StyledButton>
          </ButtonWrapper>
        </Modal>
      </div>
    )
  }
}

export default SignupModal
