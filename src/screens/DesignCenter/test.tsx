/**
 * DesignCenter Test - Created by david on 23/02/18.
 */
import { Map } from 'immutable'
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
  designResetAction,
  editDesignAction,
  setSwipingTabAction,
  setThemeAction
} from './actions'
import {
  YoutubePlaylistItemType,
  StitchingColor,
  AccesoryColor,
  Palette,
  Product
} from '../../types/common'

describe(' DesignCenter Screen', () => {
  describe('Actions', () => {})

  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should return the initial state for unknow action', () => {
        let state = designCenterReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('CLEAR_STORE_ACTION', () => {
      it('Reset state to initialState', () => {
        const state = designCenterReducer(initialState, clearStoreAction())
        expect(state).toEqual(initialState)
      })
    })

    describe('SET_CURRENT_TAB_ACTION', () => {
      it('Handles currentTabAction initial value', () => {
        const currentTab = initialState.get('currentTab')
        expect(currentTab).toBeDefined()
        expect(currentTab).not.toBeNaN()
      })
      it('Handles swipingView initial value', () => {
        const swipingView = initialState.get('swipingView')
        expect(swipingView).toBeFalsy()
      })

      it('Handles customize3dMpunted initial value', () => {
        const customized3dMounted = initialState.get('customize3dMounted')
        expect(customized3dMounted).toBeFalsy()
      })

      it('Handles tabChange initial value', () => {
        const tabChanged = initialState.get('tabChanged')
        expect(tabChanged).toBeFalsy()
      })

      const currenttabTest = 2
      const state = designCenterReducer(
        initialState,
        setCurrentTabAction(currenttabTest)
      )
      it('Should update currentTab correctly', () => {
        const updatedCurrentTab = state.get('currentTab')
        expect(updatedCurrentTab).toBeDefined()
        expect(updatedCurrentTab).not.toBeNull()
        expect(currenttabTest).toEqual(updatedCurrentTab)
      })
      it('Should update swipingView to true correctly', () => {
        const swipingViewUpdate = state.get('swipingView')
        expect(swipingViewUpdate).toBeTruthy()
      })
      it('Should update customize3dMounted to true correctly', () => {
        const customize3dMountedUpdated = state.get('customize3dMounted')
        expect(customize3dMountedUpdated).toBeTruthy()
      })
      it('Should update tabChanged to true correctly', () => {
        const tabChangedUpdated = state.get('tabChanged')
        expect(tabChangedUpdated).toBeTruthy()
      })

      const currentTabSecondTest = 4
      const secondState = designCenterReducer(
        initialState,
        setCurrentTabAction(currentTabSecondTest)
      )

      it('should update currentTab Correctly', () => {
        const secondupdatedCurrentTab = secondState.get('currentTab')
        expect(currentTabSecondTest).toEqual(secondupdatedCurrentTab)
      })

      it('Should update swipingViw to true correctly', () => {
        const secondSwipingViewUpdate = secondState.get('swipingView')
        expect(secondSwipingViewUpdate).toBeTruthy()
      })

      it('Should update customize3dMounted to false correctly', () => {
        const secondCustomize3dMountedUpdated = secondState.get(
          'customize3dMounted'
        )
        expect(secondCustomize3dMountedUpdated).toBeFalsy()
      })
      it('Should update tabChanged value to true correctly', () => {
        const secondTabChangedUpdated = secondState.get('tabChanged')
        expect(secondTabChangedUpdated).toBeTruthy()
      })
    })

    describe('SET_VIDEO_ACTION', () => {
      it('Should handle undefined value for video', () => {
        const videoTest: YoutubePlaylistItemType[] = jest.genMockFromModule(
          '../../../__mocks__/ytVideoMock'
        )

        const state = designCenterReducer(initialState, setVideos(videoTest))
        const videosUpdated = state.get('videos')
        expect(videosUpdated).not.toBeUndefined()
      })
      it('Should update videos list correctly', () => {
        const videoTest: YoutubePlaylistItemType[] = jest.genMockFromModule(
          '../../../__mocks__/ytVideoMock'
        )
        const videosState = designCenterReducer(
          initialState,
          setVideos(videoTest)
        )
        const updatedVideos = videosState.get('videos')
        expect(videoTest).toEqual(updatedVideos)
      })
    })

    describe('SET_COLOR_BLOCK_ACTION', () => {
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

    describe('COLOR_BLOCK_HOVERED_ACTION', () => {
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

    describe('SET_STITCHING_COLOR_ACTION', () => {
      it('Should not have undefined initial value', () => {
        const stitchingColor = initialState.get('stitchingColor')
        expect(stitchingColor).toBeDefined()
      })

      it('Should update stitching color correctly', () => {
        const stitchingColorTest: StitchingColor = {
          name: 'FSC-11',
          value: '#000011'
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

    describe('SET_ACCESSORY_COLOR_ACTION', () => {
      it('Should not have initial state undefined', () => {
        const bindingColor = initialState.get('bindingColor')
        expect(bindingColor).toBeDefined()
        const zipperColor = initialState.get('zipperColor')
        expect(zipperColor).toBeDefined()
        const bibColor = initialState.get('bibColor')
        expect(bibColor).toBeDefined()
      })

      it('Should update bindingColor correctly', () => {
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
      })

      it('Should update zipperColor correctly', () => {
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
      })

      it('Should update bibColor correctly', () => {
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

    describe('SET_PALETTE_NAME_ACTION', () => {
      it('Should not be undefined initialValue', () => {
        const paletteName = initialState.get('paletteName')
        expect(paletteName).toBeDefined()
      })

      it('Should update palette name correctly', () => {
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

    describe('SET_PALETTE_ACTION', () => {
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

    describe('SET_LOADING_MODEL', () => {
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

    describe('DESIGN_RESET_ACTION', () => {
      it('Should reset colors to styleColors selected', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const colors = state.get('styleColors')
        expect(colors).toBeDefined()
        expect(colors).not.toBeNull()
      })

      it('should reset stitchingColor to initial state', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const stitchingColor = state.get('stitchingColor')
        expect(stitchingColor).toEqual(initialState.get('stitchingColor'))
      })

      it('Should set bindingColor to black', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const bindingColor = state.get('bindingColor')
        expect(bindingColor).toEqual('black')
      })

      it('Should update zipperColor to black', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const zipperColor = state.get('zipperColor')
        expect(zipperColor).toEqual('black')
      })

      it('Should update bibColor to white', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const bibColor = state.get('bibColor')
        expect(bibColor).toEqual('white')
      })

      it('Should reset canvas value', () => {
        const canvasIinitial = initialState.get('canvas')
        const state = designCenterReducer(initialState, designResetAction())
        const canvas = state.get('canvas')
        expect(canvas).toEqual(canvasIinitial)
      })

      it('Should reset undoChanges', () => {
        const initialUndoChanges = initialState.get('undoChanges')
        const state = designCenterReducer(initialState, designResetAction())
        const undoChanges = state.get('undoChanges')
        expect(undoChanges).toEqual(initialUndoChanges)
      })

      it('Should reset redoChanges', () => {
        const initialRedoChanges = initialState.get('redoChanges')
        const state = designCenterReducer(initialState, designResetAction())
        const redoChanges = state.get('redoChanges')
        expect(redoChanges).toEqual(initialRedoChanges)
      })

      it('Should updates openResetDesignModal to false', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const openResetDesignModal = state.get('openResetDesignModal')
        expect(openResetDesignModal).toBeFalsy()
      })

      it('Should update openResetPlaceholderModal to false', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const openResetPlaceholderModal = state.get('openResetPlaceholderModal')
        expect(openResetPlaceholderModal).toBeFalsy()
      })

      it('Should update designHasChanges value to false', () => {
        const state = designCenterReducer(initialState, designResetAction())
        const designHasChanges = state.get('designHasChanges')
        expect(designHasChanges).toBeFalsy()
      })
    })

    describe('EDIT_DESIGN_ACTION', () => {
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

      it('Should update currentTab with a value of 2', () => {
        const state = designCenterReducer(initialState, editDesignAction())
        const currentTab = state.get('currentTab')
        expect(currentTab).toEqual(2)
      })

      it('Should reset designName correctly', () => {
        const state = designCenterReducer(initialState, editDesignAction())
        const designName = state.get('designName')
        expect(designName.length).toEqual(0)
      })

      it('Should update checkedTerms value to false correctly', () => {
        const state = designCenterReducer(initialState, editDesignAction())
        const checkedTerms = state.get('chekedTerms')
        expect(checkedTerms).toBeFalsy()
      })

      it('Should update swipingView value to true correctly', () => {
        const state = designCenterReducer(initialState, editDesignAction())
        const swipingView = state.get('swipingView')
        expect(swipingView).toBeTruthy()
      })
    })

    describe('SET_SWIPING_TAB_ACTION', () => {
      it('should update swipingView value to true', () => {
        const swipingViewTest = true
        const state = designCenterReducer(
          initialState,
          setSwipingTabAction(swipingViewTest)
        )
        const swipingView = state.get('swipingView')
        expect(swipingView).toBeTruthy()
      })

      it('should update swipingView value to false', () => {
        const swipingViewTest = false
        const state = designCenterReducer(
          initialState,
          setSwipingTabAction(swipingViewTest)
        )
        const swipingView = state.get('swipingView')
        expect(swipingView).toBeFalsy()
      })
    })

    describe('SET_THEME_SELECTED_ACTION', () => {
      const testId = 5
      const productTest: Product = jest.genMockFromModule(
        '../../../__mocks__/productMock'
      )
      const state = designCenterReducer(
        initialState,
        setThemeAction(testId, productTest)
      )

      it('Should update theme id correctly', () => {
        const updatedId = state.get('themeId')
        expect(updatedId).toEqual(testId)
      })
    })

    describe('SET_STYLE_SELECTED_ACTION', () => {})
  })
})
