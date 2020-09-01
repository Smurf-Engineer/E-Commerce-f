/**
 * Notifications Component - Created by eduardoquintero on 27/08/20.
 */
import * as React from 'react'
import messages from './messages'
import { notificationsQuery } from './data'
import { graphql, compose } from 'react-apollo'
import SimpleTable from '../SimpleTable'
import { Container, NotificationsHeader, Latest, Button, ScreenTitle } from './styledComponents'
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

interface NotificationsData extends QueryProps {
  notifications: NotificationType[]
}

class Notifications extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      notificationsData: { notifications },
      fromAdmin = false
    } = this.props

    return (
      <Container>
        {fromAdmin && <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>}
        <NotificationsHeader>
          <Latest>{formatMessage(messages.latest)}</Latest>
          <Button>{formatMessage(messages.markAll)}</Button>
        </NotificationsHeader>
        <SimpleTable
          {...{
            formatMessage
          }}
          data={notifications || []}
          headerTitles={notificationsHeader}
          targetGroup={NOTIFICATIONS}
          canDelete={false}
          notifications={true}
        />
      </Container>
    )
  }
}

const NotificationsEnhance = compose(
  graphql<NotificationsData>(notificationsQuery, {
    name: 'notificationsData',
  })
)(Notifications)

export default NotificationsEnhance
