/**
 * SearchBar Component - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import { Container, Text, SearchInput } from './styledComponents'
import { AnyAction } from '../../types/common'
import { CSSProperties } from 'react'

interface Props {
  search: (value: string) => void
  onHeader?: boolean
}

interface StateProps {
  width?: string
  searchValue: string
}
class SearchBar extends React.Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)
    const { onHeader } = props
    this.state = {
      width: onHeader ? '0px' : '',
      searchValue: ''
    }
  }
  render() {
    const { search, onHeader } = this.props
    const { width, searchValue } = this.state
    return (
      <Container>
        <SearchInput
          size="large"
          placeholder="Seach for a product"
          onChange={this.handleChange}
          onSearch={this.showInput}
          onBlur={onHeader ? this.hideInput : this.clearInput}
          enterButton={true}
          {...{ width }}
          value={searchValue}
        />
      </Container>
    )
  }

  showInput = () => {
    const { onHeader } = this.props
    const { width } = this.state
    console.log('click', width)
    if (onHeader) {
      this.setState({ width: 'auto' })
    }
  }

  clearInput = () => {
    this.setState({ searchValue: '' })
  }

  hideInput = () => {
    const { onHeader } = this.props
    if (onHeader) {
      this.setState({ width: '0px', searchValue: '' })
    }
  }

  handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = evt
    const { search } = this.props
    this.setState({ searchValue: value })
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
