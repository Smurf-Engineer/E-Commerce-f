/**
 * MyLocker -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  message: {
    id: 'components.MyLocker.message',
    defaultMessage: 'These are your saved designs'
  },
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
    defaultMessage:
      'Your Locker is empty. Go to the design app and start an awesome design!'
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
  },
  renameText: {
    id: 'components.MyLocker.renameText',
    defaultMessage: 'Name it something that is simple and recognizable to you.'
  },
  renamePlaceholder: {
    id: 'components.MyLocker.renamePlaceholder',
    defaultMessage: 'New name for {designName}'
  },
  titleRenameModal: {
    id: 'components.MyLocker.titleRenameModal',
    defaultMessage: 'Rename Design'
  },
  renameDesign: {
    id: 'components.MyLocker.renameDesign',
    defaultMessage: 'Rename'
  },
  invalidNameMessage: {
    id: 'components.MyLocker.invalidNameMessage',
    defaultMessage: 'Invalid design name'
  },
  invalidUser: {
    id: 'components.MyLocker.invalidUser',
    defaultMessage: 'You must be logged in to save designs.'
  },
  saveSuccess: {
    id: 'components.MyLocker.saveSuccess',
    defaultMessage: '"{designName}" has been renamed successfully'
  },
  userLocker: {
    id: 'components.MyLocker.userLocker',
    defaultMessage: '{userName} Locker'
  }
})
