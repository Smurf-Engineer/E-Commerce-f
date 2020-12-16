import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Tab from './Tab'
import { Container, Divider, Row, View, Tabs } from './styledComponents'

interface Props {
  currentTab: number
  designHasChanges: boolean
  cantContinue: boolean
  fromScratch: boolean
  onSelectTab: (index: number) => void
  validate: (screen: number) => void
}

const fromScratchSteps = ['inspiration', 'colors', 'uploadFiles', 'designNotes', 'review']
const fromExistingArtworkSteps = [null, null, 'uploadFiles', 'designNotes', 'review']
const IntakeFormTabs = ({
  currentTab,
  onSelectTab,
  cantContinue,
  fromScratch,
  validate
}: Props) => {
  const handleOnSelectTab = (index: any) => () => onSelectTab(index)
  const steps = fromScratch ? fromScratchSteps : fromExistingArtworkSteps
  const tabs = steps.map((step, index) => {
    if (step) {
      const canNavigate = (index < currentTab) || !validate(index - 1).continueDisable
      return (
        <Tab
          {...{ index }}
          key={index}
          activeOnClick={canNavigate}
          selected={currentTab === index}
          onSelectTab={handleOnSelectTab(index)}
          totalItems={steps.length}
        >
          <FormattedMessage {...messages[step]} />
        </Tab>
      )
    }
  })
  return (
    <Container>
      <Row>
        <View />
        <Tabs>{tabs}</Tabs>
        <View />
      </Row>
      <Divider />
    </Container>
  )
}

export default IntakeFormTabs
