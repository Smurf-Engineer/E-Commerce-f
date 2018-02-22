/**
 * Teams Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Container, Title, Text, Link } from './styledComponents'
import messages from './messages'

interface Props {}

const Teams = (props: Props) => {
  return (
    <Container>
      <Title>
        <FormattedMessage {...messages.title} />
      </Title>
      <Text>
        <Link href="https://www.jakroo.com/us/team-stores.html">
          <FormattedMessage {...messages.stores} />
        </Link>
      </Text>
      <Text>
        <Link href="https://www.jakroo.com/us/team-kits.html">
          <FormattedMessage {...messages.kits} />
        </Link>
      </Text>
      <Text>
        <Link href="https://www.jakroo.com/us/get-sponsored.html">
          <FormattedMessage {...messages.sponsor} />
        </Link>
      </Text>
    </Container>
  )
}

export default Teams
