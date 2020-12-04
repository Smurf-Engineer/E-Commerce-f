/**
 * MobileMenu Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  Container,
  Previous,
  Continue
} from './styledComponents'

interface Props {
  continueDisable: boolean
  showPreviousButton?: boolean
  showContinueButton?: boolean
  onContinue: () => void
}

const MobileMenu = ({ continueDisable, showPreviousButton = true, showContinueButton = true, onContinue }: Props) => {
  return (
    <Container>
       <Previous show={showPreviousButton} />
       <Continue onClick={!continueDisable  ? onContinue : null} disabled={continueDisable} show={showContinueButton} />
    </Container>
  )
}

export default MobileMenu
