/**
 * Links info
 */
import config from '../../config'
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
    url: `${
      config.storageUrl
    }/screens/pricingChart/JAKROO-JV2-PRICESHEETV2.pdf`,
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
