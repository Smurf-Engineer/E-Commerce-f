import * as React from 'react'
import Modal from 'antd/lib/modal'
import MessageBar from 'antd/lib/message'
import PhoneInput from 'react-phone-input-2'
import { debounce } from 'lodash'
import messages from './messages'
import {
  ModalContainer,
  Title,
  Description,
  BodyContent,
  InputTitleContainer,
  Label,
} from './styledComponents'
import {
  profileNotificationSettingsQuery,
  profilePhoneSettingsQuery,
} from '../Notifications/Preferences/data'
import {
  Message,
  NotificationOption,
  NotificationSettings,
  UserType,
} from '../../types/common'
import { SPLIT_BY_CAPITAL_REGEX } from '../Notifications/constants'
import { Button } from 'antd'

interface Props {
  user: UserType
  notificationData: NotificationSettings
  phoneData: { phone: String }
  formatMessage: (messageDescriptor: Message) => string
  updateNotification: (variables: {}) => void
  updatePhone: (variables: {}) => void
  onClose: () => void
}

const SMSAlertsModal = ({
  user,
  notificationData,
  phoneData,
  formatMessage,
  updatePhone,
  updateNotification,
  onClose,
}: Props) => {
  const updateSetting = async (
    payload: {},
    mutation: any,
    successMessage: any
  ) => {
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
  const changeNotificationSettings = () => {
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
      updateSetting(
        payload,
        updateNotification,
        messages.updateNotificationSuccessMessage
      )
    }
  }

  const updatePhoneSetting = async (
    payload: {},
    mutation: any,
    successMessage: any
  ) => {
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
  const handlePhoneChange = (phone: string) => {
    updatePhoneSetting(
      { userId: user ? user.id : '', phone },
      updatePhone,
      messages.updateNotificationSuccessMessage
    )
  }
  const debouncePhoneUpdate = debounce(
    (value) => handlePhoneChange(value),
    1000
  )

  const handleConfirm = () => {
    changeNotificationSettings()
    onClose()
  }

  const handleNoThanks = () => {
    onClose()
  }

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
        <Description>
          Get notified about key events on your design project
        </Description>
        <BodyContent>
          <InputTitleContainer>
            <Label>{formatMessage(messages.phone)}</Label>
          </InputTitleContainer>
          <PhoneInput
            country={'us'}
            value={phoneData && phoneData.phone}
            onChange={(value) => {
              debouncePhoneUpdate(value)
            }}
            inputProps={{ autoComplete: 'jv2' }}
            inputStyle={{ borderRadius: 0, width: 250 }}
            copyNumbersOnly={false}
          />
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleNoThanks}>No, thanks</Button>
        </BodyContent>
      </ModalContainer>
    </Modal>
  )
}

export default SMSAlertsModal
