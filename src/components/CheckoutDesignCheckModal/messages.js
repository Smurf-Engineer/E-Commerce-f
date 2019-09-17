/**
 * CheckoutDesignCheckModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  reviewDesignModalText: {
    id: 'components.CheckoutDesignCheckModal.reviewDesignModalText',
    defaultMessage: `
      <p class=\"important\"><strong>PLEASE READ.</strong></p>
      <p>Before continuing to checkout, please understand that YOU are the designer
      and that no one at Jakroo will be reviewing, cleaning up or checking your design
      for errors before sending to print. Please ensure that all your graphics are clear, aligned and centered.</p>
    <p class=\"important italic\">For an additional charge of $15, 
      your order can be reviewed by a Pro Designer at Jakroo.</p>
    <p>Services include:<p/>
    <ul>
      <li>- Color consistency throughout design and ordered products </li>
      <li>- Center alignment and adjustment to graphics/text </li >
      <li>- Any other unforeseen potential issues </li>
    </ul>
    <p>Your design on screen is how it will print - what you see is what you get. </p>
      </div>`
  },
  proDesignerReviewLabel: {
    id: 'components.CheckoutDesignCheckModal.proDesignerReviewLabel',
    defaultMessage: 'DESIGN CHECK'
  },
  optionalLabel: {
    id: 'components.CheckoutDesignCheckModal.optionalLabel',
    defaultMessage: 'Optional'
  },
  pleaseReadLabel: {
    id: 'components.CheckoutDesignCheckModal.pleaseReadLabel',
    defaultMessage: 'PLEASE READ'
  },
  reviewMyOrderLabel: {
    id: 'components.CheckoutDesignCheckModal.reviewMyOrderLabel',
    defaultMessage: 'REVIEW MY ORDER'
  },
  dontReview: {
    id: 'components.CheckoutDesignCheckModal.dontReview',
    defaultMessage: 'Continue without review'
  }
})
