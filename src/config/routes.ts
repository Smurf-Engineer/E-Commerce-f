/* Routes */
import Teamstores from '../screens/Teamstores'
import TeamstoreProductPage from '../screens/TeamstoreProductPage'
import Account from '../screens/Account'
import SubscriptionTest from '../screens/SubscriptionTest'
import FitWidget from '../screens/FitWidget'
import Designs from '../screens/Designs'
import ProductDetail from '../screens/ProductDetail'
import ProductCatalog from '../screens/ProductCatalogue'
import DesignCenter from '../screens/DesignCenter'
import NotFound from '../screens/NotFound'
import Home from '../screens/Home'
import ResetPassword from '../screens/ResetPassword'

const routes = [
  {
    path: '/teamstores',
    name: 'teamstores',
    component: Teamstores
  },
  {
    path: '/teamstore-product-page',
    name: 'teamstoreProductPage',
    component: TeamstoreProductPage
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/subscription-test',
    name: 'subscriptionTest',
    component: SubscriptionTest
  },
  {
    path: '/fit-widget',
    name: 'fitWidget',
    component: FitWidget
  },
  {
    path: '/designs',
    name: 'designs',
    component: Designs
  },
  {
    path: '/product',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/product-catalogue',
    name: 'productCatalogue',
    component: ProductCatalog
  },
  {
    path: '/recovery',
    name: 'recovery',
    component: ResetPassword
  },
  {
    path: '/design-center',
    name: 'designCenter',
    component: DesignCenter
  },
  {
    path: '/not-found',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/:region',
    name: 'home',
    exact: true,
    component: Home
  }
]

export default routes
