/**
 * SalesRep Component - Created by Jesús Apodaca on 23/03/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as SalesRepActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  HeaderList
} from './styledComponents'
import List from './RepList'
import messages from './messages'

interface Props {
  history: any
  currentPage: number
  searchText: string
  formatMessage: (messageDescriptor: any) => string
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
}

class SalesRep extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setSearchTextAction } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setSearchTextAction(value)
  }
  render() {
    const { currentPage, formatMessage, searchText } = this.props
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <HeaderList>
          <SearchInput
            value={searchText}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
          />
        </HeaderList>
        <List
          {...{ formatMessage, currentPage, searchText }}
          onChangePage={this.handleOnChangePage}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('salesRep').toJS()

const SalesRepEnhance = compose(
  connect(mapStateToProps, { ...SalesRepActions })
)(SalesRep)

export default SalesRepEnhance
