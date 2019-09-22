/**
 * Tab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text, Icon } from './styledComponents'

interface Props {
  label: string
  icon: string
}

const Tab = ({ label, icon }: Props) => {
  return (
    <Container>
      <Icon src={icon} />
      <Text>
        <FormattedMessage {...messages[label]} />
      </Text>
    </Container>
  )
}

export default Tab
