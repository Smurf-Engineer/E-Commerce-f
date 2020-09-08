/**
 * Notifications Component - Created by eduardoquintero on 27/08/20.
 */
import * as React from 'react'
import messages from './messages'
import { notificationsQuery, setAsRead } from './data'
import Spin from 'antd/lib/spin'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import SimpleTable from '../SimpleTable'
import { Container, NotificationsHeader, Latest, ScreenTitle, BorderlessButton, EmptyMessage } from './styledComponents'
import Pagination from 'antd/lib/pagination/Pagination'
import { Message, Header, Notification as NotificationType, QueryProps } from '../../types/common'
import { DATE } from '../../constants'
import { NOTIFICATIONS_LIMIT } from './constants'

interface Props {
  notificationsData: NotificationsData
  fromAdmin?: boolean
  history: any
  currentPage: number
  formatMessage: (messageDescriptor: Message) => string
  readNotification: (variables: {}) => Promise<NotificationsRead>
  updateScreen?: () => void
  changePage: (page: number) => void
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
  notificationsResult: {
    fullCount: number
    notifications: NotificationType[]
  },
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

  markAllAsRead = () => {
    this.setState({ updating: true })
  }

  handleOnPressNotification = async (notificationId: number, url: string) => {
    const { history, readNotification, updateScreen } = this.props
    await readNotification({
      variables: {
        id: notificationId
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
      notificationsData: { notificationsResult, loading },
      fromAdmin = false,
      currentPage,
      changePage
    } = this.props

    const notifications = get(notificationsResult, 'notifications', [])
    const fullCount = get(notificationsResult, 'fullCount', 0)
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
              onPressRow={this.handleOnPressNotification}
            />
            <Pagination
              current={currentPage}
              pageSize={NOTIFICATIONS_LIMIT}
              total={Number(fullCount)}
              onChange={changePage}
            />
          </>}
        {loading && <Spin />}
        {!loading && !notifications.length && <EmptyMessage>{formatMessage(messages.notFound)}</EmptyMessage>}
      </Container>
    )
  }
}

interface OwnProps {
  fromAdmin?: boolean
  currentPage?: number
  customLimit?: number
}

const NotificationsEnhance = compose(
  graphql<NotificationsData>(notificationsQuery, {
    name: 'notificationsData',
    options: ({
      fromAdmin,
      currentPage,
      customLimit
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : NOTIFICATIONS_LIMIT
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          isAdmin: fromAdmin,
          limit,
          offset
        }
      }
    }
  }),
  setAsRead
)(Notifications)

export default NotificationsEnhance
