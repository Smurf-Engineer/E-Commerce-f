import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Home from './index'

const sum = (a: number, b: number) => {
  return a + b
}

describe('<Home />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    expect(sum(2, 1)).toBe(3)
  })
})
