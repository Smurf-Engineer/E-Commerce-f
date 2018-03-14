/**
 * Theme Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { Container, Text, Image } from './styledComponents'

interface Props {
  id: number
  name: string
  image: string
  onClick: (id: number) => void
}

const Theme = ({ onClick, id, name, image }: Props) => {
  const handleOnClick = () => onClick(id)
  return (
    <Container onClick={handleOnClick}>
      <Image src={image} />
      <Text>{name}</Text>
    </Container>
  )
}

export default Theme
