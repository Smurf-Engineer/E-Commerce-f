/**
 * EmailContact Component - Created by gustavomedina on 16/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Input from 'antd/lib/input'
import get from 'lodash/get'
import message from 'antd/lib/message'
import { compose } from 'react-apollo'
import messages from './messages'
import {
  Container,
  Title,
  Button,
  ButtonWrapper,
  TitleLabel,
  ExtraFields,
  FieldContainer,
  Label
} from './styledComponents'
const { TextArea } = Input
import { contactManager } from './data'
import Modal from '../Common/JakrooModal'
import { UserType, ContactInformation } from '../../types/common'

interface Props {
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  onSetEmail: (email: string) => void
  onSetMesage: (message: string) => void
  contactManagerMutation: (variables: {}) => void
  setSendMessageLoading: (loading: boolean) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  open: boolean
  teamStoreId: string
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  ownerName: string
  user: UserType
  contactInfo: ContactInformation
}

const fields = {
  name: { required: true, length: 50 },
  email: { required: true, length: 50 },
  phone: { required: false, length: 20 }
}
export class EmailContact extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }

  handleEmailChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { onSetEmail } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    onSetEmail(value)
  }

  handleMessageChange = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const { onSetMesage } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    onSetMesage(value)
  }

  handleSendMessage = async (evt: React.MouseEvent<EventTarget>) => {
    const {
      contactManagerMutation,
      emailMessage,
      requestClose,
      teamStoreId,
      setSendMessageLoading,
      formatMessage,
      contactInfo,
      user
    } = this.props
    if (!emailMessage) {
      message.error(formatMessage(messages.invalidMessage))
      return
    }

    let { email, name } = contactInfo

    if (user) {
      const { email: userEmail, name: firstName, lastName } = user
      email = userEmail
      name = `${firstName} ${lastName}`
    }

    if (!email.length || !name.length) {
      message.error(formatMessage(messages.fillFields))
      return
    }
    const { phone } = contactInfo
    try {
      setSendMessageLoading(true)
      const response = await contactManagerMutation({
        variables: { teamStoreId, text: emailMessage, name, phone, email }
      })
      setSendMessageLoading(false)
      const data = get(response, 'data.contactEmail', false)

      if (data) {
        this.sendMessage(data.message, true)
        requestClose()
      }
    } catch (error) {
      setSendMessageLoading(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      this.sendMessage(errorMessage, false)
      console.error(error)
    }
  }

  sendMessage = (printMessage: string, success: boolean) => {
    if (success) {
      message.success(printMessage, 5)
    } else {
      message.error(printMessage, 5)
    }
  }

  render() {
    const {
      open,
      formatMessage,
      emailMessage,
      sendMessageLoading,
      ownerName,
      user,
      handleInputChange,
      contactInfo
    } = this.props

    const fieldsToRender = []
    if (!user) {
      fieldsToRender.push('name', 'email')
    }
    fieldsToRender.push('phone')
    const extraFields = fieldsToRender.map((field, index) => (
      <FieldContainer>
        <Label required={fields[field].required}>
          {formatMessage(messages[field])}
        </Label>
        <Input
          key={index}
          id={field}
          maxLength={fields[field].length}
          onChange={handleInputChange}
          value={contactInfo[field]}
        />
      </FieldContainer>
    ))
    return (
      <Container>
        <Modal
          open={open}
          width={'60%'}
          requestClose={this.handleCancel}
          withLogo={false}
        >
          <Title>{formatMessage(messages.title)}</Title>
          {<ExtraFields>{extraFields}</ExtraFields>}
          <TitleLabel>{`${formatMessage(messages.nameLabel)} ${ownerName ||
            formatMessage(messages.storeManager)}`}</TitleLabel>
          <TextArea
            id="emailMessage"
            rows={7}
            value={emailMessage}
            placeholder={formatMessage(messages.askMe)}
            onChange={this.handleMessageChange}
          />
          <ButtonWrapper>
            <Button
              type="primary"
              onClick={this.handleSendMessage}
              loading={sendMessageLoading}
            >
              <FormattedMessage {...messages.send} />
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

const EmailContactEnhance = compose(contactManager)(EmailContact)
export default EmailContactEnhance
