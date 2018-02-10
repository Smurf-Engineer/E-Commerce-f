/**
 * MenuGender Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import FilterList from '../FilterList'
import SeeAllButton from '../SeeAllButton'
import {
  Container,
  Text,
  Filters,
  Categories,
  List,
  Divider
} from './styledComponents'

const filters = [
  { id: '0', label: 'Cycling' },
  { id: '1', label: 'Triathalon' },
  { id: '2', label: 'Nordic' },
  { id: '3', label: 'Active' }
]

const categories = [
  { id: '0', label: 'Tops' },
  { id: '1', label: 'Shorts' },
  { id: '2', label: 'MTB' },
  { id: '3', label: 'Skin suits' },
  { id: '4', label: 'Outerwear tops' },
  { id: '5', label: 'Outerwear bottoms' },
  { id: '6', label: 'Accesories' }
]

interface Props {}

class MenuGender extends React.Component<Props, {}> {
  state = {
    filterSelected: '0',
    categorySelected: '0'
  }

  handleOnHoverFilter = (filterSelected: string) =>
    this.setState({ filterSelected })

  handleOnHoverCategory = (categorySelected: string) =>
    this.setState({ categorySelected })

  render() {
    const { filterSelected, categorySelected } = this.state
    return (
      <Container>
        <Filters>
          <FilterList
            onHoverFilter={this.handleOnHoverFilter}
            filters={filters}
            filterSelected={filterSelected}
          />
          <SeeAllButton />
        </Filters>
        <Divider type="vertical" />
        <Categories>
          <FilterList
            onHoverFilter={this.handleOnHoverCategory}
            filters={categories}
            filterSelected={categorySelected}
          />
        </Categories>
        <Divider type="vertical" />
        <List>List</List>
      </Container>
    )
  }
}

export default MenuGender
