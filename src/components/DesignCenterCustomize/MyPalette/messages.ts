/**
 * MyPalette - Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  paletteSaved: {
    id: 'components.MyPalette.paletteSaved',
    defaultMessage: 'Your Palette is saved'
  },
  modalTitle: {
    id: 'components.MyPalette.modalTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  deletePaletteMessage: {
    id: 'components.MyPalette.deletePaletteMessage',
    defaultMessage: `You're about to delete this palette`
  },
  modalConfirmText: {
    id: 'components.MyPalette.deletePaletteConfirm',
    defaultMessage: 'Confirm'
  },
  modalCancelText: {
    id: 'components.MyPalette.deletePaletteCancel',
    defaultMessage: 'Cancel'
  },
  applyPalette: {
    id: 'components.MyPalette.applyPalette',
    defaultMessage: 'Apply {paletteNameToApply}'
  },
  applyPaletteMessage: {
    id: 'components.MyPalette.applyPaletteMessage',
    defaultMessage:
      'Using this palette will replace the colors currently in use.'
  }
})
