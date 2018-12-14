/**
 * Tab Component - Created by david on 23/02/18.
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
  return (
    <Container onClick={handleOnSelectTab}>
      {index === 0 && <Divider type="vertical" />}
      <TabContainer {...{ selected, activeOnClick }}>
        <Text {...{ selected, activeOnClick }}>
          {React.Children.only(children)}
        </Text>
        {index < 3 && (
          <ShapeContainer>
            <OpeningShape {...{ selected }} />
          </ShapeContainer>
        )}
      </TabContainer>
      {index === totalItems - 1 && <Divider type="vertical" />}
    </Container>
  )
}

export default Tab
