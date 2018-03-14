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
  onSelectTab: (index: number) => void
}

const steps = ['theme', 'style', 'customize', 'preview']

const DesignCenterTabs = ({ currentTab, onSelectTab }: Props) => {
  const tabs = steps.map((step, index) => (
    <Tab
      {...{ index }}
      key={index}
      selected={currentTab === index}
      onSelectTab={() => onSelectTab(index)}
    >
      <FormattedMessage {...messages[step]} />
    </Tab>
  ))
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
