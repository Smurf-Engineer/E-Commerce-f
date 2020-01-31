/**
 * DesignCenter Test - Created by david on 23/02/18.
 */
import designCenterReducer, { initialState } from './reducer'
import { setCurrentTabAction, setLoadingPro, setTicketAction } from './actions'
import {
  SET_CURRENT_TAB_ACTION,
  SET_LOADING_PRO,
  SET_TICKET
} from './constants'

describe(' DesignCenter Screen', () => {
  // Test redux actions
  describe('Actions', () => {
    it('setCurrentTabAction', () => {
      const type = SET_CURRENT_TAB_ACTION
      const index = 10
      expect(setCurrentTabAction(index)).toEqual({
        type,
        index
      })
    })
    it('setLoadingPro', () => {
      const type = SET_LOADING_PRO
      const loading = true
      expect(setLoadingPro(loading)).toEqual({
        type,
        loading
      })
    })
    it('setTicketAction', () => {
      const type = SET_TICKET
      const ticket = 'Test'
      expect(setTicketAction(ticket)).toEqual({
        type,
        ticket
      })
    })
  })
  describe('SET_CURRENT_TAB_ACTION', () => {
    it('Update currentTab correctly', () => {
      const testValue = 0
      const state = designCenterReducer(initialState, setCurrentTabAction(0))
      const someKey = state.get('currentTab')
      expect(someKey).toEqual(testValue)

      const testValue2 = 10
      const state2 = designCenterReducer(
        initialState,
        setCurrentTabAction(testValue2)
      )
      const someKey2 = state2.get('currentTab')
      expect(someKey2).toEqual(testValue2)
    })
  })
  describe('SET_LOADING_PRO', () => {
    describe('Update loadingPro correctly', () => {
      it('Handles initial value in loadingPro', () => {
        const customInitialValue = initialState.get('loadingPro')
        expect(customInitialValue).not.toBeUndefined()
        expect(typeof customInitialValue).toBe('boolean')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom value in loadingPro', () => {
        const loading = true
        const loadingState = designCenterReducer(
          initialState,
          setLoadingPro(loading)
        )
        const customLoadingValue = loadingState.get('loadingPro')
        expect(typeof customLoadingValue).toBe('boolean')
        expect(customLoadingValue).toBeTruthy()
      })
    })
  })
  describe('SET_TICKET', () => {
    describe('Update ticket correctly', () => {
      it('Handles initial value in ticket', () => {
        const customInitialValue = initialState.get('ticket')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue).toBe('')
      })
      it('Handles custom value in ticket', () => {
        const ticket = 'Test'
        const ticketState = designCenterReducer(
          initialState,
          setTicketAction(ticket)
        )
        const customTicketValue = ticketState.get('ticket')
        expect(customTicketValue).toBe(ticket)

        const customModalValue = ticketState.get('designCheckModalOpen')
        expect(customModalValue).toBeFalsy()

        const customLoadingProValue = ticketState.get('loadingPro')
        expect(customLoadingProValue).toBeFalsy()
      })
    })
  })
  // TODO: Add the remaining 71 redux actions
})
