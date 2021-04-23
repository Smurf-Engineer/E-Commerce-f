/**
 * Teamstores Types - Created by cazarez on 10/04/18.
 */

import dynamicDrop from '../../assets/dynamic_drop.svg'
import secureSSL from '../../assets/secure_ssl.svg'
import stripePowered from '../../assets/powered_by_stripe.svg'
import masterCard from '../../assets/mastercard.svg'
import visaCard from '../../assets/visa-card.svg'
import amexCard from '../../assets/amex_card.svg'
import discoverCard from '../../assets/card-discover.svg'
import paypal from '../../assets/Paypal.svg'

const namespace = 'src/Teamstores'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_SEARCH_PARAM = `${namespace}/SET_SEARCH_PARAM`
export const OPEN_SHARE_MODAL = `${namespace}/OPEN_SHARE_MODAL`
export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`

export const SET_SKIP_VALUE = `${namespace}/SET_SKIP_VALUE`
export const TEAM_STORES_LIMIT = 100
export const SCREEN_TITLE = 'Jakroo DesignLab - Team Store Search'

export const paymentIcons = [
    dynamicDrop,
    secureSSL,
    stripePowered,
    masterCard,
    visaCard,
    amexCard,
    discoverCard,
    paypal,
]