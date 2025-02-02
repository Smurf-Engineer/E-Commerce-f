/* Routes */
import CustomProductDetail from '../screens/CustomProductDetail'
import FitAndSizing from '../screens/FitAndSizing'
import WorkAtJakroo from '../screens/WorkAtJakroo'
// import AboutUsPage from '../screens/AboutUsPage'
// import TemplateDownload from '../screens/TemplateDownload' // TODO: hide template download route
import JerseyComparison from '../screens/JerseyComparison'
import WarrantyProgram from '../screens/WarrantyProgram'
import Technology from '../screens/Technology'
import ArtworkSpecs from '../screens/ArtworkSpecs'
import Reviews from '../screens/Reviews'
import ResellerSignup from '../screens/ResellerSignup'
import TeamKits from '../screens/TeamKits'
import TermsOfUse from '../screens/TermsOfUse'
import Faq from '../screens/Faq'
import Compliance from '../screens/Compliance'
import OrderPlaced from '../screens/OrderPlaced'
import Checkout from '../screens/Checkout'
import DesignerTool from '../screens/DesignerTool'
import ShoppingCartPage from '../screens/ShoppingCartPage'
// TODO: hide teamstores for phase I
import StoreFront from '../screens/StoreFront'
import CreateStore from '../screens/CreateStore'
import SearchTeamstores from '../screens/SearchTeamstores'
import TeamstoreProductPage from '../screens/TeamstoreProductPage'
import Account from '../screens/Account'
import FitWidget from '../screens/FitWidget'
import Designs from '../screens/Designs'
import DesignApproval from '../screens/DesignApproval'
import ProductDetail from '../screens/ProductDetail'
import ProductCatalog from '../screens/ProductCatalogue'
import DesignLabLanding from '../screens/DesignLabLanding'
import DesignCenter from '../screens/DesignCenter'
import ProductModels from '../screens/ProductModels'
import NotFound from '../screens/NotFound'
import Home from '../screens/Home'
import IntakeForm from '../screens/IntakeForm'
import ResetPassword from '../screens/ResetPassword'
import Admin from '../screens/Admin'
import ProDesign from '../screens/ProDesign'
import SignUpTest from '../screens/HomeTest'
import PublishingTool from '../screens/PublishingTool'
import DesignTools from '../screens/DesignTools'
import TeamstoreTypes from '../screens/TeamstoreTypes'
import ProDesignLanding from '../screens/ProDesignLanding'

const routes = [
  {
    path: '/admin/publishing-tool',
    name: 'publishingTool',
    component: PublishingTool
  },
  {
    path: '/admin/design-tools',
    name: 'designTools',
    component: DesignTools
  },
  {
    path: '/admin/add-pro-design',
    name: 'proDesign',
    component: ProDesign
  },
  {
    path: '/signup-test',
    name: 'signupTest',
    component: SignUpTest
  },
  {
    path: '/admin/add-models',
    name: 'productModels',
    component: ProductModels
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/pro-design',
    name: 'intakeForm',
    component: IntakeForm
  },
  {
    path: '/custom-product',
    name: 'customProductDetail',
    component: CustomProductDetail
  },
  {
    path: '/fit-and-sizing',
    name: 'fitAndSizing',
    component: FitAndSizing
  },
  {
    path: '/work-at-jakroo',
    name: 'workAtJakroo',
    component: WorkAtJakroo
  },
  // {
  //   path: '/about-us-page',
  //   name: 'aboutUsPage',
  //   component: AboutUsPage
  // },
  // TODO: uncomment this route when be needed
  // {
  //   path: '/template-download',
  //   name: 'templateDownload',
  //   component: TemplateDownload
  // },
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
    path: '/reseller-signup',
    name: 'resellerSignup',
    component: ResellerSignup
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
    path: '/publishing-tool',
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
    path: '/create-store/form',
    name: 'createStoreForm',
    component: CreateStore
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: Reviews
  },
  {
    path: '/create-store',
    name: 'createStore',
    component: TeamstoreTypes
  },
  {
    path: '/prodesign',
    name: 'proDesignLanding',
    component: ProDesignLanding
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
    path: '/approval',
    name: 'approval',
    component: DesignApproval
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
    path: '/designlab',
    name: 'designLabLanding',
    component: DesignLabLanding
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
    path: '/kickstart',
    name: 'designCenter',
    component: DesignCenter
  },
  {
    path: '/not-found',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/:sportRoute?/:region',
    name: 'home',
    exact: true,
    component: Home
  }
]

export default routes
