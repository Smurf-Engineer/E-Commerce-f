/**
 * StoreForm Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import DatePicker from 'antd/lib/date-picker'
import moment, { Moment } from 'moment'
import {
  Container,
  Label,
  Column,
  Error,
  Required,
  inputStyle
} from './styledComponents'
import { validateHolidayQuery } from './data'
import messages from './messages'

interface Props {
  hasError?: boolean
  name: string
  startDate?: Moment
  endDate?: Moment
  validateHoliday: any
  onUpdateName: (name: string) => void
  onSelectStartDate: (dateMoment: Moment, date: string) => void
  onSelectEndDate: (dateMoment: Moment, date: string) => void
  formatMessage: (messageDescriptor: any) => string
}

const StoreForm = ({
  hasError = false,
  onUpdateName,
  onSelectStartDate,
  onSelectEndDate,
  name,
  startDate,
  endDate,
  formatMessage,
  validateHoliday
}: Props) => {
  const handleUpdateName = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = evnt

    if (value.length > 15) {
      return
    }

    onUpdateName(value)
  }

  const disabledStartDate = (current: any) => {
    if (!current) {
      return false
    }

    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)
    return current.valueOf() < date.valueOf()
  }

  const disabledEndDate = (current: any) => {
    if (!current) {
      return false
    }

    let isLessThanDeliveryDate = false
    if (startDate) {
      const cutOffDate = startDate.clone()
      cutOffDate.add(15, 'days')
      isLessThanDeliveryDate = current.valueOf() < cutOffDate.valueOf()
    }

    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)

    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()
    date.add(15, 'days')
    const isLessThanFourteenDays = current.valueOf() < date.valueOf()
    date.add(45, 'days')
    const isGreaterThanSixtyDays = current.valueOf() > date.valueOf()

    return (
      isBeforeOfCurrentDay ||
      isLessThanFourteenDays ||
      isGreaterThanSixtyDays ||
      isLessThanDeliveryDate
    )
  }

  const handleOnSelectStart = (date: Moment, dateString: string) => {
    console.log(date, dateString)
    onSelectStartDate(date, dateString)
  }

  const handleOnSelectEnd = async (date: Moment, dateString: string) => {
    if (date) {
      const dateObj = {
        day: parseInt(date.format('D'), 10),
        month: parseInt(date.format('M'), 10),
        year: parseInt(date.format('YYYY'), 10)
      }
      try {
        const {
          data: { isHoliday }
        } = await validateHoliday({
          variables: { date: dateObj }
        })

        if ((date && date.weekday() === 0) || isHoliday) {
          message.warning(formatMessage(messages.deliveryErrorLabel))
          return
        }
      } catch (error) {
        message.error(formatMessage(messages.errorMsg))
      }
    }
    onSelectEndDate(date, dateString)
  }

  return (
    <Container>
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
        {hasError &&
          !name && <Error>{formatMessage(messages.requiredFieldLabel)}</Error>}
      </Column>
      <Column>
        <Label>
          {formatMessage(messages.orderCutOffLabel)} <Required>*</Required>
        </Label>
        <DatePicker
          value={startDate}
          disabledDate={disabledStartDate}
          onChange={handleOnSelectStart}
          format="YYYY-MM-DD" // TODO: Change format
          size="large"
          style={inputStyle}
        />
        {hasError &&
          !startDate && (
            <Error>{formatMessage(messages.requiredFieldLabel)}</Error>
          )}
      </Column>
      <Column>
        <Label>
          {formatMessage(messages.desiredDeliveryLabel)} <Required>*</Required>
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
        {hasError &&
          !endDate && (
            <Error>{formatMessage(messages.requiredFieldLabel)}</Error>
          )}
      </Column>
    </Container>
  )
}

const StoreFormEnhance = compose(validateHolidayQuery)(StoreForm)
export default StoreFormEnhance
