/**
 * Ratings Component - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import StarRatings from 'react-star-ratings'
import { Container, StyledStars, Text } from './styledComponents'

interface Props {
  rating: number
  totalReviews: number
  stars: number
  starDimension: string
  handleClickStars?: () => void
}

const Ratings = ({ totalReviews, stars, rating, starDimension, handleClickStars }: Props) => {
  return (
    <Container>
      <StyledStars onClick={handleClickStars}>
        <StarRatings
          rating={rating}
          starRatedColor="red"
          numberOfStars={stars}
          starDimension={starDimension}
        />
      </StyledStars>
      <Text>{`${totalReviews} Reviews`}</Text>
    </Container>
  )
}

export default Ratings
