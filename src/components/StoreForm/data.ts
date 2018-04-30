import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const validateHolidayQuery = graphql(
  gql`
    mutation isHolyday($date: HolyDate!) {
      isHoliday(date: $date)
    }
  `,
  { name: 'validateHoliday' }
)
