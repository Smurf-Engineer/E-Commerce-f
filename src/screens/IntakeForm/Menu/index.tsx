import * as React from 'react'
import { Message } from '../../../types/common'
import {
  MenuContainer,
  StyledButton,
  ButtonWrapper,
  GrayButtonWrapper
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
  showMissingFields: () => void
  onContinue: () => void
  onPrevious: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const Menu = ({ validations, savingIntake = false, onContinue, onPrevious, showMissingFields }: Props) => {
  const {
    continueDisable = false,
    showPreviousButton = true,
    previousDisable = false,
    showContinueButton = true,
    continueButtonText = '',
    previousButtonText = ''
  } = validations
  return (
    <MenuContainer>
      <GrayButtonWrapper
        unable={savingIntake || previousDisable}
        show={showPreviousButton}
      >
        <StyledButton
          type="primary"
          onClick={!previousDisable ? onPrevious : null}
        >
          {previousButtonText}
        </StyledButton>
      </GrayButtonWrapper>
      <ButtonWrapper
        show={showContinueButton}
        unable={savingIntake || continueDisable}
      >
        <StyledButton
          type="primary"
          loading={savingIntake}
          onClick={!continueDisable  ? onContinue : showMissingFields}
        >
          {continueButtonText}
        </StyledButton>
      </ButtonWrapper>
    </MenuContainer>
  )
}

export default Menu
