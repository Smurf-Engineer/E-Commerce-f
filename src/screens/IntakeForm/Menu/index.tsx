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
}
interface Props {
  continueDisable: boolean
  validations: NavValidation
  onContinue: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const Menu = ({ validations, onContinue }: Props) => {
  const {
    continueDisable = false,
    showPreviousButton = true,
    previousDisable = false,
    showContinueButton = true
  } = validations
  return (
    <Container>
      <ButtonWrapper disabled={true}>
        <StyledButton
          show={showPreviousButton}
          disabled={previousDisable}
          type="primary"
          onClick={this.onSaveDesign}
        >
          {'Previous'}
        </StyledButton>
      </ButtonWrapper>
      <ButtonWrapper
        show={showContinueButton}
        disabled={continueDisable}
        onClick={!continueDisable  ? onContinue : null}
>
        <StyledButton
          type="primary"
          disabled={continueDisable}
        >
          {'Continue'}
        </StyledButton>
      </ButtonWrapper>
    </Container>
  )
}

export default Menu
