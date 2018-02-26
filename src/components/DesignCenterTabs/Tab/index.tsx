/**
 * Tab Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import {
  Container,
  Text,
  Tab as TabContainer,
  Divider
} from './styledComponents'

interface Props {
  children: React.ReactNode
  selected?: boolean
  index: number
  onSelectTab: () => void
}

const Tab = ({ index, children, selected = false, onSelectTab }: Props) => {
  return (
    <Container onClick={onSelectTab}>
      {index === 0 && <Divider type="vertical" />}
      <TabContainer {...{ selected }}>
        <Text {...{ selected }}>{React.Children.only(children)}</Text>
      </TabContainer>
      <Divider type="vertical" />
    </Container>
  )
}

export default Tab
