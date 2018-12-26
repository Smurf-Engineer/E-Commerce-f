/**
 * InspirationItem Test - Created by miguelcanobbio on 14/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import InspirationItem from './index'

describe('<InspirationItem />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const inspiration = { name: 'inspiration test', image: '', colors: [] }
    const setColors = () => {}
    ReactDOM.render(<InspirationItem {...{ inspiration, setColors }} />, div)
  })
})
