/**
 * FilterList Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { Container, Text, Line, Option } from './styledComponents'
import { Filter } from '../../types/common'

interface Props {
  filters?: Filter[]
  onHoverFilter?: (index: number, id: number) => void
  filterSelected?: number
}

const FilterList = ({
  filters = [],
  onHoverFilter = () => {},
  filterSelected
}: Props) => {
  const list = filters.map(({ id, name }, index) => (
    <Option key={index} onMouseEnter={() => onHoverFilter(index, id)}>
      <Text>{name}</Text>
      {index === filterSelected && <Line />}
    </Option>
  ))
  return <Container>{list}</Container>
}

export default FilterList
