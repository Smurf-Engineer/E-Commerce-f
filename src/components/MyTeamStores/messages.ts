/**
 * MyTeamStores -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.MyTeamStores.tittle',
    defaultMessage: 'My TeamStores'
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
    defaultMessage: `<p>Team Stores are a fast and convenient option for teams, groups or event 
    organizers expecting <strong>2 or more members</strong>, to place orders without the hassle of a single person 
    having to collect size and payment from each individual.</p>
    
    <p>Team store orders are produced on demand upon receipt of order and typically ship within 7
    days of receipt (excluding Federal holidays). Default pricing is set at 20% off the regular single
    pricing. If you have a large team, contact us to set up higher bulk pricing discounts.</p>

    <p>Creating  a  Team  Store  enables  your  team  members  to  individually  checkout,  using  their
    preferred payment method, designate their own shipping address and track their orders on
    their Jakroo account.</p>
    `
  }
})
