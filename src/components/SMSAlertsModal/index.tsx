import * as React from 'react'
import { Button } from 'antd'
import Modal from 'antd/lib/modal'
import MessageBar from 'antd/lib/message'
import PhoneInput from 'react-phone-input-2'
import messages from './messages'
import {
  profileNotificationSettingsQuery,
  profilePhoneSettingsQuery,
} from '../Notifications/Preferences/data'
import SMSBanner from '../../assets/sms_banner.jpg'
import {
  Message,
  NotificationOption,
  NotificationSettings,
  UserType,
} from '../../types/common'
import { SPLIT_BY_CAPITAL_REGEX } from '../Notifications/constants'

import {
  ModalContainer,
  Title,
  Description,
  BodyContent,
  InputTitleContainer,
  Label,
  BannerImage,
  InputContainer,
  ButtonGroup,
  ConfirmButton,
  StyledCheckbox,
  OptOutMessage,
} from './styledComponents'
interface Props {
  user: UserType
  notificationData: NotificationSettings
  phoneData: { phone: String }
  formatMessage: (messageDescriptor: Message) => string
  updateNotification: (variables: {}) => void
  updatePhone: (variables: {}) => void
  onClose: () => void
}

class SMSAlertsModal extends React.Component<Props, {}> {
  state = {
    phoneNumber: '',
  }

  componentDidMount() {
    const { phoneData } = this.props
    this.setState({ phoneNumber: phoneData.phone })
  }

  updateSetting = async (payload: {}, mutation: any, successMessage: any) => {
    const { formatMessage } = this.props
    try {
      await mutation({
        variables: payload,
        refetchQueries: [
          {
            query: profileNotificationSettingsQuery,
            options: {
              fetchPolicy: 'network-only',
            },
          },
        ],
      })
      MessageBar.success(formatMessage(successMessage), 4)
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
  changeNotificationSettings = () => {
    const { notificationData, updateNotification } = this.props
    const key = 'notifyProDesign'
    const currentValue = notificationData ? notificationData[key] : 0
    let newValue = -1
    switch (currentValue) {
      case NotificationOption.EMAIL:
        newValue = NotificationOption.BOTH
        break
      case NotificationOption.NONE:
        newValue = NotificationOption.SMS
        break
      default:
        break
    }
    if (newValue !== -1) {
      const payload = {
        setting: key
          .split(SPLIT_BY_CAPITAL_REGEX)
          .join('_')
          .toLowerCase(),
        value: newValue,
      }
      this.updateSetting(
        payload,
        updateNotification,
        messages.updateNotificationSuccessMessage
      )
    }
  }

  updatePhoneSetting = async (
    payload: {},
    mutation: any,
    successMessage: any
  ) => {
    const { formatMessage } = this.props
    try {
      await mutation({
        variables: payload,
        refetchQueries: [
          {
            query: profilePhoneSettingsQuery,
            options: {
              fetchPolicy: 'network-only',
            },
          },
        ],
      })
      MessageBar.success(formatMessage(successMessage), 4)
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
  handlePhoneChange = (phone: string) => {
    const { user, updatePhone } = this.props
    this.updatePhoneSetting(
      { userId: user ? user.id : '', phone },
      updatePhone,
      messages.updateNotificationSuccessMessage
    )
  }

  handleConfirm = () => {
    const { phoneNumber } = this.state
    if (phoneNumber) {
      this.handlePhoneChange(phoneNumber)
      this.changeNotificationSettings()
      this.props.onClose()
    }
  }

  handleNoThanks = () => {
    this.props.onClose()
  }

  render() {
    const { formatMessage } = this.props
    return (
      <Modal
        visible={true}
        footer={null}
        closable={false}
        width={'700px'}
        bodyStyle={{ padding: 0 }}
      >
        <ModalContainer>
          <Title>{formatMessage(messages.title)}</Title>
          <Description>{formatMessage(messages.description)}</Description>
          <BodyContent>
            <InputContainer>
              <InputTitleContainer>
                <Label>{formatMessage(messages.phone)}</Label>
              </InputTitleContainer>
              <PhoneInput
                country={'us'}
                value={this.state.phoneNumber}
                onChange={(value) => {
                  this.setState({ phoneNumber: value })
                }}
                inputProps={{ autoComplete: 'jv2' }}
                inputStyle={{ borderRadius: 0, width: 250 }}
                copyNumbersOnly={false}
              />
              <StyledCheckbox>
                {formatMessage(messages.certify)}
              </StyledCheckbox>
              <OptOutMessage>
                {formatMessage(messages.optOut)}
              </OptOutMessage>
              <ButtonGroup>
                <ConfirmButton onClick={this.handleConfirm}>
                  {formatMessage(messages.confirm)}
                </ConfirmButton>
                <Button onClick={this.handleNoThanks}>
                  {formatMessage(messages.noThanks)}
                </Button>
              </ButtonGroup>
            </InputContainer>
            <BannerImage src={SMSBanner} />
          </BodyContent>
        </ModalContainer>
      </Modal>
    )
  }
}

export default SMSAlertsModal
