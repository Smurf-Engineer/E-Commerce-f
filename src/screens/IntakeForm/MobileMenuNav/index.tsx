/**
 * MobileMenu Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  MobileContainer,
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
  continueDisable: boolean
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
    <MobileContainer>
       <Previous
        text={previousButtonText}
        onClick={!previousDisable ? onPrevious : null}
        show={showPreviousButton}
        disabled={previousDisable}
       >
         {previousButtonText}
      </Previous>
       {!savingIntake ? <Continue
        text={continueButtonText}
        onClick={!continueDisable  ? onContinue : null}
        disabled={continueDisable}
        show={savingIntake || showContinueButton}>
          {continueButtonText}
        </Continue> :
        <Spin />}
    </MobileContainer>
  )
}

export default MobileMenuNav
