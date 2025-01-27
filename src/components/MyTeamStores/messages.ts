/**
 * MyTeamStores -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.MyTeamStores.tittle',
    defaultMessage: 'My TeamStores'
  },
  myStores: {
    id: 'components.MyTeamStores.myStores',
    defaultMessage: 'MY STORES'
  },
  addCustomStore: {
    id: 'components.MyTeamStores.addCustomStore',
    defaultMessage: '+ ADD NEW CUSTOM STORE'
  },
  addTeamstoreLabel: {
    id: 'components.MyTeamStores.addTeamstoreLabel',
    defaultMessage: '+ ADD NEW TEAM STORE'
  },
  createTeamStoreText: {
    id: 'components.MyTeamStores.createTeamStoreText',
    defaultMessage: `Creating a team store enables your team members 
    to individually checkout and designate their own shipping address.`
  },
  titleDeleteModal: {
    id: 'components.MyTeamStores.titleDeleteModal',
    defaultMessage: 'Are you sure?'
  },
  messageDeleteModal: {
    id: 'components.MyTeamStores.messageDeleteModal',
    defaultMessage: 'This will permanently delete this Teamstore.'
  },
  shareModalTitle: {
    id: 'screen.MyTeamStores.shareTeamStoreMessage',
    defaultMessage: 'SHARE YOUR TEAMSTORE!'
  },
  errorMessage: {
    id: 'screen.MyTeamStores.errorMessage',
    defaultMessage: 'Something wrong happened. Please try again!'
  },
  deleteModalLabel: {
    id: 'screen.MyTeamStores.deleteModalLabel',
    defaultMessage: 'Delete'
  },
  shareTeamStoreMessage: {
    id: 'screen.MyTeamStores.shareTeamStoreMessage',
    defaultMessage: 'Check out this awesome teamstore!'
  },
  teamStoreConcept: {
    id: 'screen.MyTeamStores.teamStoreConcept',
    // tslint:disable-next-line:max-line-length
    defaultMessage: `<p>Team Stores are a fast and convenient option for teams, groups or event organizers expecting <b>2 or more members</b>, to place orders without the hassle of a single person having to collect size and payment from each individual.</p> <p>Team store orders are produced on demand upon receipt of order and typically ship within 7-12 days of receipt (excluding Federal holidays) or store closure, depending on the type of Team Store. Default pricing is set at 20% off the regular single pricing. However, greater savings can be achieved for larger groups, using JAKROO’s proprietary Dynamic Price Drop.</p> <p>Creating a Team Store enables your team members to individually checkout, using their preferred payment method, designate their own shipping address and track their orders on their JAKROO account.</p>`
  },
  resellerConcept: {
    id: 'screen.MyTeamStores.resellerConcept',
    // tslint:disable-next-line:max-line-length
    defaultMessage: `<p>DirectShip Stores are a fast and convenient option for Resellers to sell their custom shop kits to their customers without the hassle of holding inventory. </p> <p>DirectShip Store orders are produced on demand, upon receipt of order and typically ship direct to the customer within 10-12 days of receipt (excluding Federal holidays). Reseller margin is set at 20% off the selling price. MSRP pricing for DirectShip Stores is set at Jakroo’s 2-5pc price tier. However, you can set a higher price to increase your profit.</p> <p> Share your store with your customers and they can individually checkout using their preferred payment method, designate their own shipping address, and track their orders on their JAKROO account.  JAKROO handles all transaction and customer service costs. Margin is paid out monthly direct to a PayPal account of your choice.</p>`
  }
})
