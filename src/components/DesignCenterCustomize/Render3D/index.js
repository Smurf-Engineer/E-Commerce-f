import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import reverse from 'lodash/reverse'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
// TODO: JV2 - Phase II
// import Dropdown from 'antd/lib/dropdown'
// import Menu from 'antd/lib/menu'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import shortid from 'shortid'
import Modal from 'antd/lib/modal'
import notification from 'antd/lib/notification'
import {
  Container,
  Render,
  Progress,
  Model,
  Row,
  QuickView,
  Button,
  DragText,
  ViewControls,
  ViewButton,
  ButtonWrapper,
  ModalMessage,
  Size,
  SizeBox,
  SizeLabel
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
  CANVAS_SIZE,
  BIB_BRACE_NAME,
  ZIPPER_NAME,
  BINDING_NAME,
  CHANGE_ACTIONS,
  WARNING_FACTOR,
  NUMBER_OF_DECIMALS
} from './config'
import {
  MESH,
  RED_TAG,
  FLATLOCK,
  ZIPPER,
  BINDING,
  BIB_BRACE,
  DPI,
  CM_PER_INCH
} from '../../../constants'
import {
  Changes,
  CanvasElements
} from '../../../screens/DesignCenter/constants'
import ModalFooter from '../../ModalFooter'
import ModalTitle from '../../ModalTitle'
import Slider from '../../ZoomSlider'
import OptionsController from '../OptionsController'
import messages from './messages'
import { isMouseOver, clickOnCorner } from './utils'
// TODO: JV2 - Phase II
// import arrowDown from '../../../assets/downarrow.svg'
// import topIcon from '../../../assets/Cube-Top.svg'
import quickView from '../../../assets/quickview.svg'
import left from '../../../assets/leftarrow.svg'
import right from '../../../assets/arrow.svg'
import frontIcon from '../../../assets/Cube-Front.svg'
import leftIcon from '../../../assets/Cube_Left.svg'
import rightIcon from '../../../assets/Cube_right.svg'
import backIcon from '../../../assets/Cube_back.svg'

