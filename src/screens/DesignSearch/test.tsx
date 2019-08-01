/**
 * DesignSearch Test - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import designSearchReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { DesignSearch } from './index'
import { createMemoryHistory } from 'history'
import { IntlProvider, InjectedIntl } from 'react-intl'

describe(' DesignSearch Screen', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    const user = {
      id: '',
      name: '',
      lastName: '',
      token: '',
      email: '',
      administrator: false
    }
    const history = createMemoryHistory()
    const intl: InjectedIntl = jest.genMockFromModule(
      '../../../__mocks__/reactIntl'
    )
    const uploadThumbnail = jest.fn()
    const updateDesign = jest.fn()
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignSearch
          {...{ history, user, intl, uploadThumbnail, updateDesign }}
          client={{}}
          loading={false}
          notFound={false}
          uploadingFile={false}
          actualSvg={''}
          uploadingThumbnail={false}
          data={{}}
          changes={false}
          colorAccessories={{}}
          stitchingValue={''}
          fontsData={{}}
          uploadFileSuccessAction={() => {}}
          uploadFileSuccessFailure={() => {}}
          restoreUserSessionAction={() => {}}
          formatMessage={() => ''}
          uploadProDesignAction={() => {}}
          resetDataAction={() => {}}
          setLoadingAction={() => {}}
          setNotFoundAction={() => {}}
          setOrderAction={() => {}}
          setUploadingThumbnailAction={() => {}}
          updateThumbnailAction={() => {}}
          setStitchingColorAction={() => {}}
          setColorAction={() => {}}
          resetChangesAction={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = designSearchReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = designSearchReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = designSearchReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
