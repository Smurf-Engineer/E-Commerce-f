import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
// TODO: JV2 - Phase II
// import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import findIndex from 'lodash/findIndex'
import shortid from 'shortid'
import Modal from 'antd/lib/modal'
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
  ModalMessage
} from './styledComponents'
import {
  viewPositions,
  DELETE_ACTION,
  DUPLICATE_ACTION,
  BRING_TO_FRONT_ACTION,
  ROTATE_ACTION,
  SCALE_ACTION,
  DRAG_ACTION
} from './config'
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

const CANVAS_SIZE = 2048

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentView: 2,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    objectChilds: 0,
    canvasEl: null
  }

  dragComponent = null

  componentWillReceiveProps(nextProps) {
    const { colors, colorBlockHovered: oldColorBlockHovered } = this.props
    const { colors: nextColors, styleColors, colorBlockHovered } = nextProps

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
    fabric.Object.prototype.customiseCornerIcons({
      settings: {
        borderColor: 'black',
        cornerSize: 60,
        cornerPadding: 10
      },
      tl: {
        icon: 'delete.svg'
      },
      tr: {
        icon: 'duplicate.svg'
      },
      bl: {
        icon: 'rotate.svg'
      },
      br: {
        icon: 'expand.svg'
      },
      mb: {
        icon: 'layer.svg'
      }
    })

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

  loadTextures = modelTextures =>
    new Promise((resolve, reject) => {
      try {
        // TODO: Get flatlock, bumpmap and branding from the design.
        const loadedTextures = {}
        loadedTextures.flatlock = this.textureLoader.load(
          './models/images/flatlock.png'
        )
        loadedTextures.bumpMap = this.textureLoader.load(
          'https://storage.googleapis.com/jakroo-storage/models/Tour2/TOUR_Jv2-BumpMap.jpg'
        )
        loadedTextures.branding = this.textureLoader.load(
          'https://storage.googleapis.com/jakroo-storage/models/Tour2/D1/branding.png'
        )
        loadedTextures.branding.minFilter = THREE.LinearFilter
        const { colors } = modelTextures
        const areas = colors.length ? [...colors] : []
        const reverseOrderAreas = areas.reverse()
        const loadedAreas = reverseOrderAreas.map(({ image }) => {
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

  render3DModel = async () => {
    /* Object and MTL load */
    const { onLoadModel, currentStyle, design, colors } = this.props
    onLoadModel(true)

    const loadedTextures = await this.loadTextures(currentStyle)
    // TODO: Get the OBJ and MTL from the design
    this.mtlLoader.load(
      'https://storage.googleapis.com/jakroo-storage/models/Tour2/TOUR_Jv2.mtl',
      materials => {
        materials.preload()
        this.objLoader.setMaterials(materials)
        this.objLoader.load(
          'https://storage.googleapis.com/jakroo-storage/models/Tour2/TOUR_Jv2.obj',
          object => {
            const objectChilds = object.children.length
            this.setState({ objectChilds })

            /* Object materials */

            const { flatlock, areas, bumpMap, branding } = loadedTextures
            // Stitching
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              alphaMap: flatlock,
              color: '#FFFFFF'
            })
            flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
            flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
            flatlockMaterial.alphaTest = 0.5

            // Back material
            const insideMaterial = new THREE.MeshPhongMaterial({
              side: THREE.BackSide,
              color: '#000000'
            })

            const { children } = object

            const getMeshIndex = meshName => {
              const index = findIndex(children, mesh => mesh.name === meshName)
              return index < 0 ? 0 : index
            }

            const meshIndex = getMeshIndex('FINAL JV2_Design_Mesh')
            const labelIndex = getMeshIndex('Red_Tag FINAL')
            const flatlockIndex = getMeshIndex('FINAL JV2_Flatlock')

            // Setup the texture layers
            const areasLayers = areas.map(() => children[meshIndex].clone())
            object.add(...areasLayers)

            /* Jersey label */
            object.children[labelIndex].material.color.set('#ffffff')
            object.children[flatlockIndex].material = flatlockMaterial
            object.children[meshIndex].material = insideMaterial

            /* Canvas */
            const canvasObj = object.children[meshIndex].clone()
            const brandingObj = object.children[meshIndex].clone()
            object.add(canvasObj, brandingObj)
            const canvas = document.createElement('canvas')
            canvas.width = CANVAS_SIZE
            canvas.height = CANVAS_SIZE
            const canvasTexture = new THREE.CanvasTexture(canvas)
            canvasTexture.minFilter = THREE.LinearFilter

            /* TODO: Dynamic size? */
            this.canvasTexture = new fabric.Canvas(canvas, {
              width: CANVAS_SIZE,
              height: CANVAS_SIZE
            })

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

            const brandingMaterial = new THREE.MeshPhongMaterial({
              map: branding,
              side: THREE.FrontSide,
              bumpMap,
              transparent: true
            })

            areas.forEach(
              (map, index) =>
                (object.children[
                  objectChilds + index
                ].material = new THREE.MeshPhongMaterial({
                  map,
                  side: THREE.FrontSide,
                  color: colors[index],
                  bumpMap,
                  transparent: true
                }))
            )

            const childrenLength = children.length
            const canvasIndex = childrenLength - 2
            const brandingIndex = childrenLength - 1
            object.children[canvasIndex].material = canvasMaterial
            object.children[brandingIndex].material = brandingMaterial
            object.children[canvasIndex].name = 'Canvas_Mesh'
            object.children[brandingIndex].name = 'Branding_Mesh'

            const largeHeight = window.matchMedia(
              'only screen and (min-height: 800px)'
            ).matches

            /* Object Config */
            object.position.y = largeHeight ? -50 : -30
            object.name = 'jersey'
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
      }
    )
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

  setupColors = colors => {
    if (!this.scene) {
      return
    }
    const { objectChilds } = this.state
    const object = this.scene.getObjectByName('jersey')
    if (object) {
      colors.forEach((color, index) => {
        if (object.children[objectChilds + index]) {
          object.children[objectChilds + index].material.color.set(color)
        }
      })
    }
  }

  setupHoverColor = colorBlockHovered => {
    if (!this.scene) {
      return
    }
    const object = this.scene.getObjectByName('jersey')
    const { objectChilds } = this.state
    const { colors } = this.props
    if (object && colorBlockHovered >= 0) {
      object.children[objectChilds + colorBlockHovered].material.color.set(
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

  handleOnClickUndo = () => this.props.onUndoAction()

  handleOnClickRedo = () => this.props.onRedoAction()

  handleOnOpenResetModal = () => {
    const { openResetDesignModalAction } = this.props
    openResetDesignModalAction(true)
  }

  onCloseResetModal = () => {
    const { openResetDesignModalAction } = this.props
    openResetDesignModalAction(false)
  }

  onReset = () => this.props.onResetAction()

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
      openResetDesignModal
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

    return (
      <Container onKeyDown={this.handleOnKeyDown} tabIndex="0">
        <Row>
          <Model>{productName}</Model>
          <QuickView onClick={onPressQuickView} src={quickView} />
        </Row>
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
        if (canvasEl.type === 'path') {
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

  applyImage = (base64, position = {}) => {
    const { onApplyCanvasEl } = this.props
    const id = shortid.generate()
    fabric.Image.fromURL(base64, oImg => {
      const imageEl = oImg.scale(1).set({
        id,
        hasRotatingPoint: false,
        ...position
      })
      this.canvasTexture.add(imageEl)

      const el = { id }
      onApplyCanvasEl(el, 'image')
      this.canvasTexture.setActiveObject(imageEl)
      this.canvasTexture.renderAll()
    })
  }

  applyText = (text, style, position = {}) => {
    if (!this.canvasTexture || !text) {
      return
    }

    const activeEl = this.canvasTexture.getActiveObject()
    const { onApplyCanvasEl } = this.props

    let txtEl = {}
    if (activeEl && activeEl.type === 'text') {
      activeEl.set({ text, ...style })
      this.canvasTexture.renderAll()
    } else {
      txtEl = new fabric.Text(text, {
        id: shortid.generate(),
        hasRotatingPoint: false,
        fontSize: 80,
        snapAngle: 1,
        snapThreshold: 45,
        ...position,
        ...style
      })
      this.canvasTexture.add(txtEl)
      this.canvasTexture.setActiveObject(txtEl)
      this.canvasTexture.renderAll()
    }

    const el = {
      id: activeEl ? activeEl.id : txtEl.id,
      text,
      textFormat: style
    }
    onApplyCanvasEl(el, 'text', !!activeEl)
  }

  applyClipArt = (url, style, position = {}) => {
    const activeEl = this.canvasTexture.getActiveObject()
    if (activeEl && activeEl.type === 'path') {
      activeEl.set({ ...style })
      this.canvasTexture.renderAll()
    } else {
      const { onApplyCanvasEl } = this.props
      fabric.loadSVGFromURL(url, (objects = [], options) => {
        const id = shortid.generate()
        const shape = fabric.util.groupSVGElements(objects, options)
        shape.set({
          id,
          hasRotatingPoint: false,
          ...position
        })
        const el = {
          id,
          fill: '#000000',
          stroke: '#000000',
          strokeWidth: 0
        }
        onApplyCanvasEl(el, 'path')
        this.canvasTexture.add(shape)
        this.canvasTexture.setActiveObject(shape)
        this.canvasTexture.renderAll()
      })
    }
  }

  deleteElement = el => {
    const { onRemoveEl } = this.props
    onRemoveEl(el.id, el.get('type'))
    this.canvasTexture.remove(el)
  }

  duplicateElement = el => {
    const { onApplyCanvasEl } = this.props
    const boundingBox = el.getBoundingRect()

    const elementType = el.get('type')
    const id = shortid.generate()
    let canvasEl = {}
    switch (elementType) {
      case 'text':
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
      case 'image': {
        canvasEl = { id }
        break
      }
      case 'path': {
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
        left: boundingBox.left + 30,
        top: boundingBox.top + 30,
        stroke: el.stroke
      })
      this.canvasTexture.add(clone)
    })
    onApplyCanvasEl(canvasEl, elementType)
  }

  setLayerElement = el => {
    this.canvasTexture.bringToFront(el)
  }

  onMouseUp = evt => {
    evt.preventDefault()

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
        meshName === 'FINAL JV2_Design_Mesh' ||
        meshName === 'Canvas_Mesh' ||
        meshName === 'Branding_Mesh'
      if (!!canvasEl && validMesh) {
        const el = Object.assign({}, canvasEl)
        this.setState({ canvasEl: null }, () => {
          document.getElementById('render-3d').style.cursor = 'default'
          const left = uv.x * CANVAS_SIZE
          const top = (1 - uv.y) * CANVAS_SIZE

          switch (el.type) {
            case 'text':
              this.applyText(el.text, el.style, { left, top })
              break
            case 'image':
              this.applyImage(el.base64, { left, top })
              break
            case 'path':
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
                this.controls.enabled = false
                this.dragComponent = { action: SCALE_ACTION }
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
      if (
        meshName === 'FINAL JV2_Design_Mesh' ||
        meshName === 'Canvas_Mesh' ||
        meshName === 'Branding_Mesh'
      ) {
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
            const cursorLeft = uv.x * CANVAS_SIZE
            const cursorTop = (1 - uv.y) * CANVAS_SIZE
            const width = cursorLeft - activeEl.left
            const height = cursorTop - activeEl.top
            const scaleX = width / activeEl.width
            const scaleY = height / activeEl.height
            activeEl
              .set({
                scaleX: scaleX > 0 ? scaleX : 0,
                scaleY: scaleY > 0 ? scaleY : 0
              })
              .setCoords()
            this.canvasTexture.renderAll()
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
    Modal.warning({
      title: formatMessage(messages.modalWarningTitle),
      content: formatMessage(messages.modalResolutionMessage),
      okText: formatMessage(messages.modalWarningButtonText),
      maskClosable: true
    })
  }
}

export default Render3D
