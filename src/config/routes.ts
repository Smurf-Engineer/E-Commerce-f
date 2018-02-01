/* Routes */
import NotFound from '../screens/NotFound'
import Home from '../screens/Home'
import Designer from '../screens/Designer'

const routes = [
  {
    path: '/*',
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
