/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'

interface Props {
  label?: string
  capitalize?: boolean
  style?: object
  subLabel?: React.ReactNode
  children?: React.ReactNode
  value?: any
}
const RowField = ({
  label,
  value,
  capitalize = false,
  subLabel,
  style,
  children
}: Props) => {
  return (
    <Container {...{ style }}>
      {label && <Title>{label}</Title>}
      {subLabel && subLabel}
      {value && !children ? (
        <Text {...{ capitalize }}> {value}</Text>
      ) : (
        children
      )}
    </Container>
  )
}

export default RowField
