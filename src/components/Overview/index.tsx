/**
 * Overview Component - Created by miguelcanobbio on 17/07/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container, BottomContainer } from './styledComponents'
import OverviewHeader from './OverviewHeader'
import OrdersList from '../OrderHistory/OrdersList'

interface Props {
  history: any
  formatMessage: (messageDescriptor: any) => string
}

class Overview extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        <OverviewHeader
          width="100%"
          label={formatMessage(messages.title)}
          {...{ formatMessage }}
        />
        <OrdersList
          customLimit={5}
          currentPage={1}
          orderBy="id"
          sort="desc"
          interactiveHeaders={false}
          withPagination={false}
          withoutPadding={true}
          {...{ formatMessage }}
        />
        <BottomContainer>
          <OverviewHeader
            width="32%"
            label={formatMessage(messages.profile)}
            {...{ formatMessage }}
          />
          <OverviewHeader
            width="32%"
            label={formatMessage(messages.addresses)}
            {...{ formatMessage }}
          />
          <OverviewHeader
            width="32%"
            label={formatMessage(messages.payment)}
            {...{ formatMessage }}
          />
        </BottomContainer>
      </Container>
    )
  }
}

export default Overview
