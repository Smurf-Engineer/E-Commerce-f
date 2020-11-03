/**
 * LockerTable -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  starting: {
    id: 'components.LockerTable.starting',
    defaultMessage: 'Starting Price'
  },
  target: {
    id: 'components.LockerTable.target',
    defaultMessage: 'Target Price'
  },
  orders: {
    id: 'components.LockerTable.orders',
    defaultMessage: 'Current Orders'
  },
  current: {
    id: 'components.LockerTable.current',
    defaultMessage: 'Current Price'
  },
  visible: {
    id: 'components.LockerTable.visible',
    defaultMessage: 'Visible'
  },
  cannotHide: {
    id: 'components.LockerTable.cannotHide',
    defaultMessage:
      'During the ordering period, you cannot hide items with orders.'
  },
  cannotDelete: {
    id: 'components.LockerTable.cannotDelete',
    defaultMessage:
      'During the ordering period, you cannot delete items with orders.'
  },
  fixedPrice: {
    id: 'components.LockerTable.fixedPrice',
    defaultMessage: 'Team Price'
  },
  currency: {
    id: 'components.LockerTable.currency',
    defaultMessage: 'Base Currency'
  },
  teamPrice: {
    id: 'components.LockerTable.teamPrice',
    defaultMessage: 'MSRP'
  },
  purchasePrice: {
    id: 'components.LockerTable.purchasePrice',
    defaultMessage: 'Dealer Price'
  },
  yourPrice: {
    id: 'components.LockerTable.yourPrice',
    defaultMessage: 'Your List Price'
  },
  profit: {
    id: 'components.LockerTable.profit',
    defaultMessage: 'Your Profit'
  },
  yourMargin: {
    id: 'components.LockerTable.yourMargin',
    defaultMessage: 'Your Margin'
  },
  regularPrice: {
    id: 'components.LockerTable.regularPrice',
    defaultMessage: 'Regular Price'
  },
  gotIt: {
    id: 'components.LockerTable.gotIt',
    defaultMessage: 'Got it!'
  },
  aboutTeam: {
    id: 'components.LockerTable.aboutTeam',
    defaultMessage: 'ABOUT TEAM PRICE'
  },
  aboutTeamInfo: {
    id: 'components.LockerTable.aboutTeamInfo',
    defaultMessage: `Team pricing starts at the 20% discount off 
    the regular price. The price will automatically drop as members reach the next discount level.`
  },
  quantity: {
    id: 'components.LockerTable.quantity',
    defaultMessage: 'QTY Ordered'
  },
  currencyDesc: {
    id: 'components.LockerTable.currencyDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<span>BASE CURRENCY</span>The <b>Base Currency</b> is your default store currency based on your region. For Canadian Resellers, the base currency is set to CAD. For Resellers in the USA, the base currency is USD.'
  },
  msrpDesc: {
    id: 'components.LockerTable.msrpDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<span>MSRP</span>The <b>MSRP</b> is Jakroo’s default on-demand store price. This may serve as a benchmark for setting your list price.'
  },
  dealerPrice: {
    id: 'components.LockerTable.dealerPrice',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<span>DEALER PRICE</span>The <b>Dealer Price</b> is the price used to calculate your profit. This price is static and will not change based on quantity sold.'
  },
  listPriceDesc: {
    id: 'components.LockerTable.listPriceDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<span>LIST PRICE</span>The <b>List Price</b> is what your customers will see on the store. The minimum price allowed is the MSRP. You can set a higher price to increase your profit amount.'
  },
})
