/**
 * ProductSlide -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  approved: {
    id: 'components.ProductThumbnail.ProductSlide.approved',
    defaultMessage: 'UPDATED'
  },
  proAssigned: {
    id: 'components.ProductThumbnail.ProductSlide.proAssigned',
    defaultMessage: 'PRODESIGN'
  },
  tooltipQuality: {
    id: 'components.ProductThumbnail.ProductSlide.tooltipQuality',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Designs marked with <strong>Quality Warning</strong> most likely include graphic elements such as photos, logos or other image files that have low resolution and may not be suitable for high quality printing.</p><p>In some cases these issues can be corrected by recreating the file in a higher resolution format.</p><p>Contact our design team via email or chat for assistance.'
  },
  tooltipProCert: {
    id: 'components.ProductThumbnail.ProductSlide.tooltipProCert',
    // tslint:disable-next-line: max-line-length
    defaultMessage: `<p><strong>Pro Certified</strong> designs are designs that you've created using the DesignLab templates or blank canvas.</p><p>They have been reviewed and updated by our Jakroo Pro Design Team for color consistency, alignment of text and graphics and resolution quality for any embedded raster images to ensure optimal print quality.</p>`
  },
  tooltipProdesign: {
    id: 'components.ProductThumbnail.ProductSlide.tooltipProdesign',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p><strong>ProDesigns</strong> are designs specifically created by our Jakroo Pro Design Team based on your design requirements or ideas.</p><p>Pro Designs typically belong to a Pro Design Project and have been approved prior to being available in your Locker.</p>'
  },
  close: {
    id: 'components.ProductThumbnail.ProductSlide.close',
    defaultMessage: 'Close'
  }
})
