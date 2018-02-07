/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import { Container, Option, OptionDropdown } from './styledComponents'

interface Props {}

const options = ['MEN', 'WOMEN', 'CYCLING', 'TRIATHALON', 'NORDIC', 'ACTIVE']

const DropdownList = (props: Props) => {
  const optionsList = options.map((option, index) => (
    <Option key={index}>
      <OptionDropdown>{option}</OptionDropdown>
    </Option>
  ))
  return <Container>{optionsList}</Container>
}

export default DropdownList
