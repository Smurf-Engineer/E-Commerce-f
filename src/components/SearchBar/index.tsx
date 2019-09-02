/**
 * SearchBar Component - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import { Container, SearchInput } from './styledComponents'
import messages from './messages'
import debounce from 'lodash/debounce'

interface Props {
  search: any
  manualMode?: boolean
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
  focused: boolean
}
class SearchBar extends React.Component<Props, StateProps> {
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.search(this.state.searchValue),
    600
  )
  constructor(props: Props) {
    super(props)
    const { onHeader } = props
    this.state = {
      width: onHeader ? '0px' : '',
      searchValue: '',
      searchResults: null,
      focused: false
    }
  }
  render() {
    const {
      onHeader,
      formatMessage,
      searchWidth,
      placeHolderLabel
    } = this.props
    const { width, searchValue, focused } = this.state

    return (
      <Container {...{ searchWidth, onHeader, focused }}>
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
    const { onHeader, search, manualMode } = this.props
    const { searchValue } = this.state
    if (manualMode) {
      search(searchValue)
    } else if (onHeader) {
      this.setState({ width: 'auto' })
    }
  }

  clearInput = () => {
    const { resetInput, onHeader } = this.props
    if (resetInput) {
      this.setState({ searchValue: '' })
    }
    if (onHeader) {
      this.setState({ focused: true })
    }
  }

  hideInput = () => {
    const { onHeader } = this.props
    if (onHeader) {
      this.setState({ width: '0px', focused: false })
    }
  }

  handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { manualMode, search } = this.props
    const {
      currentTarget: { value }
    } = evt

    this.setState({ searchValue: value }, () => {
      if (manualMode && !value) {
        search('')
      } else {
        this.raiseSearchWhenUserStopsTyping()
      }
    })
  }
}

export default SearchBar
