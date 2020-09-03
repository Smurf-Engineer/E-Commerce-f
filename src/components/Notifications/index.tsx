/**
 * Notifications Component - Created by eduardoquintero on 27/08/20.
 */
import * as React from 'react'
import messages from './messages'
import { notificationsQuery } from './data'
import Spin from 'antd/lib/spin'
import { graphql, compose } from 'react-apollo'
import SimpleTable from '../SimpleTable'
import { Container, NotificationsHeader, Latest, ScreenTitle, BorderlessButton, EmptyMessage } from './styledComponents'
import { Message, Header, Notification as NotificationType, QueryProps } from '../../types/common'
import { DATE } from '../../constants'

interface Props {
  notificationsData: NotificationsData
  fromAdmin?: boolean
  formatMessage: (messageDescriptor: Message) => string
}

const NOTIFICATIONS = 'notifications'

const notificationsHeader: Header[] = [
  { message: '', width: 5, tabletWidth: 5, fieldName: '' },
  { message: 'notification', width: 45, tabletWidth: 45, fieldName: 'message' },
  { message: 'date', width: 30, tabletWidth: 30, fieldName: 'date', dataType: DATE },
  { message: 'source', width: 20, tabletWidth: 20, fieldName: 'notificationType' },
]

const optionalHeaders: Header[] = [
  { message: 'user', width: 20, tabletWidth: 20, fieldName: 'user' },
  { message: 'email', width: 20, tabletWidth: 20, fieldName: 'email' },
]

interface NotificationsData extends QueryProps {
  notifications: NotificationType[]
  loading: boolean
}

class Notifications extends React.Component<Props, {}> {
  state = {
    updating: false
  }
  markAllAsRead = () => {
    this.setState({ updating: true })
  }
  render() {
    const { updating } = this.state
    const {
      formatMessage,
      notificationsData: { notifications = [], loading },
      fromAdmin = false
    } = this.props

    return (
      <Container>
        {fromAdmin && <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>}
        {!loading &&
          <><NotificationsHeader>
            <Latest>{formatMessage(messages.latest)}</Latest>
            <BorderlessButton type="ghost" loading={updating} onClick={this.markAllAsRead}>
              {formatMessage(messages.markAll)}
            </BorderlessButton>
          </NotificationsHeader>
            <SimpleTable
              {...{
                formatMessage
              }}
              data={notifications || []}
              headerTitles={fromAdmin ? [...notificationsHeader, ...optionalHeaders] : notificationsHeader}
              targetGroup={NOTIFICATIONS}
              canDelete={false}
              notifications={true}
            /></>}
        {loading && <Spin />}
        {!loading && !notifications.length && <EmptyMessage>{formatMessage(messages.notFound)}</EmptyMessage>}

      </Container>
    )
  }
}

interface OwnProps {
  fromAdmin?: boolean
}

const NotificationsEnhance = compose(
  graphql<NotificationsData>(notificationsQuery, {
    name: 'notificationsData',
    options: ({ fromAdmin }: OwnProps) => ({
      variables: {
        isAdmin: fromAdmin
      }
    })
  })
)(Notifications)

export default NotificationsEnhance
