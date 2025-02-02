/**
 * SwitchWithLabel Component - Created by david on 10/04/18.
 */
import * as React from 'react'
import Input from 'antd/lib/input'
import {
  Container,
  Label,
  Message,
  Row,
  inputStyle,
  Error,
  SwitchInput,
  SubLabel,
  Question
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
  subLabel?: string
  disabled?: boolean
  infoIcon?: boolean
  onChange: (checked: boolean) => void
  updatePassCodeAction?: (code: string) => void
  handleOpenInfo?: () => void
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
  subLabel,
  disabled = false,
  infoIcon = false,
  updatePassCodeAction = () => {},
  handleOpenInfo = () => {}
}: Props) => {
  const handleUpdatePassCode = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = evnt
    if (value.length <= INPUT_MAX_LENGTH) {
      updatePassCodeAction(value.toLowerCase())
    }
  }

  return (
    <Container {...{ width, infoIcon }}>
      <Row>
        <Label>{label}</Label>
        {infoIcon && (
          <Question onClick={handleOpenInfo} type="question-circle" />
        )}
        <SwitchInput {...{ defaultChecked, onChange, checked, disabled }} />
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
      {subLabel && <SubLabel>{subLabel}</SubLabel>}
      {hasError && checked && <Error>{errorLabel}</Error>}
    </Container>
  )
}

export default SwitchWithLabel
