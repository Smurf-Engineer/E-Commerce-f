/**
 * MobileMenu Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  MobileNavContainer,
  Previous,
  Continue
} from './styledComponents'
import Spin from 'antd/lib/spin'

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
  savingIntake?: boolean
  onContinue: () => void
  onPrevious: () => void
}

const MobileMenuNav = ({ validations, onContinue, onPrevious, savingIntake = false }: Props) => {
  const {
    continueDisable = false,
    showPreviousButton = true,
    previousDisable = false,
    showContinueButton = true,
    continueButtonText = '',
    previousButtonText = ''
  } = validations
  return (
    <MobileNavContainer>
       <Previous
        text={previousButtonText}
        onClick={!previousDisable ? onPrevious : null}
        show={showPreviousButton}
        disabled={previousDisable} />
       {!savingIntake ? <Continue
        text={continueButtonText}
        onClick={!continueDisable  ? onContinue : null}
        disabled={continueDisable}
        show={savingIntake || showContinueButton} /> :
        <Spin />}
    </MobileNavContainer>
  )
}

export default MobileMenuNav
