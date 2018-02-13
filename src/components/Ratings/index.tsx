/**
 * Ratings Component - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import { Container, Text, StyledImg } from './styledComponents'

interface Props {
  totalReviews: number
  stars: number
}

const Ratings = ({ totalReviews, stars }: Props) => {
  return (
    <Container>
      <Text>Ratings Stateless</Text>
    </Container>
  )
}

export default Ratings
