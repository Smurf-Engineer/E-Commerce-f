/**
 * SearchBar Component - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import { Container, Text, SearchInput } from './styledComponents'
import { AnyAction } from '../../types/common'
import { CSSProperties } from 'react'

interface Props {
  search: (value: string) => void
  hiddenInput?: boolean
}

interface StateProps {
  width?: string
}
class SearchBar extends React.Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)
    const { hiddenInput } = props
    this.state = {
      width: hiddenInput ? '0px' : ''
    }
  }
  render() {
    const { search, hiddenInput } = this.props
    const { width } = this.state
    return (
      <Container>
        <SearchInput
          size="large"
          placeholder="Seach for a product"
          // onChange={this.handleChange}
          onSearch={this.search}
          onClick={this.showInput}
          {...{ width }}
          enterButton={true}
        />
      </Container>
    )
  }

  showInput = () => {
    const { hiddenInput } = this.props
    console.log('click')
    if (hiddenInput) {
      this.setState({ width: 'auto' })
    }
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
