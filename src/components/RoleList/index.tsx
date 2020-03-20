/**
 * RolesCatalog Component - Created by Jesús Apodaca on 19/03/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as OrderHistoryAdminActions from './actions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import List from './ListRole'
import messages from './messages'
import { sorts } from '../../types/common'
interface Props {
  history: any
  currentPage: number
  orderBy: string
  screen: string
  sort: sorts
  productId: string
  searchText: string
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
}

class RolesCatalog extends React.Component<Props, {}> {
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
    const { currentPage, orderBy, sort, formatMessage, searchText } = this.props
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <SearchInput
          value={searchText}
          onChange={this.handleInputChange}
          placeholder={formatMessage(messages.search)}
        />
        <List
          {...{ formatMessage, currentPage, orderBy, sort, searchText }}
          onChangePage={this.handleOnChangePage}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('roleCatalog').toJS()

const RolesCatalogEnhance = compose(
  connect(mapStateToProps, { ...OrderHistoryAdminActions })
)(RolesCatalog)

export default RolesCatalogEnhance
