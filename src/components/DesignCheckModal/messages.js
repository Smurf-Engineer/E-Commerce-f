/**
 * DesignCheckModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  reviewDesignModalText: {
    id: 'components.DesignCheckModal.reviewDesignModalText',
    defaultMessage: `
      <p class=\"important\">For an additional charge of $15, 
      your order can be reviewed by a Pro Designer at Jakroo.</p>
      <p class=\"no-margin\"><strong>Services Include:</strong></p>
      <ul>
        <li>- Color consistency throughout design and ordered products </li>
        <li>- Center alignment and adjustment to graphics/text </li>
        <li>- Resolution quality review for any uploaded raster images </li>
        <li>- Any other unforeseen potential issues </li>
      </ul>
      <div class=\"smaller-text\">
        <p class=\"important no-margin\">! IMPORTANT ! PLEASE READ ! </p>
        <p> If you choose <span>not</span> to have a Design Check, please understand that YOU are the designer
        and that no one at Jakroo will be reviewing, cleaning up or checking your design for errors before sending to print.</p>
        <p class=\"no-margin\"> Please ensure that all of your graphics are clear, aligned and centered.</p>
        <p>Your design on screen is how it will print - what you see is what you get. </p>
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
    defaultMessage: 'Optional'
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
    defaultMessage: 'No Thanks'
  }
})
