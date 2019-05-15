/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'

interface Props {
  label: string
  value: any
}
const RowField = ({ label, value }: Props) => {
  return (
    <Container>
      <Title>{label}</Title>
      <Text> {value}</Text>
    </Container>
  )
}

export default RowField
