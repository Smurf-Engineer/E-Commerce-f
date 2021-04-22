/**
 * MobileMenu Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  MobileNavContainer,
  Previous,
  Continue,
  StyledDropdown,
  StyledMenu,
  Image,
  ItemText
} from './styledComponents'
import Menu from 'antd/lib/menu'
import messages from './messages'
import Spin from 'antd/lib/spin'
import Arrow from '../../../assets/down-arrow-white.svg'
import { Message } from '../../../types/common'

const { Item } = Menu
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
  fromScratch?: boolean
  currentTab: number
  onContinue: () => void
  onPrevious: () => void
  showMissingFields: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  validate: (screen: number) => void
  onSelectTab: (index: number) => void
}

const fromScratchSteps = ['inspiration', 'colors', 'uploadFiles', 'designNotes', 'notifications', 'review']
const fromExistingArtworkSteps = [null, null, 'uploadFiles', 'designNotes', 'notifications', 'review']

const MobileMenuNav = ({
  validations,
  onContinue,
  onPrevious,
  savingIntake = false,
  fromScratch,
  showMissingFields,
  formatMessage,
  currentTab,
  validate,
  onSelectTab
}: Props) => {
  const {
    continueDisable = false,
    showPreviousButton = true,
    previousDisable = false,
    showContinueButton = true,
    continueButtonText = '',
    previousButtonText = ''
  } = validations

  const steps = fromScratch ? fromScratchSteps : fromExistingArtworkSteps
  const tabs = steps.map((step, index) => {
    if (step) {
      const handleOnSelectTab = () => onSelectTab(index)
      const canNavigate = (index < currentTab) || !validate(index - 1).continueDisable
      return (
        <Item key={index}>
          <ItemText
            onClick={canNavigate ? handleOnSelectTab : null}
            active={canNavigate}
            className={index === currentTab ? 'selected' : ''}
          >{formatMessage(messages[step])}
          </ItemText>
        </Item>
      )
    }
  })
  const menu = (
    <StyledMenu>
      {tabs}
    </StyledMenu>
  )
  return (
    <MobileNavContainer>
      <Previous
        text={previousButtonText}
        onClick={!previousDisable ? onPrevious : null}
        show={showPreviousButton}
        disabled={previousDisable} />
      {currentTab >= 0 && steps[currentTab]
      ? <StyledDropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {formatMessage(
            messages[
              fromScratch ? fromScratchSteps[currentTab] : fromExistingArtworkSteps[currentTab]
            ])}
            <Image src={Arrow} />
        </a>
      </StyledDropdown> : null}
      {!savingIntake ? <Continue
        text={continueButtonText}
        onClick={!continueDisable  ? onContinue : showMissingFields}
        disabled={continueDisable}
        show={savingIntake || showContinueButton} /> :
      <Spin />}
    </MobileNavContainer>
  )
}

export default MobileMenuNav
