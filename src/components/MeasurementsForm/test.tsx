/**
 * MeasurementsForm Test - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MeasurementsForm from './index'

describe('<MeasurementsForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const msrmntSystemSelected = ''
    const msrmntGenderSelected = ''
    const weight = ''
    const heightFirst = ''
    const heightSecond = ''
    const chestSize = ''
    const waistSize = ''
    const hipsSize = ''
    const inseamSize = ''
    const shouldersSize = ''
    const neckSize = ''
    const formatMessage = (messageDescriptor: any) => ''
    const handleOnMsrmntSystemChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {}
    const handleOnMsrmntGenderChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {}
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {}
    ReactDOM.render(
      <MeasurementsForm
        {...{
          msrmntSystemSelected,
          msrmntGenderSelected,
          weight,
          heightFirst,
          heightSecond,
          chestSize,
          waistSize,
          hipsSize,
          inseamSize,
          shouldersSize,
          neckSize,
          formatMessage,
          handleOnMsrmntSystemChange,
          handleOnMsrmntGenderChange,
          handleInputChange
        }}
      />,
      div
    )
  })
})
