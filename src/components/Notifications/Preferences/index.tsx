import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import MessageBar from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import messages from './messages'
import * as NotificationSettingsActions from './actions'
import {
  profileNotificationSettingsQuery,
  UpdateNotificationSettingMutation,
  UpdateNewsletterSettingMutation
} from './data'
import {
  Container,
  NotificationContainer,
  Column,
  Header,
  Title,
  Description,
  LoadingContainer,
  CheckBoxStyled
} from './styledComponents'
import { NotificationOption, NotificationSettings } from '../../../types/common'
import { Message } from '../../../types/common'
import { SPLIT_BY_CAPITAL_REGEX } from '../constants'

interface NotificationSetting {
  notificationData: NotificationSettings
}

interface Props {
  loadingSettings: Boolean
  notificationSettings: NotificationSetting
  formatMessage: (messageDescriptor: Message) => string
  updateNotification: (variables: {}) => void
  updateNewsletterSubscribed: (variables: {}) => void
  setSettingsLoadingAction: (loading: boolean) => void
}

class Preferences extends React.Component<Props, {}> {

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
          if (key === 'notifyProductService') {
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
          if (key === 'notifyProductService') {
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
      formatMessage
    } = this.props

    const orderPaymentEmailChecked = this.isNotificationSetTo('notifyOrderPayment', NotificationOption.EMAIL)
    const prodesignEmailChecked = this.isNotificationSetTo('notifyProDesign', NotificationOption.EMAIL)
    const productServiceEmailChecked = this.isNotificationSetTo('notifyProductService', NotificationOption.EMAIL)
    const orderPaymentSmsChecked = this.isNotificationSetTo('notifyOrderPayment', NotificationOption.SMS)
    const prodesignSmsChecked = this.isNotificationSetTo('notifyProDesign', NotificationOption.SMS)
    const productServiceSmsChecked = this.isNotificationSetTo('notifyProductService', NotificationOption.SMS)

    return (
      <Container>
        {
          loadingSettings &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
        <NotificationContainer>
          <Column>
            <Header>{formatMessage(messages.title)}</Header>
            <Title>{formatMessage(messages.notifyOrderPayments)}</Title>
            <Title>{formatMessage(messages.notifyProDesign)}</Title>
            <Title>{formatMessage(messages.notifyProductService)}</Title>
            <Title>
              {formatMessage(messages.newsletter)}&nbsp;
              <Description>
                {formatMessage(messages.newsletterComment)}
              </Description>
            </Title>
          </Column>
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
              checked={productServiceEmailChecked}
              onChange={this.changeNotificationSettings('notifyProductService', 'email')} />
            <CheckBoxStyled
              checked={notificationData && notificationData.newsletterSubscribed}
              onChange={this.changeNewsletterSetting} />
          </Column>
          <Column marginLeft="30px">
            <Header>
              SMS&nbsp;<Description>{formatMessage(messages.smsComment)}</Description>
            </Header>
            <CheckBoxStyled
              checked={orderPaymentSmsChecked}
              onChange={this.changeNotificationSettings('notifyOrderPayment', 'sms')} />
            <CheckBoxStyled
              checked={prodesignSmsChecked}
              onChange={this.changeNotificationSettings('notifyProDesign', 'sms')} />
            <CheckBoxStyled
              checked={productServiceSmsChecked}
              onChange={this.changeNotificationSettings('notifyProductService', 'sms')} />
            <CheckBoxStyled
              hide={true}
              checked={false}
              onChange={() => { }} />
          </Column>
        </NotificationContainer>
        <Description>{formatMessage(messages.notificationComment)}</Description>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('notificationSettings').toJS()

const PreferencesEnhance = compose(
  graphql(profileNotificationSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'notificationSettings'
  }),
  UpdateNotificationSettingMutation,
  UpdateNewsletterSettingMutation,
  connect(
    mapStateToProps,
    {
      ...NotificationSettingsActions
    }
  )
)(Preferences)

export default PreferencesEnhance
