/**
 * ProAssist Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import message from 'antd/lib/message'
import { FormattedMessage } from 'react-intl'
import { toggleProAssist, getProStatus } from './data'
import * as ProAssistActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  ActiveLabel,
  Header,
  SwitchLabel
} from './styledComponents'
import List from './OrdersList'
import messages from './messages'
import { sorts, QueryProps, Message, ProAssistStatus } from '../../types/common'
import Switch from 'antd/lib/switch'
import get from 'lodash/get'

interface Data extends QueryProps {
  proAssistStatus: ProAssistStatus
}

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  loading: boolean
  data: Data
  searchText: string
  formatMessage: (messageDescriptor: Message) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
  setLoading: (loading: boolean) => void
  changeEnablePro: () => Promise<Data>
}
interface StateProps {
  searchValue: string
}
class ProAssist extends React.Component<Props, StateProps> {
  state = {
    searchValue: ''
  }
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchTextAction(this.state.searchValue),
    600
  )
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      loading,
      data
    } = this.props
    const checked = get(data, 'proAssistStatus.enabled', false)
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <Header>
          <SearchInput
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
          />
          <ActiveLabel>
            <SwitchLabel>{formatMessage(messages.enable)}</SwitchLabel>
            <Switch {...{ checked, loading }} onChange={this.onChangeEnabled} />
          </ActiveLabel>
        </Header>
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

  onChangeEnabled = async () => {
    const { changeEnablePro, data, setLoading, formatMessage } = this.props
    try {
      setLoading(true)
      await changeEnablePro()
      await data.refetch()
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    } finally {
      setLoading(false)
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
  toggleProAssist,
  graphql(getProStatus, {
    options: () => ({
      fetchPolicy: 'network-only'
    })
  }),
  connect(mapStateToProps, { ...ProAssistActions })
)(ProAssist)

export default ProAssistEnhance
