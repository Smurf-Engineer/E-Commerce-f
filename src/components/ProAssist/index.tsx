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
import { sorts } from '../../types/common'
import Switch from 'antd/lib/switch'
import SwitchWithLabel from '../SwitchWithLabel'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  searchText: string
  formatMessage: (messageDescriptor: any) => string
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
    const checked = true
    const loading = true
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

  onChangeEnabled = () => {
    console.log('pears')
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
