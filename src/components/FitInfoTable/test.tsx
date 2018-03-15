/**
 * FitInfoTable Test - Created by gustavomedina on 12/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FitInfoTable } from './index'

describe('<FitInfoTable />', () => {
  test('renders without exploding', () => {
    const data = {
      bodyChart: [
        {
          size: '0',
          waist: '0',
          hips: '0',
          chest: '0',
          inseam: '0'
        }
      ],
      fetchMore: () => {}
    }
    const div = document.createElement('div')
    ReactDOM.render(
      <FitInfoTable metric={'IN'} bodyChartId={1} genderId={1} data={data} />,
      div
    )
  })
})
