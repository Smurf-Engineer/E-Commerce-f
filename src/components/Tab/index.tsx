/**
 * Tab Component - Created by eduardoquintero on 02/12/19.
 */
import * as React from 'react'
import {
  Container,
  Text,
  Tab as TabContainer,
  Divider,
  OpeningShape,
  ShapeContainer
} from './styledComponents'

interface Props {
  children: React.ReactNode
  selected?: boolean
  activeOnClick: boolean
  index: number
  totalItems: number
  onSelectTab: () => void
}

const Tab = ({
  index,
  children,
  selected = false,
  onSelectTab,
  activeOnClick,
  totalItems
}: Props) => {
  const handleOnSelectTab = () => {
    if (activeOnClick) {
      onSelectTab()
    }
  }
  const TOTAL_ITEMS = totalItems - 1
  return (
    <Container onClick={handleOnSelectTab}>
      {index === 0 && <Divider type="vertical" />}
      <TabContainer {...{ selected, activeOnClick }}>
        <Text {...{ selected, activeOnClick }}>
          {React.Children.only(children)}
        </Text>
        {index < TOTAL_ITEMS && (
          <ShapeContainer>
            <OpeningShape {...{ selected }} />
          </ShapeContainer>
        )}
      </TabContainer>
      {index === TOTAL_ITEMS && <Divider type="vertical" />}
    </Container>
  )
}

export default Tab
