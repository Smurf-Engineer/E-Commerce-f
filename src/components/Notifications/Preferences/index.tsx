import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import MessageBar from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import PhoneInput from 'react-phone-input-2'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import messages from './messages'
import * as NotificationSettingsActions from './actions'
import {
  profileNotificationSettingsQuery,
  UpdateNotificationSettingMutation,
  UpdateNewsletterSettingMutation,
  profilePhoneSettingsQuery,
  UpdatePhoneSettingMutation
} from './data'
import {
  Container,
  NotificationContainer,
  Column,
  Header,
  Title,
  Description,
  LoadingContainer,
  CheckBoxStyled,
  InputTitleContainer,
  Label,
  NotificationImage,
  AlertsTitle,
  AlertsSubtitle,
  RightInfo,
  NotifcationContent,
  AlertsColumn,
  DesktopPhoneColumn,
  MobilePhoneColumn,
  MobileFlexColumn,
  DesktopDescription,
  DesktopHeader
} from './styledComponents'
import { NotificationOption, NotificationSettings, UserType } from '../../../types/common'
import { Message } from '../../../types/common'
import { SPLIT_BY_CAPITAL_REGEX } from '../constants'
import Notification from '../../../assets/notification.jpg'
import { PHONE_MINIMUM } from '../../../constants'

export interface NotificationSetting {
  notificationData: NotificationSettings
}

export interface PhoneSetting {
  phoneData: {
    phone: String
  }
}

interface Props {
  user: UserType
  loadingSettings: Boolean
  notificationSettings: NotificationSetting
  phoneSettings: PhoneSetting
  formatMessage: (messageDescriptor: Message) => string
  updateNotification: (variables: {}) => void
  updateNewsletterSubscribed: (variables: {}) => void
  updatePhone: (variables: {}) => void
  setSettingsLoadingAction: (loading: boolean) => void
}

class Preferences extends React.Component<Props, {}> {
  debouncePhoneUpdate = debounce(value => this.handlePhoneChange(value), 1000)

