/**
 * DesignCenterTabs Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import Tab from './Tab'
import { Container, Divider, Row, View, Tabs } from './styledComponents'

interface Props {
  currentTab: number
  onSelectTab: (index: number) => void
}

const steps = ['Select Files', 'Design Settings']

const DesignCenterTabs = ({ currentTab, onSelectTab }: Props) => {
  const handleOnSelectTab = (index: any) => () => onSelectTab(index)
  const tabs = steps.map((step, index) => (
    <Tab
      {...{ index }}
      key={index}
      selected={currentTab === index}
      onSelectTab={handleOnSelectTab(index)}
    >
      {step}
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
