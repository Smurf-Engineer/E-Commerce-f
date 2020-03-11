/**
 * StoreForm Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'antd/lib/modal'
import moment, { Moment } from 'moment'
import {
  Container,
  Label,
  Column,
  Error,
  Required,
  inputStyle,
  TeamStoreTypeLabel,
  ShipLabel,
  RightLabels,
  Fields,
  Question,
  ModalTitle,
  InfoBody,
  buttonStyle
} from './styledComponents'
import messages from './messages'

const { info } = Modal

interface Props {
  hasError?: boolean
  name: string
  startDate?: Moment
  endDate?: Moment
  onDemand?: boolean
  validateHoliday: any
  cutoffDays: number
  onUpdateName: (name: string) => void
  onSelectStartDate: (dateMoment: Moment, date: string) => void
  onSelectEndDate: (dateMoment: Moment | null, date: string) => void
  formatMessage: (messageDescriptor: any) => string
}
const INPUT_MAX_LENGTH = 25
const StoreForm = ({
  hasError = false,
  onUpdateName,
  onSelectStartDate,
  onSelectEndDate,
  name,
  startDate,
  endDate,
  onDemand,
  formatMessage,
  validateHoliday,
  cutoffDays
}: Props) => {
  const handleUpdateName = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = evnt

    if (value.length > INPUT_MAX_LENGTH) {
      return
    }

    onUpdateName(value)
  }

  const disabledStartDate = (current: any) => {
    console.log(current)
    if (!current) {
      return false
    }

    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)

    date.add('1', 'days')
    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()

    date.add(cutoffDays, 'days')
    const isGreaterThanFourteenDays = current.valueOf() > date.valueOf()

    return isBeforeOfCurrentDay || isGreaterThanFourteenDays
  }

  const disabledEndDate = (current: any) => {
    if (!current) {
      return false
    }
    let isLessThanDeliveryDate = false
    let isGreaterThanTwentyDays = false
    if (startDate) {
      const maxEndDate = startDate.clone()
      maxEndDate.add(15, 'days')
      isLessThanDeliveryDate = current.valueOf() < maxEndDate.valueOf()
      maxEndDate.add(6, 'days')
      isGreaterThanTwentyDays = current.valueOf() > maxEndDate.valueOf()
    }

    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)

    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()
    date.add(15, 'days')

    return (
      isBeforeOfCurrentDay || isLessThanDeliveryDate || isGreaterThanTwentyDays
    )
  }

  const handleOnSelectStart = (date: Moment, dateString: string) => {
    onSelectStartDate(date, dateString)
  }

  const handleOnSelectEnd = async (date: Moment, dateString: string) => {
    if (date) {
      try {
        if (date && (date.weekday() === 0 || date.weekday() === 6)) {
          message.warning(formatMessage(messages.deliveryErrorLabel))
          onSelectEndDate(null, '')
          return
        }
      } catch (error) {
        message.error(formatMessage(messages.errorMsg))
      }
    }
    onSelectEndDate(date, dateString)
  }

  const openInfo = () => {
    info({
      title: <ModalTitle>{formatMessage(messages.aboutCutOff)}</ModalTitle>,
      icon: ' ',
      okText: formatMessage(messages.gotIt),
      okButtonProps: {
        style: buttonStyle
      },
      content: <InfoBody>{formatMessage(messages.aboutCutOffInfo)}</InfoBody>
    })
  }

  const openDeliveryInfo = () => {
    info({
      title: <ModalTitle>{formatMessage(messages.aboutDelivery)}</ModalTitle>,
      icon: ' ',
      okText: formatMessage(messages.gotIt),
      okButtonProps: {
        style: buttonStyle
      },
      content: <InfoBody>{formatMessage(messages.aboutDeliveryInfo)}</InfoBody>
    })
  }

  return (
    <Container>
      <RightLabels>
        {onDemand && <ShipLabel>{formatMessage(messages.shipping)}</ShipLabel>}
        <TeamStoreTypeLabel>
          {formatMessage(onDemand ? messages.onDemandMode : messages.fixedMode)}
        </TeamStoreTypeLabel>
      </RightLabels>
      <Fields>
        <Column>
          <Label>
            {formatMessage(messages.teamStoreName)} <Required>*</Required>
          </Label>
          <Input
            value={name}
            placeholder="Store Name"
            size="large"
            onChange={handleUpdateName}
          />
          {hasError && !name && (
            <Error>{formatMessage(messages.requiredFieldLabel)}</Error>
          )}
        </Column>
        {!onDemand && (
          <React.Fragment>
            <Column>
              <Label>
                {formatMessage(messages.orderCutOffLabel)}
                <Required>*</Required>
                <Question onClick={openInfo} type="question-circle" />
              </Label>
              <DatePicker
                value={startDate}
                disabledDate={disabledStartDate}
                onChange={handleOnSelectStart}
                format="YYYY-MM-DD" // TODO: Change format
                size="large"
                style={inputStyle}
              />
              {hasError && !startDate && (
                <Error>{formatMessage(messages.requiredFieldLabel)}</Error>
              )}
            </Column>
            <Column>
              <Label>
                {formatMessage(messages.desiredDeliveryLabel)}
                <Required>*</Required>
                <Question onClick={openDeliveryInfo} type="question-circle" />
              </Label>
              <DatePicker
                value={endDate}
                disabledDate={disabledEndDate}
                onChange={handleOnSelectEnd}
                disabled={!startDate}
                format="YYYY-MM-DD" // TODO: Change format
                size="large"
                style={inputStyle}
              />
              {hasError && !endDate && (
                <Error>{formatMessage(messages.requiredFieldLabel)}</Error>
              )}
            </Column>
          </React.Fragment>
        )}
      </Fields>
    </Container>
  )
}

export default StoreForm
