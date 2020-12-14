import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Tab from './Tab'
import { Container, Divider, Row, View, Tabs } from './styledComponents'

interface Props {
  currentTab: number
  designHasChanges: boolean
  cantContinue: boolean
  onSelectTab: (index: number) => void
}

const steps = ['inspiration', 'colors', 'uploadFiles', 'designNotes', 'review']

const IntakeFormTabs = ({
  currentTab,
  onSelectTab,
  cantContinue
}: Props) => {
  const handleOnSelectTab = (index: any) => () => onSelectTab(index)
  const tabs = steps.map((step, index) => {
    const canNavigate = (index < currentTab) || (currentTab + 1 === index && !cantContinue)
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
