/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { Container, NavTabs } from './styledComponents'

interface Props {
  selectedTab: number
  onTabClick: (selectedIndex: number) => void
}

const Tabs = ({ selectedTab, onTabClick }: Props) => {
  return (
    <Container>
      <NavTabs
        activeKey={`${selectedTab}`}
        size="large"
        onTabClick={onTabClick}
      />
    </Container>
  )
}

export default Tabs
