/**
 * StoreForm Component - Created by david on 09/04/18.
 */
import * as React from 'react'
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

interface Props {
  hasError?: boolean
  name: string
  startDate?: Moment
  endDate?: Moment
  onUpdateName: (name: string) => void
  onSelectStartDate: (dateMoment: Moment, date: string) => void
  onSelectEndDate: (dateMoment: Moment, date: string) => void
}

const StoreForm = ({
  hasError = false,
  onUpdateName,
  onSelectStartDate,
  onSelectEndDate,
  name,
  startDate,
  endDate
}: Props) => {
  const handleUpdateName = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evnt

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

  const handleOnSelectStart = (date: Moment, dateString: string) =>
    onSelectStartDate(date, dateString)

  const handleOnSelectEnd = (date: Moment, dateString: string) => {
    // TODO: Validate for Federal Holiday
    if (date && date.weekday() === 0) {
      message.warning('Delivery date cannot be on a Sunday or Federal Holiday')
      return
    }

    onSelectEndDate(date, dateString)
  }

  return (
    <Container>
      <Column>
        <Label>
          Team Store Name <Required>*</Required>
        </Label>
        <Input
          value={name}
          placeholder="Store Name"
          size="large"
          onChange={handleUpdateName}
        />
        {hasError && <Error>This field is required</Error>}
      </Column>
      <Column>
        <Label>
          Order Cut Off Date <Required>*</Required>
        </Label>
        <DatePicker
          value={startDate}
          disabledDate={disabledStartDate}
          onChange={handleOnSelectStart}
          format="YYYY-MM-DD" // TODO: Change format
          size="large"
          style={inputStyle}
        />
      </Column>
      <Column>
        <Label>
          Desired Delivery Date <Required>*</Required>
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
      </Column>
    </Container>
  )
}

export default StoreForm
