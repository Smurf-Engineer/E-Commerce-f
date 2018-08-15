/**
 * MyLocker -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  titleError: {
    id: 'components.MyLocker.titleError',
    defaultMessage: 'Oops!'
  },
  messageError: {
    id: 'components.MyLocker.messageError',
    defaultMessage: 'Something went wrong'
  },
  messageEmpty: {
    id: 'components.MyLocker.messageEmpty',
    defaultMessage: 'Your Locker is empty. Go to the design app and start an awesome design!'
  },
  deleteDesign: {
    id: 'components.MyLocker.deleteDesign',
    defaultMessage: 'Delete'
  },
  titleDeleteModal: {
    id: 'components.MyLocker.titleDeleteModal',
    defaultMessage: 'Are you sure?'
  },
  messageDeleteModal: {
    id: 'components.MyLocker.messageDeleteModal',
    defaultMessage: '"{designName}" will be deleted from your locker'
  },
  designOnCartError: {
    id: 'components.MyLocker.designOnCartError',
    defaultMessage: 'You cannot delete designs that are on your cart'
  }
})
