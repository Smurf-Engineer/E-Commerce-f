/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'

interface Props {
  label?: string
  capitalize?: boolean
  style?: object
  flex?: string
  textAlign?: string
  marginRight?: string
  paddingTop?: string
  subLabel?: React.ReactNode
  children?: React.ReactNode
  value?: any
}
const RowField = ({
  label,
  value,
  capitalize = false,
  subLabel,
  flex,
  textAlign,
  paddingTop,
  marginRight,
  children
}: Props) => {
  return (
    <Container {...{ flex, textAlign, paddingTop, marginRight }}>
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
