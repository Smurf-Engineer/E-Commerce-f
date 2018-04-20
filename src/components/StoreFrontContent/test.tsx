/**
 * StoreFrontContent Test - Created by gustavomedina on 18/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { MemoryRouter } from 'react-router-dom'
import { StoreFrontContent } from './index'

describe('<StoreFrontContent />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const testFunction = (id: number, yotpoId: string | null) => {}
    const testFunction2 = (open: boolean) => {}
    const openPassCodeDialogAction = (open: boolean) => {}
    const testFunction3 = (open: boolean, id?: string) => {}
    const teamStoreId = ''

    const openEmailContact = false
    const emailContact = ''
    const emailMessage = ''
    const sendMessageLoading = false
    const setEmailContactAction = (email: string) => {}
    const setEmailMessageAction = (message: string) => {}
    const sendMessageLoadingAction = (loading: boolean) => {}

    const data = {
      fetchMore: () => {},
      teamStores: {
        fullCount: '',
        teamStores: []
      },
      getTeamStore: {
        id: 1,
        short_id: '',
        name: '',
        cutoff_date: {
          day: '',
          dayOrdinal: '',
          month: '',
          year: ''
        },
        delivery_date: {
          day: '',
          dayOrdinal: '',
          month: '',
          year: ''
        },
        private: false,
        created_at: '',
        items: [
          {
            team_store_id: 1,
            design_id: '',
            design: {
              id: 1,
              name: '',
              visible: false,
              product: {
                id: 0,
                images: [
                  {
                    front: '',
                    back: '',
                    left: '',
                    right: ''
                  }
                ],
                type: '',
                description: '',
                priceRange: [],
                collections: 0,
                isTopProduct: false,
                details: '',
                specs: '',
                name: '',
                temperature: '',
                materials: '',
                customizable: false,
                yotpoId: '',
                yotpoAverageScore: {
                  total: 0,
                  averageScore: 0
                },
                fitStyles: [
                  {
                    id: 0,
                    name: '',
                    info: '',
                    image: ''
                  }
                ],
                genders: [
                  {
                    id: 0,
                    name: ''
                  }
                ],
                bodyChartId: 0,
                retailMen: false,
                retailWomen: false
              },
              image: '',
              createdAt: ''
            },
            expected_quantity: 1,
            visible: false
          }
        ]
      }
    }
    ReactDOM.render(
      <MemoryRouter>
        <IntlProvider {...props}>
          <StoreFrontContent
            formatMessage={format}
            openQuickViewAction={testFunction}
            openEmailContactDialogAction={testFunction2}
            openShareModalAction={testFunction3}
            openShare={false}
            data={data}
            teamStoreId={teamStoreId}
            setOpenPassCodeDialog={openPassCodeDialogAction}
            openEmailContact={openEmailContact}
            emailContact={emailContact}
            emailMessage={emailMessage}
            sendMessageLoading={sendMessageLoading}
            setEmailContactAction={setEmailContactAction}
            setEmailMessageAction={setEmailMessageAction}
            sendMessageLoadingAction={sendMessageLoadingAction}
          />
        </IntlProvider>
      </MemoryRouter>,
      div
    )
  })
})
