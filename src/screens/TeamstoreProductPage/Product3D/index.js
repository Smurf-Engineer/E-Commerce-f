import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
import Dropdown from 'antd/lib/dropdown'
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
  BottomButtons,
  ButtonRight,
  ButtonWrapperRight
} from './styledComponents'
import { jerseyTextures } from './config'
import arrowDown from '../../../assets/downarrow.svg'
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
    isLoading: false,
    objectChilds: 0
  }

  componentDidMount() {
    const { onLoadModel, colors } = this.props
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)

    /* Textures */
    const textureLoader = new THREE.TextureLoader()

    const textures = {
      texture: {},
      flatlock: {},
      bumpMap: {}
    }

    for (const key in textures) {
      textures[key] = textureLoader.load(jerseyTextures.images[key])
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
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.78)
    directionalLight.position.copy(camera.position)

    const mtlLoader = new THREE.MTLLoader()

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    /* Object and MTL load */

    mtlLoader.load(jerseyTextures.mtl, materials => {
      this.handleOnLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(
        jerseyTextures.obj,
        object => {
          const objectChilds = object.children.length
          this.setState({ objectChilds })
          // Materials
          /* Object material */
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            map: textures.flatlock
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          // Back material
          const insideMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.BackSide
          })

          // Front material
          const frontMaterial = new THREE.MeshPhongMaterial({
            map: textures.texture,
            bumpMap: textures.bumpMap,
            side: THREE.FrontSide
          })

          let meshIndex = findIndex(
            object.children,
            mesh => mesh.name === 'FINAL Jersey_Mesh'
          )

          if (meshIndex < 0) {
            meshIndex = 0
          }

          /* Assign materials */
          const cloneObject = object.children[meshIndex].clone()
          object.add(cloneObject)

          /* Jersey label */
          object.children[4].material.color.set('#FFF')
          /* flatlock */
          object.children[6].material = flatlockMaterial
          /* jersey */
          object.children[meshIndex].material = insideMaterial
          object.children[objectChilds].material = frontMaterial

          /* Object Conig */
          object.position.y = -30
          object.name = 'jersey'
          scene.add(object)

          this.handleOnLoadModel(false)
        },
        this.onProgress,
        this.onError
      )
    })

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.textureLoader = mtlLoader
    this.controls = controls
    this.directionalLight = directionalLight

    this.container.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillReceiveProps(nextProps) {
    const { colors } = nextProps

    this.setupColors(colors)
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

  setupColors = colors => {
    let colorNumber = 1
    colors.forEach(colorObject => {
      let key = `customColor${colorNumber}`
      const { color } = colorObject
      if (color && this.uniformsWithPhong) {
        this.uniformsWithPhong[key].value = new THREE.Color(color)
      }
      colorNumber += 1
    })
  }

  render() {
    const {
      showDragmessage,
      currentView,
      zoomValue,
      progress,
      loadingModel
    } = this.state
    const { onPressQuickView, undoEnabled, redoEnabled } = this.props

    return (
      <Container onKeyDown={this.handleOnKeyDown}>
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
        {showDragmessage && (
          <DragText>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
      </Container>
    )
  }
}

export default Render3D
