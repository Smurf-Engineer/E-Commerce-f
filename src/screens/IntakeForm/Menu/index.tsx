import * as React from 'react'
import { Message } from '../../../types/common'
import {
  Container,
  StyledButton,
  ButtonWrapper
} from './styledComponents'

interface NavValidation {
  continueDisable?: boolean
  showPreviousButton?: boolean
  previousDisable?: boolean
  showContinueButton?: boolean
  continueButtonText?: string
  previousButtonText?: string
}
interface Props {
  validations: NavValidation
  savingIntake: boolean
  onContinue: () => void
  onPrevious: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const Menu = ({ validations, savingIntake = false, onContinue, onPrevious }: Props) => {
  const {
    continueDisable = false,
    showPreviousButton = true,
    previousDisable = false,
    showContinueButton = true,
    continueButtonText = '',
    previousButtonText = ''
  } = validations
  return (
    <Container>
      <ButtonWrapper
        disabled={savingIntake || previousDisable}
        show={showPreviousButton}
        onClick={!previousDisable ? onPrevious : null}
        >
        <StyledButton
          type="primary"
          disabled={previousDisable}
        >
          {previousButtonText}
        </StyledButton>
      </ButtonWrapper>
      <ButtonWrapper
        show={showContinueButton}
        disabled={savingIntake || continueDisable}
        onClick={!continueDisable  ? onContinue : null}
>
        <StyledButton
          type="primary"
          loading={savingIntake}
          disabled={continueDisable}
        >
          {continueButtonText}
        </StyledButton>
      </ButtonWrapper>
    </Container>
  )
}

export default Menu
