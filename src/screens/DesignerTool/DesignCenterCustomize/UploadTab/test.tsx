/**
 * UploadTab Test - Created by david on 08/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import UploadTab from './index'

describe('<UploadTab />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <UploadTab
        onUploadFiles={() => {}}
        onUploadDesign={() => {}}
        uploadingFiles={false}
        uploadNewModel={false}
        onSelectConfig={() => {}}
        extraFiles={[]}
        onAddExtraFile={() => {}}
        onRemoveExtraFile={() => {}}
      />,
      div
    )
  })
})
