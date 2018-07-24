/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Icon from 'antd/lib/icon'
import { Container, ViewContainer, ScreenTitle } from './styledComponents'

interface Props {
  orderId: string
  formatMessage: (messageDescriptor: any) => string
  onReturn: (id: string) => void
}

class OrderDetails extends React.Component<Props, {}> {
  render() {
    const { formatMessage, onReturn } = this.props

    const handleOnReturn = () => onReturn('')

    return (
      <Container>
        <ViewContainer onClick={handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(messages.back)}</span>
        </ViewContainer>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
      </Container>
    )
  }
}

export default OrderDetails
