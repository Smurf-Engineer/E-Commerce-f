/**
 * DesignCheckModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  reviewDesignModalText: {
    id: 'components.DesignCheckModal.reviewDesignModalText',
    defaultMessage: `
      <p class=\"important\">For an additional charge of $15, your order can be review by a Pro Designer at Jakroo.</p>
      <p class=\"no-margin\"><strong>Services Include:</strong></p>
      <ul>
        <li>- Color consistency throughout design and ordered products </li>
        <li>- Center alignment and adjustment to graphics/text </li>
        <li>- Resolution quality review for any uploaded raster images </li>
        <li>- Any other unforeseen potential issues </li>
      </ul>
      <div class=\"smaller-text\">
        <p class=\"important no-margin\">This service is optional and can be added to an order during checkout.</p>
      </div>`
  },
  proDesignerReviewLabel: {
    id: 'components.DesignCheckModal.proDesignerReviewLabel',
    defaultMessage: 'DESIGN CHECK'
  },
  helpLabel: {
    id: 'components.DesignCheckModal.helpLabel',
    defaultMessage:
      '<strong>Having some trouble? We´re here to help!</strong> It´s important to us that every design turns out perfect.'
  },
  optionalLabel: {
    id: 'components.DesignCheckModal.optionalLabel',
    defaultMessage: 'Optional During Checkout'
  },
  pleaseReadLabel: {
    id: 'components.DesignCheckModal.pleaseReadLabel',
    defaultMessage: 'PLEASE READ'
  },
  reviewMyOrderLabel: {
    id: 'components.DesignCheckModal.reviewMyOrderLabel',
    defaultMessage: 'Add to Cart'
  },
  dontReview: {
    id: 'components.DesignCheckModal.dontReview',
    defaultMessage: 'Ok, Thanks!'
  }
})
