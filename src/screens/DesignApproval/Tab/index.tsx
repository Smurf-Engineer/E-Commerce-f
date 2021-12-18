/**
 * Tab Component - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text, Icon } from './styledComponents'

interface Props {
  label: string
  icon: string
  selected: boolean
}

const Tab = ({ label, icon, selected }: Props) => {
  return (
    <Container>
      <Icon {...{ selected }} src={icon} />
      <Text>
        <FormattedMessage {...messages[label]} />
      </Text>
    </Container>
  )
}

export default Tab
