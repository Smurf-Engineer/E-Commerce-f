/**
 * FaqQuestions Test - Created by cazarez on 29/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FaqQuestions from './index'

describe('<FaqQuestions />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const questions = [{ id: '', question: '', answer: '' }]
    const format = () => ''
    ReactDOM.render(
      <FaqQuestions {...{ questions }} formatMessage={format} />,
      div
    )
  })
})
