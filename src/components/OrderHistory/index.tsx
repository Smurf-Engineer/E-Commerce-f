/**
 * OrderHistory Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import messages from './messages'
import { Container, Table, Row, Header } from './styledComponents'
import ItemOrder from './ItemOrder'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}

class OrderHistory extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    const header = (
      <MediaQuery maxWidth={768}>
        {matches => {
          if (matches) {
            return (
              <Row>
                <Header>{formatMessage(messages.orderNo)}</Header>
                <Header>{formatMessage(messages.date)}</Header>
                <Header>{formatMessage(messages.tracking)}</Header>
                <Header textAlign={'right'}>
                  {formatMessage(messages.status)}
                </Header>
              </Row>
            )
          } else {
            return (
              <Row>
                <Header>{formatMessage(messages.orderNumber)}</Header>
                <Header>{formatMessage(messages.date)}</Header>
                <Header>{formatMessage(messages.trackingNumber)}</Header>
                <Header textAlign={'right'}>
                  {formatMessage(messages.status)}
                </Header>
              </Row>
            )
          }
        }}
      </MediaQuery>
    )
    return (
      <Container>
        <Table>
          {header}
          <ItemOrder
            orderNumber={189417}
            date={'02/01/18'}
            status={'Order Processed'}
          />
        </Table>
      </Container>
    )
  }
}

export default OrderHistory
