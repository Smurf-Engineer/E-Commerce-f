/**
 * NotificationHeader Component - Created by eduardoquintero on 19/08/20.
 */
import * as React from 'react'
import { Notification, Message } from '../../types/common'
import Badge from 'antd/lib/badge'
import ListHeader from './ListHeader'
import ListFooter from './ListFooter'
import Popover from 'antd/lib/popover'
import { Container, Image, overlayStyle, overlayMobileStyle, NotificationList, Empty } from './styledComponents'
import NotificationRow from './NotificationRow'
import messages from './messages'
import bell from '../../assets/bell.svg'

interface Props {
  history?: any
  notifications?: Notification[]
  isMobile?: boolean
  formatMessage: (messageDescriptor: Message) => string
  onPressNotification?: (id: number, url: string) => void
}

export class NotificationHeader extends React.PureComponent<Props, {}> {
  goToNotifications = () => {
    const { history } = this.props
    history.push('/account?option=notifications')
  }
  render() {
    const { isMobile, notifications = [], formatMessage, onPressNotification } = this.props
    const unreadTotal = notifications.length && notifications.filter((notification) => !notification.read).length

    const content = (
      <>
        {notifications.length ? <><NotificationList>
          {notifications.map(({ title, message, date, read, id, url }) => (
            <NotificationRow
              {...{ title, message, date, read, id, url }}
              onPress={onPressNotification}
            />
          ))}
        </NotificationList>
          <ListFooter {...{ formatMessage }} onViewAll={this.goToNotifications} /></>
          : <Empty>{formatMessage(messages.notFound)}</Empty>}
      </>
    )

    return (
      <Popover
        overlayStyle={isMobile ? overlayMobileStyle : overlayStyle}
        overlayClassName="notifications"
        trigger="click"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        title={<ListHeader {...{ formatMessage }} onMarkAll={null} />}
        content={content}
      >
        <Container>
          <Badge count={unreadTotal} overflowCount={9}>
            <Image src={bell} />
          </Badge>
        </Container>
      </Popover>
    )
  }

  handleOnVisibleChange = (visible: boolean) => {
    if (!visible) {
      this.setState({
        currentRegionTemp: null,
        currentLanguageTemp: null,
        currentCurrencyTemp: null
      })
    }
  }
}

export default NotificationHeader
