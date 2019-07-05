/**
 * ProductInternalsAdmin Component - Created by eduardoquintero on 03/07/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { isNumber } from '../../utils/utilsFiles'
import { FormattedMessage } from 'react-intl'
import * as ProductInternalActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddInternalButton
} from './styledComponents'
import List from './InternalsList'
import InternalsModal from './InternalsModal'
import messages from './messages'
import { sorts, ProductInternal, Message } from '../../types/common'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  internalId: string
  searchText: string
  productCode: string
  formatMessage: (messageDescriptor: Message) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setIdAction: (id: number) => void
  setSearchTextAction: (searchText: string) => void
  setLoadingAction: (loading: boolean) => void
  setTextAction: (field: string, value: string) => void
  onSelectChangeAction: (value: string, id: string) => void
}

interface StateProps {
  searchValue: string
}
class ProductInternalsAdmin extends React.Component<Props, StateProps> {
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
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      internalId,
      productCode,
      onSelectChangeAction
    } = this.props

    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <AddInternalButton onClick={this.handleOnAddInternal}>
          {formatMessage(messages.addInternalLabel)}
        </AddInternalButton>
        <SearchInput
          value={this.state.searchValue}
          onChange={this.handleInputChange}
          placeholder={formatMessage(messages.search)}
        />
        <List
          {...{ formatMessage, currentPage, orderBy, sort, searchText }}
          onSortClick={this.handleOnSortClick}
          onInternalClick={this.handleOnInternalClick}
          onChangePage={this.handleOnChangePage}
          interactiveHeaders={true}
        />
        <InternalsModal
          open={true}
          requestClose={this.handleOnCloseDiscountModal}
          handleOnInputChange={this.handleOnInputChange}
          handleOnSelectChange={onSelectChangeAction}
          onSaveDiscount={this.handleOnSaveDiscount}
          {...{
            formatMessage,
            internalId,
            productCode,
            discountItemId: '',
            discountTypes: ['%'],
            rate: 1,
            discountActive: true,
            expiry: '',
            loading: false
          }}
        />
      </Container>
    )
  }

  handleOnAddInternal = () => {}

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnInternalClick = (internal: ProductInternal) => {}

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleOnInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget,
      currentTarget: { value, id }
    } = event
    const { setTextAction } = this.props
    const acceptNumbersOnly = currentTarget.getAttribute('data-is-number')
    if (acceptNumbersOnly && (!isNumber(value) && value !== '')) {
      return
    }
    setTextAction(id, value)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
}

const mapStateToProps = (state: any) =>
  state.get('productInternalsAdmin').toJS()

const ProductInternalsAdminEnhance = compose(
  connect(
    mapStateToProps,
    { ...ProductInternalActions }
  )
)(ProductInternalsAdmin)

export default ProductInternalsAdminEnhance
