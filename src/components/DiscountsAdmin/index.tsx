/**
 * DiscountsAdmin Component - Created by eduardoquintero on 24/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as DiscountsActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddDiscountButton
} from './styledComponents'
import List from './DiscountsList'
import messages from './messages'
import { sorts } from '../../types/common'
import SwipeableViews from 'react-swipeable-views'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  discountId: string
  searchText: string
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setDiscountIdAction: (discountId: string) => void
  setSearchTextAction: (searchText: string) => void
}

class DiscountsAdmin extends React.Component<Props, {}> {
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
      discountId,
      searchText
    } = this.props

    return (
      <SwipeableViews
        onChangeIndex={this.handleOnChangeIndex}
        index={!!discountId.length ? 1 : 0}
      >
        <Container>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          <AddDiscountButton>
            {formatMessage(messages.addDiscountLabel)}
          </AddDiscountButton>
          <SearchInput
            value={searchText}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
          />
          <List
            {...{ formatMessage, currentPage, orderBy, sort, searchText }}
            onSortClick={this.handleOnSortClick}
            onDiscountClick={this.handleOnDiscountClick}
            onChangePage={this.handleOnChangePage}
            interactiveHeaders={true}
          />
        </Container>
      </SwipeableViews>
    )
  }

  handleOnChangeIndex = (index: number) => {
    if (index === 0) {
      this.handleOnDiscountClick('')
    }
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnDiscountClick = (discountId: string) => {}

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
}

const mapStateToProps = (state: any) => state.get('discountsAdmin').toJS()

const DiscountsAdminEnhance = compose(
  connect(
    mapStateToProps,
    { ...DiscountsActions }
  )
)(DiscountsAdmin)

export default DiscountsAdminEnhance
