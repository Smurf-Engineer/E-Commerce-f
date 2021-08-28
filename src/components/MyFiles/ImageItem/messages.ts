/**
 * ImageItem -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  delete: {
    id: 'components.ImageItem.delete',
    defaultMessage: 'Delete'
  },
  close: {
    id: 'components.ImageItem.close',
    defaultMessage: 'Close'
  },
  qualityWarningMessage: {
    id: 'components.ImageItem.qualityWarningMessage',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Files marked with <strong>Quality Warning</strong> are photos, logos or other image files that may have low resolution and most likely are not suitable for high quality printing.</p><p>Contact our design team via email or chat for further information.</p>'
  }
})
