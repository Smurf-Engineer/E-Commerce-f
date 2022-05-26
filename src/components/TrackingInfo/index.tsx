/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { QueryProps } from '../../types/common'
import { getTrackingInfoQuery } from './data'
import {
  Container,
  DateIcon,
  DateLabel,
  Description,
  EventLabel,
  LoadingStep,
  LocationIcon,
  LocationLabel,
  ShowMoreButton,
  StatusIcon,
  StepsStyled,
  StepStyled,
  StyledDot,
  TimeLine,
  TimeLineItem,
  Title,
} from './styledComponents'
import get from 'lodash/get'
import moment from 'moment'
import messages from './messages'
import { statusColors, statusIcons, statusSteps } from './constants'
import Spin from 'antd/lib/spin'

interface Data extends QueryProps {
  trackingInfo: string
}

interface Props {
  data: Data
  code: string
  formatMessage: (messageDescriptor: any, variables?: {}) => string
}

export class TrackingInfo extends React.Component<Props, {}> {
  state = {
    showMore: false,
  }
  showMoreAction = () => {
    this.setState(({ showMore }) => ({ showMore: !showMore }))
  }
  render() {
    const {
      data,
      code,
      formatMessage,
    } = this.props
    const { showMore } = this.state
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
    let currentStatus = code ? 1 : 0
    if (code && actualStatus) {
      const alreadyPicked = actualStatus !== 'IN' || events.some((item) => item.derivedStatusCode === 'PU')
      const defaultCode = alreadyPicked ? 2 : 1
      currentStatus = statusSteps[actualStatus] || defaultCode
    }
    return (
      <Container>
        {code && data && data.loading && <LoadingStep><Spin size="small" /></LoadingStep>}
        <StepsStyled current={currentStatus}>
          <StepStyled icon={<StatusIcon type="file-done" />} title="Order Placed"/>
          <StepStyled icon={<StatusIcon type="shopping" />} title="Pre-Ship"/>
          <StepStyled icon={<StatusIcon type="inbox" />} title="Shipped"/>
          <StepStyled icon={<StatusIcon type="info-circle" />} title="In Transit"/>
          <StepStyled icon={<StatusIcon type="smile" />} title="Delivered"/>
        </StepsStyled>
        {events && events.length > 0 ? <>
          <Title>
            {formatMessage(messages.title)}
          </Title>
          <TimeLine secondary={!showMore && events.length > 4}>
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
              <EventLabel>
                {eventDescription}
              </EventLabel>
              <Description>
                <DateLabel>
                  {date ? <DateIcon type="clock-circle" /> : null}
                  {date ? moment(date).format('LT, MMM D') : null}
                </DateLabel>
                <LocationLabel>
                  {scanLocation && scanLocation.city  ? <LocationIcon type="environment" /> : null}
                  {scanLocation && scanLocation.city ? `(${scanLocation.city}, ${scanLocation.countryCode})` : null}
                </LocationLabel>
              </Description>
            </TimeLineItem>
          )}
        </TimeLine></> : null
        }
        {events && events.length > 4 &&
          <ShowMoreButton secondary={showMore} onClick={this.showMoreAction}>
            {formatMessage(messages[showMore ? 'showLess' : 'showMore'])}
          </ShowMoreButton>
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
