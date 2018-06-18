/* Routes */
import TemplateDownload from '../screens/TemplateDownload'
import JerseyComparison from '../screens/JerseyComparison'
import WarrantyProgram from '../screens/WarrantyProgram'
import Technology from '../screens/Technology'
import ArtworkSpecs from '../screens/ArtworkSpecs'
import TeamKits from '../screens/TeamKits'
import TermsOfUse from '../screens/TermsOfUse'
import Faq from '../screens/Faq'
import Compliance from '../screens/Compliance'
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
    path: '/template-download',
    name: 'templateDownload',
    component: TemplateDownload
  },
  {
    path: '/jersey-comparison',
    name: 'jerseyComparison',
    component: JerseyComparison
  },
  {
    path: '/warranty-program',
    name: 'warrantyProgram',
    component: WarrantyProgram
  },
  {
    path: '/technology',
    name: 'technology',
    component: Technology
  },
  {
    path: '/artwork-specs',
    name: 'artworkSpecs',
    component: ArtworkSpecs
  },
  {
    path: '/team-kits',
    name: 'teamKits',
    component: TeamKits
  },
  {
    path: '/terms-of-use',
    name: 'termsOfUse',
    component: TermsOfUse
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq
  },
  {
    path: '/compliance',
    name: 'compliance',
    component: Compliance
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
