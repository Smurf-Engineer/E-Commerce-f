/**
 * UsersList Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import messages from './messages'
import {
  Container,
  Header,
  Row,
  Table,
  AddInternalButton,
  ScreenTitle,
  SearchInput,
  OptionsContainer,
  Checkboxes,
  CheckboxStyled
} from './styledComponents'

import debounce from 'lodash/debounce'
import HeaderTable from '../HeaderOrdersTable'
import ItemOrder from '../ItemOrder'
import { USERS_LIMIT } from '../constants'
import EmptyContainer from '../../EmptyContainer'
import { sorts, QueryProps, User } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getUsersQuery, getRepUsers, getManagers } from './data'
import Pagination from 'antd/lib/pagination/Pagination'
import {
  ID,
  SOCIAL_METHOD,
  NETSUITE_INTERNAL,
  AFFILIATE_ID,
  CREATED_AT,
  FIRST_NAME,
  ADMINISTRATOR,
  EMAIL,
  SALES_REP,
  ACCOUNT_MANAGER
} from './constants'

interface Data extends QueryProps {
  usersQuery: {
    fullCount: number
    users: User[]
  }
}

interface ManagersData extends QueryProps {
  managersQuery: User[]
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  currentPage: number
  orderBy: string
  sort: sorts
  withPagination?: boolean
  withoutPadding?: boolean
  isReseller: boolean
  isAffiliate: boolean
  searchText: string
  canEdit: boolean
  canSetAdmin: boolean
  repSearchText: string
  managerSearchText: string
  salesRep: Data
  managers: ManagersData
  setCheckedAction: (name: string, checked: boolean) => void
  setManager: (value: string, userId: string) => void
  setUserRep: (value: string, userId: string) => void
  searchReps: (value: string) => void
  searchManager: (value: string) => void
  onSortClick: (label: string, sort: sorts) => void
  onChangePage: (page: number) => void
  onSetAdministrator: (id: number) => void
  onSelectUser: (id: string, name: string) => void
  setSearchText: (searchText: string) => void
  onAddNewUser: () => void
}
interface StateProps {
  searchValue: string
}

class UsersList extends React.Component<Props, StateProps> {
  state = {
    searchValue: '',
  }
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchText(this.state.searchValue),
    600
  )
  handleCheckChange = ({ target: { name, checked } }: CheckboxChangeEvent) => {
    if (!!name) {
      const { setCheckedAction } = this.props
      setCheckedAction(name, checked)
    }
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = evt
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
  render() {
    const {
      formatMessage,
      orderBy,
      sort,
      canEdit,
      currentPage,
      data: { usersQuery },
      onSortClick,
      searchReps,
      searchManager,
      setUserRep,
      setManager,
      salesRep,
      isReseller,
      isAffiliate,
      managers,
      onChangePage,
      withPagination = true,
      withoutPadding = false,
      onSetAdministrator,
      onAddNewUser,
      searchText,
      canSetAdmin,
      onSelectUser,
    } = this.props

    const users = get(usersQuery, 'users', []) as User[]
    const repUsers = get(salesRep, 'repUsers.users', []) as User[]
    const managersUsers = get(managers, 'managersQuery', []) as User[]
    const fullCount = get(usersQuery, 'fullCount', 0)

    if (!users || !users.length) {
      return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
    }

    const header = (
      <MediaQuery maxWidth={768}>
        {(matches) => {
          if (matches) {
            return (
              <Row>
                <Header>{formatMessage(messages.clientID)}</Header>
                <Header>{formatMessage(messages.affiliate)}</Header>
                <Header>{formatMessage(messages.signUpDate)}</Header>
                <Header>{formatMessage(messages.name)}</Header>
                <Header>{formatMessage(messages.accountType)}</Header>
                <Header>{formatMessage(messages.admin)}</Header>
                <Header>{formatMessage(messages.email)}</Header>
                <Header>{formatMessage(messages.netsuiteId)}</Header>
              </Row>
            )
          }
          return (
            <Row>
              <HeaderTable
                id={ID}
                label={formatMessage(messages.clientID)}
                sort={orderBy === ID ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={AFFILIATE_ID}
                label={formatMessage(messages.affiliate)}
                sort={orderBy === AFFILIATE_ID ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={CREATED_AT}
                label={formatMessage(messages.signUpDate)}
                sort={orderBy === CREATED_AT ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={FIRST_NAME}
                label={formatMessage(messages.name)}
                sort={orderBy === FIRST_NAME ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={SOCIAL_METHOD}
                label={formatMessage(messages.accountType)}
                sort={orderBy === SOCIAL_METHOD ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={ADMINISTRATOR}
                label={formatMessage(messages.admin)}
                sort={orderBy === ADMINISTRATOR ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={EMAIL}
                label={formatMessage(messages.email)}
                sort={orderBy === EMAIL ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={NETSUITE_INTERNAL}
                label={formatMessage(messages.netsuiteId)}
                sort={orderBy === NETSUITE_INTERNAL ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={SALES_REP}
                label={formatMessage(messages.salesRep)}
                sort={orderBy === SALES_REP ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={ACCOUNT_MANAGER}
                label={formatMessage(messages.accountManager)}
                sort={orderBy === ACCOUNT_MANAGER ? sort : 'none'}
                {...{ onSortClick }}
              />
            </Row>
          )
        }}
      </MediaQuery>
    )

    const userItems = users.map(
      (
        {
          id,
          email,
          firstName,
          lastName,
          salesRep: repSelected,
          accountManager: managerSelected,
          socialMethod,
          administrator,
          netsuiteId = '',
          affiliateId,
          createdAt,
          shortId,
        }: User,
        index: number
      ) => {
        return (
          <ItemOrder
            key={index}
            {...{
              id,
              searchReps,
              searchManager,
              setUserRep,
              canSetAdmin,
              email,
              firstName,
              canEdit,
              lastName,
              managerSelected,
              setManager,
              socialMethod,
              managersUsers,
              repUsers,
              repSelected,
              administrator,
              onSetAdministrator,
              netsuiteId,
              affiliateId,
              createdAt,
              onSelectUser,
              shortId,
            }}
          />
        )
      }
    )

    return (
      <Container {...{ withoutPadding }}>
        <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>
        <OptionsContainer>
          {canEdit && (
            <AddInternalButton onClick={onAddNewUser}>
              {formatMessage(messages.addUser)}
            </AddInternalButton>
          )}
          <SearchInput
            value={this.state.searchValue || searchText}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
            autoFocus={true}
          />
          <Checkboxes>
            <CheckboxStyled
              checked={isAffiliate}
              name="isAffiliate"
              onChange={this.handleCheckChange}
            >
              {formatMessage(messages.isAffiliate)}
            </CheckboxStyled>
            <CheckboxStyled
              checked={isReseller}
              name="isReseller"
              onChange={this.handleCheckChange}
            >
              {formatMessage(messages.isReseller)}
            </CheckboxStyled>
          </Checkboxes>
        </OptionsContainer>
        <Table>
          <thead>{header}</thead>
          <tbody>{userItems}</tbody>
        </Table>
        {withPagination ? (
          <Pagination
            current={currentPage}
            pageSize={USERS_LIMIT}
            total={Number(fullCount)}
            onChange={onChangePage}
          />
        ) : null}
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  orderBy?: string
  sort?: string
  customLimit?: number
  searchText?: string
  isReseller?: boolean
  isAffiliate?: boolean
  repSearchText?: string
  managerSearchText?: string
}

const UsersListEnhance = compose(
  graphql(getManagers, {
    name: 'managers',
    options: ({ managerSearchText }: OwnProps) => ({
      variables: {
        searchText: managerSearchText
      },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(getRepUsers, {
    name: 'salesRep',
    options: ({ repSearchText }: OwnProps) => ({
      variables: {
        text: repSearchText
      },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(getUsersQuery, {
    options: ({
      currentPage,
      orderBy,
      isReseller,
      isAffiliate,
      sort,
      customLimit,
      searchText,
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : USERS_LIMIT
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          limit,
          offset,
          order: orderBy,
          orderAs: sort,
          searchText,
          isReseller,
          isAffiliate
        },
        fetchPolicy: 'network-only',
      }
    },
  }),
  withError,
  withLoading
)(UsersList)

export default UsersListEnhance
