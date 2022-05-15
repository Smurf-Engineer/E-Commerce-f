import * as React from 'react'
import Modal from 'antd/lib/modal'
import MessageBar from 'antd/lib/message'
import PhoneInput from 'react-phone-input-2'
import messages from './messages'
import {
  profileNotificationSettingsQuery,
  profilePhoneSettingsQuery,
} from '../Notifications/Preferences/data'
import NotificationImage from '../../assets/notification.jpg'
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
  Footer
} from './styledComponents'
interface Props {
  user: UserType
  notificationData: NotificationSettings
  notifyOrderPayment?: boolean
  phone: string
  formatMessage: (messageDescriptor: Message) => string
  updateNotification: (variables: {}) => void
  updatePhone: (variables: {}) => void
  onClose: () => void
}

class OrderSMSAlertsModal extends React.Component<Props, {}> {
  state = {
    phoneNumber: '',
    checked: false,
  }

  componentDidMount() {
    const { phone } = this.props
    this.setState({ phoneNumber: phone })
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
    const { notificationData, updateNotification, notifyOrderPayment } = this.props
    const key = !notifyOrderPayment ? 'notifyProDesign' : 'notifyOrderPayment'
    const currentValue = notificationData ? notificationData[key] : 0
    let newValue = notificationData && notificationData[key] ? -1 : 2
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
      messages.phoneSaved
    )
  }

  handleCertifyChange = (e) => {
    this.setState({ checked: e.target.checked })
  }

  handleOk = () => {
    const { formatMessage } = this.props
    const { checked, phoneNumber } = this.state
    if (!checked) {
      this.props.onClose()
      return
    }
    if (phoneNumber && phoneNumber.length < 11) {
      MessageBar.error(formatMessage(messages.invalidPhone))
      return
    }
    if (phoneNumber) {
      this.handlePhoneChange(phoneNumber)
      this.changeNotificationSettings()
      this.props.onClose()
    }
  }

  render() {
    const { checked } = this.state
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
                autoComplete="jv2"
                countryCodeEditable={false}
                value={this.state.phoneNumber}
                onChange={(value) => {
                  this.setState({ phoneNumber: value })
                }}
                inputProps={{ autoComplete: 'jv2' }}
                inputStyle={{ borderRadius: 0, width: 250 }}
                copyNumbersOnly={false}
              />
              <StyledCheckbox checked={checked} onChange={this.handleCertifyChange}>
                {formatMessage(messages.certify)}
              </StyledCheckbox>
              <OptOutMessage>
                {formatMessage(messages.optOut)}
              </OptOutMessage>
            </InputContainer>
            <BannerImage src={NotificationImage} />
          </BodyContent>
          <ButtonGroup>
            <ConfirmButton onClick={this.handleOk}>
              {formatMessage(messages.ok)}
            </ConfirmButton>
          </ButtonGroup>
          <Footer dangerouslySetInnerHTML={{
            __html: formatMessage(messages.footer)
          }} />
        </ModalContainer>
      </Modal>
    )
  }
}

export default OrderSMSAlertsModal
