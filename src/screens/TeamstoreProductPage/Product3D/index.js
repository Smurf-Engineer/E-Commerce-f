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
  ButtonWrapper,
  BottomButtons,
  ButtonRight,
  ButtonWrapperRight
} from './styledComponents'
import { jerseyTextures } from './config'

import messages from './messages'

const { Item } = Menu

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    // TODO: Temp fix use redux from parent
    isLoading: false
  }

  componentDidMount() {
    /* Renderer config */
    const { onLoadModel, colors } = this.props
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)

    /* Textures */
    const loader = new THREE.TextureLoader()

    const textures = {
      backPocket: {},
      color1: {},
      color2: {},
      color3: {},
      color4: {},
      color5: {},
      flatlock: {},
      label: {},
      bumpMap: {}
    }

    for (const key in textures) {
      textures[key] = loader.load(jerseyTextures[key])
      if (key !== 'flatlock') {
        textures[key].minFilter = THREE.LinearFilter
      }
    }

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
    controls.enableZoom = false

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.62)
    directionalLight.position.copy(camera.position)

    const mtlLoader = new THREE.MTLLoader()

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    /* Object and MTL load */

    mtlLoader.setPath('./models/')
    mtlLoader.load('Tour.mtl', materials => {
      this.handleOnLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.setPath('./models/')
      objLoader.load(
        'Tour.obj',
        object => {
          this.handleOnLoadModel(false)

          // Materials
          /* Object material */
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            map: textures.flatlock,
            color: 0xffffff
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          // Inside material
          const insideMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.BackSide
          })

          /* Texture materials */
          const labelMaterial = new THREE.MeshPhongMaterial({
            map: textures.label
          })
          const backPocketMaterial = new THREE.MeshPhongMaterial({
            map: textures.backPocket
          })

          /* Assign materials */
          const cloneObject = object.children[0].clone()
          object.add(cloneObject)

          /* jersey */
          object.children[0].material = insideMaterial
          /* flatlock */
          for (let index = 1; index <= 10; index++) {
            object.children[index].material = flatlockMaterial
          }
          /* Jersey label */
          object.children[17].material = labelMaterial
          /* back pocket */
          object.children[22].material = backPocketMaterial

          /* Object Conig */
          object.position.y = -30
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

  handleOnLoadModel = isLoading => this.setState({ loadingModel: isLoading })

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

  lightUpdate = () => {
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

  handleOnChange3DModel = () => {}

  render() {
    const {
      showDragmessage,
      currentView,
      zoomValue,
      progress,
      loadingModel
    } = this.state
    const { onPressQuickView, undoEnabled, redoEnabled } = this.props

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
    )

    return (
      <Container onKeyDown={this.handleOnKeyDown}>
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
        <DragText>
          <FormattedMessage {...messages.drag} />
        </DragText>
      </Container>
    )
  }
}

export default Render3D
