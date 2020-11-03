/**
 * DesignLabAdmin Component - Created by eduardoquintero on 12/06/19.
 */
import * as React from 'react'
import { compose, withApollo, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import message from 'antd/lib/message'
import { BLUE } from '../../theme/colors'
import US_FLAG from '../../assets/US.svg'
import CA_FLAG from '../../assets/CA.svg'
import {
  getDesignLabInfo,
  setDeliveryDaysMutation,
  setPlaylistMutation,
  setCutOffDaysMutation,
  getCurrencies,
  setRatesMutation
} from './data'
import * as DesignLabActions from './actions'
import {
  Container,
  ScreenTitle,
  StyledButton,
  StyledInputNumber,
  StyledInput,
  ButtonWrapper,
  BoxContainer,
  InfoText, Table, PricesContainer, Header, Cell, Row, Thumbnail, CurrencyTitle, StyledInputCurrency
} from './styledComponents'
import messages from './messages'
import { Currency, QueryProps, UserPermissions } from '../../types/common'
import { DESIGN_LAB, ADMIN_ROUTE } from '../AdminLayout/constants'
import { CHF_CURRENCY } from '../TeamStoresAdmin/constants'

const DECIMAL_REGEX = /[^0-9.]|\.(?=.*\.)/g

const resellerCurrencies = [
  {
    title: 'USD',
    thumbnail: US_FLAG
  },
  {
    title: 'CAD',
    thumbnail: CA_FLAG
  }
]

interface CurrenciesData extends QueryProps {
  currencies: Currency[]
}

interface Props {
  history: any
  client: any
  loading: any
  dispatch: any
  tutorialPlaylist: string
  deliveryDays: number
  deliveryDaysChanges: boolean
  cutOffDays: number
  tutorialPlaylistChanged: boolean
  permissions: UserPermissions
  currenciesData: CurrenciesData
  cutOffDaysChanges: boolean
  currencies: { [id: string]: { [shortName: string]: {} } }
  setLoadingAction: (loading: boolean) => void
  setRateAction: (title: string, currency: string, value: number) => void
  formatMessage: (messageDescriptor: any) => string
  setDataAction: (data: any, currencies: Currency[]) => void
  setDeliveryDaysAction: (value: number) => void
  setPlaylistAction: (value: string) => void
  setRates: (variables: {}) => Promise<Currency[]>
  setDeliveryDays: (variables: {}) => Promise<any>
  setPlaylist: (variables: {}) => Promise<any>
  setCutoffDaysAction: (value: number) => void
  setCutOffDays: (variables: {}) => Promise<any>
}

class DesignLabAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      client: { query },
      setDataAction
    } = this.props
    try {
      const response = await query({
        query: getDesignLabInfo,
        fetchPolicy: 'network-only'
      })
      const { data: { designLabInfo, exchangeRate } } = response
      const currencyData = exchangeRate.reduce((obj, { currencyBase, shortName, rate }) => {
        if (!obj[currencyBase]) {
          obj[currencyBase] = {}
        }
        obj[currencyBase][shortName] = rate
        return obj
        // tslint:disable-next-line: align
      }, {})
      setDataAction(designLabInfo, currencyData)
    } catch (e) {
      message.error(e.message)
    }
  }
  handleChangeText = (event: any) => {
    const { setPlaylistAction } = this.props
    setPlaylistAction(event.target.value)
  }
  saveDeliveryDays = async () => {
    const { setDeliveryDays, deliveryDays } = this.props
    try {
      const response = await setDeliveryDays({ variables: { deliveryDays } })
      message.success(get(response, 'data.setDeliveryDays.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  handleSaveCurrency = (title: string) => async () => {
    const { setRates, currencies, setLoadingAction } = this.props
    try {
      setLoadingAction(true)
      const currencyToSave = currencies[title] || {}
      const rates = Object.keys(currencyToSave).map((shortName: string) =>
        ({
          short_name: shortName,
          currency_base: title,
          rate: currencyToSave[shortName]
        })
      )
      const response = await setRates({ variables: { currency: title, rates } })
      message.success(get(response, 'data.setRates.message', ''))
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoadingAction(false)
    }
  }
  handleChangeRate = (value: number, title: string, currency: string) => {
    const { setRateAction } = this.props
    setRateAction(title, currency, value)
  }
  saveCutOffDays = async () => {
    const { setCutOffDays, cutOffDays } = this.props
    try {
      const response = await setCutOffDays({ variables: { cutOffDays } })
      message.success(get(response, 'data.setCutOffDays.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  savePlaylist = async () => {
    const { tutorialPlaylist, setPlaylist } = this.props
    try {
      const response = await setPlaylist({
        variables: { playlist: tutorialPlaylist }
      })
      message.success(get(response, 'data.setPlaylist.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  render() {
    const {
      formatMessage,
      loading,
      history,
      tutorialPlaylist,
      currenciesData,
      currencies: rates = {},
      deliveryDays,
      permissions,
      tutorialPlaylistChanged,
      deliveryDaysChanges,
      setDeliveryDaysAction,
      setCutoffDaysAction,
      cutOffDaysChanges,
      cutOffDays
    } = this.props
    const access = permissions[DESIGN_LAB] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    const currencies = get(currenciesData, 'currencies', [])
    const headers = currencies.map(
      ({ id, shortName }: Currency) =>
        shortName !== CHF_CURRENCY && <Header key={id}>{shortName}</Header>
    )
    return (
      <Container>
        <ScreenTitle>{formatMessage(messages.deliveryDates)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.currentDeliveryDate)}</InfoText>
          <StyledInputNumber
            onChange={setDeliveryDaysAction}
            disabled={!access.edit}
            value={deliveryDays}
          />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              disabled={!deliveryDaysChanges || !access.edit}
              onClick={this.saveDeliveryDays}
              loading={loading}
            >
              {formatMessage(messages.update)}
            </StyledButton>
          </ButtonWrapper>
        </BoxContainer>
        <ScreenTitle>{formatMessage(messages.cutOffDays)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.currentCutOffDays)}</InfoText>
          <StyledInputNumber
            onChange={setCutoffDaysAction}
            value={cutOffDays}
          />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              disabled={!cutOffDaysChanges}
              onClick={this.saveCutOffDays}
              loading={loading}
            >
              {formatMessage(messages.update)}
            </StyledButton>
          </ButtonWrapper>
        </BoxContainer>
        <ScreenTitle>{formatMessage(messages.videoTutorial)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.tutorialPlaylist)}</InfoText>
          <StyledInput
            onChange={this.handleChangeText}
            disabled={!access.edit}
            value={tutorialPlaylist}
          />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              disabled={!tutorialPlaylistChanged || !access.edit}
              onClick={this.savePlaylist}
              loading={loading}
            >
              {formatMessage(messages.update)}
            </StyledButton>
          </ButtonWrapper>
        </BoxContainer>
        <ScreenTitle>{formatMessage(messages.resellerExchange)}</ScreenTitle>
        <Table>
          <PricesContainer>
            <thead>
              <tr>
                <Header />
                {headers}
                <Header />
              </tr>
            </thead>
            <tbody>
              {resellerCurrencies.map(({ thumbnail, title }, index) =>
                <Row key={index}>
                  <Cell>
                    <Thumbnail src={thumbnail} />
                    <CurrencyTitle>
                      {title}
                    </CurrencyTitle>
                  </Cell>
                  {
                    currencies.map(({ shortName }, indexKey) => {
                      const currencyBase = rates[title] || {}
                      const value = currencyBase[shortName]
                      const onChange = (e) => this.handleChangeRate(e, title, shortName)
                      return shortName !== CHF_CURRENCY && (
                        <Cell key={indexKey} textAlign="center">
                          <StyledInputCurrency
                            {...{ value, onChange }}
                            id={shortName}
                            disabled={loading}
                            parser={preValue => preValue.replace(DECIMAL_REGEX, '')}
                            placeholder={'000'}
                          />
                        </Cell>)
                    }
                    )
                  }
                  <Cell textAlign="center">
                    <ButtonWrapper color={BLUE}>
                      <StyledButton
                        id={index}
                        disabled={loading}
                        type="primary"
                        onClick={this.handleSaveCurrency(title)}
                        {...{ loading }}
                      >
                        {formatMessage(messages.save)}
                      </StyledButton>
                    </ButtonWrapper>
                  </Cell>
                </Row>
              )}
            </tbody>
          </PricesContainer>
        </Table>
      </Container >
    )
  }
}

const mapStateToProps = (state: any) => state.get('designLabAdmin').toJS()

const DesignLabAdminEnhance = compose(
  withApollo,
  setDeliveryDaysMutation,
  setCutOffDaysMutation,
  setPlaylistMutation,
  setRatesMutation,
  graphql(getCurrencies, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'currenciesData'
  }),
  connect(mapStateToProps, { ...DesignLabActions })
)(DesignLabAdmin)

export default DesignLabAdminEnhance
