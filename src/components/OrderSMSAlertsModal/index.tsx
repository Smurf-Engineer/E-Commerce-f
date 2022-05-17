import * as React from 'react'
import Modal from 'antd/lib/modal'
import MessageBar from 'antd/lib/message'
import PhoneInput from 'react-phone-input-2'
import messages from './messages'
import {
  profilePhoneSettingsQuery,
} from '../Notifications/Preferences/data'
import DoneAnimation from '../../assets/done.gif'
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
  OptOutMessage,
  Footer,
  StyledSignUp,
  SignUpIcon,
  TelInput,
  SavedDiv,
  SavedPhone
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
    showAnimation: false,
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
        variables: payload
      })
      MessageBar.success(formatMessage(successMessage), 4)
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
  changeNotificationSettings = async () => {
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
      await this.updateSetting(
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
  handlePhoneChange = async (phone: string) => {
    const { user, updatePhone } = this.props
    await this.updatePhoneSetting(
      { userId: user ? user.id : '', phone },
      updatePhone,
      messages.phoneSaved
    )
  }

  handleCertifyChange = (e) => {
    this.setState({ checked: e.target.checked })
  }

  noThanks = () => {
    const { onClose } = this.props
    onClose()
  }

  handleOk = async () => {
    const { formatMessage, onClose } = this.props
    const { phoneNumber } = this.state
    if (phoneNumber && phoneNumber.length < 11) {
      MessageBar.error(formatMessage(messages.invalidPhone))
      return
    }
    if (phoneNumber) {
      await this.handlePhoneChange(phoneNumber)
      await this.changeNotificationSettings()
      this.setState({ showAnimation: true })
      setTimeout(() => { onClose() }, 2500)
    }
  }

  render() {
    const { phoneNumber, showAnimation } = this.state
    const { formatMessage } = this.props
    return (
      <Modal
        visible={true}
        footer={null}
        closable={false}
        width={'700px'}
        bodyStyle={{ padding: 0 }}
      >
        {showAnimation ?
          <SavedDiv>
            <SavedPhone src={DoneAnimation} />
          </SavedDiv> :
          <ModalContainer>
            <Title>{formatMessage(messages.title)}</Title>
            <Description>{formatMessage(messages.description)}</Description>
            <BodyContent>
              <InputContainer>
                <InputTitleContainer>
                  <Label>{formatMessage(messages.phone)}</Label>
                </InputTitleContainer>
                <TelInput>
                  <PhoneInput
                    country={'us'}
                    autoComplete="jv2"
                    countryCodeEditable={false}
                    value={this.state.phoneNumber}
                    onChange={(value) => {
                      this.setState({ phoneNumber: value })
                    }}
                    inputProps={{ autoComplete: 'jv2' }}
                    inputStyle={{ borderRadius: 0, width: 192 }}
                    copyNumbersOnly={false}
                    style={{ width: 'auto' }}
                  />
                  <StyledSignUp disabled={!phoneNumber} onClick={this.handleOk}>
                    <SignUpIcon type="check-circle" />
                    {formatMessage(messages.signUp)}
                  </StyledSignUp>
                </TelInput>
                <OptOutMessage>
                  {formatMessage(messages.optOut)}
                </OptOutMessage>
              </InputContainer>
              <BannerImage src={NotificationImage} />
            </BodyContent>
            <ButtonGroup>
              <ConfirmButton onClick={this.noThanks}>
                {formatMessage(messages.noThanks)}
              </ConfirmButton>
            </ButtonGroup>
            <Footer dangerouslySetInnerHTML={{
              __html: formatMessage(messages.footer)
            }} />
          </ModalContainer>
        }
      </Modal>
    )
  }
}

export default OrderSMSAlertsModal
