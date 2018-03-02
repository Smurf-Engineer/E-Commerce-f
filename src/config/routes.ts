/* Routes */
import ProductCatalog from '../screens/ProductCatalogue'
import DesignCenter from '../screens/DesignCenter'
import NotFound from '../screens/NotFound'
import Home from '../screens/Home'
import Designer from '../screens/Designer'

const routes = [
  {
    path: '/product-catalogue',
    name: 'productCatalogue',
    component: ProductCatalog
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
    path: '/',
    name: 'home',
    exact: true,
    component: Home
  },
  {
    path: '/designer',
    name: 'designer',
    component: Designer
  }
]

export default routes