  updateSetting = async (
    payload: {},
    mutation: any,
    successMessage: any
  ) => {
    const { setSettingsLoadingAction, formatMessage } = this.props
    try {
      setSettingsLoadingAction(true)
      await mutation({
        variables: payload,
        refetchQueries: [
          {
            query: profileNotificationSettingsQuery,
            options: {
              fetchPolicy: 'network-only'
            }
          }
        ]
      })
      setSettingsLoadingAction(false)
      MessageBar.success(formatMessage(successMessage), 4)
    } catch (error) {
      setSettingsLoadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }

  updatePhoneSetting = async (
    payload: {},
    mutation: any,
    successMessage: any
  ) => {
    const { setSettingsLoadingAction, formatMessage } = this.props
    try {
      setSettingsLoadingAction(true)
      await mutation({
        variables: payload,
        refetchQueries: [
          {
            query: profilePhoneSettingsQuery,
            options: {
              fetchPolicy: 'network-only'
            }
          }
        ]
      })
      setSettingsLoadingAction(false)
      MessageBar.success(formatMessage(successMessage), 4)
    } catch (error) {
      setSettingsLoadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }

  handlePhoneChange = (phone: string) => {
    const { user, updatePhone } = this.props
    if (!!phone && phone.length >= PHONE_MINIMUM) {
      this.updatePhoneSetting(
        { userId: user ? user.id : '', phone },
        updatePhone,
        messages.updateNotificationSuccessMessage
      )
    }
  }

  changeNotificationSettings = (key: string, selected: string) => () => {
    const {
      notificationSettings: { notificationData },
      updateNotification
    } = this.props
    const currentValue = notificationData ? notificationData[key] : 0
    let newValue = -1
    switch (currentValue) {
      case NotificationOption.EMAIL:
        if (selected === 'email') {
          if (key === 'notifyProductService' || key === 'notifyTeamStore') {
            newValue = NotificationOption.NONE
          }
        } else {
          newValue = NotificationOption.BOTH
        }
        break
      case NotificationOption.SMS:
        if (selected === 'email') {
          newValue = NotificationOption.BOTH
        } else {
          if (key === 'notifyProductService' || key === 'notifyTeamStore') {
            newValue = NotificationOption.NONE
          }
        }
        break
      case NotificationOption.BOTH:
        if (selected === 'email') {
          newValue = NotificationOption.SMS
        } else {
          newValue = NotificationOption.EMAIL
        }
        break
      case NotificationOption.NONE:
        if (selected === 'email') {
          newValue = NotificationOption.EMAIL
        } else {
          newValue = NotificationOption.SMS
        }
        break
      default:
        break
    }
    if (newValue !== -1) {
      const payload = {
        setting: key.split(SPLIT_BY_CAPITAL_REGEX).join('_').toLowerCase(),
        value: newValue
      }
      this.updateSetting(
        payload,
        updateNotification,
        messages.updateNotificationSuccessMessage
      )
    }
  }

  changeNewsletterSetting = () => {
    const {
      notificationSettings: { notificationData },
      updateNewsletterSubscribed
    } = this.props
    const currentValue = notificationData && notificationData.newsletterSubscribed
    const payload = {
      newsletterSubscribed: !currentValue
    }
    this.updateSetting(
      payload,
      updateNewsletterSubscribed,
      messages.updateNotificationSuccessMessage
    )
  }

  isNotificationSetTo = (key: string, to: number) => {
    const {
      notificationSettings: { notificationData }
    } = this.props
    return notificationData && (notificationData[key] === to
      || notificationData[key] === NotificationOption.BOTH)
  }

  render() {
    const {
      loadingSettings,
      notificationSettings: { notificationData },
      phoneSettings: { phoneData },
      formatMessage
    } = this.props

    const orderPaymentEmailChecked = this.isNotificationSetTo('notifyOrderPayment', NotificationOption.EMAIL)
    const prodesignEmailChecked = this.isNotificationSetTo('notifyProDesign', NotificationOption.EMAIL)
    const teamStoreEmailChecked = this.isNotificationSetTo('notifyTeamStore', NotificationOption.EMAIL)
    const designlabEmailChecked = this.isNotificationSetTo('notifyDesignLab', NotificationOption.EMAIL)
    const productServiceEmailChecked = this.isNotificationSetTo('notifyProductService', NotificationOption.EMAIL)
    const orderPaymentSmsChecked = this.isNotificationSetTo('notifyOrderPayment', NotificationOption.SMS)
    const prodesignSmsChecked = this.isNotificationSetTo('notifyProDesign', NotificationOption.SMS)
    const teamStoreSmsChecked = this.isNotificationSetTo('notifyTeamStore', NotificationOption.SMS)
    const designlabSmsChecked = this.isNotificationSetTo('notifyDesignLab', NotificationOption.SMS)
    const productServiceSmsChecked = this.isNotificationSetTo('notifyProductService', NotificationOption.SMS)
    const phone = get(phoneData, 'phone', '')

    return (
      <Container>
        {
          loadingSettings &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
        <MobilePhoneColumn>
          <InputTitleContainer>
            <Label>{formatMessage(messages.phone)}</Label>
          </InputTitleContainer>
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={value => {
              this.debouncePhoneUpdate(value)
            }}
            inputProps={{ autoComplete: 'jv2' }}
            inputStyle={{ borderRadius: 0, width: 250 }}
            copyNumbersOnly={false}
            disabled={!orderPaymentSmsChecked && !prodesignSmsChecked
              && !teamStoreSmsChecked && !designlabSmsChecked
              && !productServiceSmsChecked
            }
          />
        </MobilePhoneColumn>
        <NotificationContainer>
          <MobileFlexColumn >
            <RightInfo>{formatMessage(messages.rightTime)}</RightInfo>
            <NotifcationContent>
              <MobileFlexColumn>
                <DesktopHeader>
                  {formatMessage(messages.title)}
                </DesktopHeader>
                <Title>
                  {formatMessage(messages.notifyOrderPayments)}&nbsp;
                  <Description>
                    {formatMessage(messages.notifyOrderPaymentsComment)}
                  </Description>
                </Title>
                <Title>
                  {formatMessage(messages.notifyProDesign)}&nbsp;
                  <Description>
                    {formatMessage(messages.notifyProDesignComment)}
                  </Description>
                </Title>
                <Title>
                  {formatMessage(messages.notifyTeamStore)}&nbsp;
                  <Description>
                    {formatMessage(messages.notifyTeamStoreComment)}
                  </Description>
                </Title>
                <Title>
                  {formatMessage(messages.notifyDesignLab)}&nbsp;
                  <Description>
                    {formatMessage(messages.notifyDesignLabComment)}
                  </Description>
                </Title>
                <Title>{formatMessage(messages.notifyProductService)}</Title>
                <Title>
                  {formatMessage(messages.newsletter)}&nbsp;
                  <Description>
                    {formatMessage(messages.newsletterComment)}
                  </Description>
                </Title>
              </MobileFlexColumn>
              <Column marginLeft="50px">
                <Header>{formatMessage(messages.email)}</Header>
                <CheckBoxStyled
                  checked={orderPaymentEmailChecked}
                  onChange={this.changeNotificationSettings('notifyOrderPayment', 'email')}
                />
                <CheckBoxStyled
                  checked={prodesignEmailChecked}
                  onChange={this.changeNotificationSettings('notifyProDesign', 'email')} />
                <CheckBoxStyled
                  checked={teamStoreEmailChecked}
                  onChange={this.changeNotificationSettings('notifyTeamStore', 'email')} />
                <CheckBoxStyled
                  checked={designlabEmailChecked}
                  onChange={this.changeNotificationSettings('notifyDesignLab', 'email')} />
                <CheckBoxStyled
                  checked={productServiceEmailChecked}
                  onChange={this.changeNotificationSettings('notifyProductService', 'email')} />
                <CheckBoxStyled
                  checked={notificationData && notificationData.newsletterSubscribed}
                  onChange={this.changeNewsletterSetting} />
              </Column>
              <Column marginLeft="30px">
                <Header>
                  SMS&nbsp;
                  <DesktopDescription>{formatMessage(messages.smsComment)}</DesktopDescription>
                </Header>
                <CheckBoxStyled
                  checked={orderPaymentSmsChecked}
                  onChange={this.changeNotificationSettings('notifyOrderPayment', 'sms')} />
                <CheckBoxStyled
                  checked={prodesignSmsChecked}
                  onChange={this.changeNotificationSettings('notifyProDesign', 'sms')} />
                <CheckBoxStyled
                  checked={teamStoreSmsChecked}
                  onChange={this.changeNotificationSettings('notifyTeamStore', 'sms')} />
                <CheckBoxStyled
                  checked={designlabSmsChecked}
                  onChange={this.changeNotificationSettings('notifyDesignLab', 'sms')} />
                <CheckBoxStyled
                  checked={productServiceSmsChecked}
                  onChange={this.changeNotificationSettings('notifyProductService', 'sms')} />
                <CheckBoxStyled
                  hide={true}
                  checked={false}
                  onChange={() => { }} />
              </Column>
              <DesktopPhoneColumn>
                <InputTitleContainer>
                  <Label>{formatMessage(messages.phone)}</Label>
                </InputTitleContainer>
                <PhoneInput
                  country={'us'}
                  value={phone}
                  countryCodeEditable={false}
                  onChange={value => {
                    this.debouncePhoneUpdate(value)
                  }}
                  inputProps={{ autoComplete: 'jv2' }}
                  inputStyle={{ borderRadius: 0, width: 250 }}
                  copyNumbersOnly={false}
                  disabled={!orderPaymentSmsChecked && !prodesignSmsChecked
                    && !teamStoreSmsChecked && !designlabSmsChecked
                    && !productServiceSmsChecked
                  }
                />
              </DesktopPhoneColumn>
              </NotifcationContent>
            </MobileFlexColumn>
            <AlertsColumn>
              <AlertsTitle>{formatMessage(messages.smsAlerts)}</AlertsTitle>
              <AlertsSubtitle>{formatMessage(messages.flexible)}</AlertsSubtitle>
              <NotificationImage src={Notification} />
            </AlertsColumn>
        </NotificationContainer>
        <Description>{formatMessage(messages.notificationComment)}</Description>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const notificationSettigs = state.get('notificationSettings').toJS()
  const app = state.get('app').toJS()
  return {
    ...notificationSettigs,
    ...app
  }
}

const PreferencesEnhance = compose(
  graphql(profileNotificationSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'notificationSettings'
  }),
  graphql(profilePhoneSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'phoneSettings'
  }),
  UpdateNotificationSettingMutation,
  UpdateNewsletterSettingMutation,
  UpdatePhoneSettingMutation,
  connect(
    mapStateToProps,
    {
      ...NotificationSettingsActions
    }
  )
)(Preferences)

export default PreferencesEnhance
