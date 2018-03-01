/* Routes */
import DesignCenter from '../screens/DesignCenter'
import NotFound from '../screens/NotFound'
import Home from '../screens/Home'

const routes = [
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
  }
]

export default routes
