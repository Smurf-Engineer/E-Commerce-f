/**
 * NotificationHeader Component - Created by eduardoquintero on 19/08/20.
 */
import * as React from 'react'
import { Notification, Message } from '../../types/common'
import Badge from 'antd/lib/badge'
import ListHeader from './ListHeader'
import ListFooter from './ListFooter'
import Popover from 'antd/lib/popover'
import { Container, Image, overlayStyle, NotificationList } from './styledComponents'
import Options from './Options'
import bell from '../../assets/bell.svg'

interface Props {
  history?: any
  totalItems: number
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
          <Options
            title="Language"
            options={[{ id: 1, name: ' Eduardo', shortName: 'ED' }]}
            onPress={() => console.log('A')}
          />
          <Options
            title="Language"
            options={[{ id: 1, name: ' Eduardo', shortName: 'ED' }]}
            onPress={() => console.log('A')}
          />
          <Options
            title="Language"
            options={[{ id: 1, name: ' Eduardo', shortName: 'ED' }]}
            onPress={() => console.log('A')}
          />
          <Options
            title="Language"
            options={[{ id: 1, name: ' Eduardo', shortName: 'ED' }]}
            onPress={() => console.log('A')}
          />
        </NotificationList>
        <ListFooter {...{ formatMessage }} onViewAll={() => console.log('a')} />
      </>
    )

    return !isMobile ? (
      <Popover
        overlayStyle={overlayStyle}
        overlayClassName="notifications"
        trigger="click"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        title={<ListHeader {...{ formatMessage }} onMarkAll={() => console.log()} />}
        content={content}
      >
        <Container>
          <Badge count={unreadTotal} overflowCount={9}>
            <Image src={bell} onClick={this.gotoCartpage} />
          </Badge>
        </Container>
      </Popover>
    ) : (
        <div>
          <Container>
            <Badge count={unreadTotal} overflowCount={9}>
              <Image src={bell} onClick={this.gotoCartpage} />
            </Badge>
          </Container>
          {/* <Modal
            visible={openModal}
            footer={null}
            closable={false}
            maskClosable={true}
            onCancel={this.handleModalClick}
            width={'80%'}
          >
            {innerContent}
          </Modal>*/ }
        </div>
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

  gotoCartpage = () => {
    const {
      history: { push },
    } = this.props

    push('/shopping-cart')
  }
}

export default NotificationHeader
