/**
 * Notifications Component - Created by eduardoquintero on 26/08/20.
 */
import * as React from 'react'
import messages from './messages'
import { connect } from 'react-redux'
import zenscroll from 'zenscroll'
import * as NotificationsActions from './actions'
import { notificationsQuery, setAsRead, setAllAsRead, deleteMutation } from './data'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import AntdMessage from 'antd/lib/message'
import Pagination from 'antd/lib/pagination/Pagination'
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
import Preferences from './Preferences'
import { NOTIFICATIONS_LIMIT } from './constants'
import { Message, Header, Notification as NotificationType, QueryProps, MessagePayload } from '../../types/common'
import { DATE } from '../../constants'

interface Props {
  notificationsData: NotificationsData
  fromAdmin?: boolean
  history: any
  isMobile?: boolean
  currentPage: number
  formatMessage: (messageDescriptor: Message) => string
  readNotification: (variables: {}) => Promise<NotificationsRead>
  deleteNotification: (variables: {}) => Promise<MessagePayload>
  updateScreen?: () => void
  readNAllotification: (variables: {}) => Promise<MessagePayload>
  setCurrentPageAction: (page: number) => void
  setSettingsLoadingAction: (key: string, loading: boolean) => void
}

const NOTIFICATIONS = 'notifications'

const notificationsHeader: Header[] = [
  { message: '', width: 5, tabletWidth: 5, fieldName: '' },
  { message: 'notification', width: 45, tabletWidth: 45, fieldName: 'message' },
  { message: 'date', width: 30, tabletWidth: 30, fieldName: 'date', dataType: DATE }
]

const optionalHeaders: Header[] = [
  { message: 'user', width: 20, tabletWidth: 20, fieldName: 'user' },
  { message: 'email', width: 20, tabletWidth: 20, fieldName: 'email' },
]

export type NotificationResults = {
  fullCount: number
  list: NotificationType[]
}

interface NotificationsData extends QueryProps {
  notifications: NotificationResults
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

  markAsRead = async (notificationId: number) => {
    const { readNotification, notificationsData, fromAdmin } = this.props
    await readNotification({
      variables: {
        shortId: notificationId,
        isAdmin: fromAdmin
      }
    })
    await notificationsData.refetch()
  }

  handleDelete = async (notificationId: number) => {
    const { deleteNotification, notificationsData, fromAdmin } = this.props
    await deleteNotification({
      variables: {
        shortId: notificationId,
        isAdmin: fromAdmin
      }
    })
    await notificationsData.refetch()
  }

  changePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
    if (window && zenscroll) {
      zenscroll.toY(0, 0)
    }
  }

  render() {
    const { updating } = this.state
    const {
      formatMessage,
      notificationsData: { notifications, loading },
      fromAdmin = false,
      currentPage,
    } = this.props
    const notificationsList = get(notifications, 'list', [])
    const fullCount = get(notifications, 'fullCount', 0)

    return (
      <Container>
        {fromAdmin && <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>}
        {!loading &&
          <>
            <Preferences
              {...{
                formatMessage
              }}
            />
            <NotificationsHeader>
              <Latest>{formatMessage(messages.latest)}</Latest>
              <BorderlessButton type="ghost" loading={updating} onClick={this.markAllAsRead}>
                {formatMessage(messages.markAll)}
              </BorderlessButton>
            </NotificationsHeader>
            <SimpleTable
              {...{
                formatMessage
              }}
              markAsRead={this.markAsRead}
              data={notificationsList || []}
              headerTitles={fromAdmin ? [...notificationsHeader, ...optionalHeaders] : notificationsHeader}
              targetGroup={NOTIFICATIONS}
              notifications={true}
              onPressDelete={this.handleDelete}
              onPressRow={this.handleOnPressNotification}
            />
            <PaginationContainer>
              <Pagination
                current={currentPage}
                pageSize={NOTIFICATIONS_LIMIT}
                total={Number(fullCount)}
                onChange={this.changePage}
              />
            </PaginationContainer>

          </>}
        {loading && <Spin />}
        {!loading && !notificationsList.length && <EmptyMessage>{formatMessage(messages.notFound)}</EmptyMessage>}
      </Container>
    )
  }
}

interface OwnProps {
  fromAdmin?: boolean
  currentPage?: number
}

const mapStateToProps = (state: any) => state.get('notifications').toJS()

const NotificationsEnhance = compose(
  connect(mapStateToProps, { ...NotificationsActions }),
  graphql<NotificationsData>(notificationsQuery, {
    name: 'notificationsData',
    options: ({ fromAdmin, currentPage = 0 }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * NOTIFICATIONS_LIMIT : 0

      return {
        variables: {
          isAdmin: fromAdmin,
          limit: NOTIFICATIONS_LIMIT,
          offset
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  deleteMutation,
  setAsRead,
  setAllAsRead
)(Notifications)

export default NotificationsEnhance
