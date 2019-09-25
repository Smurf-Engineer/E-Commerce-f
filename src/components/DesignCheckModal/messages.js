/**
 * DesignCheckModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  reviewDesignModalText: {
    id: 'components.DesignCheckModal.reviewDesignModalText',
    defaultMessage: `
    <p class=\"important\">For an additional fee of $15.00, 
    <strong>all products </strong> on your order will be reviewed by a Pro Designer at Jakroo.</p>
    <p>Review services include:<p/>
    <ul>
      <li>- Color consistency throughout design and ordered products. </li>
      <li>- Center alignment and adjustment to graphics/text. </li >
      <li>- Resolution quality review for any uploaded raster images. </li>
      <li>- Check for any other unforeseen issues. </li>
    </ul>
    <p>You will receive a review notification by email typically within 24 hours (excluding holidays/weekends) upon completion of your review. </p>
    <div class=\"smaller-text\">
      <p class=\"important no-margin\">This service is optional and can be added to your order during checkout.</p>
    </div>`
  },
  proDesignerReviewLabel: {
    id: 'components.DesignCheckModal.proDesignerReviewLabel',
    defaultMessage: 'DESIGN CHECK'
  },
  helpLabel: {
    id: 'components.DesignCheckModal.helpLabel',
    defaultMessage:
      'Having trouble getting your design just right? <strong>We´re here to help!</strong> It´s important to us that every design turns out just right.'
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
