/**
 * Teams Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text, Link } from './styledComponents'

interface Props {}

const Teams = (props: Props) => {
  return (
    <Container>
      <Title>TEAMS</Title>
      <Text>
        <Link href="https://www.jakroo.com/us/team-stores.html">
          Team Stores
        </Link>
      </Text>
      <Text>
        <Link href="https://www.jakroo.com/us/team-kits.html">Team Kits</Link>
      </Text>
      <Text>
        <Link href="https://www.jakroo.com/us/get-sponsored.html">
          Get Sponsored
        </Link>
      </Text>
    </Container>
  )
}

export default Teams
