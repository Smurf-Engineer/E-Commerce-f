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
    defaultMessage: `Team Stores are a fast and convenient option for teams, groups or event 
    organizers expecting {members}, to place orders without the hassle of a single person 
    having to collect size and payment from each individual.`
  },
  members: {
    id: 'screen.MyTeamStores.members',
    defaultMessage: '2 or more members'
  }
})
