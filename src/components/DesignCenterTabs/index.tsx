/**
 * DesignCenterTabs Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Tab from './Tab'
import { Container, Divider, Row, View, Tabs } from './styledComponents'

interface Props {
  currentTab: number
  currentTheme: number
  styleIndex: number
  designHasChanges: boolean
  onSelectTab: (index: number) => void
}

const steps = ['theme', 'style', 'customize', 'preview']

const DesignCenterTabs = ({
  currentTab,
  onSelectTab,
  styleIndex,
  currentTheme,
  designHasChanges
}: Props) => {
  const handleOnSelectTab = (index: any) => () => onSelectTab(index)
  const tabs = steps.map((step, index) => {
    const activeOnClick =
      (index === 1 && currentTab === 0 && currentTheme !== -1) ||
      (index === 2 && currentTab === 1 && styleIndex !== -1) ||
      (currentTab > index && (currentTab === 1 || currentTab === 2))
    return (
      <Tab
        {...{ index, activeOnClick }}
        key={index}
        selected={currentTab === index}
        onSelectTab={activeOnClick ? handleOnSelectTab(index) : undefined}
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

export default DesignCenterTabs
