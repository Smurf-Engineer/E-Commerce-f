/**
 * DesignCenter Test - Created by david on 23/02/18.
 */
import { Map, List } from 'immutable'
import designCenterReducer, { initialState } from './reducer'
import {
  setCurrentTabAction,
  clearStoreAction,
  setVideos,
  setColorBlockAction,
  setHoverColorBlockAction,
  setStitchingColorAction,
  setAccessoryColorAction,
  setPaletteNameAction,
  setPalettesAction,
  setLoadingModel,
  editDesignAction
} from './actions'
import {
  YoutubePlaylistItemType,
  StitchingColor,
  AccesoryColor,
  Palette
} from '../../types/common'

describe(' DesignCenter Screen', () => {
  // Test redux actions
  describe('Test default action', () => {
    it('Should return the initial state for unknow action', () => {
      let state = designCenterReducer(initialState, { type: 'unknow' })
      expect(state).toEqual(initialState)
    })
  })

  describe('Test CLEAR_STORE_ACTION', () => {
    it('Reset state to initialState', () => {
      const state = designCenterReducer(initialState, clearStoreAction())
      expect(state).toEqual(initialState)
    })
  })

  describe('Test SET_CURRENT_TAB_ACTION', () => {
    it('Handles currentTabAction initial values', () => {
      const currentTab = initialState.get('currentTab')
      expect(currentTab).not.toBeUndefined()
      expect(currentTab).not.toBeNaN()

      const swipingView = initialState.get('swipingView')
      expect(swipingView).toBeFalsy()

      const customized3dMounted = initialState.get('customize3dMounted')
      expect(customized3dMounted).toBeFalsy()

      const tabChanged = initialState.get('tabChanged')
      expect(tabChanged).toBeFalsy()
    })

    it('Should update currentTab correctly', () => {
      const currenttabTest = 2

      const state = designCenterReducer(
        initialState,
        setCurrentTabAction(currenttabTest)
      )
      const updatedCurrentTab = state.get('currentTab')
      const swipingViewUpdate = state.get('swipingView')
      const customize3dMountedUpdated = state.get('customize3dMounted')
      const tabChangedUpdated = state.get('tabChanged')

      expect(currenttabTest).toEqual(updatedCurrentTab)
      expect(swipingViewUpdate).toBeTruthy()
      expect(customize3dMountedUpdated).toBeTruthy()
      expect(tabChangedUpdated).toBeTruthy()

      const currentTabSecondTest = 10
      const secondState = designCenterReducer(
        initialState,
        setCurrentTabAction(currentTabSecondTest)
      )
      const secondupdatedCurrentTab = secondState.get('currentTab')
      const secondSwipingViewUpdate = secondState.get('swipingView')
      const secondCustomize3dMountedUpdated = secondState.get(
        'customize3dMounted'
      )
      const secondTabChangedUpdated = secondState.get('tabChanged')

      expect(currentTabSecondTest).toEqual(secondupdatedCurrentTab)
      expect(secondSwipingViewUpdate).toBeTruthy()
      expect(secondCustomize3dMountedUpdated).toBeFalsy()
      expect(secondTabChangedUpdated).toBeTruthy()
    })
  })

  describe('Test SET_VIDEO_ACTION', () => {
    it('Should handle undefined value for video', () => {
      const videoTest: YoutubePlaylistItemType[] = [
        {
          etag: '',
          id: '',
          kind: '',
          contentDetails: {
            videoId: '',
            videoPublishedAt: ''
          },
          snippet: {
            title: '',
            channelId: '',
            channelTitle: '',
            description: '',
            playlistId: '',
            position: 0,
            publishedAt: '',
            resourceId: {
              kind: '',
              videoId: ''
            },
            thumbnails: {
              default: {
                height: 0,
                url: '',
                width: 0
              },
              high: {
                height: 0,
                url: '',
                width: 0
              },
              medium: {
                height: 0,
                url: '',
                width: 0
              }
            }
          }
        }
      ]
      const state = designCenterReducer(initialState, setVideos(videoTest))
      const videosUpdated = state.get('videos')
      expect(videosUpdated).not.toBeUndefined()
    })
    it('Should update videos list correctly', () => {
      const videoTest: YoutubePlaylistItemType[] = [
        {
          etag: '"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/yYxCGEfUXvidBUOwIRz5WJMf3FQ"',
          id:
            'UExrWnZkSGZlOWFkMlJjZFFZYW42U3VQVmxSN2lnMmVWYy41MzJCQjBCNDIyRkJDN0VD',
          kind: 'youtube#playlistItem',
          contentDetails: {
            videoId: 'bu6Qnj9AhHM',
            videoPublishedAt: '2019-04-25T20:02:08.000Z'
          },
          snippet: {
            title: 'Overview of the DesignLab User Interface',
            channelId: 'UCbA-7_tX_0I5e8DCCJd4Tyw',
            channelTitle: 'JAKROO Custom Sports Apparel',
            description:
              'A walk through of the user interface of DesignLab.↵TRY IT YOURSELF: https://designlab.jakroo.com↵↵DesignLab is a Custom Sports Apparel design tool by JAKROO.↵.↵.↵.↵.↵.↵.↵.↵.↵.↵.↵.↵.↵MUSIC CREDIT:↵Adventures by A Himitsu https://www.youtube.com/channel/UCgFw...↵Creative Commons — Attribution 3.0 Unported— CC BY 3.0↵http://creativecommons.org/licenses/b... Music released by Argofox↵https://youtu.be/8BXNwnxaVQE Music provided by Audio Library↵https://youtu.be/MkNeIUgNPQ8',
            playlistId: 'PLkZvdHfe9ad2RcdQYan6SuPVlR7ig2eVc',
            position: 0,
            publishedAt: '2019-04-25T20:02:10.000Z',
            resourceId: {
              kind: 'youtube#video',
              videoId: 'bu6Qnj9AhHM'
            },
            thumbnails: {
              default: {
                height: 90,
                url: 'https://i.ytimg.com/vi/bu6Qnj9AhHM/default.jpg',
                width: 120
              },
              high: {
                height: 360,
                url: 'https://i.ytimg.com/vi/bu6Qnj9AhHM/hqdefault.jpg',
                width: 480
              },
              medium: {
                height: 180,
                url: 'https://i.ytimg.com/vi/bu6Qnj9AhHM/mqdefault.jpg',
                width: 320
              }
            }
          }
        }
      ]
      const videosState = designCenterReducer(
        initialState,
        setVideos(videoTest)
      )
      const updatedVideos = videosState.get('videos')
      expect(videoTest).toEqual(updatedVideos)
    })
  })

  describe('Test SET_COLOR_BLOCK_ACTION', () => {
    it('Should not be undefined in initialState', () => {
      const colorBlockInitial = initialState.get('colorBlock')
      expect(colorBlockInitial).toBeDefined()
    })

    it('Should update color block correctly', () => {
      const colorBlockTest = 10
      const colorBlockState = designCenterReducer(
        initialState,
        setColorBlockAction(colorBlockTest)
      )
      const updatedColorBlock = colorBlockState.get('colorBlock')
      expect(updatedColorBlock).toBeDefined()
      expect(colorBlockTest).toEqual(updatedColorBlock)
    })
  })

  describe('Test COLOR_BLOCK_HOVERED_ACTION', () => {
    it('Should not be undefined in initialState', () => {
      const initialColorBlockHovered = initialState.get('colorBlockHovered')
      expect(initialColorBlockHovered).toBeDefined()
    })

    it('Should update colorBlockHovered correctly', () => {
      const colorBlockHoveredTest = 10
      expect(Number.isInteger(colorBlockHoveredTest))
      const state = designCenterReducer(
        initialState,
        setHoverColorBlockAction(colorBlockHoveredTest)
      )
      const updatedColorBlockHovered = state.get('colorBlockHovered')
      expect(colorBlockHoveredTest).toEqual(updatedColorBlockHovered)
    })
  })

  describe('Test SET_STITCHING_COLOR_ACTION', () => {
    it('Should not have undefined initial value', () => {
      const stitchingColor = initialState.get('stitchingColor')
      expect(stitchingColor).toBeDefined()
    })

    it('Should update stitching color correctly', () => {
      const stitchingColorTest: StitchingColor = {
        name: 'FSC-10',
        value: '#000000'
      }
      const state = designCenterReducer(
        initialState,
        setStitchingColorAction(stitchingColorTest)
      )
      const stitchingColorUpdated = state.get('stitchingColor')
      const designHasChanges = state.get('designHasChanges')
      expect(stitchingColorUpdated).toEqual(Map(stitchingColorTest))
      expect(designHasChanges).toBeTruthy()
    })

    it('Should not allow empty stitching color values', () => {
      const stitchingColorTest: StitchingColor = {
        name: 'FSC-10',
        value: '#000000'
      }

      const state = designCenterReducer(
        initialState,
        setStitchingColorAction(stitchingColorTest)
      )
      const stitchingColorUpdated = state.get('stitchingColor').toJS()
      expect(stitchingColorUpdated.name.length).not.toEqual(0)
      expect(stitchingColorUpdated.value.length).not.toEqual(0)
    })
  })

  describe('Test SET_ACCESSORY_COLOR_ACTION', () => {
    it('Should not have initial state undefined', () => {
      const bindingColor = initialState.get('bindingColor')
      expect(bindingColor).toBeDefined()
      const zipperColor = initialState.get('zipperColor')
      expect(zipperColor).toBeDefined()
      const bibColor = initialState.get('bibColor')
      expect(bibColor).toBeDefined()
    })

    it('Should update accesory color correctly', () => {
      const bindingColorTest: AccesoryColor = 'black'
      const accesoryId: string = 'bindingColor'
      const bindingState = designCenterReducer(
        initialState,
        setAccessoryColorAction(bindingColorTest, accesoryId)
      )
      const bindingColorUpdated = bindingState.get('bindingColor')
      expect(bindingColorUpdated).toEqual(bindingColorTest)
      const designHasChangesBinding = bindingState.get('designHasChanges')
      expect(designHasChangesBinding).toBeTruthy()

      const zipperColorTest: AccesoryColor = 'black'
      const zipperAccesroryId: string = 'zipperColor'
      const zipperState = designCenterReducer(
        initialState,
        setAccessoryColorAction(zipperColorTest, zipperAccesroryId)
      )
      const zipperColorUpdated = zipperState.get('zipperColor')
      expect(zipperColorUpdated).toEqual(zipperColorTest)
      const designHasChangesZipper = zipperState.get('designHasChanges')
      expect(designHasChangesZipper).toBeTruthy()

      const bibColorTest: AccesoryColor = 'black'
      const bibAccesoryId: string = 'bibColor'
      const bibState = designCenterReducer(
        initialState,
        setAccessoryColorAction(bibColorTest, bibAccesoryId)
      )
      const bibColorUpdated = bibState.get('bibColor')
      expect(bibColorUpdated).toEqual(bibColorTest)

      const designHasChangesBib = bibState.get('designHasChanges')
      expect(designHasChangesBib).toBeTruthy()
    })
  })

  describe('Test SET_PALETTE_NAME_ACTION', () => {
    it('Should not be undefined initialValue', () => {
      const paletteName = initialState.get('paletteName')
      expect(paletteName).toBeDefined()
    })

    it('Should update pallete name correctly', () => {
      const paletteNameTest: string = 'My Palette'
      const state = designCenterReducer(
        initialState,
        setPaletteNameAction(paletteNameTest)
      )
      const paletteNameUpdated = state.get('paletteName')
      expect(paletteNameUpdated).toEqual(paletteNameTest)
    })

    it('Should not update to undefined', () => {
      const paletteNameTest: string = 'undefined'
      const state = designCenterReducer(
        initialState,
        setPaletteNameAction(paletteNameTest)
      )
      const paletteNameUpdated = state.get('paletteName')
      expect(paletteNameUpdated).toBeDefined()
    })
  })
  describe('Test SET_PALETTE_ACTION', () => {
    it('Should not have undefined initial value', () => {
      const palettes = initialState.get('palettes')
      expect(palettes).toBeDefined()
    })

    it('Should Update palettes colors correctly', () => {
      const palettesTest: Palette[] = [
        {
          name: 'My Palette',
          colors: ['#000000', '#000000', '#111111', '#FF2GG2', '#FFFFFF']
        },
        {
          name: 'Second palette',
          colors: ['#000000', '#000000', '#111111', '#FF2GG2', '#FFFFFF']
        }
      ]

      const state = designCenterReducer(
        initialState,
        setPalettesAction(palettesTest)
      )
      const palettesUpdated = state.get('palettes')
      expect(palettesUpdated).toEqual(palettesTest)
    })

    it('Should not update palettes to undefined', () => {
      const palettesTest: Palette[] = [
        {
          name: 'My Palette',
          colors: ['#000000', '#000000', '#111111', '#FF2GG2', '#FFFFFF']
        },
        {
          name: 'Second palette',
          colors: ['#000000', '#000000', '#111111', '#FF2GG2', '#FFFFFF']
        }
      ]
      const state = designCenterReducer(
        initialState,
        setPalettesAction(palettesTest)
      )
      const palettesUpdated = state.get('palettes')
      expect(palettesUpdated).toBeDefined()
    })
  })

  describe('Test SET_LOADING_MODEL', () => {
    it('Should not have initial value of false', () => {
      const loadingModel = initialState.get('loadingModel')
      expect(loadingModel).toBeFalsy()
    })

    it('Should update true value for loadingModel correctly', () => {
      const loadingModelTest = true
      const state = designCenterReducer(
        initialState,
        setLoadingModel(loadingModelTest)
      )
      const loadingModelUpdated = state.get('loadingModel')
      expect(loadingModelUpdated).not.toBeUndefined()
      expect(loadingModelUpdated).toBeTruthy()
    })

    it('Should update false value for loadingModel correctly', () => {
      const loadingModelTest = false
      const state = designCenterReducer(
        initialState,
        setLoadingModel(loadingModelTest)
      )
      const loadingModelUpdated = state.get('loadingModel')
      expect(loadingModelUpdated).not.toBeUndefined()
      expect(loadingModelUpdated).toBeFalsy()
    })
  })

  describe('Test EDIT_DESIGN_ACTION', () => {
    it('Should not have undefined initial values', () => {
      const currenttab = initialState.get('currentTab')
      expect(currenttab).toBeDefined()
      const designName = initialState.get('designName')
      expect(designName).toBeDefined()
      const checkedTerms = initialState.get('checkedTerms')
      expect(checkedTerms).toBeDefined()
      const swipingView = initialState.get('swipingView')
      expect(swipingView).toBeDefined()
    })

    it('Should update currentTab with a value of 2, swipingView to true and reset designName and checkedTerms', () => {
      const state = designCenterReducer(initialState, editDesignAction())
      const currentTab = state.get('currentTab')
      expect(currentTab).toEqual(2)

      const designName = state.get('designName')
      expect(designName.length).toEqual(0)

      const checkedTerms = state.get('chekedTerms')
      expect(checkedTerms).toBeFalsy()

      const swipingView = state.get('swipingView')
      expect(swipingView).toBeTruthy()
    })
  })
})
