import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Tab from './Tab'
import { TabsContainer, Divider, Row2, View, Tabs } from './styledComponents'

interface Props {
  currentTab: number
  designHasChanges: boolean
  cantContinue: boolean
  fromScratch: boolean
  adminProject: boolean
  onSelectTab: (index: number) => void
  validate: (screen: number) => void
}

const fromScratchSteps = ['inspiration', 'colors', 'uploadFiles', 'designNotes', 'notifications', 'review']
const fromExistingArtworkSteps = [null, null, 'uploadFiles', 'designNotes', 'notifications', 'review']
const adminProjectSteps = [null, null, null, 'designNotes', 'notifications', 'review']
const IntakeFormTabs = ({
  currentTab,
  onSelectTab,
  cantContinue,
  fromScratch,
  adminProject,
  validate
}: Props) => {
  const handleOnSelectTab = (index: any) => () => onSelectTab(index)
  const steps = adminProject ? adminProjectSteps : fromScratch ? fromScratchSteps : fromExistingArtworkSteps
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
    <TabsContainer>
      <Row2>
        <View />
        <Tabs>{tabs}</Tabs>
        <View />
      </Row2>
      <Divider />
    </TabsContainer>
  )
}

export default IntakeFormTabs
