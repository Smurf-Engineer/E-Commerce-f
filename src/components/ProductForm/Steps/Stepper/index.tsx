/**
 * ThirdStep Component - Created by Apodaca on 16/05/19.
 */
import * as React from 'react'
import { Icon } from 'antd'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import { Container, BackButton, NextButton } from './styledComponents'

interface Props {
  validNext?: boolean
  currentStep: number
  customizable: boolean
  changeStep: (step: number) => void
  showMissingFields: () => void
  handleSave: (onlyeSave: boolean) => void
}
const Stepper = ({
  currentStep,
  changeStep,
  validNext,
  showMissingFields,
  customizable,
  handleSave
}: Props) => (
  <Container>
    {currentStep > 0 && (
      <BackButton primary={true} onClick={changeStep(currentStep - 1)}>
        <Icon type="left" />
        <FormattedMessage {...messages.back} />
      </BackButton>
    )}
    {currentStep === 3 && (
      <BackButton primary={customizable} onClick={handleSave(true)}>
        <FormattedMessage
          {...(customizable ? messages.saveAndContinue : messages.save)}
        />
      </BackButton>
    )}
    {currentStep < 3 && (
      <NextButton
        enabled={validNext}
        onClick={validNext ? changeStep(currentStep + 1) : showMissingFields}
      >
        <FormattedMessage {...messages.next} />
        <Icon type="right" />
      </NextButton>
    )}
    {currentStep === 3 && customizable && (
      <NextButton enabled={true} onClick={handleSave(false)}>
        <FormattedMessage {...messages.submit} />
      </NextButton>
    )}
  </Container>
)

export default Stepper