const cubeViews = [backIcon, rightIcon, frontIcon, leftIcon]
const EXTRA_POSITION = 30

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
    scaleFactor: 1
  }

  dragComponent = null

  componentWillReceiveProps(nextProps) {
    const {
      colors,
      colorBlockHovered: oldColorBlockHovered,
      stitchingColor: oldStitchingColor,
      bindingColor: oldBindingColor,
      zipperColor: oldZipperColor,
      bibColor: oldBibColor
    } = this.props
    const {
      colors: nextColors,
      styleColors,
      colorBlockHovered,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor
    } = nextProps

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

  componentDidMount() {
    /* Renderer config */
    fabric.Object.prototype.customiseCornerIcons(fabricJsConfig)

    const { clientWidth, clientHeight } = this.container

    const devicePixelRatio = window.devicePixelRatio || 1
    const largeScreen = window.matchMedia('only screen and (min-width: 1024px)')
      .matches

    const precision = largeScreen ? 'highp' : 'lowp'
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
    const isMobile = window.matchMedia('only screen and (max-width: 1366px)')
      .matches

    camera.position.z = 250

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.65)
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

    this.render3DModel()

    this.container.appendChild(this.renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', this.lightUpdate)

    controls.enableKeys = false
    controls.minDistance = 0
    controls.maxDistance = 350
    controls.enableZoom = isMobile

    this.container.addEventListener('mousedown', this.onMouseDown, false)
    this.container.addEventListener('mouseup', this.onMouseUp, false)
    this.container.addEventListener('mousemove', this.onMouseMove, false)

    this.controls = controls
    this.start()

    const { setCustomize3dMountedAction } = this.props
    setCustomize3dMountedAction(true)
  }

  componentWillUnmount() {
    const { onUnmountTab } = this.props
    const canvasJson = JSON.stringify(this.canvasTexture)
    onUnmountTab(canvasJson)
    if (this.renderer) {
      this.stop()
      this.container.removeChild(this.renderer.domElement)
      this.clearScene()
    }
    if (this.canvasTexture) {
      this.canvasTexture.dispose()
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

  loadTextures = (design, product) =>
    new Promise((resolve, reject) => {
      try {
        const loadedTextures = {}
        const { brandingPng, colors } = design
        const { flatlock, bumpMap, zipper, binding, bibBrace } = product
        if (!!zipper) {
          const { white, black } = zipper
          this.zipper = {}
          this.zipper.white = this.textureLoader.load(white)
          this.zipper.black = this.textureLoader.load(black)
          this.zipper.white.minFilter = THREE.LinearFilter
          this.zipper.black.minFilter = THREE.LinearFilter
        }
        if (!!binding) {
          const { white, black } = binding
          this.binding = {}
          this.binding.white = this.textureLoader.load(white)
          this.binding.black = this.textureLoader.load(black)
          this.binding.white.minFilter = THREE.LinearFilter
          this.binding.black.minFilter = THREE.LinearFilter
        }
        if (!!bibBrace) {
          const { white, black } = bibBrace
          this.bibBrace = {}
          this.bibBrace.white = this.textureLoader.load(white)
          this.bibBrace.black = this.textureLoader.load(black)
          this.bibBrace.white.minFilter = THREE.LinearFilter
          this.bibBrace.black.minFilter = THREE.LinearFilter
        }
        if (!!flatlock) {
          loadedTextures.flatlock = this.textureLoader.load(flatlock)
        }
        if (!!brandingPng) {
          loadedTextures.branding = this.textureLoader.load(brandingPng)
          loadedTextures.branding.minFilter = THREE.LinearFilter
        }
        loadedTextures.bumpMap = this.textureLoader.load(bumpMap)
        const reversedAreas = reverse(colors)
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
        this.zipper.white.dispose()
        this.zipper.black.dispose()
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
    const { onLoadModel, currentStyle, design, product } = this.props
    onLoadModel(true)

    const loadedTextures = await this.loadTextures(currentStyle, product)
    // TODO: Get the OBJ and MTL from the design
    this.mtlLoader.load(product.mtl, materials => {
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        product.obj,
        object => {
          /* Object materials */
          const { children } = object
          const objectChildCount = children.length
          let scaleFactor = 1
          if (!!currentStyle.size) {
            scaleFactor = CANVAS_SIZE / currentStyle.size
          }
          this.setState({ scaleFactor, objectChildCount })

          const getMeshIndex = meshName => {
            const index = findIndex(children, mesh => mesh.name === meshName)
            return index < 0 ? 0 : index
          }

          const meshIndex = getMeshIndex(MESH)
          const labelIndex = getMeshIndex(RED_TAG)

          const { flatlock, areas, bumpMap, branding, colors } = loadedTextures
          /* Stitching */
          if (!!flatlock) {
            const flatlockIndex = getMeshIndex(FLATLOCK)
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              alphaMap: flatlock,
              color: '#FFFFFF'
            })
            flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
            flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
            flatlockMaterial.alphaTest = 0.5
            children[flatlockIndex].material = flatlockMaterial
            this.setState({ flatlockIndex })
          }

          /* Zipper */
          if (!!this.zipper) {
            const zipperIndex = getMeshIndex(ZIPPER)
            const zipperMaterial = new THREE.MeshPhongMaterial({
              map: this.zipper.white,
              transparent: true
            })
            children[zipperIndex].material = zipperMaterial
            this.setState({ zipperIndex })
          }
          /* Binding */
          if (!!this.binding) {
            const bindingIndex = getMeshIndex(BINDING)
            const bindingMaterial = new THREE.MeshPhongMaterial({
              map: this.binding.white,
              transparent: true
            })
            children[bindingIndex].material = bindingMaterial
            this.setState({ bindingIndex })
          }
          /* Bib Brace */
          if (!!this.bibBrace) {
            const bibBraceIndex = getMeshIndex(BIB_BRACE)
            const bibBraceMaterial = new THREE.MeshPhongMaterial({
              map: this.bibBrace.white
            })
            children[bibBraceIndex].material = bibBraceMaterial
            this.setState({ bibBraceIndex })
          }

          /* Back material */
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })

          // Setup the texture layers
          const areasLayers = areas.map(() => children[meshIndex].clone())
          object.add(...areasLayers)

          /* Jersey label */
          children[labelIndex].material.color.set('#ffffff')
          children[meshIndex].material = insideMaterial

          areas.forEach(
            (map, index) =>
              (children[
                objectChildCount + index
              ].material = new THREE.MeshPhongMaterial({
                map,
                side: THREE.FrontSide,
                color: colors[index],
                bumpMap,
                transparent: true
              }))
          )

          /* Canvas */
          const canvas = document.createElement('canvas')
          canvas.width = CANVAS_SIZE
          canvas.height = CANVAS_SIZE
          this.canvasTexture = new fabric.Canvas(canvas, {
            width: CANVAS_SIZE,
            height: CANVAS_SIZE
          })
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

          if (design && design.canvasJson) {
            this.canvasTexture.loadFromJSON(
              design.canvasJson,
              () => (canvasTexture.needsUpdate = true)
            )
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
      this.camera.position.set(x, y, z)
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
        '#f2f2f2'
      )
    } else {
      this.setupColors(colors)
    }
  }

  handleOnPressLeft = () => {
    const { currentView } = this.state
    const nextView = currentView === 0 ? 3 : currentView - 1
    const viewPosition = viewPositions[nextView]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: nextView })
  }

  handleOnPressRight = () => {
    const { currentView } = this.state
    const nextView = currentView === 3 ? 0 : currentView + 1
    const viewPosition = viewPositions[nextView]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: nextView })
  }

  handleOnChangeZoom = value => {
    if (this.camera) {
      const zoomValue = (value * 1.0) / 100
      this.camera.zoom = zoomValue * 2
      this.camera.updateProjectionMatrix()
    }
  }

  // TODO: WIP
  handleOnKeyDown = event => {
    let charCode = String.fromCharCode(event.which).toLowerCase()
    if (event.shiftKey && event.ctrlKey && charCode === 'z') {
      // TODO: Handle ctrl+shift+z
    } else if (event.ctrlKey && charCode === 'z') {
      // TODO: Handle ctrl+z
    }

    // For MAC we can use metaKey to detect cmd key
    if (event.shiftKey && event.metaKey && charCode === 'z') {
      // TODO: Handle cmd+shift+z
    } else if (event.metaKey && charCode === 'z') {
      // TODO: Handle cmd+z
    }
  }

  handleOnClickUndo = () => {
    const { onUndoAction, undoChanges } = this.props
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
      default:
        break
    }
    onUndoAction()
  }

  handleOnClickRedo = () => {
    const { onRedoAction, redoChanges } = this.props
    const changeToApply = redoChanges[0]
    const {
      type,
      state: { id }
    } = changeToApply
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
      default:
        break
    }
    onRedoAction()
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
    this.canvasTexture.clear()
    this.props.onResetAction()
  }

  handleOnClickClear = () => this.props.onClearAction()

  handleOnChange3DModel = () => {}

  takeDesignPicture = () => {
    if (this.renderer) {
      const { onOpenSaveDesign, currentStyle } = this.props
      this.canvasTexture.discardActiveObject()
      this.canvasTexture.renderAll()
      const viewPosition = viewPositions[2]
      this.handleOnChangeZoom(62)
      this.cameraUpdate(viewPosition)
      this.setState({ currentView: 2 }, () =>
        setTimeout(() => {
          const designBase64 = this.renderer.domElement.toDataURL(
            'image/webp',
            0.5
          )

          const canvasJson = JSON.stringify(this.canvasTexture)
          const saveDesign = {
            canvasJson,
            designBase64,
            canvasSvg: this.canvasTexture.toSVG(),
            styleId: currentStyle.id
          }
          onOpenSaveDesign(true, saveDesign)
        }, 200)
      )
    }
  }

  render() {
    const { showDragmessage, currentView, progress } = this.state
    const {
      onPressQuickView,
      undoEnabled,
      redoEnabled,
      loadingModel,
      formatMessage,
      productName,
      openResetDesignModal,
      designHasChanges,
      canvas,
      selectedElement
    } = this.props

    {
      /*
      // TODO: JV2 - Phase II
      const menu = (
      <Menu onClick={this.handleOnChange3DModel}>
        <Menu.Item key="1">
          <FormattedMessage {...messages.productOnly} />
        </Menu.Item>
        <Menu.Item key="2">
          <FormattedMessage {...messages.withAvatar} />
        </Menu.Item>
        <Menu.Item key="3">
          <FormattedMessage {...messages.onBike} />
        </Menu.Item>
      </Menu>
    )*/
    }

    let widthInCm = 0
    let heightInCm = 0
    const selectedImageElement = canvas.image[selectedElement]
    if (!!selectedImageElement && !!selectedImageElement.imageSize) {
      const { width, height } = this.getSizeInCentimeters(selectedImageElement)
      widthInCm = width
      heightInCm = height
    }

    return (
      <Container onKeyDown={this.handleOnKeyDown} tabIndex="0">
        <Row>
          <Model>{productName}</Model>
          <QuickView onClick={onPressQuickView} src={quickView} />
        </Row>
        {!!selectedImageElement && (
          <SizeBox>
            <SizeLabel>
              <FormattedMessage {...messages.sizeMessage} />
            </SizeLabel>
            <Size>{`${widthInCm} x ${heightInCm} cm`}</Size>
          </SizeBox>
        )}
        <Render
          id="render-3d"
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
        <ButtonWrapper>
          <Button type="primary" onClick={this.takeDesignPicture}>
            Save
          </Button>
        </ButtonWrapper>
        <OptionsController
          {...{ undoEnabled, redoEnabled, formatMessage }}
          resetEnabled={designHasChanges}
          onClickUndo={this.handleOnClickUndo}
          onClickRedo={this.handleOnClickRedo}
          onClickReset={this.handleOnOpenResetModal}
          onClickClear={this.handleOnClickClear}
        />
        <Slider onChangeZoom={this.handleOnChangeZoom} />
        <ViewControls>
          <ViewButton onClick={this.handleOnPressLeft} src={left} />
          <img src={cubeViews[currentView]} />
          <ViewButton onClick={this.handleOnPressRight} src={right} />
        </ViewControls>
        {/* Reset Modal */}
        <Modal
          visible={openResetDesignModal}
          title={<ModalTitle title={formatMessage(messages.modalResetTitle)} />}
          footer={
            <ModalFooter
              onOk={this.onReset}
              onCancel={this.onCloseResetModal}
              {...{ formatMessage }}
            />
          }
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(messages.modalResetMessage)}
          </ModalMessage>
        </Modal>
      </Container>
    )
  }

  applyCanvasEl = canvasEl => {
    if (this.canvasTexture) {
      const objects = this.canvasTexture.getObjects()
      if (!objects.length) {
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
      }
      document.getElementById('render-3d').style.cursor = 'crosshair'
      this.setState({ canvasEl })
    }
  }

  reAddCanvasElement = canvasEl => {
    const {
      state: { id, type, style, src, position }
    } = canvasEl
    switch (type) {
      case CanvasElements.Path:
        this.applyClipArt(src, style, position, id)
        break
      case CanvasElements.Text:
        this.applyText(src, style, position, id)
        break
      case CanvasElements.Image:
        this.applyImage(src, position, id)
        break
    }
  }

  applyImage = (file = {}, position = {}, idElement) => {
    const { onApplyCanvasEl } = this.props
    const { scaleFactor } = this.state
    const { fileUrl, size: imageSize } = file
    const id = idElement || shortid.generate()
    fabric.util.loadImage(
      fileUrl,
      img => {
        const imageEl = new fabric.Image(img, {
          id,
          hasRotatingPoint: false,
          ...position
        })
        let el = {
          id,
          imageSize
        }
        if (position.scaleX) {
          el.scaleX = position.scaleX
          el.scaleY = position.scaleY
        } else {
          imageEl.scale(scaleFactor)
          el.scaleX = scaleFactor
          el.scaleY = scaleFactor
        }
        this.canvasTexture.add(imageEl)
        if (!idElement) {
          onApplyCanvasEl(el, 'image', undefined, {
            src: file,
            style: undefined,
            position
          })
          this.canvasTexture.setActiveObject(imageEl)
        }
        this.canvasTexture.renderAll()
      },
      undefined,
      'Anonymous'
    )
  }

  applyText = (text, style, position = {}, idElement) => {
    if (!this.canvasTexture || !text) {
      return
    }

    const activeEl = this.canvasTexture.getActiveObject()
    const { onApplyCanvasEl } = this.props

    let txtEl = {}
    if (activeEl && activeEl.type === CanvasElements.Text && !idElement) {
      activeEl.set({ text, ...style })
      this.canvasTexture.renderAll()
    } else {
      const id = idElement || shortid.generate()
      txtEl = new fabric.Text(text, {
        id,
        hasRotatingPoint: false,
        fontSize: 80,
        snapAngle: 1,
        snapThreshold: 45,
        scaleX: 1.0,
        scaleY: 1.0,
        ...position,
        ...style
      })
      this.canvasTexture.add(txtEl)
      if (!idElement) {
        this.canvasTexture.setActiveObject(txtEl)
      }
      this.canvasTexture.renderAll()
    }

    const el = {
      id: activeEl ? activeEl.id : txtEl.id,
      text,
      textFormat: style
    }
    if (!idElement) {
      onApplyCanvasEl(el, CanvasElements.Text, !!activeEl, {
        src: text,
        style,
        position
      })
    }
  }

  applyClipArt = (url, style = {}, position = {}, idElement) => {
    const activeEl = this.canvasTexture.getActiveObject()
    if (activeEl && activeEl.type === CanvasElements.Path && !idElement) {
      activeEl.set({ ...style })
      this.canvasTexture.renderAll()
    } else {
      const { onApplyCanvasEl } = this.props
      fabric.loadSVGFromURL(url, (objects = [], options) => {
        const id = idElement || shortid.generate()
        const shape = fabric.util.groupSVGElements(objects, options)
        shape.set({
          id,
          hasRotatingPoint: false,
          ...position,
          ...style
        })
        const el = {
          id,
          fill: '#000000',
          stroke: '#000000',
          strokeWidth: 0,
          ...style
        }
        this.canvasTexture.add(shape)
        if (!idElement) {
          onApplyCanvasEl(el, CanvasElements.Path, false, {
            src: url,
            style,
            position
          })
          this.canvasTexture.setActiveObject(shape)
        }
        this.canvasTexture.renderAll()
      })
    }
  }

  deleteElement = el => {
    const { undoChanges } = this.props
    const type = el.get('type')
    const { id, left, top, scaleX, scaleY } = el
    const canvasObject = {
      position: { left, top, scaleX, scaleY }
    }
    switch (type) {
      case CanvasElements.Text:
        {
          const { text, fill, fontFamily, stroke, strokeWidth } = el
          canvasObject.src = text
          canvasObject.style = {
            fill,
            fontFamily,
            stroke,
            strokeWidth
          }
        }
        break
      case CanvasElements.Path:
        {
          const { fill = '#000000', stroke = '#000000', strokeWidth = 0 } = el
          const object = find(undoChanges, { type: Changes.Add, state: { id } })
          canvasObject.src = object.state.src
          canvasObject.style = {
            fill,
            stroke,
            strokeWidth
          }
        }
        break
      case CanvasElements.Image:
        {
          const object = find(undoChanges, { type: Changes.Add, state: { id } })
          canvasObject.src = object.state.src
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
    this.canvasTexture.remove(object)
  }

  duplicateElement = el => {
    const { onApplyCanvasEl, undoChanges } = this.props
    const boundingBox = el.getBoundingRect()

    const objectToClone = find(undoChanges, {
      type: Changes.Add,
      state: { id: el.id }
    })

    const elementType = el.get('type')
    const id = shortid.generate()
    let canvasEl = {}
    switch (elementType) {
      case CanvasElements.Text:
        {
          const text = el.get('text')
          const textFormat = {
            fontFamily: el.fontFamily,
            stroke: el.stroke,
            fill: el.fill,
            strokeWidth: el.strokeWidth
          }
          canvasEl = { id, text, textFormat }
        }
        break
      case CanvasElements.Image: {
        canvasEl = {
          id,
          imageSize: { width: el.width, height: el.height },
          scaleX: el.scaleX,
          scaleY: el.scaleY
        }
        break
      }
      case CanvasElements.Path: {
        canvasEl = {
          id,
          fill: el.fill,
          stroke: el.stroke,
          strokeWidth: el.strokeWidth
        }
      }
      default:
        break
    }

    el.clone(clone => {
      clone.set({
        id,
        hasRotatingPoint: false,
        left: boundingBox.left + EXTRA_POSITION,
        top: boundingBox.top + EXTRA_POSITION,
        stroke: el.stroke
      })
      this.canvasTexture.add(clone)
    })
    const {
      state: {
        src,
        style,
        position: { left, top }
      }
    } = objectToClone
    onApplyCanvasEl(canvasEl, elementType, false, {
      src,
      style,
      position: {
        left: left + EXTRA_POSITION,
        top: top + EXTRA_POSITION,
        scaleX: el.scaleX,
        scaleY: el.scaleY
      }
    })
  }

  setLayerElement = el => {
    this.canvasTexture.bringToFront(el)
  }

  onMouseUp = evt => {
    evt.preventDefault()

    const action = this.dragComponent && this.dragComponent.action

    if (CHANGE_ACTIONS.includes(action)) {
      const activeEl = this.canvasTexture.getActiveObject()
      const { id } = activeEl
      switch (action) {
        case SCALE_ACTION:
          const { scaleX, scaleY, type } = activeEl
          const {
            oldScale: { oldScaleX = 1, oldScaleY = 1 }
          } = this.state
          if (scaleX !== oldScaleX || scaleY !== oldScaleY) {
            const { onCanvasElementResized } = this.props
            onCanvasElementResized({
              id,
              elementType: type,
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

    const array = this.getMousePosition(
      this.container,
      evt.clientX,
      evt.clientY
    )
    this.onClickPosition.fromArray(array)

    const intersects = this.getIntersects(
      this.onClickPosition,
      this.scene.children
    )

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
        this.setState({ canvasEl: null }, () => {
          document.getElementById('render-3d').style.cursor = 'default'
          const left = uv.x * CANVAS_SIZE
          const top = (1 - uv.y) * CANVAS_SIZE
          switch (el.type) {
            case CanvasElements.Text:
              this.applyText(el.text, el.style, { left, top })
              break
            case CanvasElements.Image:
              this.applyImage(el.file, { left, top })
              break
            case CanvasElements.Path:
              this.applyClipArt(el.url, el.style, { left, top })
              break
            default:
              break
          }
        })
      } else {
        const activeEl = this.canvasTexture.getActiveObject()
        if (activeEl && !this.dragComponent) {
          const boundingBox = activeEl.getBoundingRect()
          const action = clickOnCorner(boundingBox, activeEl.oCoords, uv)
          if (action) {
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
                this.setState({
                  oldScale: { oldScaleX, oldScaleY }
                })
                this.controls.enabled = false
                this.dragComponent = {
                  action: SCALE_ACTION,
                  alreadyNotified: false,
                  isImage: activeEl.get('type') === CanvasElements.Image
                }
                break
              }
              case ROTATE_ACTION: {
                const sX = uv.x * CANVAS_SIZE
                const sY = (1 - uv.y) * CANVAS_SIZE
                const startPoint = { x: sX, y: sY }
                const oX = activeEl.left + activeEl.width / 2
                const oY = activeEl.top + activeEl.height / 2
                const originPoint = { x: oX, y: oY }
                this.controls.enabled = false
                this.dragComponent = {
                  el: activeEl,
                  action: ROTATE_ACTION,
                  startPoint,
                  originPoint
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
        const { onSelectEl } = this.props
        this.canvasTexture.forEachObject(el => {
          const boundingBox = el.getBoundingRect()
          const isInside = isMouseOver(boundingBox, uv)
          if (isInside) {
            allDeactive = false
            onSelectEl(el.id, el.get('type'))
            const left = uv.x * CANVAS_SIZE
            const top = (1 - uv.y) * CANVAS_SIZE
            const differenceX = left - boundingBox.left
            const differenceY = top - boundingBox.top
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
    } else if (this.state.canvasEl) {
      this.setState({ canvasEl: null })
      document.getElementById('render-3d').style.cursor = 'default'
    }
  }

  onMouseMove = evt => {
    evt.preventDefault()

    const array = this.getMousePosition(
      this.container,
      evt.clientX,
      evt.clientY
    )
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
        const { differenceX, differenceY, action } = this.dragComponent
        const uv = intersects[0].uv
        switch (action) {
          case DRAG_ACTION: {
            const left = uv.x * CANVAS_SIZE - differenceX
            const top = (1 - uv.y) * CANVAS_SIZE - differenceY
            activeEl.set({ left, top }).setCoords()
            this.canvasTexture.renderAll()
            break
          }
          case SCALE_ACTION: {
            const { scaleFactor } = this.state
            const cursorLeft = uv.x * CANVAS_SIZE
            const cursorTop = (1 - uv.y) * CANVAS_SIZE
            const width = cursorLeft - activeEl.left
            const height = cursorTop - activeEl.top
            const scaleX = width / activeEl.width
            const scaleY = height / activeEl.height
            activeEl
              .set({
                scaleX: Math.max(0, scaleX),
                scaleY: Math.max(0, scaleY)
              })
              .setCoords()
            this.canvasTexture.renderAll()
            // TODO: Change to DPI warning not to scale.
            // const scaleXTemp = scaleX.toFixed(NUMBER_OF_DECIMALS)
            // const scaleYTemp = scaleY.toFixed(NUMBER_OF_DECIMALS)
            // const scaleFactorTemp =
            //   scaleFactor.toFixed(NUMBER_OF_DECIMALS) + WARNING_FACTOR
            // if (
            //   (scaleXTemp > scaleFactorTemp || scaleYTemp > scaleFactorTemp) &&
            //   !this.dragComponent.alreadyNotified &&
            //   this.dragComponent.isImage
            // ) {
            //   this.showResolutionWarningModal()
            // } else if (
            //   scaleXTemp <= scaleFactorTemp &&
            //   scaleYTemp <= scaleFactorTemp &&
            //   this.dragComponent.alreadyNotified
            // ) {
            //   this.dragComponent.alreadyNotified = false
            // }
            break
          }
          case ROTATE_ACTION: {
            const { startPoint, originPoint } = this.dragComponent
            const cX = uv.x * CANVAS_SIZE
            const cY = (1 - uv.y) * CANVAS_SIZE

            if (!activeEl.oldAngle) {
              activeEl.oldAngle = fabric.util.degreesToRadians(90)
            }
            let radians = Math.atan2(cY - originPoint.y, cX - originPoint.x)
            radians -= Math.atan2(
              startPoint.y - originPoint.y,
              startPoint.x - originPoint.x
            )
            radians += activeEl.oldAngle
            this.dragComponent.oldAngle = radians

            this.rotateObject(
              activeEl,
              radians - 1.5708,
              activeEl.width / 2,
              activeEl.height / 2
            )
            this.canvasTexture.renderAll()
          }
          default:
            break
        }
      }
    }
  }

  rotateObject = (fabObj, angleRadian, pivotX, pivotY) => {
    const ty = pivotY - fabObj.height / 2.0
    const tx = pivotX - fabObj.width / 2.0
    if (angleRadian >= Math.PI * 2) {
      angleRadian -= Math.PI * 2
    }
    const angle2 = Math.atan2(ty, tx)
    const angle3 = (2 * angle2 + angleRadian - Math.PI) / 2.0
    const pdist_sq = tx * tx + ty * ty
    const disp = Math.sqrt(2 * pdist_sq * (1 - Math.cos(angleRadian)))
    fabObj
      .set({
        transformMatrix: [
          Math.cos(angleRadian),
          Math.sin(angleRadian),
          -Math.sin(angleRadian),
          Math.cos(angleRadian),
          disp * Math.cos(angle3),
          disp * Math.sin(angle3)
        ]
      })
      .setCoords()
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
    const { scaleFactor } = this.state
    const size = {}
    const { width, height } = imageSize
    const scaleXTemp = scaleX / scaleFactor
    const scaleYTemp = scaleY / scaleFactor
    const scaledWidth = width * scaleXTemp
    const scaledHeight = height * scaleYTemp
    size.width = Math.round((scaledWidth * CM_PER_INCH) / DPI)
    size.height = Math.round((scaledHeight * CM_PER_INCH) / DPI)
    return size
  }
}

export default Render3D
