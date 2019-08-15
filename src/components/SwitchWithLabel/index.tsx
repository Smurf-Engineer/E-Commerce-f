/**
 * SwitchWithLabel Component - Created by david on 10/04/18.
 */
import * as React from 'react'
import Switch from 'antd/lib/switch'
import Input from 'antd/lib/input'
import {
  Container,
  Label,
  Message,
  Row,
  inputStyle,
  Error
} from './styledComponents'

interface Props {
  label: string
  message: string
  passCode?: string
  checked?: boolean
  width?: string
  withInput?: boolean
  errorLabel?: string
  hasError?: boolean
  defaultChecked?: boolean
  placeholder: string
  onChange: (checked: boolean) => void
  updatePassCodeAction?: (code: string) => void
}
const INPUT_MAX_LENGTH = 25
const SwitchWithLabel = ({
  message,
  label,
  onChange,
  checked,
  withInput = false,
  passCode = '',
  width,
  errorLabel,
  hasError,
  defaultChecked,
  placeholder,
  updatePassCodeAction = () => {}
}: Props) => {
  const handleUpdatePassCode = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = evnt

    if (value.length > INPUT_MAX_LENGTH) {
      return
    }

    updatePassCodeAction(value)
  }

  return (
    <Container {...{ width }}>
      <Row>
        <Label>{label}</Label>
        <Switch {...{ defaultChecked, onChange, checked }} />
      </Row>
      <Message>{message}</Message>
      {withInput && (
        <Input
          disabled={!checked}
          value={passCode}
          placeholder={placeholder}
          type="Password"
          size="large"
          onChange={handleUpdatePassCode}
          style={inputStyle}
        />
      )}
      {hasError && (!passCode && checked) && <Error>{errorLabel}</Error>}
    </Container>
  )
}

export default SwitchWithLabel
