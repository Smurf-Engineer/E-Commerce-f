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
  searchWidth?: string | undefined
  resetInput?: boolean | undefined
  placeHolderLabel?: string
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
    const {
      onHeader,
      formatMessage,
      searchWidth,
      placeHolderLabel
    } = this.props
    const { width, searchValue } = this.state

    return (
      <Container {...{ searchWidth }}>
        <SearchInput
          size="large"
          placeholder={
            placeHolderLabel ? placeHolderLabel : formatMessage(messages.hint)
          }
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
    const { resetInput } = this.props
    if (resetInput) {
      this.setState({ searchValue: '' })
    }
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
