import * as React from 'react'
import { BlueButton } from './styledComponents'

interface Props {
  label: string
  onClick?: () => void
}

const MyButton = ({ label, onClick }: Props) => {
  return <BlueButton {...{ onClick }}>{label}</BlueButton>
}

export default MyButton
