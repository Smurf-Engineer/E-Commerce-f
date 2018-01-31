import Home from '../containers/Home'
import Designer from '../containers/Designer'

const routes = [
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
