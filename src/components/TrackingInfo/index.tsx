/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { QueryProps } from '../../types/common'
import { getTrackingInfoQuery } from './data'
import {
  Container,
  DateLabel,
  EventLabel,
  LocationLabel,
  StatusIcon,
  StepsStyled,
  StepStyled,
  StyledDot,
  TimeLine,
  TimeLineItem,
  Title,
} from './styledComponents'
import get from 'lodash/get'
import { TIME_FORMAT } from '../../constants'
import moment from 'moment'
import messages from './messages'
import { statusColors, statusIcons, statusSteps } from './constants'

interface Data extends QueryProps {
  trackingInfo: string
}

interface Props {
  data: Data
  code: string
  formatMessage: (messageDescriptor: any, variables?: {}) => string
}

export class TrackingInfo extends React.Component<Props, {}> {
  render() {
    const {
      data,
      code,
      formatMessage,
    } = this.props
    const info = get(data, 'trackingInfo', '')
    let infoJson = {}
    try {
      infoJson = info ? JSON.parse(info) : {}
    } catch (error) {
      console.error(error)
    }

    const events = get(infoJson, 'output.completeTrackResults[0].trackResults[0].scanEvents', [])
    // tslint:disable-next-line: max-line-length
    const actualStatus = get(infoJson, 'output.completeTrackResults[0].trackResults[0].latestStatusDetail.derivedCode', '')
    return (
      <Container>
        <StepsStyled current={(code && actualStatus) ? statusSteps[actualStatus] || 2 : 0}>
          <StepStyled icon={<StatusIcon type="file-done" />} title="Order Placed"/>
          <StepStyled icon={<StatusIcon type="inbox" />} title="Shipped"/>
          <StepStyled icon={<StatusIcon type="info-circle" />} title="In Transit"/>
          <StepStyled icon={<StatusIcon type="smile" />} title="Delivered"/>
        </StepsStyled>
        {events && events.length > 0 ? <>
          <Title>
            {formatMessage(messages.title)}
          </Title>
          <TimeLine>
          {events.map(({ date, eventDescription, derivedStatusCode, scanLocation }: any, key: number) => 
            <TimeLineItem
              {...{ key }}
              dot={
                <StyledDot
                  color={statusColors[derivedStatusCode] || 'gray'}
                  type={statusIcons[derivedStatusCode] || 'info-circle'}
                />
              }
            >
              <DateLabel>
                {date ? moment(date).format(TIME_FORMAT) : ''}
              </DateLabel>
              <EventLabel>
                {eventDescription}
              </EventLabel>
              <LocationLabel>
                ({scanLocation && scanLocation.city ? `${scanLocation.city}, ${scanLocation.countryCode}` : ''})
              </LocationLabel>
            </TimeLineItem>
          )}
        </TimeLine></> : null
        }
      </Container>
    )
  }
}

interface OwnProps {
  code?: string
}

const TrackingInfoEnhance = compose(
  graphql(getTrackingInfoQuery, {
    options: ({ code }: OwnProps) => ({
      skip: !code,
      variables: { code }
    })
  })
)(TrackingInfo)

export default TrackingInfoEnhance
