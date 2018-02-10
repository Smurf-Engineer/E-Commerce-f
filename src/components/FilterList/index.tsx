/**
 * FilterList Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { Container, Text, Line, Option } from './styledComponents'
import { Filter } from '../../types/common'

interface Props {
  filters: Filter[]
  onHoverFilter?: (id: string) => void
  filterSelected?: string
}

const FilterList = ({
  filters = [],
  onHoverFilter = () => {},
  filterSelected
}: Props) => {
  const list = filters.map(({ id, label }, index) => (
    <Option key={index} onMouseEnter={() => onHoverFilter(id)}>
      <Text>{label}</Text>
      {id === filterSelected && <Line />}
    </Option>
  ))
  return <Container>{list}</Container>
}

export default FilterList
