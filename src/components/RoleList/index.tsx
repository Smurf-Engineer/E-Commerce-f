/**
 * RolesCatalog Component - Created by Jesús Apodaca on 19/03/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as OrderHistoryAdminActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  HeaderList,
  FilterDiv,
  Subtitle,
  FilterSelect,
  RoleOption
} from './styledComponents'
import List from './ListRole'
import messages from './messages'
import { QueryProps, Role, Message } from '../../types/common'
import { getRoles } from './ListRole/data'
import { Spin } from 'antd'

interface DataRoles extends QueryProps {
  roles: Role[]
}
interface Props {
  history: any
  currentPage: number
  filter: string
  rolesQuery: DataRoles
  searchText: string
  setFilterAction: (filter: string) => void
  formatMessage: (messageDescriptor: Message) => string
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

  handleFilterChange = (value: string) => {
    const { setFilterAction } = this.props
    setFilterAction(value)
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
    const {
      currentPage,
      formatMessage,
      filter,
      searchText,
      rolesQuery: { loading, roles }
    } = this.props
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
          <FilterDiv>
            <Subtitle>
              <FormattedMessage {...messages.filterBy} />
            </Subtitle>
            {loading ? (
              <Spin />
            ) : (
                <FilterSelect
                  allowClear={true}
                  onChange={this.handleFilterChange}
                  placeholder={formatMessage(messages.filterPlaceholder)}
                >
                  {roles.map(({ id, name }: Role, index: number) => (
                    <RoleOption key={index} value={id}>{name}</RoleOption>
                  ))}
                </FilterSelect>
              )}
          </FilterDiv>
        </HeaderList>
        <List
          {...{ formatMessage, currentPage, searchText, filter, roles }}
          onChangePage={this.handleOnChangePage}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('roleCatalog').toJS()

const RolesCatalogEnhance = compose(
  graphql(getRoles, {
    name: 'rolesQuery',
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapStateToProps, { ...OrderHistoryAdminActions })
)(RolesCatalog)

export default RolesCatalogEnhance
