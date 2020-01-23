/**
 * ProAssist Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { FormattedMessage } from 'react-intl'
import { setAdminUserMutation } from './data'
import * as ProAssistActions from './actions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import List from './OrdersList'
import messages from './messages'
import { sorts, Message } from '../../types/common'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  searchText: string
  formatMessage: (messageDescriptor: Message) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
  setAdminUser: (variables: {}) => void
}
interface StateProps {
  searchValue: string
}
class ProAssist extends React.Component<Props, StateProps> {
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchTextAction(this.state.searchValue),
    600
  )
  constructor(props: Props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const { currentPage, orderBy, sort, formatMessage, searchText } = this.props

    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <SearchInput
          value={this.state.searchValue}
          onChange={this.handleInputChange}
          placeholder={formatMessage(messages.search)}
        />
        <List
          {...{ formatMessage, currentPage, orderBy, sort, searchText }}
          onSortClick={this.handleOnSortClick}
          onChangePage={this.handleOnChangePage}
          onRowClick={this.openSlack}
        />
      </Container>
    )
  }
  openSlack = (url: string) => {
    if (url.length) {
      window.open(url)
    }
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
}

const mapStateToProps = (state: any) => state.get('proAssist').toJS()

const ProAssistEnhance = compose(
  setAdminUserMutation,
  connect(mapStateToProps, { ...ProAssistActions })
)(ProAssist)

export default ProAssistEnhance
