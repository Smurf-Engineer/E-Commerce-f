/**
 * MainNavigationAdmin Test - Created by carloscazarez on 29/06/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainNavigationAdmin from './index'
import { ApolloProvider } from 'react-apollo'
import { configureBrowserClient } from '../../apollo'
const client = configureBrowserClient()

describe('<MainNavigationAdmin />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ApolloProvider {...{ client }}>
        <MainNavigationAdmin />
      </ApolloProvider>,
      div
    )
  })
})
