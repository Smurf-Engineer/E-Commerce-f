/**
 * DesignCenterStyle -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.DesignCenterStyle.title',
    defaultMessage: 'Choose the complexity of the design'
  },
  modalNewStyleTitle: {
    id: 'components.DesignCenterStyle.modalNewStyleTitle',
    defaultMessage: 'NEW DESIGN?'
  },
  modalNewStyleMessage: {
    id: 'components.DesignCenterStyle.modalNewStyleMessage',
    defaultMessage:
      'By selecting a different design you have to restart the customization.'
  },
  modalNewStyleConfirm: {
    id: 'components.DesignCenterStyle.modalNewStyleConfirm',
    defaultMessage: 'Confirm'
  },
  modalNewStyleCancel: {
    id: 'components.DesignCenterStyle.modalNewStyleCancel',
    defaultMessage: 'Cancel'
  },
  emptyTitle: {
    id: 'components.DesignCenterStyle.emptyTitle',
    defaultMessage: 'Oops!'
  },
  emptyMessage: {
    id: 'components.DesignCenterStyle.emptyMessage',
    defaultMessage: 'Seems there is no designs of this complexity, yet.'
  },
  errorMessage: {
    id: 'app.error.message',
    defautMessage: 'Something went wrong'
  }
})
