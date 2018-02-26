/**
 * Theme Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Container, Text, Image } from './styledComponents'

interface Props {
  name: string
  picture: string
}

const Theme = ({ name, picture }: Props) => {
  return (
    <Container>
      <Image src={picture} />
      <Text>{name}</Text>
    </Container>
  )
}

export default Theme
