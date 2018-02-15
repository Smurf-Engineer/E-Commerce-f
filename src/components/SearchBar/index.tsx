/**
 * SearchBar Component - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import { Container, Text, SearchInput } from './styledComponents'
import { AnyAction } from '../../types/common'

interface Props {
  search: any
}

class SearchBar extends React.Component<Props, {}> {
  render() {
    const { search } = this.props

    return (
      <Container>
        <SearchInput
          size="large"
          placeholder="Seach for a product"
          // onChange={this.handleChange}
          onSearch={this.search}
        />
      </Container>
    )
  }
  handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = evt
    const { search } = this.props
    console.log('on change ', value)
    if (value.length > 3) {
      search(value)
    }
  }

  search = (value: string) => {
    console.log('serch', value)
    const { search } = this.props
    search(value)
  }
}

export default SearchBar
