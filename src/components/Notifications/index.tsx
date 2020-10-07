/**
 * Notifications Component - Created by eduardoquintero on 27/08/20.
 */
import * as React from 'react'
import messages from './messages'
import { notificationsQuery, setAsRead, setAllAsRead } from './data'
import Spin from 'antd/lib/spin'
import AntdMessage from 'antd/lib/message'
import { graphql, compose } from 'react-apollo'
import SimpleTable from '../SimpleTable'
import {
  Container,
  NotificationsHeader,
  Latest,
  ScreenTitle,
  BorderlessButton,
  EmptyMessage,
  PaginationContainer
} from './styledComponents'
import { Message, Header, Notification as NotificationType, QueryProps, MessagePayload } from '../../types/common'
import { DATE } from '../../constants'

interface Props {
  notificationsData: NotificationsData
  fromAdmin?: boolean
  history: any
  isMobile?: boolean
  formatMessage: (messageDescriptor: Message) => string
  readNotification: (variables: {}) => Promise<NotificationsRead>
  updateScreen?: () => void
  readNAllotification: (variables: {}) => Promise<MessagePayload>
}

const NOTIFICATIONS = 'notifications'

const notificationsHeader: Header[] = [
  { message: '', width: 5, tabletWidth: 5, fieldName: '' },
  { message: 'notification', width: 45, tabletWidth: 45, fieldName: 'message' },
  { message: 'date', width: 30, tabletWidth: 30, fieldName: 'date', dataType: DATE }
]

const sourceHeader: Header[] = [
  { message: 'source', width: 20, tabletWidth: 20, fieldName: 'notificationType' }
]

const optionalHeaders: Header[] = [
  { message: 'user', width: 20, tabletWidth: 20, fieldName: 'user' },
  { message: 'email', width: 20, tabletWidth: 20, fieldName: 'email' },
]

interface NotificationsData extends QueryProps {
  notifications: NotificationType[]
  loading: boolean
}

interface NotificationsRead extends QueryProps {
  notification: NotificationType
  loading: boolean
}

class Notifications extends React.Component<Props, {}> {
  state = {
    updating: false
  }

  async componentDidMount() {
    navigator.serviceWorker.addEventListener('message', (notification) => {
      this.reloadNotifications()
    })
  }

  reloadNotifications = async () => {
    const { notificationsData } = this.props
    await notificationsData.refetch()
  }

  markAllAsRead = async () => {
    const { readNAllotification, fromAdmin, notificationsData, formatMessage } = this.props
    try {
      this.setState({ updating: true })
      await readNAllotification({ variables: { isAdmin: fromAdmin } })
      await notificationsData.refetch()
      this.setState({ updating: false })
    } catch (e) {
      this.setState({ updating: false })
      AntdMessage.error(formatMessage(messages.readError))
    }
  }

  handleOnPressNotification = async (notificationId: number, url: string) => {
    const { history, readNotification, updateScreen, fromAdmin } = this.props
    await readNotification({
      variables: {
        shortId: notificationId,
        isAdmin: fromAdmin
      }
    })
    history.push(`/${url}`)
    if (updateScreen) {
      updateScreen()
    }
  }
  render() {
    const { updating } = this.state
    const {
      formatMessage,
      notificationsData: { notifications = [], loading },
      fromAdmin = false,
      isMobile = false
    } = this.props
    const headers = !isMobile ? [...notificationsHeader, ...sourceHeader] : notificationsHeader
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
              headerTitles={fromAdmin ? [...notificationsHeader, ...optionalHeaders] : headers}
              targetGroup={NOTIFICATIONS}
              canDelete={false}
              notifications={true}
              onPressRow={this.handleOnPressNotification}
            />
            <PaginationContainer>
              {/* <Pagination
                current={0}
                pageSize={20}
                total={Number(100)}
                onChange={null}
              /> */}
            </PaginationContainer>

          </>}
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
      },
      fetchPolicy: 'network-only'
    })
  }),
  setAsRead,
  setAllAsRead
)(Notifications)

export default NotificationsEnhance
