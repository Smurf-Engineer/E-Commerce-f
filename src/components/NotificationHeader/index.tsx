/**
 * NotificationHeader Component - Created by eduardoquintero on 19/08/20.
 */
import * as React from 'react'
import { Notification } from '../../types/common'
import Badge from 'antd/lib/badge'
import Popover from 'antd/lib/popover'
import { Container, Image, overStyle } from './styledComponents'
import bell from '../../assets/bell.svg'

interface Props {
  history?: any
  totalItems: number
  notifications?: Notification[]
  isMobile?: boolean
}

export class NotificationHeader extends React.PureComponent<Props, {}> {
  componentDidMount() {
  }

  render() {
    const { isMobile, notifications = [] } = this.props
    const unreadTotal = notifications.length && notifications.filter((notification) => !notification.read).length

    return !isMobile ? (
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        content={<div>hola</div>}
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
