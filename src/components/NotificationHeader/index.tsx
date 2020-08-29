/**
 * NotificationHeader Component - Created by eduardoquintero on 19/08/20.
 */
import * as React from 'react'
import { Notification, Message } from '../../types/common'
import Badge from 'antd/lib/badge'
import ListHeader from './ListHeader'
import ListFooter from './ListFooter'
import Popover from 'antd/lib/popover'
import { Container, Image, overlayStyle, overlayMobileStyle, NotificationList } from './styledComponents'
import NotificationRow from './NotificationRow'
import bell from '../../assets/bell.svg'

interface Props {
  history?: any
  notifications?: Notification[]
  isMobile?: boolean
  formatMessage: (messageDescriptor: Message) => string
}

export class NotificationHeader extends React.PureComponent<Props, {}> {
  componentDidMount() {
  }

  render() {
    const { isMobile, notifications = [], formatMessage } = this.props
    const unreadTotal = notifications.length && notifications.filter((notification) => !notification.read).length

    const content = (
      <>
        <NotificationList>
          {notifications.map(({ title, message, date, read }) => (
            <NotificationRow
              {...{ title, message, date, read }}
              onPress={null}
            />
          ))}
        </NotificationList>
        <ListFooter {...{ formatMessage }} onViewAll={null} />
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
