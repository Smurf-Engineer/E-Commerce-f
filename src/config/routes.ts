/* Routes */
import Faq from '../screens/Faq'
import OrderPlaced from '../screens/OrderPlaced'
import Checkout from '../screens/Checkout'
import DesignerTool from '../screens/DesignerTool'
import ShoppingCartPage from '../screens/ShoppingCartPage'
import StoreFront from '../screens/StoreFront'
import CreateStore from '../screens/CreateStore'
import SearchTeamstores from '../screens/SearchTeamstores'
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
    path: '/faq',
    name: 'faq',
    component: Faq
  },
  {
    path: '/order-placed',
    name: 'orderPlaced',
    component: OrderPlaced
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/designer-tool',
    name: 'designerTool',
    component: DesignerTool
  },
  {
    path: '/shopping-cart',
    name: 'shoppingCartPage',
    component: ShoppingCartPage
  },
  {
    path: '/store-front',
    name: 'storeFront',
    component: StoreFront
  },
  {
    path: '/create-store',
    name: 'createStore',
    component: CreateStore
  },
  {
    path: '/search-teamstores',
    name: 'searchTeamstores',
    component: SearchTeamstores
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
