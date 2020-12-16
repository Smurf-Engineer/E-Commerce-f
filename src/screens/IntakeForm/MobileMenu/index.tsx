/**
 * MobileMenu Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  Container,
  Previous,
  Continue
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
  savingIntake?: boolean
  onContinue: () => void
  onPrevious: () => void
}

const MobileMenu = ({ validations, onContinue, onPrevious, savingIntake = false }: Props) => {
  const {
    continueDisable = false,
    showPreviousButton = true,
    previousDisable = false,
    showContinueButton = true
  } = validations
  return (
    <Container>
       <Previous onClick={!previousDisable ? onPrevious : null} show={showPreviousButton} disabled={previousDisable} />
       <Continue
        onClick={!continueDisable  ? onContinue : null}
        disabled={continueDisable}
        show={savingIntake || showContinueButton}
        loading={savingIntake} />
    </Container>
  )
}

export default MobileMenu
