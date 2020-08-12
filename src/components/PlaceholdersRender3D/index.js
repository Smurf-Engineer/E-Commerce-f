import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import reverse from 'lodash/reverse'
import cloneDeep from 'lodash/cloneDeep'
import Spin from 'antd/lib/spin'
import filter from 'lodash/filter'
import FontFaceObserver from 'fontfaceobserver'
import { FormattedMessage } from 'react-intl'
// TODO: JV2 - Phase II
// import Dropdown from 'antd/lib/dropdown'
// import Menu from 'antd/lib/menu'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import shortid from 'shortid'
import Modal from 'antd/lib/modal'
import notification from 'antd/lib/notification'
import {
  Container,
  Render,
  Progress,
  Button,
  DragText,
  ViewControls,
  ViewButton,
  ButtonWrapper,
  MeasurementBox,
  MeasurementLabel,
  Measurement,
  BottomControls,
  TopButton,
  Loading,
  Icon
} from './styledComponents'
import {
  viewPositions,
  fabricJsConfig,
  DELETE_ACTION,
  DUPLICATE_ACTION,
  BRING_TO_FRONT_ACTION,
  ROTATE_ACTION,
  SCALE_ACTION,
  DRAG_ACTION,
  MESH_NAME,
  CANVAS_MESH,
  BRANDING_MESH,
  REGULAR_CANVAS,
  BIB_BRACE_NAME,
  ZIPPER_NAME,
  BINDING_NAME,
  CHANGE_ACTIONS,
  CENTER_ORIGIN,
  EXTRA_POSITION,
  TOP_VIEW,
  BACK_VIEW,
  LEFT_VIEW,
  EXTRA_FIELDS,
  INITIAL_ZOOM,
  INITIAL_ZOOM_MOBILE,
  THUMBNAIL_ZOOM,
  CAMERA_MIN_ZOOM,
  CAMERA_MAX_ZOOM,
  HIGH_RESOLUTION_CANVAS,
  REGULAR_CORNER_SIZE,
  HIGH_RESOLUTION_CORNER_SIZE,
  modelPositions
} from './config'
import {
  MESH,
  RED_TAG,
  FLATLOCK,
  ZIPPER,
  BINDING,
  BIB_BRACE,
  DPI,
  CM_PER_INCH,
  PROPEL_PALMS,
  GRIP_TAPE,
  DEFAULT_COLOR,
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_INTENSITY,
  ILLUSTRATOR_PIXELS_PER_CM
} from '../../constants'
import { BLACK, SELECTION_3D_AREA } from '../../theme/colors'
import { Changes, CanvasElements } from '../../screens/DesignCenter/constants'

import messages from './messages'
import {
  isMouseOver,
  clickOnCorner,
  getTextCanvasElement,
  getClipArtCanvasElement,
  getImageCanvas
} from './utils'
import left from '../../assets/leftarrow.svg'
import right from '../../assets/arrow.svg'
import top from '../../assets/uparrow.svg'
import frontIcon from '../../assets/Cube-Front.svg'
import leftIcon from '../../assets/Cube_Left.svg'
import rightIcon from '../../assets/Cube_right.svg'
import backIcon from '../../assets/Cube_back.svg'
import topIcon from '../../assets/Cube-Top.svg'

