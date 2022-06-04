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
  StatusImage,
  StatusImageCheck,
  StatusImageDelivery,
  StatusImagePackage,
  StepsStyled,
  StepStyled,
  StyledDot,
  TimeLine,
  TimeLineItem
} from './styledComponents'
import get from 'lodash/get'
import moment from 'moment'
import packageEnabled from '../../assets/package_enabled.svg'
import finalCheckEnabled from '../../assets/final_check_enabled.svg'
import deliveryEnabled from '../../assets/delivery_enabled.svg'
import sewingEnabled from '../../assets/sewing_enabled.svg'
import messages from './messages'
import { statusColors, statusIcons, statusSteps } from './constants'
import Spin from 'antd/lib/spin'

interface Data extends QueryProps {
  trackingInfo: string
}

interface Props {
  data: Data
  code: string
  actualDeliver: string
  inProduction: boolean
  setDeliverDate: (date: string, isDeliver: boolean, dateRaw: string) => void
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
      actualDeliver,
      setDeliverDate,
      inProduction,
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
    const dateTimes = get(infoJson, 'output.completeTrackResults[0].trackResults[0].dateAndTimes', [])
    const scheduledObject = dateTimes.find((item: any) => item.type === 'ESTIMATED_DELIVERY')
    const deliveryObject = dateTimes.find((item: any) => item.type === 'ACTUAL_DELIVERY')
    const scheduleDate = scheduledObject && scheduledObject.dateTime ? 
      moment(scheduledObject.dateTime).local().format('dddd, M/D/YYYY [before] h:mm a') : ''
    const deliveredDate = deliveryObject && deliveryObject.dateTime ? 
      moment(deliveryObject.dateTime).local().format('dddd, M/D/YYYY h:mm a') : ''
    if (!actualDeliver && (deliveredDate || scheduleDate)) {
      const scheduleDateRaw = scheduledObject && scheduledObject.dateTime ? 
        scheduledObject.dateTime : ''
      const deliveredDateRaw = deliveryObject && deliveryObject.dateTime ? 
        deliveryObject.dateTime : ''
      setDeliverDate(deliveredDate || scheduleDate, !!deliveredDate, deliveredDateRaw || scheduleDateRaw)
    }
    // tslint:disable-next-line: max-line-length
    const actualStatus = get(infoJson, 'output.completeTrackResults[0].trackResults[0].latestStatusDetail.derivedCode', '')
    let currentStatus = 0
    if (code) {
      currentStatus = 2
      if (actualStatus) {
        const alreadyPicked = actualStatus !== 'IN' || events.some((item) => item.derivedStatusCode === 'PU')
        const defaultCode = alreadyPicked ? 3 : 2
        currentStatus = statusSteps[actualStatus] || defaultCode
      }
    } else if (!code && inProduction) {
      currentStatus = 1
    }
    return (
      <Container>
        {code && data && data.loading && <LoadingStep><Spin size="small" /></LoadingStep>}
        <StepsStyled current={currentStatus}>
          <StepStyled
            icon={<StatusIcon active={currentStatus >= 0} type="file-done" />}
            title="Order Placed"
          />
          <StepStyled
            icon={<StatusImage active={currentStatus > 0} src={sewingEnabled} />}
            title="In Production"
          />
          <StepStyled
            icon={<StatusImageCheck active={currentStatus > 1} src={finalCheckEnabled} />}
            title="Final Check"
          />
          <StepStyled
            icon={<StatusImagePackage active={currentStatus > 2} src={packageEnabled} />}
            title="Shipped"
          />
          <StepStyled
            icon={<StatusImageDelivery active={currentStatus > 3} src={deliveryEnabled} />}
            title="Delivered"
          />
        </StepsStyled>
        {events && events.length > 0 ?
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
        </TimeLine> : null
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
