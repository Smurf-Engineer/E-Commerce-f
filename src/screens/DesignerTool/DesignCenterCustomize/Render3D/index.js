import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
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
  ButtonWrapper
} from './styledComponents'
import { jerseyTextures, viewPositions } from './config'
import messages from './messages'

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

  // TODO:  Refactor this code
  componentDidMount() {
    /* Renderer config */
    const { onLoadModel, styleColors } = this.props
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)

    /* Textures */
    const loader = new THREE.TextureLoader()

    const { areas, textures } = jerseyTextures() || {}

    const loadedTextures = {}

    for (const key in textures) {
      loadedTextures[key] = loader.load(textures[key])
      if (key !== 'flatlock') {
        loadedTextures[key].minFilter = THREE.LinearFilter
      }
    }

    const loadedAreas = areas.map(areaUri => {
      const areaTexture = loader.load(areaUri)
      areaTexture.minFilter = THREE.LinearFilter
      return areaTexture
    })

    /* Camera */
    const camera = new THREE.PerspectiveCamera(
      25,
      clientWidth / clientHeight,
      0.1,
      1000
    )
    camera.position.z = 250
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', this.lightUpdate)

    controls.enableKeys = false
    controls.minDistance = 150
    controls.maxDistance = 350

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.65)
    directionalLight.position.copy(camera.position)

    const mtlLoader = new THREE.MTLLoader()

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    /* Object and MTL load */

    mtlLoader.setPath('./models/')
    mtlLoader.load('Tour.mtl', materials => {
      onLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.setPath('./models/')
      objLoader.load(
        'Tour.obj',
        object => {
          onLoadModel(false)
          const objectChilds = object.children.length
          this.setState({ objectChilds })
          // Materials
          /* Object material */
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            map: loadedTextures.flatlock
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          // Inside material
          const insideMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.BackSide
          })

          /* Assign materials */

          /* jersey */
          object.children[0].material = insideMaterial

          // Setup the texture layers
          const areasLayers = loadedAreas.map((area, index) =>
            object.children[0].clone()
          )
          areasLayers.forEach(layer => object.add(layer))

          // TODO: Refactor into a loop
          const texture1 = new THREE.MeshPhongMaterial({
            map: loadedAreas[0],
            side: THREE.FrontSide,
            bumpMap: loadedTextures.bumpMap,
            color: styleColors[0]
          })

          const texture2 = new THREE.MeshPhongMaterial({
            map: loadedAreas[1],
            side: THREE.FrontSide,
            bumpMap: loadedTextures.bumpMap,
            color: styleColors[1],
            transparent: true
          })

          const texture3 = new THREE.MeshPhongMaterial({
            map: loadedAreas[2],
            side: THREE.FrontSide,
            bumpMap: loadedTextures.bumpMap,
            color: styleColors[2],
            transparent: true
          })

          const texture4 = new THREE.MeshPhongMaterial({
            map: loadedAreas[3],
            side: THREE.FrontSide,
            bumpMap: loadedTextures.bumpMap,
            color: styleColors[3],
            transparent: true
          })

          const texture5 = new THREE.MeshPhongMaterial({
            map: loadedAreas[4],
            side: THREE.FrontSide,
            bumpMap: loadedTextures.bumpMap,
            color: styleColors[4],
            transparent: true
          })

          object.children[24].material = texture1
          object.children[25].material = texture2
          object.children[26].material = texture3
          object.children[27].material = texture4
          object.children[28].material = texture5

          /* Texture materials */
          const labelMaterial = new THREE.MeshPhongMaterial({
            map: loadedTextures.label
          })

          const backPocketMaterial = new THREE.MeshPhongMaterial({
            map: loadedTextures.backPocket
          })

          /* flatlock */
          for (let index = 1; index <= 10; index++) {
            object.children[index].material = flatlockMaterial
          }
          /* Jersey label */
          object.children[17].material = labelMaterial
          /* back pocket */
          object.children[22].material = backPocketMaterial
          /* Object Conig */
          object.position.y = -40
          object.name = 'jersey'
          scene.add(object)
        },
        this.onProgress,
        this.onError
      )
    })

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.loader = mtlLoader
    this.controls = controls
    this.directionalLight = directionalLight

    this.container.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.container.removeChild(this.renderer.domElement)
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
    this.camera.position.set(x, y, z)
    this.controls.update()
  }

  setupColors = colors => {
    const { objectChilds } = this.state
    const object = this.scene.getObjectByName('jersey')
    colors.forEach((color, index) => {
      if (object.children[objectChilds + index]) {
        object.children[objectChilds + index].material.color.set(color)
      }
    })
  }

  setupHoverColor = colorBlockHovered => {
    const { objectChilds } = this.state
    const { colors } = this.props
    if (colorBlockHovered >= 0) {
      const object = this.scene.getObjectByName('jersey')
      object.children[objectChilds + colorBlockHovered].material.color.set(
        '#f2f2f2'
      )
    } else {
      this.setupColors(colors)
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
    const zoomValue = value * 1.0 / 100
    this.camera.zoom = zoomValue * 2
    this.camera.updateProjectionMatrix()
  }

  saveDesign = previewImage => {
    // TODO: Send base64 image
    const { onOpenSaveDesign } = this.props
    onOpenSaveDesign(true, previewImage)
  }

  takeDesignPicture = () => {
    const viewPosition = viewPositions[2]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: 2 }, () =>
      setTimeout(() => {
        const dataUrl = this.renderer.domElement.toDataURL('image/png', 0.1)
        this.saveDesign(dataUrl)
      }, 200)
    )
  }

  render() {
    const { progress } = this.state
    const { loadingModel } = this.props

    return (
      <Container onKeyDown={this.handleOnKeyDown} tabIndex="0">
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
      </Container>
    )
  }
}

export default Render3D
