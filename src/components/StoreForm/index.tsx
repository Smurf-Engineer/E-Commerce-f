/**
 * StoreForm Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import Input from 'antd/lib/input'
import DatePicker from 'antd/lib/date-picker'
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
}

const StoreForm = ({ hasError = false }: Props) => {
  return (
    <Container>
      <Column>
        <Label>
          Team Store Name <Required>*</Required>
        </Label>
        <Input placeholder="Store Name" size="large" />
        {hasError && <Error>This field is required</Error>}
      </Column>
      <Column>
        <Label>
          Order Cut Off Date <Required>*</Required>
        </Label>
        <DatePicker size="large" style={inputStyle} />
      </Column>
      <Column>
        <Label>
          Desired Delivery Date <Required>*</Required>
        </Label>
        <DatePicker size="large" style={inputStyle} />
      </Column>
    </Container>
  )
}

export default StoreForm
