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
  TitleLabel
} from './styledComponents'
const { TextArea } = Input
import { contactManager } from './data'
import Modal from '../Common/JakrooModal'

interface Props {
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  onSetEmail: (email: string) => void
  onSetMesage: (message: string) => void
  contactManagerMutation: (variables: {}) => void
  setSendMessageLoading: (loading: boolean) => void
  open: boolean
  teamStoreId: string
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  ownerName: string
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
      formatMessage
    } = this.props

    if (!emailMessage) {
      message.error(formatMessage(messages.invalidMessage))
      return
    }

    try {
      setSendMessageLoading(true)
      const response = await contactManagerMutation({
        variables: { teamStoreId, text: emailMessage }
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
      ownerName
    } = this.props

    return (
      <Container>
        <Modal
          open={open}
          width={'60%'}
          requestClose={this.handleCancel}
          withLogo={false}
        >
          <Title>{formatMessage(messages.title)}</Title>
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
