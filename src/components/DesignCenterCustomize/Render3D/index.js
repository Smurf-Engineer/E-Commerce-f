import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
// TODO: JV2 - Phase II
// import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import findIndex from 'lodash/findIndex'
import {
  Container,
  Render,
  Progress,
  Model,
  Row,
  QuickView,
  Button,
  DragText,
  ModelType,
  ModelText,
  ViewControls,
  ViewButton,
  LoadingContainer,
  ButtonWrapper,
  CanvasContainer
} from './styledComponents'
import { viewPositions } from './config'
import Slider from '../../ZoomSlider'
import OptionsController from '../OptionsController'
import messages from './messages'
import { isMouseOver } from './utils'
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
// TODO: Test data
import dummieData from './dummieData'

const cubeViews = [backIcon, rightIcon, frontIcon, leftIcon]
const { Item } = Menu

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentView: 2,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    objectChilds: 0
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

    // fabric.Canvas.prototype.customiseControls({
    //   tl: {
    //     action: 'remove',
    //     icon: 'delete.svg',
    //     cursor: 'pointer'
    //   },
    //   tr: {
    //     action: () => {
    //       console.log('------------------------------------')
    //       console.log('COPY')
    //       console.log('------------------------------------')
    //     },
    //     icon: 'duplicate.svg',
    //     cursor: 'pointer'
    //   },
    //   bl: {
    //     action: 'rotate',
    //     icon: 'rotate.svg',
    //     cursor: 'pointer'
    //   },
    //   br: {
    //     action: 'scale',
    //     icon: 'expand.svg',
    //     cursor: 'pointer'
    //   },
    //   mb: {
    //     action: 'moveUp',
    //     icon: 'layer.svg',
    //     cursor: 'pointer'
    //   }
    // })

    fabric.Object.prototype.customiseCornerIcons({
      settings: {
        borderColor: 'black',
        borderWidth: 20,
        cornerSize: 70,
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

    renderer.setPixelRatio(window.devicePixelRatio)
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
  }

  componentWillUnmount() {
    if (this.renderer) {
      this.stop()
      this.container.removeChild(this.renderer.domElement)
    }
  }

  onMouseUp = evt => {
    evt.preventDefault()

    this.controls.enabled = true
    this.dragComponent = null
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

    if (intersects.length > 0 && intersects[0].uv) {
      const uv = intersects[0].uv
      let allDeactive = true
      this.canvasTexture.forEachObject(el => {
        const boundingBox = el.getBoundingRect()
        const isInside = isMouseOver(boundingBox, uv)
        if (isInside) {
          allDeactive = false
          const left = uv.x * 2048
          const top = (1 - uv.y) * 2048
          const differenceX = left - boundingBox.left
          const differenceY = top - boundingBox.top
          const dragComponent = { element: el, differenceX, differenceY }
          this.controls.enabled = false
          this.dragComponent = dragComponent
          this.canvasTexture.setActiveObject(el)
        } else {
          el.set('active', false)
        }
      })
      if (allDeactive) {
        this.canvasTexture.discardActiveObject()
      }
      this.canvasTexture.renderAll()
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

    if (intersects.length > 0 && intersects[0].uv && !!this.dragComponent) {
      const meshName = get(intersects[0], 'object.name', '')
      if (meshName === 'FINAL JV2_Design_Mesh' || meshName === 'Canvas_Mesh') {
        const { element, differenceX, differenceY } = this.dragComponent
        const uv = intersects[0].uv
        const left = uv.x * 2048 - differenceX
        const top = (1 - uv.y) * 2048 - differenceY
        this.canvasTexture
          .item(element.id)
          .set({ left, top })
          .setCoords()
        this.canvasTexture.renderAll()
      }
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
        const loadedTextures = {}
        loadedTextures.flatlock = this.textureLoader.load(
          './models/images/flatlock.png'
        )
        loadedTextures.bumpMap = this.textureLoader.load(modelTextures.bumpMap)

        const loadedAreas = modelTextures.areas.map(areaUri => {
          const areaTexture = this.textureLoader.load(areaUri)
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
    const { onLoadModel, currentStyle } = this.props
    onLoadModel(true)

    /* Texture configuration */
    const modelTextures = dummieData[currentStyle]
    const loadedTextures = await this.loadTextures(modelTextures)

    this.mtlLoader.load(modelTextures.mtl, materials => {
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        modelTextures.obj,
        object => {
          const objectChilds = object.children.length
          this.setState({ objectChilds })

          console.log('------------------------------------')
          console.log(object)
          console.log('------------------------------------')

          /* Object materials */

          // Stitching
          const flatlockMaterial = new THREE.MeshPhongMaterial({
            map: loadedTextures.flatlock,
            blending: THREE.AdditiveBlending,
            specular: new THREE.Color('rgb(255,255,255)'),
            depthTest: 0,
            blending: 1
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

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
          const areasLayers = loadedTextures.areas.map(() =>
            object.children[meshIndex].clone()
          )
          object.add(...areasLayers)

          /* Jersey label */
          object.children[labelIndex].material.color.set('#ffffff')
          object.children[flatlockIndex].material = flatlockMaterial
          object.children[meshIndex].material = insideMaterial

          // TODO: WIP Text canvas

          const canvasObj = object.children[meshIndex].clone()
          object.add(canvasObj)

          /*
          /* TODO: FrabircJS Test */
          const canvas = document.createElement('canvas')
          canvas.width = 2048
          canvas.height = 2048
          const canvasTexture = new THREE.CanvasTexture(canvas)
          canvasTexture.minFilter = THREE.LinearFilter

          /* TODO: Dynamic size? */
          this.canvasTexture = new fabric.Canvas(canvas, {
            width: 2048,
            height: 2048
          })

          const ctx = this.canvasTexture.getContext('2d')
          fabric.loadSVGFromURL(
            'https://storage.googleapis.com/jakroo-storage/models/Tour/C02-D01/colorblock_1.png',
            (objects, options) => {
              console.log('------------------------------------')
              console.log(objects)
              console.log('------------------------------------')
              // const shape = fabric.util.groupSVGElements(objects, options)
              // console.log('------------------------------------')
              // console.log(shape)
              // console.log('------------------------------------')
              // canvas.clipTo = ctx => {
              //   shape.render(ctx)
              // }
              // canvas.renderAll()
            }
          )

          this.canvasTexture.on(
            'after:render',
            () => (canvasTexture.needsUpdate = true)
          )

          const canvasMaterial = new THREE.MeshPhongMaterial({
            map: canvasTexture,
            side: THREE.FrontSide,
            bumpMap: loadedTextures.bumpMap,
            transparent: true
          })

          loadedTextures.areas.forEach(
            (materialTexture, index) =>
              (object.children[
                objectChilds + index
              ].material = new THREE.MeshPhongMaterial({
                map: loadedTextures.areas[index],
                side: THREE.FrontSide,
                bumpMap: loadedTextures.bumpMap,
                color: modelTextures.colors[index],
                transparent: true
              }))
          )

          // TODO: Normalized texture image
          // const planeCoordsTexture = this.textureLoader.load(
          //   './eliminar/colorblock_2_coords.png'
          // )

          // object.children[objectChilds].material = new THREE.MeshPhongMaterial({
          //   map: planeCoordsTexture,
          //   side: THREE.FrontSide,
          //   transparent: true
          // })

          object.children[20].material = canvasMaterial
          object.children[20].name = 'Canvas_Mesh'

          /* Object Config */
          object.position.y = -30
          object.name = 'jersey'
          this.scene.add(object)

          // if (!window.scene) {
          //   window.scene = this.scene
          // }

          onLoadModel(false)
        },
        this.onProgress,
        this.onError
      )
    })
  }

  renderControls = ({ x, y, z }) => {
    const spriteGroup = new THREE.Object3D()

    const mapDelete = this.textureLoader.load('controls/delete.png')
    const materialDelete = new THREE.SpriteMaterial({ map: mapDelete })
    const spriteDelete = new THREE.Sprite(materialDelete)

    const mapDuplicate = this.textureLoader.load('dupcontrols/duplicate.png')
    const materialDuplicate = new THREE.SpriteMaterial({ map: mapDuplicate })
    const spriteDuplicate = new THREE.Sprite(materialDuplicate)

    const mapRotate = this.textureLoader.load('controls/rotate.png')
    const materialRotate = new THREE.SpriteMaterial({ map: mapRotate })
    const spriteRotate = new THREE.Sprite(materialRotate)

    const mapLayer = this.textureLoader.load('controls/layer.png')
    const materialLayer = new THREE.SpriteMaterial({ map: mapLayer })
    const spriteLayer = new THREE.Sprite(materialLayer)

    const mapScale = this.textureLoader.load('controls/expand.png')
    const materialScale = new THREE.SpriteMaterial({ map: mapScale })
    const spriteScale = new THREE.Sprite(materialScale)

    spriteDelete.position.set(x, y, z)
    spriteDuplicate.position.set(x + 20, y, z)
    spriteRotate.position.set(x, -y, z)
    spriteLayer.position.set(x + 10, -y, z)
    spriteScale.position.set(x + 20, -y, z)

    spriteGroup.add(spriteDelete)
    spriteGroup.add(spriteDuplicate)
    spriteGroup.add(spriteRotate)
    spriteGroup.add(spriteLayer)
    spriteGroup.add(spriteScale)

    this.scene.add(spriteGroup)
  }

  onProgress = xhr => {
    if (xhr.lengthComputable) {
      const progress = Math.round(xhr.loaded / xhr.total * 100)
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
      const zoomValue = value * 1.0 / 100
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

  handleOnClickReset = () => this.props.onResetAction()

  handleOnClickClear = () => this.props.onClearAction()

  handleOnChange3DModel = () => {}

  saveDesign = previewImage => {
    const { onOpenSaveDesign } = this.props
    onOpenSaveDesign(true, previewImage)
  }

  takeDesignPicture = () => {
    const viewPosition = viewPositions[2]
    this.handleOnChangeZoom(62)
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: 2 }, () =>
      setTimeout(() => {
        const dataUrl = this.renderer.domElement.toDataURL('image/webp', 0.5)
        this.saveDesign(dataUrl)
      }, 200)
    )
  }

  render() {
    const { showDragmessage, currentView, zoomValue, progress } = this.state
    const {
      onPressQuickView,
      undoEnabled,
      redoEnabled,
      loadingModel,
      formatMessage,
      productName,
      text
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
        <Render innerRef={container => (this.container = container)}>
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
          onClickReset={this.handleOnClickReset}
          onClickClear={this.handleOnClickClear}
        />
        <Slider onChangeZoom={this.handleOnChangeZoom} />
        <ViewControls>
          <ViewButton onClick={this.handleOnPressLeft} src={left} />
          <img src={cubeViews[currentView]} />
          <ViewButton onClick={this.handleOnPressRight} src={right} />
        </ViewControls>
      </Container>
    )
  }

  applyImage = base64 => {
    fabric.Image.fromURL(base64, oImg => {
      this.canvasTexture.add(
        oImg.scale(0.1).set({
          id: this.canvasTexture.getObjects().length,
          hasRotatingPoint: false,
          hasControls: false,
          left: 409.6,
          top: 409.6
        })
      )
    })
  }

  applyText = (text, style) => {
    if (!this.canvasTexture || !text) {
      return
    }

    const txt = new fabric.Text(text, {
      id: this.canvasTexture.getObjects().length,
      hasRotatingPoint: false,
      // hasControls: false,
      left: 1433.6,
      top: 409.6,
      fontSize: 75,
      ...style
    })

    this.canvasTexture.add(txt)
  }
}

export default Render3D
