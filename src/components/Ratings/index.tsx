/**
 * Ratings Component - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import StarRatings from 'react-star-ratings'
import { Container, Text, StyledImg } from './styledComponents'

interface Props {
  rating: number
  totalReviews: number
  stars: number
  starDimension: string
}

const Ratings = ({ totalReviews, stars, rating, starDimension }: Props) => {
  return (
    <Container>
      <StarRatings
        rating={rating}
        starRatedColor="red"
        numberOfStars={stars}
        starDimension={starDimension}
      />
      <Text>{`${totalReviews} Reviews`}</Text>
    </Container>
  )
}

export default Ratings