const cubeViews = [backIcon, rightIcon, frontIcon, leftIcon, topIcon]
const { info } = Modal

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentView: 2,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    objectChildCount: 0,
    canvasEl: null,
    oldScale: { oldScaleX: null, oldScaleY: null },
    oldPosition: { oldLeft: null, oldTop: null },
    oldRotation: null,
    scaleFactor: 1,
    scaleFactorX: 1,
    scaleFactorY: 1,
    isFirstAdd: true,
    showHelpModal: true
  }

  dragComponent = null
  componentWillReceiveProps(nextProps) {
    const {
      colors,
      colorBlockHovered: oldColorBlockHovered,
      stitchingColor: oldStitchingColor,
      bindingColor: oldBindingColor,
      zipperColor: oldZipperColor,
      bibColor: oldBibColor,
      product: oldProduct
    } = this.props
    const {
      colors: nextColors,
      styleColors,
      colorBlockHovered,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      loadingModel,
      product
    } = nextProps

    if (loadingModel) {
      return
    }

    if (oldBibColor !== bibColor && !!this.bibBrace) {
      this.changeExtraColor(BIB_BRACE_NAME, bibColor)
      return
    }

    if (oldZipperColor !== zipperColor && !!this.zipper) {
      this.changeExtraColor(ZIPPER_NAME, zipperColor)
      return
    }

    if (oldBindingColor !== bindingColor && !!this.binding) {
      this.changeExtraColor(BINDING_NAME, bindingColor)
      return
    }

    const flatlockIsEqual = isEqual(oldStitchingColor, stitchingColor)
    if (!flatlockIsEqual) {
      const { value } = stitchingColor
      this.changeStitchingColor(value)
      return
    }

    const filesHasChange = isEqual(product, oldProduct)
    if (!filesHasChange) {
      this.removeObject()
      setTimeout(() => {
        this.render3DModel()
      }, 100)
      return
    }

    const colorsHasChange = isEqual(colors, nextColors)
    if (!colorsHasChange) {
      const emptyColors = filter(nextColors, color => !!!color)
      const isResetingColors = emptyColors.length >= colors.length
      this.setupColors(isResetingColors ? styleColors : nextColors)
      return
    }

    const colorBlockHasChange = oldColorBlockHovered !== colorBlockHovered
    if (colorBlockHasChange) {
      this.setupHoverColor(colorBlockHovered)
    }
  }

  componentWillMount() {
    const hideHint = this.getHelpModalValueFromLocal()
    this.setState({ showHelpModal: !hideHint })
  }

  componentDidMount() {
    const { isEditing, design } = this.props
    const cornerSize =
      (isEditing && design.highResolution) || !isEditing
        ? HIGH_RESOLUTION_CORNER_SIZE
        : REGULAR_CORNER_SIZE
    fabricJsConfig.settings.cornerSize = cornerSize
    /* Renderer config */
    fabric.Object.prototype.customiseCornerIcons(fabricJsConfig)
    const { isMobile } = this.props
    const { clientWidth, clientHeight } = this.container
    const devicePixelRatio = window.devicePixelRatio || 1

    const precision = 'highp'
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      precision,
      preserveDrawingBuffer: true
    })

    renderer.setPixelRatio(devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(clientWidth, clientHeight)

    /* Camera */
    const aspect = clientWidth / clientHeight
    const camera = new THREE.PerspectiveCamera(25, aspect, 0.1, 1000)

    camera.position.z = 250

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY)
    const directionalLight = new THREE.DirectionalLight(0xffffff, DIRECTIONAL_LIGHT_INTENSITY)
    directionalLight.position.copy(camera.position)

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    /* Loaders */
    const mtlLoader = new THREE.MTLLoader()
    const objLoader = new THREE.OBJLoader()
    const textureLoader = new THREE.TextureLoader()

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const onClickPosition = new THREE.Vector2()

    this.raycaster = raycaster
    this.mouse = mouse
    this.onClickPosition = onClickPosition

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.directionalLight = directionalLight

    this.mtlLoader = mtlLoader
    this.objLoader = objLoader
    this.textureLoader = textureLoader

    this.camera.zoom = isMobile ? INITIAL_ZOOM_MOBILE : INITIAL_ZOOM
    this.camera.updateProjectionMatrix()

    this.render3DModel()

    this.container.appendChild(this.renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', this.lightUpdate)

    controls.enableKeys = false
    controls.minDistance = CAMERA_MIN_ZOOM
    controls.maxDistance = CAMERA_MAX_ZOOM
    // controls.enableZoom = isMobile TODO: Pan zoom

    if (!isMobile) {
      const { down, up, move } = this.configureEventListeners()
      this.container.addEventListener(down, this.onMouseDown, false)
      this.container.addEventListener(up, this.onMouseUp, false)
      this.container.addEventListener(move, this.onMouseMove, false)
    }

    this.controls = controls
    this.start()
  }

  componentWillUnmount() {
    const { onUnmountTab, isMobile } = this.props
    if (this.canvasTexture) {
      const designCanvas = this.canvasTexture.toObject(EXTRA_FIELDS)
      const canvasJson = JSON.stringify(designCanvas)
      onUnmountTab(canvasJson)
      this.canvasTexture.dispose()
    }
    if (this.renderer) {
      this.stop()
      if (!isMobile) {
        const { down, up, move } = this.configureEventListeners()
        this.container.removeEventListener(down, this.onMouseDown, false)
        this.container.removeEventListener(up, this.onMouseUp, false)
        this.container.removeEventListener(move, this.onMouseMove, false)
      }
      this.container.removeChild(this.renderer.domElement)
      this.clearScene()
    }
  }

  configureEventListeners = () => {
    const {
      responsive: { tablet }
    } = this.props
    // TODO: Configure SAFARI EVENTS
    if (tablet) {
      return {
        down: 'touchstart',
        up: 'touchend',
        move: 'touchmove'
      }
    }
    return {
      down: 'mousedown',
      up: 'mouseup',
      move: 'mousemove'
    }
  }

  getMousePosition = (dom, x, y) => {
    const rect = dom.getBoundingClientRect()
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height]
  }

  getIntersects = (point, objects) => {
    this.mouse.set(point.x * 2 - 1, -(point.y * 2) + 1)
    this.raycaster.setFromCamera(this.mouse, this.camera)
    return this.raycaster.intersectObjects(objects, true)
  }

  convertToFabricObjects = elements =>
    new Promise((resolve, reject) => {
      try {
        fabric.util.enlivenObjects(elements, objects => {
          resolve(objects)
        })
      } catch (e) {
        reject(e)
      }
    })

  loadFabricImage = url =>
    new Promise((resolve, reject) => {
      try {
        fabric.util.loadImage(url, img => resolve(img), undefined, 'Anonymous')
      } catch (e) {
        reject(e)
      }
    })

  loadCanvasTexture = async (object, reseting) => {
    try {
      const { onSetCanvasObject } = this.props
      const canvas = { text: {}, image: {}, path: {} }
      let elements = []
      const paths = []
      const imagesElements = []
      const imagesPromises = []
      const fonts = []
      const indexes = {}
      const { objects } = JSON.parse(object)
      objects.forEach((el, index) => {
        const elId = shortid.generate()
        el.id = elId
        el.hasRotatingPoint = false
        indexes[elId] = index
        switch (el.type) {
          case CanvasElements.Text: {
            elements.push(el)
            fonts.push(el.fontFamily)
            const element = getTextCanvasElement(el)
            canvas.text[elId] = element
            break
          }
          case CanvasElements.Group: {
            if (el.isClipArtGroup) {
              const element = getClipArtCanvasElement(el)
              canvas.path[elId] = element
              paths.push(el)
            } else {
              const element = getImageCanvas(el)
              canvas.image[elId] = element
              paths.push(el)
            }
            break
          }
          case CanvasElements.Polygon:
          case CanvasElements.Path: {
            const element = getClipArtCanvasElement(el)
            canvas.path[elId] = element
            paths.push(el)
            break
          }
          case CanvasElements.Image: {
            const element = getImageCanvas(el)
            canvas.image[elId] = element
            imagesElements.push(el)
            imagesPromises.push(this.loadFabricImage(el.src))
            break
          }
          default:
            break
        }
      })
      elements = [...elements, ...paths]
      let images = []
      if (!!imagesElements.length) {
        images = await Promise.all(imagesPromises)
      }
      images.forEach((img, index) => {
        const config = imagesElements[index] || {}
        const imageEl = new fabric.Image(img, { ...config })
        this.canvasTexture.add(imageEl)
      })
      const fontsPromises = fonts.map(font => {
        const fontObserver = new FontFaceObserver(font)
        return fontObserver.load()
      })
      await Promise.all(fontsPromises)
      const fabricObjects = await this.convertToFabricObjects(elements)
      fabricObjects.forEach(o => this.canvasTexture.add(o))
      if (reseting) {
        const {
          currentStyle: { accessoriesColor },
          onResetEditing
        } = this.props
        onResetEditing(canvas, accessoriesColor)
      } else {
        onSetCanvasObject(canvas, paths)
      }
      const temporalCanvasTexture = cloneDeep(this.canvasTexture.getObjects())
      temporalCanvasTexture.forEach(el => {
        find(this.canvasTexture.getObjects(), obj => obj.id === el.id).moveTo(
          indexes[el.id]
        )
      })
      this.canvasTexture.renderAll()
    } catch (e) {
      console.error('Error loading canvas object: ', e.message)
    }
  }

  loadTextures = (design, product) =>
    new Promise((resolve, reject) => {
      try {
        const loadedTextures = {}
        const { brandingPng, fullColors: colors } = design

        const { flatlock, bumpMap, zipper, binding, bibBrace } = product
        if (!!zipper) {
          const { white, black } = zipper
          this.zipper = {}
          if (white) {
            this.zipper.white = this.textureLoader.load(white)
            this.zipper.white.minFilter = THREE.LinearFilter
          }
          if (black) {
            this.zipper.black = this.textureLoader.load(black)
            this.zipper.black.minFilter = THREE.LinearFilter
          }
        }
        if (!!binding) {
          const { white, black } = binding
          this.binding = {}
          if (white) {
            this.binding.white = this.textureLoader.load(white)
            this.binding.white.minFilter = THREE.LinearFilter
          }
          if (black) {
            this.binding.black = this.textureLoader.load(black)
            this.binding.black.minFilter = THREE.LinearFilter
          }
        }
        if (!!bibBrace) {
          const { white, black } = bibBrace
          this.bibBrace = {}
          if (white) {
            this.bibBrace.white = this.textureLoader.load(white)
            this.bibBrace.white.minFilter = THREE.LinearFilter
          }
          if (black) {
            this.bibBrace.black = this.textureLoader.load(black)
            this.bibBrace.black.minFilter = THREE.LinearFilter
          }
        }
        if (!!flatlock) {
          loadedTextures.flatlock = this.textureLoader.load(flatlock)
        }
        if (!!brandingPng) {
          loadedTextures.branding = this.textureLoader.load(brandingPng)
          loadedTextures.branding.minFilter = THREE.LinearFilter
        }
        loadedTextures.bumpMap = this.textureLoader.load(bumpMap)
        loadedTextures.bumpMap.minFilter = THREE.LinearFilter
        /**
         * I had to implement this because when we load one design
         * the colors had a propert from apollo, that causes fail on
         * the lodash reverse function.
         */
        const sanitizedColors = colors.map(({ color, image }) => ({
          color,
          image
        }))
        const reversedAreas = reverse(sanitizedColors)
        const images = []
        loadedTextures.colors = []
        reversedAreas.forEach(({ color, image }) => {
          loadedTextures.colors.push(color)
          images.push(image)
        })
        const loadedAreas = images.map(image => {
          const areaTexture = this.textureLoader.load(image)
          areaTexture.minFilter = THREE.LinearFilter
          return areaTexture
        })
        loadedTextures.areas = loadedAreas
        resolve(loadedTextures)
      } catch (e) {
        reject(e)
      }
    })

  clearScene = () => {
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      object.children.forEach(({ material }) => {
        if (!!material) {
          const { map, bumpMap, alphaMap } = material
          if (map && map.dispose) map.dispose()
          if (bumpMap && bumpMap.dispose) bumpMap.dispose()
          if (alphaMap && alphaMap.dispose) alphaMap.dispose()
          if (material.dipose) material.dispose()
        }
      })
      if (this.zipper) {
        if (this.zipper.white) {
          this.zipper.white.dispose()
        }
        if (this.zipper.black) {
          this.zipper.black.dispose()
        }
        delete this.zipper
      }
      if (this.binding) {
        this.binding.white.dispose()
        this.binding.black.dispose()
        delete this.binding
      }
      if (this.bibBrace) {
        this.bibBrace.white.dispose()
        this.bibBrace.black.dispose()
        delete this.bibBrace
      }
      this.scene.remove(object)
    }
  }

  render3DModel = async () => {
    /* Object and MTL load */
    const {
      onLoadModel,
      currentStyle,
      design,
      product,
      isEditing,
      onSetEditConfig,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      colors: areaColors,
      designHasChanges,
      isMobile
    } = this.props
    const loadedTextures = await this.loadTextures(
      currentStyle,
      product,
      isEditing
    )
    const { accessoriesColor, designId } = currentStyle
    if (isEditing) {
      onSetEditConfig(loadedTextures.colors, accessoriesColor || {}, designId)
    } else {
      onLoadModel(true)
    }
    this.mtlLoader.load(product.mtl, materials => {
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        product.obj,
        object => {
          /* Object materials */
          const { children } = object
          const objectChildCount = children.length
          const { width, height } = currentStyle
          const CANVAS_SIZE =
            (isEditing && design.highResolution) || !isEditing
              ? HIGH_RESOLUTION_CANVAS
              : REGULAR_CANVAS
          const scaleFactorX = CANVAS_SIZE / width
          const scaleFactorY = CANVAS_SIZE / height
          this.setState({ scaleFactorX, scaleFactorY, objectChildCount })

          const getMeshIndex = meshName => {
            const index = findIndex(children, mesh => mesh.name === meshName)
            return index < 0 ? 0 : index
          }

          const meshIndex = getMeshIndex(MESH)

          const { flatlock, areas, bumpMap, branding, colors } = loadedTextures
          /* Stitching */
          if (!!flatlock) {
            const color =
              (isEditing && accessoriesColor.flatlockColor) ||
              stitchingColor.value
            const flatlockIndex = getMeshIndex(FLATLOCK)
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              alphaMap: flatlock,
              color
            })
            flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
            flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
            flatlockMaterial.alphaTest = 0.5
            children[flatlockIndex].material = flatlockMaterial
            this.setState({ flatlockIndex })
          }

          /* Zipper */
          if (!!this.zipper) {
            const color =
              (isEditing && accessoriesColor.zipperColor) || zipperColor
            const zipperIndex = getMeshIndex(ZIPPER)
            const zipperMaterial = new THREE.MeshPhongMaterial({
              map: this.zipper[color],
              transparent: true
            })
            children[zipperIndex].material = zipperMaterial
            this.setState({ zipperIndex })
          }
          /* Binding */
          if (!!this.binding) {
            const color =
              (isEditing && accessoriesColor.bindingColor) || bindingColor
            const bindingIndex = getMeshIndex(BINDING)
            const bindingMaterial = new THREE.MeshPhongMaterial({
              map: this.binding[color],
              transparent: true
            })
            children[bindingIndex].material = bindingMaterial
            this.setState({ bindingIndex })
          }
          /* Bib Brace */
          if (!!this.bibBrace) {
            const color =
              (isEditing && accessoriesColor.bibBraceColor) || bibColor
            const bibBraceIndex = getMeshIndex(BIB_BRACE)
            const bibBraceMaterial = new THREE.MeshPhongMaterial({
              map: this.bibBrace[color]
            })
            children[bibBraceIndex].material = bibBraceMaterial
            this.setState({ bibBraceIndex })
          }

          /* Back material */
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: BLACK
          })

          // Setup the texture layers
          const areasLayers = areas.map(() => children[meshIndex].clone())
          object.add(...areasLayers)

          children[meshIndex].material = insideMaterial
          /* Extra files loaded by MTL file */
          const labelIndex = findIndex(children, ({ name }) => name === RED_TAG)
          if (labelIndex >= 0) {
            object.children[labelIndex].material.color.set(DEFAULT_COLOR)
          }
          const propelPalmsIndex = findIndex(
            children,
            ({ name }) => name === PROPEL_PALMS
          )
          if (propelPalmsIndex >= 0) {
            object.children[propelPalmsIndex].material.color.set(DEFAULT_COLOR)
          }
          const gripTapeIndex = findIndex(
            children,
            ({ name }) => name === GRIP_TAPE
          )
          if (gripTapeIndex >= 0) {
            object.children[gripTapeIndex].material.color.set(DEFAULT_COLOR)
          }
          const svgColors = designHasChanges ? areaColors : colors

          areas.forEach(
            (map, index) =>
              (children[
                objectChildCount + index
              ].material = new THREE.MeshPhongMaterial({
                map,
                side: THREE.FrontSide,
                color: svgColors[index],
                bumpMap,
                transparent: true
              }))
          )

          /* Canvas */
          const canvas = document.createElement('canvas')
          canvas.width = CANVAS_SIZE
          canvas.height = CANVAS_SIZE
          const canvasConfig = {
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            crossOrigin: 'Anonymous',
            selection: false,
            skipTargetFind: true
          }
          if (isMobile) {
            this.canvasTexture = new fabric.StaticCanvas(canvas, canvasConfig)
          } else {
            this.canvasTexture = new fabric.Canvas(canvas, canvasConfig)
          }

          const canvasTexture = new THREE.CanvasTexture(canvas)
          canvasTexture.minFilter = THREE.LinearFilter
          this.canvasTexture.on(
            'after:render',
            () => (canvasTexture.needsUpdate = true)
          )
          const canvasMaterial = new THREE.MeshPhongMaterial({
            map: canvasTexture,
            side: THREE.FrontSide,
            bumpMap,
            transparent: true
          })
          const canvasObj = children[meshIndex].clone()
          object.add(canvasObj)

          const childrenLength = children.length
          const canvasIndex = childrenLength - 1
          children[canvasIndex].material = canvasMaterial
          children[canvasIndex].name = CANVAS_MESH
          /* Branding  */
          if (!!branding) {
            const brandingObj = children[meshIndex].clone()
            object.add(brandingObj)
            const brandingIndex = children.length - 1
            const brandingMaterial = new THREE.MeshPhongMaterial({
              map: branding,
              side: THREE.FrontSide,
              bumpMap,
              transparent: true
            })
            children[brandingIndex].material = brandingMaterial
            children[brandingIndex].name = BRANDING_MESH
          }

          /* Object Config */
          object.position.y = 0
          object.name = MESH_NAME
          this.scene.add(object)

          if (design && design.canvas) {
            this.loadCanvasTexture(design.canvas)
          }

          onLoadModel(false)
        },
        this.onProgress,
        this.onError
      )
    })
  }

  onProgress = xhr => {
    if (xhr.lengthComputable) {
      const progress = Math.round((xhr.loaded / xhr.total) * 100)
      this.setState({ progress })
    }
  }

  onError = xhr => console.error('Error: ' + xhr)

  start = () => {
    if (!this.framId) {
      this.framId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => cancelAnimationFrame(this.framId)

  animate = () => {
    this.rendeScene()
    this.framId = window.requestAnimationFrame(this.animate)
  }

  rendeScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  lightUpdate = changed => {
    const { showDragmessage } = this.state
    if (showDragmessage) {
      this.setState({ showDragmessage: false })
    }
    this.directionalLight.position.copy(this.camera.position)
  }

  cameraUpdate = ({ x, y, z }) => {
    if (this.camera) {
      this.camera.zoom = INITIAL_ZOOM
      this.camera.position.set(x, y, z)
      this.controls.target.set(0, 0, 0)
      this.controls.update()
    }
  }

  changeStitchingColor = color => {
    const { flatlockIndex } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      if (!!object.children[flatlockIndex]) {
        object.children[flatlockIndex].material.color.set(color)
      }
    } else {
      console.error('3D model is not loaded')
    }
  }

  changeExtraColor = (texture, color) => {
    const { bibBraceIndex, zipperIndex, bindingIndex } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      const loadedTexture = this[texture]
      if (loadedTexture && loadedTexture[color]) {
        const map = loadedTexture[color]
        switch (texture) {
          case ZIPPER_NAME:
            if (object.children[zipperIndex]) {
              object.children[zipperIndex].material.map = map
            }
            break
          case BIB_BRACE_NAME:
            if (object.children[bibBraceIndex]) {
              object.children[bibBraceIndex].material.map = map
            }
          case BINDING_NAME:
            if (object.children[bindingIndex]) {
              object.children[bindingIndex].material.map = map
            }
          default:
            break
        }
      }
    } else {
      console.error('Model is not loaded')
    }
  }

  setupColors = colors => {
    if (!this.scene) {
      return
    }
    const { objectChildCount } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (object) {
      colors.forEach((color, index) => {
        if (object.children[objectChildCount + index]) {
          object.children[objectChildCount + index].material.color.set(color)
        }
      })
    }
  }

  setupHoverColor = colorBlockHovered => {
    if (!this.scene) {
      return
    }
    const object = this.scene.getObjectByName(MESH_NAME)
    const { objectChildCount } = this.state
    const { colors } = this.props
    if (object && colorBlockHovered >= 0) {
      object.children[objectChildCount + colorBlockHovered].material.color.set(
        SELECTION_3D_AREA
      )
    } else {
      this.setupColors(colors)
    }
  }

  handleOnPressLeft = () => {
    const { currentView } = this.state
    const nextView =
      currentView === BACK_VIEW || currentView === TOP_VIEW
        ? LEFT_VIEW
        : currentView - 1
    const viewPosition = viewPositions[nextView]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: nextView })
  }

  handleOnPressRight = () => {
    const { currentView } = this.state
    const nextView =
      currentView === LEFT_VIEW || currentView === TOP_VIEW
        ? BACK_VIEW
        : currentView + 1
    const viewPosition = viewPositions[nextView]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: nextView })
  }

  handleOnPressTop = () => {
    const viewPosition = viewPositions[TOP_VIEW]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: TOP_VIEW })
  }

  handleOnChangeZoom = value => {
    if (this.camera) {
      this.camera.zoom = value / 100.0
      this.camera.updateProjectionMatrix()
    }
  }

  onKeyDown = event => {
    let charCode = String.fromCharCode(event.which).toLowerCase()
    if (event.shiftKey && event.ctrlKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickRedo()
    } else if (event.ctrlKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickUndo()
    }

    // For MAC we can use metaKey to detect cmd key
    if (event.shiftKey && event.metaKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickRedo()
    } else if (event.metaKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickUndo()
    }
  }

  handleOnClickUndo = () => {
    const { onUndoAction, undoChanges, undoEnabled } = this.props
    if (undoEnabled) {
      const changeToApply = undoChanges[0]
      const {
        type,
        state: { id }
      } = changeToApply
      switch (type) {
        case Changes.Add:
          this.deleteElementById(id)
          break
        case Changes.Delete:
          this.reAddCanvasElement(changeToApply)
          break
        case Changes.Resize:
          this.resizeCanvasElement(changeToApply)
          break
        case Changes.Drag:
          this.dragCanvasElement(changeToApply)
          break
        case Changes.CanvasStyle:
          this.styleCanvasElement(changeToApply)
          break
        case Changes.Rotate:
          this.rotateCanvasElement(changeToApply)
          break
        case Changes.ChangeText:
          this.changeTextCanvasElement(changeToApply)
          break
        case Changes.Duplicate:
          this.deleteDuplicateCanvasElement(changeToApply)
          break
        default:
          break
      }
      onUndoAction()
      this.canvasTexture.discardActiveObject()
      this.canvasTexture.renderAll()
    }
  }

  handleOnClickRedo = () => {
    const { onRedoAction, redoChanges, redoEnabled } = this.props
    if (redoEnabled) {
      const changeToApply = redoChanges[0]
      const {
        type,
        state: { id }
      } = changeToApply
      let skipRedo = false
      switch (type) {
        case Changes.Add:
          this.reAddCanvasElement(changeToApply)
          break
        case Changes.Delete:
          this.deleteElementById(id)
        case Changes.Resize:
          this.resizeCanvasElement(changeToApply, true)
          break
        case Changes.Drag:
          this.dragCanvasElement(changeToApply, true)
          break
        case Changes.CanvasStyle:
          this.styleCanvasElement(changeToApply, true)
          break
        case Changes.Rotate:
          this.rotateCanvasElement(changeToApply, true)
          break
        case Changes.ChangeText:
          this.changeTextCanvasElement(changeToApply, true)
          break
        case Changes.Duplicate:
          this.reDuplicateCanvasElement(changeToApply)
          skipRedo = true
          break
        default:
          break
      }
      if (!skipRedo) onRedoAction()
      this.canvasTexture.discardActiveObject()
      this.canvasTexture.renderAll()
    }
  }

  deleteDuplicateCanvasElement = canvasElement => {
    const {
      state: { id }
    } = canvasElement
    this.deleteElementById(id)
  }

  reDuplicateCanvasElement = canvasElement => {
    const {
      state: { id, originalId }
    } = canvasElement
    const element = this.getElementById(originalId)
    if (element) {
      this.duplicateElement(element, id)
    }
  }

  changeTextCanvasElement = (canvasElement, applyNewText = false) => {
    const {
      state: { id, oldText, newText }
    } = canvasElement
    const element = this.getElementById(id)
    if (element) {
      let text = applyNewText ? newText : oldText
      element.set({ text })
      this.canvasTexture.renderAll()
    }
  }

  rotateCanvasElement = (canvasElement, applyNewRotation = false) => {
    const {
      state: { id, oldRotation, newRotation, currentTransform }
    } = canvasElement
    const { x, y } = applyNewRotation ? newRotation : oldRotation
    this.rotateObject(x, y, currentTransform, id)
  }

  styleCanvasElement = (canvasElement, newStyle = false) => {
    const {
      state: { id, newFormat, oldFormat }
    } = canvasElement

    const element = this.getElementById(id)
    let format = newStyle ? newFormat : oldFormat
    if (element) {
      if (element.isClipArtGroup) {
        element.forEachObject(o => o.set({ ...format }))
      }
      element.set({ ...format })
      this.canvasTexture.renderAll()
    }
  }

  resizeCanvasElement = (canvasElement, newScale = false) => {
    const {
      state: { id, oldScaleX, oldScaleY, scaleX: newScaleX, scaleY: newScaleY }
    } = canvasElement
    const element = this.getElementById(id)
    if (element) {
      let scaleX = oldScaleX
      let scaleY = oldScaleY
      if (newScale) {
        scaleX = newScaleX
        scaleY = newScaleY
      }
      element
        .set({
          scaleX: Math.max(0, scaleX),
          scaleY: Math.max(0, scaleY)
        })
        .setCoords()
      this.canvasTexture.renderAll()
    }
  }

  dragCanvasElement = (canvasElement, newPosition = false) => {
    const {
      state: { id, oldLeft, oldTop, left: newLeft, top: newTop }
    } = canvasElement
    const element = this.getElementById(id)
    if (element) {
      let left = oldLeft
      let top = oldTop
      if (newPosition) {
        left = newLeft
        top = newTop
      }
      element
        .set({
          left,
          top
        })
        .setCoords()
      this.canvasTexture.renderAll()
    }
  }

  handleOnOpenResetModal = () => {
    const { openResetDesignModalAction } = this.props
    openResetDesignModalAction(true)
  }

  onCloseResetModal = () => {
    const { openResetDesignModalAction } = this.props
    openResetDesignModalAction(false)
  }

  onReset = () => {
    const { isEditing, design, onResetAction, currentStyle } = this.props
    this.canvasTexture.clear()
    if (!isEditing) {
      onResetAction()
      return
    }
    if (design && design.canvasJson) {
      this.loadCanvasTexture(design.canvasJson, true)
    }
  }

  handleOnClickClear = () => this.props.onClearAction()

  handleOnTakeDesignPicture = () => this.takeDesignPicture(false)

  takeDesignPicture = () => {
    const { isUserAuthenticated, openLoginAction } = this.props

    if (!isUserAuthenticated) {
      openLoginAction(true)
      return
    }
    if (this.renderer) {
      const {
        saveStyleCanvas,
        currentStyle,
        isMobile,
        isEditing,
        design
      } = this.props
      if (!isMobile) {
        this.canvasTexture.discardActiveObject()
        this.canvasTexture.renderAll()
      }
      const highResolution = (isEditing && design.highResolution) || !isEditing

      const viewPosition = viewPositions[2]
      this.handleOnChangeZoom(THUMBNAIL_ZOOM)
      this.cameraUpdate(viewPosition)
      this.setState({ currentView: 2 }, () =>
        setTimeout(() => {
          const designBase64 = this.renderer.domElement.toDataURL(
            'image/webp',
            0.3
          )
          const designCanvas = this.canvasTexture.toObject(EXTRA_FIELDS)
          const canvasJson = JSON.stringify(designCanvas)
          const saveDesign = {
            canvasJson,
            designBase64,
            styleId: currentStyle.id,
            highResolution
          }
          saveStyleCanvas(saveDesign)
        }, 200)
      )
    }
  }

  render() {
    const { showDragmessage, currentView, progress } = this.state
    const {
      loadingModel,
      formatMessage,
      canvas,
      selectedElement,
      saveDesignLoading,
      onSaveDesign,
      onUpdateDesign,
      canUpdate
    } = this.props

    let widthInCm = 0
    let heightInCm = 0
    let rotation = 0
    const selectedGraphicElement =
      canvas.image[selectedElement] ||
      canvas.path[selectedElement] ||
      canvas.text[selectedElement]
    if (!!selectedGraphicElement) {
      const activeEl = this.getElementById(selectedElement)
      if (selectedGraphicElement.imageSize) {
        const { width, height } = this.getSizeInCentimeters(
          selectedGraphicElement
        )
        widthInCm = width
        heightInCm = height
      } else {
        const { width, height } = this.getSizeInCentimeters({
          imageSize: { width: activeEl.width, height: activeEl.height },
          scaleX: activeEl.scaleX,
          scaleY: activeEl.scaleY
        })
        widthInCm = width
        heightInCm = height
      }
      if (activeEl.angle > 180) {
        rotation = Math.round(activeEl.angle - 360)
      } else {
        rotation = Math.round(activeEl.angle)
      }
    }
    return (
      <Container onKeyDown={this.onKeyDown} tabIndex="0">
        <ButtonWrapper>
          <Button
            type="ghost"
            onClick={onSaveDesign}
            loading={saveDesignLoading}
          >
            {formatMessage(messages.saveAsNew)}
          </Button>
          {canUpdate && (
            <Button
              type="primary"
              onClick={onUpdateDesign}
              loading={saveDesignLoading}
            >
              {formatMessage(messages.updateDesign)}
            </Button>
          )}
        </ButtonWrapper>
        {!!selectedGraphicElement && (
          <MeasurementBox>
            <MeasurementLabel>
              <FormattedMessage {...messages.sizeMessage} />
            </MeasurementLabel>
            <Measurement>{`${widthInCm} x ${heightInCm} cm`}</Measurement>
            <MeasurementLabel>
              <FormattedMessage {...messages.rotationMessage} />
            </MeasurementLabel>
            <Measurement>{`${rotation}º`}</Measurement>
          </MeasurementBox>
        )}
        <Render
          id="render-3d-custom"
          innerRef={container => (this.container = container)}
        >
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
        {showDragmessage && (
          <DragText>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
        {/*
          // TODO: JV2 - Phase II
          <Dropdown overlay={menu}>
          <ModelType>
            <ModelText>3D Model: Product Only</ModelText>
            <img src={arrowDown} />
          </ModelType>
        </Dropdown>
        */}
        {/* {saveDesignLoading && (
          <Loading>
            <Spin tip="Saving..." indicator={<Icon type="loading" />} />
          </Loading>
        )} */}
      </Container>
    )
  }

  getHelpModalValueFromLocal = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('disableDesignCenterHint')
    }
  }

  applyCanvasEl = canvasEl => {
    if (this.canvasTexture) {
      const { isFirstAdd } = this.state
      const objects = this.canvasTexture.getObjects()
      if (!objects.length && isFirstAdd) {
        let element = canvasEl.type
        if (canvasEl.type === CanvasElements.Path) {
          element = 'symbol'
        }
        const modal = Modal.info({
          title: 'Getting started',
          content: `Click the position, where the ${element} should be placed`,
          okText: 'Got it!',
          okType: 'default'
        })
        setTimeout(() => modal.destroy(), 10000)
        document.getElementById('render-3d-custom').style.cursor = 'no-drop'
        this.setState({ canvasEl, isFirstAdd: false })
      } else {
        document.getElementById('render-3d-custom').style.cursor = 'no-drop'
        this.setState({ canvasEl })
      }
    }
  }

  reAddCanvasElement = canvasEl => {
    const {
      state: {
        id,
        type,
        style,
        src,
        position,
        isClipArtGroup,
        fileId,
        fileUrl,
        rotation
      }
    } = canvasEl
    switch (type) {
      case CanvasElements.Group:
        if (!isClipArtGroup) {
          this.applyGroup(src, position, id, rotation)
          break
        }
      case CanvasElements.Polygon:
      case CanvasElements.Path:
        const source = src || fileUrl
        this.applyClipArt(source, style, position, id, fileId, rotation)
        break
      case CanvasElements.Text:
        this.applyText(src, style, position, id, rotation)
        break
      case CanvasElements.Image:
        this.applyImage(src, position, id, rotation)
        break
    }
  }

  applyImage = (file = {}, position = {}, idElement, rotation) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const { fileUrl, size: imageSize, id: fileId, type } = file
    const id = idElement || shortid.generate()
    fabric.util.loadImage(
      fileUrl,
      img => {
        const imageEl = new fabric.Image(img, {
          id,
          hasRotatingPoint: false,
          ...position
        })

        const scaleX = position.scaleX || scaleFactorX
        const scaleY = position.scaleY || scaleFactorY
        if (rotation) {
          const { constraintPosition, angle } = rotation
          imageEl
            .set({ scaleX, scaleY, fileId, angle })
            .setPositionByOrigin(
              constraintPosition,
              CENTER_ORIGIN,
              CENTER_ORIGIN
            )
        } else {
          imageEl.set({ scaleX, scaleY, fileId })
        }
        imageEl.setCoords()

        this.canvasTexture.add(imageEl)

        const el = {
          id,
          imageSize,
          type,
          ...position,
          fileId,
          src: fileUrl,
          scaleX,
          scaleY,
          lock: false
        }
        position.scaleX = scaleX
        position.scaleY = scaleY
        if (!idElement) {
          const { onApplyCanvasEl } = this.props
          onApplyCanvasEl(el, CanvasElements.Image, undefined, {
            src: file,
            style: undefined,
            position,
            fileId
          })
          this.canvasTexture.setActiveObject(imageEl)
        } else {
          const { onReApplyImageEl } = this.props
          onReApplyImageEl(el)
        }
        this.canvasTexture.renderAll()
      },
      undefined,
      'Anonymous'
    )
  }

  applyText = (text, style, position = {}, idElement, rotation) => {
    if (!this.canvasTexture || !text) {
      return
    }

    const activeEl = this.canvasTexture.getActiveObject()

    let txtEl = {}
    if (activeEl && activeEl.type === CanvasElements.Text && !idElement) {
      const { text: oldText } = activeEl
      if (text !== oldText) {
        this.props.onCanvasElementTextChanged(oldText, text)
      }
      activeEl.set({ text, ...style })
      this.canvasTexture.renderAll()
    } else {
      const { onApplyCanvasEl } = this.props
      const id = idElement || shortid.generate()

      txtEl = new fabric.Text(text, {
        id,
        hasRotatingPoint: false,
        fontSize: 50,
        scaleX: 1.0,
        scaleY: 1.0,
        ...position,
        ...style
      })
      if (rotation) {
        const { constraintPosition, angle } = rotation
        txtEl
          .set({ angle })
          .setPositionByOrigin(constraintPosition, CENTER_ORIGIN, CENTER_ORIGIN)
        txtEl.setCoords()
      } else {
      }
      this.canvasTexture.add(txtEl)
      if (!idElement) {
        this.canvasTexture.setActiveObject(txtEl)
      }

      this.canvasTexture.renderAll()
      let activeElementId
      if (activeEl && activeEl.type === CanvasElements.Text) {
        activeElementId = activeEl.id
      }

      if (!idElement) {
        const el = {
          id: activeElementId || txtEl.id,
          text,
          textFormat: style,
          lock: false
        }
        onApplyCanvasEl(el, CanvasElements.Text, !!activeEl, {
          src: text,
          style,
          position
        })
      }
    }
  }

  applyClipArt = (
    src,
    style = {},
    position = {},
    idElement,
    fileId,
    rotation
  ) => {
    const activeEl = this.canvasTexture.getActiveObject()
    const { scaleFactorX, scaleFactorY } = this.state
    const type = activeEl && activeEl.get('type')
    const isGroup = type === CanvasElements.Group
    const isClipArtElement = type === CanvasElements.Path || isGroup
    if (isClipArtElement && !idElement && !activeEl.isImageGroup) {
      if (isGroup && activeEl.forEachObject) {
        const { fill, stroke, strokeWidth } = style
        activeEl.forEachObject(o => o.set({ fill, stroke, strokeWidth }))
        activeEl.set({ fill, stroke, strokeWidth })
      } else {
        activeEl.set({ ...style })
      }
      this.canvasTexture.renderAll()
    } else {
      const { onApplyCanvasEl } = this.props
      fabric.loadSVGFromURL(src, (objects, options) => {
        const id = idElement || shortid.generate()
        const shape = fabric.util.groupSVGElements(objects || [], options)
        const isClipArtGroup = shape.type === CanvasElements.Group
        const shapeObject = {
          id,
          isClipArtGroup,
          fileId,
          fileUrl: src,
          hasRotatingPoint: false,
          ...position,
          ...style
        }
        const scaleX = position.scaleX || scaleFactorX
        const scaleY = position.scaleY || scaleFactorY
        if (rotation) {
          const { constraintPosition, angle } = rotation
          shape
            .set({ ...shapeObject, scaleX, scaleY, angle })
            .setPositionByOrigin(
              constraintPosition,
              CENTER_ORIGIN,
              CENTER_ORIGIN
            )
        } else {
          shape.set({ ...shapeObject, scaleX, scaleY })
        }
        shape.setCoords()

        if (isClipArtGroup && !isEmpty(style)) {
          shape.forEachObject(o => o.set({ ...style }))
        }
        this.canvasTexture.add(shape)

        const el = {
          id,
          fill: BLACK,
          stroke: BLACK,
          strokeWidth: 1,
          ...style,
          lock: false
        }
        position.scaleX = scaleX
        position.scaleY = scaleY

        if (!idElement) {
          onApplyCanvasEl(el, CanvasElements.Path, false, {
            src,
            style,
            position,
            fileId
          })
          this.canvasTexture.setActiveObject(shape)
        }
        this.canvasTexture.renderAll()
      })
    }
  }

  applyGroup = (file = {}, position = {}, idElement, rotation) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const { fileUrl: src, size: imageSize, id: fileId, type } = file
    fabric.loadSVGFromURL(src, (objects, options) => {
      const id = idElement || shortid.generate()
      const shape = fabric.util.groupSVGElements(objects || [], options)
      const shapeObject = {
        id,
        fileId,
        fileUrl: src,
        isImageGroup: true,
        hasRotatingPoint: false,
        ...position
      }

      const scaleX = position.scaleX || scaleFactorX
      const scaleY = position.scaleY || scaleFactorY
      if (rotation) {
        const { constraintPosition, angle } = rotation
        shape
          .set({ ...shapeObject, scaleX, scaleY, angle })
          .setPositionByOrigin(constraintPosition, CENTER_ORIGIN, CENTER_ORIGIN)
      } else {
        shape.set({ ...shapeObject, scaleX, scaleY })
      }
      shape.setCoords()
      this.canvasTexture.add(shape)

      const el = { id, imageSize, type, fileId, src, scaleX, scaleY }
      position.scaleX = scaleX
      position.scaleY = scaleY
      if (!idElement) {
        const { onApplyCanvasEl } = this.props
        onApplyCanvasEl(el, CanvasElements.Image, undefined, {
          src: file,
          style: undefined,
          position,
          fileId
        })
        this.canvasTexture.setActiveObject(shape)
      } else {
        const { onReApplyImageEl } = this.props
        onReApplyImageEl(el)
      }
      this.canvasTexture.renderAll()
    })
  }

  deleteElement = el => {
    const { canvas } = this.props
    const type = el.get('type')
    const { id, left, top, scaleX, scaleY, isClipArtGroup, angle } = el
    let rotation = null
    if (angle > 0) {
      const constraintPosition = el.translateToOriginPoint(
        el.getCenterPoint(),
        CENTER_ORIGIN,
        CENTER_ORIGIN
      )
      rotation = { angle, constraintPosition }
    }
    const canvasObject = {
      position: { left, top, scaleX, scaleY },
      rotation
    }
    switch (type) {
      case CanvasElements.Text:
        {
          const {
            text,
            fill,
            fontFamily,
            stroke,
            strokeWidth,
            textAlign,
            charSpacing,
            fontSize,
            lineHeight
          } = el
          canvasObject.src = text
          canvasObject.style = {
            fill,
            fontFamily,
            stroke,
            strokeWidth,
            textAlign,
            charSpacing,
            fontSize,
            lineHeight
          }
        }
        break
      case CanvasElements.Group:
        if (!isClipArtGroup) {
          {
            const object = canvas.image[id]
            const { fileId, imageSize, type } = object
            const { fileUrl } = el
            canvasObject.src = {
              id: fileId,
              fileUrl,
              size: imageSize,
              type
            }
            canvasObject.fileId = fileId
          }
          break
        }
      case CanvasElements.Polygon:
      case CanvasElements.Path:
        {
          const { fill, stroke, strokeWidth, fileId, fileUrl } = el
          canvasObject.style = {
            fill: fill || BLACK,
            stroke: stroke || BLACK,
            strokeWidth: strokeWidth || 0
          }
          if (fileUrl) {
            canvasObject.src = fileUrl
            canvasObject.fileId = fileId
            canvasObject.fileUrl = fileUrl
            canvasObject.isClipArtGroup = isClipArtGroup
          }
        }
        break
      case CanvasElements.Image:
        {
          const object = canvas.image[id]
          const { src, fileId, imageSize, type } = object
          canvasObject.src = { id: fileId, fileUrl: src, size: imageSize, type }
          canvasObject.fileId = fileId
        }
        break
    }
    const { onRemoveEl } = this.props
    onRemoveEl(id, type, canvasObject)
    this.canvasTexture.remove(el)
  }

  getElementById = id => {
    const objects = this.canvasTexture.getObjects()
    return find(objects, { id })
  }

  deleteElementById = id => {
    const object = this.getElementById(id)
    if (object) {
      this.canvasTexture.remove(object)
    }
  }

  duplicateElement = (el, oldId) => {
    const { onCanvasElementDuplicated } = this.props
    const boundingBox = el.getBoundingRect()

    const { type, fileId, fileUrl, src, isClipArtGroup } = el
    let elementType = type
    if (type === CanvasElements.Group) {
      elementType = !isClipArtGroup ? CanvasElements.Image : CanvasElements.Path
    }
    const id = oldId || shortid.generate()
    let canvasEl = { id, originalId: el.id }

    el.clone(clone => {
      clone.set({
        id,
        hasRotatingPoint: false,
        left: boundingBox.left + EXTRA_POSITION,
        top: boundingBox.top + EXTRA_POSITION,
        stroke: el.stroke,
        fileId,
        fileUrl,
        src,
        isClipArtGroup
      })
      this.canvasTexture.add(clone)
    })
    onCanvasElementDuplicated(canvasEl, elementType, oldId)
  }

  setLayerElement = el => {
    this.canvasTexture.bringToFront(el)
  }

  onMouseUp = evt => {
    const { isEditing, design } = this.props
    evt.preventDefault()
    document.getElementById('render-3d-custom').style.cursor = 'grab'
    const action = this.dragComponent && this.dragComponent.action

    if (CHANGE_ACTIONS.includes(action)) {
      const activeEl = this.canvasTexture.getActiveObject() || {}
      const { id } = activeEl

      const CANVAS_SIZE =
        (isEditing && design.highResolution) || !isEditing
          ? HIGH_RESOLUTION_CANVAS
          : REGULAR_CANVAS
      switch (action) {
        case SCALE_ACTION:
          const { scaleX, scaleY, type, isClipArtGroup } = activeEl
          const {
            oldScale: { oldScaleX = 1, oldScaleY = 1 }
          } = this.state
          const canvasType =
            type === CanvasElements.Group && !isClipArtGroup
              ? CanvasElements.Image
              : type
          if (scaleX !== oldScaleX || scaleY !== oldScaleY) {
            const { onCanvasElementResized } = this.props
            onCanvasElementResized({
              id,
              elementType: canvasType,
              oldScaleX,
              oldScaleY,
              scaleX,
              scaleY
            })
          }
          break
        case DRAG_ACTION:
          const { left, top } = activeEl
          const {
            oldPosition: { oldLeft, oldTop }
          } = this.state
          if (left !== oldLeft || top !== oldTop) {
            const { onCanvasElementDragged } = this.props
            onCanvasElementDragged({
              id,
              oldLeft,
              oldTop,
              left,
              top
            })
          }
          break
        case ROTATE_ACTION:
          const intersects = this.getIntersects(
            this.onClickPosition,
            this.scene.children
          )
          if (!isEmpty(intersects)) {
            const uv = intersects[0].uv
            const cX = uv.x * CANVAS_SIZE
            const cY = (1 - uv.y) * CANVAS_SIZE

            const {
              oldRotation: { currentTransform, x, y }
            } = this.state
            if (x !== cX || y !== cY) {
              const { onCanvasElementRotated } = this.props
              onCanvasElementRotated({
                id,
                oldRotation: { x, y },
                newRotation: { x: cX, y: cY },
                currentTransform
              })
            }
          }
          break
      }
    }

    if (this.dragComponent && this.dragComponent.oldAngle) {
      this.dragComponent.el.oldAngle = this.dragComponent.oldAngle
    }

    this.dragComponent = null
    this.controls.enabled = true
  }

  onMouseDown = evt => {
    evt.preventDefault()
    document.getElementById('render-3d-custom').style.cursor = 'grabbing'

    if (!this.canvasTexture) {
      return
    }
    const {
      responsive: { tablet },
      selectedElement,
      canvas,
      isEditing,
      design
    } = this.props

    const CANVAS_SIZE =
      (isEditing && design.highResolution) || !isEditing
        ? HIGH_RESOLUTION_CANVAS
        : REGULAR_CANVAS

    let clientX = evt.clientX
    let clientY = evt.clientY
    if (tablet) {
      clientX = evt.targetTouches[0]
        ? evt.targetTouches[0].pageX
        : evt.changedTouches[evt.changedTouches.length - 1].pageX
      clientY = evt.targetTouches[0]
        ? evt.targetTouches[0].pageY
        : evt.changedTouches[evt.changedTouches.length - 1].pageY
    }
    const array = this.getMousePosition(this.container, clientX, clientY)
    this.onClickPosition.fromArray(array)

    const intersects = this.getIntersects(
      this.onClickPosition,
      this.scene.children
    )

    const activeEl = this.canvasTexture.getActiveObject()
    const { onSelectEl, onSelectedItem } = this.props
    if (!!intersects.length && intersects[0].uv) {
      const { canvasEl } = this.state
      const meshName = get(intersects[0], 'object.name', '')
      const uv = intersects[0].uv
      const validMesh =
        meshName === MESH ||
        meshName === CANVAS_MESH ||
        meshName === BRANDING_MESH ||
        meshName === BIB_BRACE
      if (!!canvasEl && validMesh) {
        const el = Object.assign({}, canvasEl)
        const { fileId } = canvasEl
        this.setState({ canvasEl: null }, () => {
          onSelectedItem({})
          const left = uv.x * CANVAS_SIZE
          const top = (1 - uv.y) * CANVAS_SIZE
          switch (el.type) {
            case CanvasElements.Text:
              this.applyText(el.text, el.style, { left, top })
              break
            case CanvasElements.Image:
              this.applyImage(el.file, { left, top })
              break
            case CanvasElements.Group:
              this.applyGroup(el.file, { left, top })
              break
            case CanvasElements.Polygon:
            case CanvasElements.Path:
              this.applyClipArt(
                el.url,
                el.style,
                { left, top },
                undefined,
                fileId
              )
              break
            default:
              break
          }
        })
      } else {
        if (activeEl && !this.dragComponent) {
          const selectedGraphicElement =
            canvas.image[selectedElement] ||
            canvas.path[selectedElement] ||
            canvas.text[selectedElement]
          const action = clickOnCorner(activeEl.oCoords, uv, CANVAS_SIZE)
          if (
            action &&
            selectedGraphicElement &&
            !selectedGraphicElement.lock
          ) {
            switch (action) {
              case DELETE_ACTION:
                this.deleteElement(activeEl)
                break
              case DUPLICATE_ACTION:
                this.duplicateElement(activeEl)
                break
              case BRING_TO_FRONT_ACTION:
                this.setLayerElement(activeEl)
                break
              case SCALE_ACTION: {
                const { scaleX: oldScaleX, scaleY: oldScaleY } = activeEl
                const sX = uv.x * CANVAS_SIZE
                const sY = (1 - uv.y) * CANVAS_SIZE
                this.setState({
                  oldScale: { oldScaleX, oldScaleY }
                })
                this.controls.enabled = false
                const currentTransform = {
                  originX: activeEl.originX,
                  originY: activeEl.originY,
                  scaleX: oldScaleX,
                  scaleY: oldScaleY,
                  ex: sX,
                  ey: sY,
                  original: Object.assign({}, activeEl)
                }
                this.dragComponent = {
                  action: SCALE_ACTION,
                  currentTransform,
                  isImage: activeEl.get('type') === CanvasElements.Image
                }
                break
              }
              case ROTATE_ACTION: {
                const sX = uv.x * CANVAS_SIZE
                const sY = (1 - uv.y) * CANVAS_SIZE
                this.controls.enabled = false
                const currentTransform = {
                  originX: CENTER_ORIGIN,
                  originY: CENTER_ORIGIN,
                  ex: sX,
                  ey: sY,
                  theta: fabric.util.degreesToRadians(activeEl.angle)
                }
                this.setState({
                  oldRotation: { currentTransform, x: sX, y: sY }
                })
                this.dragComponent = {
                  el: activeEl,
                  currentTransform,
                  action: ROTATE_ACTION
                }
                break
              }
              default:
                break
            }
            return
          }
        }

        let allDeactive = true
        this.canvasTexture.forEachObject(el => {
          const boundingBox = el.getBoundingRect()
          const isInside = isMouseOver(boundingBox, uv, CANVAS_SIZE)
          if (isInside) {
            allDeactive = false
            onSelectEl(el.id, el.get('type'))
            const left = uv.x * CANVAS_SIZE
            const top = (1 - uv.y) * CANVAS_SIZE
            const differenceX = left - el.left
            const differenceY = top - el.top
            const dragComponent = {
              differenceX,
              differenceY,
              action: DRAG_ACTION
            }
            const { left: oldLeft, top: oldTop } = el
            this.setState({
              oldPosition: { oldLeft, oldTop }
            })
            this.controls.enabled = false
            this.dragComponent = dragComponent
            this.canvasTexture.setActiveObject(el)
          } else {
            el.set('active', false)
          }
        })

        if (allDeactive && activeEl) {
          onSelectEl('')
          this.canvasTexture.discardActiveObject()
        }
        this.canvasTexture.renderAll()
      }
    } else {
      if (!!activeEl) {
        onSelectEl('')
        this.canvasTexture.discardActiveObject()
        this.canvasTexture.renderAll()
      }

      if (this.state.canvasEl) {
        const { onSelectedItem } = this.props
        onSelectedItem({})
        this.setState({ canvasEl: null })
      }
    }
  }

  onMouseMove = evt => {
    evt.preventDefault()
    const {
      responsive: { tablet },
      canvas,
      selectedElement,
      isEditing,
      design
    } = this.props
    let clientX = evt.clientX
    let clientY = evt.clientY

    const CANVAS_SIZE =
      (isEditing && design.highResolution) || !isEditing
        ? HIGH_RESOLUTION_CANVAS
        : REGULAR_CANVAS

    if (tablet) {
      clientX = evt.targetTouches[0]
        ? evt.targetTouches[0].pageX
        : evt.changedTouches[evt.changedTouches.length - 1].pageX
      clientY = evt.targetTouches[0]
        ? evt.targetTouches[0].pageY
        : evt.changedTouches[evt.changedTouches.length - 1].pageY
    }

    const array = this.getMousePosition(this.container, clientX, clientY)
    this.onClickPosition.fromArray(array)

    const intersects = this.getIntersects(
      this.onClickPosition,
      this.scene.children
    )

    if (!!intersects.length && intersects[0].uv && !!this.dragComponent) {
      const meshName = get(intersects[0], 'object.name', '')
      const validMesh =
        meshName === MESH ||
        meshName === CANVAS_MESH ||
        meshName === BRANDING_MESH ||
        meshName === BIB_BRACE
      if (validMesh) {
        const activeEl = this.canvasTexture.getActiveObject()
        const {
          differenceX,
          differenceY,
          action,
          currentTransform
        } = this.dragComponent
        const uv = intersects[0].uv
        const selectedGraphicElement =
          canvas.image[selectedElement] ||
          canvas.path[selectedElement] ||
          canvas.text[selectedElement]

        if (selectedGraphicElement && !selectedGraphicElement.lock) {
          switch (action) {
            case DRAG_ACTION: {
              const left = uv.x * CANVAS_SIZE - differenceX
              const top = (1 - uv.y) * CANVAS_SIZE - differenceY
              activeEl.set({ left, top }).setCoords()
              this.canvasTexture.renderAll()
              break
            }
            case SCALE_ACTION: {
              const cX = uv.x * CANVAS_SIZE
              const cY = (1 - uv.y) * CANVAS_SIZE
              this.scaleObject(cX, cY, currentTransform)
              this.forceUpdate()
              this.canvasTexture.renderAll()
              break
            }
            case ROTATE_ACTION: {
              const cX = uv.x * CANVAS_SIZE
              const cY = (1 - uv.y) * CANVAS_SIZE
              this.rotateObject(cX, cY, currentTransform)
              this.forceUpdate()
              this.canvasTexture.renderAll()
              break
            }
            default:
              break
          }
        }
      }
    } else if (!!intersects.length && !!this.state.canvasEl) {
      document.getElementById('render-3d-custom').style.cursor = 'crosshair'
    } else if (!!this.state.canvasEl) {
      document.getElementById('render-3d-custom').style.cursor = 'no-drop'
    }
  }

  scaleObject = (x, y, currentTransform) => {
    const { originX, originY, original } = currentTransform
    const el = this.canvasTexture.getActiveObject()
    if (!el) {
      return
    }
    const constraintPosition = el.translateToOriginPoint(
      el.getCenterPoint(),
      originX,
      originY
    )
    const localMouse = el.toLocalPoint(new fabric.Point(x, y), originX, originY)
    const dim = el._getTransformedDimensions()
    const dist = localMouse.y + localMouse.x
    const lastDist =
      (dim.y * original.scaleY) / el.scaleY +
      (dim.x * original.scaleX) / el.scaleX

    const scaleX = Math.abs((currentTransform.scaleX * dist) / lastDist)
    const scaleY = Math.abs((currentTransform.scaleY * dist) / lastDist)
    el.set({ scaleX, scaleY })
    el.setPositionByOrigin(
      constraintPosition,
      currentTransform.originX,
      currentTransform.originY
    )
    el.setCoords()
  }

  rotateObject = (x, y, currentTransform, idElement) => {
    const { ey, ex, originX, originY, theta } = currentTransform
    const el = idElement
      ? this.getElementById(idElement)
      : this.canvasTexture.getActiveObject()
    if (!el) {
      return
    }
    const constraintPosition = el.translateToOriginPoint(
      el.getCenterPoint(),
      originX,
      originY
    )
    const lastAngle = Math.atan2(
      ey - constraintPosition.y,
      ex - constraintPosition.x
    )
    const currentAngle = Math.atan2(
      y - constraintPosition.y,
      x - constraintPosition.x
    )
    let angle = fabric.util.radiansToDegrees(currentAngle - lastAngle + theta)
    if (angle < 0) {
      angle = 360 + angle
    }
    angle %= 360
    el.set('angle', angle)
    el.setPositionByOrigin(constraintPosition, originX, originY)
    el.setCoords()
  }

  /* Warning modals */
  showFontWarningModal = () => {
    const { formatMessage } = this.props
    Modal.warning({
      title: formatMessage(messages.modalWarningTitle),
      content: formatMessage(messages.modalFontMessage),
      okText: formatMessage(messages.modalWarningButtonText),
      maskClosable: true
    })
  }

  showResolutionWarningModal = () => {
    const { formatMessage } = this.props
    notification.warning({
      message: formatMessage(messages.modalWarningTitle),
      description: formatMessage(messages.modalResolutionMessage)
    })
  }

  getSizeInCentimeters = ({ imageSize, scaleX, scaleY }) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const size = {}
    const { width, height } = imageSize
    const scaleXTemp = scaleX / scaleFactorX
    const scaleYTemp = scaleY / scaleFactorY
    const scaledWidth = width * scaleXTemp
    const scaledHeight = height * scaleYTemp
    size.width = scaledWidth / ILLUSTRATOR_PIXELS_PER_CM
    size.height = scaledHeight / ILLUSTRATOR_PIXELS_PER_CM
    return size
  }
  setFrontFaceModel = () => {
    this.cameraUpdate(viewPositions[2])
  }

  takeScreenshot = () =>
    new Promise(resolve => {
      setTimeout(() => {
        const thumbnail = this.renderer.domElement.toDataURL('image/webp', 0.3)
        resolve(thumbnail)
      }, 800)
    })
  saveThumbnail = async (item, colors = []) => {
    this.setFrontFaceModel()
    const clonedColors = [...colors]
    this.setupColors(clonedColors.reverse())
    try {
      const { onSaveThumbnail, onUploadingThumbnail } = this.props
      onUploadingThumbnail(true)
      const thumbnail = await this.takeScreenshot()
      onSaveThumbnail(item, thumbnail)
    } catch (error) {
      console.error(error)
      onUploadingThumbnail(false)
    }
  }

  removeObject = () => {
    if (this.renderer) {
      const object = this.scene.getObjectByName(MESH_NAME)
      if (!!object) {
        object.children.forEach(({ material }) => {
          if (!!material) {
            const { map, bumpMap, alphaMap } = material
            if (map && map.dispose) map.dispose()
            if (bumpMap && bumpMap.dispose) bumpMap.dispose()
            if (alphaMap && alphaMap.dispose) alphaMap.dispose()
            if (material.dispose) material.dispose()
          }
        })
        this.scene.remove(object)
      }
    }
  }
}

export default Render3D
