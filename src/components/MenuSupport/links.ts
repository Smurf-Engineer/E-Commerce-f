/**
 * Links info
 */
import { LINK_TYPE_ROUTE, LINK_TYPE_URL } from '../../constants'

const links = [
  {
    label: 'faq',
    url: '/faq',
    type: LINK_TYPE_ROUTE
  },
  {
    label: 'terms',
    url: '/terms-of-use',
    type: LINK_TYPE_ROUTE
  },
  {
    label: 'pricing',
    url: `https://storage.googleapis.com/jakroo/homepage/JV2PRICING.pdf`,
    type: LINK_TYPE_URL
  },
  {
    label: 'warranty',
    url: '/warranty-program',
    type: LINK_TYPE_ROUTE
  },
  {
    label: 'design',
    url: '/artwork-specs',
    type: LINK_TYPE_ROUTE
  }
]

export default links
