/**
 * Theme Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { Container, Text, Image } from './styledComponents'

interface Props {
  id: number
  index?: number
  name: string
  image: string
  onClick: (id: number, index?: number) => void
}

const Theme = ({ index, onClick, id, name, image }: Props) => {
  const handleOnClick = () => onClick(id, index)
  return (
    <Container onClick={handleOnClick}>
      <Image src={image} />
      <Text>{name}</Text>
    </Container>
  )
}

export default Theme
