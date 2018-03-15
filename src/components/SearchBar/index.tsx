/**
 * SearchBar Component - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import { Container, SearchInput } from './styledComponents'
import messages from './messages'
import debounce from 'lodash/debounce'

interface Props {
  search: any
  onHeader?: boolean
  formatMessage: (messageDescriptor: any) => string
}

interface StateProps {
  width?: string
  searchValue: string
  searchResults: any
}
class SearchBar extends React.Component<Props, StateProps> {
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.search(this.state.searchValue),
    300
  )
  constructor(props: Props) {
    super(props)
    const { onHeader } = props
    this.state = {
      width: onHeader ? '0px' : '',
      searchValue: '',
      searchResults: null
    }
  }
  render() {
    const { onHeader, formatMessage } = this.props
    const { width, searchValue } = this.state
    return (
      <Container>
        <SearchInput
          size="large"
          placeholder={formatMessage(messages.hint)}
          onChange={this.handleChange}
          onSearch={this.showInput}
          onBlur={onHeader ? this.hideInput : this.clearInput}
          enterButton={true}
          {...{ width }}
          value={searchValue}
          onFocus={this.clearInput}
        />
      </Container>
    )
  }

  showInput = () => {
    const { onHeader } = this.props
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
      this.setState({ width: '0px' })
    }
  }

  handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = evt

    this.setState({ searchValue: value.trim() }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
}

export default SearchBar
