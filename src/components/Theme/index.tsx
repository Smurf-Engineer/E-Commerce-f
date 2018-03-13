/**
 * Theme Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { Container, Text, Image } from './styledComponents'

interface Props {
  name: string
  image: string
}

const Theme = ({ name, image }: Props) => {
  return (
    <Container>
      <Image src={image} />
      <Text>{name}</Text>
    </Container>
  )
}

export default Theme
