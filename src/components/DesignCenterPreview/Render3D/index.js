import React, { PureComponent } from 'react'
import findIndex from 'lodash/findIndex'
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
import arrowDown from '../../../assets/downarrow.svg'
import Slider from '../../ZoomSlider'
import messages from './messages'

const { Item } = Menu

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    objectChilds: 0
  }

  async componentDidMount() {
    /* Renderer config */
    const { onLoadModel, svgOutputUrl } = this.props
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)

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
    controls.enableZoom = true

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.78)
    directionalLight.position.copy(camera.position)

    const mtlLoader = new THREE.MTLLoader()

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    // TODO: Get this from data.design
    const modelTextures = {
      flatlock:
        'https://storage.googleapis.com/jakroo-storage/models/Tour2/Fflatlock.png',
      bumpMap:
        'https://storage.googleapis.com/jakroo-storage/models/Tour2/TOUR_Jv2-BumpMap.jpg',
      texture: svgOutputUrl || ''
    }

    onLoadModel(true)
    const loadedTextures = await this.loadTextures(modelTextures)

    /* Object and MTL load */
    mtlLoader.load(
      'https://storage.googleapis.com/jakroo-storage/models/Tour2/TOUR_Jv2.mtl',
      materials => {
        materials.preload()
        const objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
          'https://storage.googleapis.com/jakroo-storage/models/Tour2/TOUR_Jv2.obj',
          object => {
            const objectChilds = object.children.length
            this.setState({ objectChilds })

            /* Object material */
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              map: loadedTextures.flatlock,
              color: 0xffffff
            })
            flatlockMaterial.map.wrapS = THREE.RepeatWrapping
            flatlockMaterial.map.wrapT = THREE.RepeatWrapping

            // Inside material
            const insideMaterial = new THREE.MeshPhongMaterial({
              side: THREE.BackSide,
              color: '#000000'
            })

            const frontMaterial = new THREE.MeshPhongMaterial({
              map: loadedTextures.texture,
              side: THREE.FrontSide,
              bumpMap: loadedTextures.bumpMap
            })

            const { children } = object
            const getMeshIndex = meshName => {
              const index = findIndex(children, mesh => mesh.name === meshName)
              return index < 0 ? 0 : index
            }

            const meshIndex = getMeshIndex('FINAL JV2_Design_Mesh')
            const labelIndex = getMeshIndex('Red_Tag FINAL')
            const flatlockIndex = getMeshIndex('FINAL JV2_Flatlock')

            // /* Assign materials */
            const cloneObject = object.children[meshIndex].clone()
            object.add(cloneObject)

            object.children[labelIndex].material.color.set('#ffffff')
            object.children[flatlockIndex].material = flatlockMaterial
            object.children[meshIndex].material = insideMaterial
            object.children[objectChilds].material = frontMaterial

            /* Object Conig */
            object.position.y = -30
            object.name = 'jersey'
            scene.add(object)
            onLoadModel(false)
          },
          this.onProgress,
          this.onError
        )
      }
    )

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

  loadTextures = modelTextures =>
    new Promise((resolve, reject) => {
      try {
        const loader = new THREE.TextureLoader()
        const loadedTextures = {}
        loadedTextures.flatlock = loader.load(modelTextures.flatlock)
        loadedTextures.bumpMap = loader.load(modelTextures.bumpMap)
        loadedTextures.texture = loader.load(modelTextures.texture)

        resolve(loadedTextures)
      } catch (e) {
        reject(e)
      }
    })

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

  setupColors = colors => {
    let colorNumber = 1
    colors.forEach(color => {
      let key = `customColor${colorNumber}`
      if (color && this.uniformsWithPhong) {
        this.uniformsWithPhong[key].value = new THREE.Color(color)
      }
      colorNumber += 1
    })
  }

  handleOnChange3DModel = () => {}

  handleOnChangeZoom = value => {
    const zoomValue = value * 1.0 / 100
    this.camera.zoom = zoomValue * 2
    this.camera.updateProjectionMatrix()
  }

  openAddToStoreModal = () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(true)
  }

  render() {
    const { showDragmessage, currentView, zoomValue, progress } = this.state
    const {
      onPressQuickView,
      undoEnabled,
      redoEnabled,
      loadingModel,
      onAddToCart
    } = this.props

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
        {showDragmessage && (
          <DragText>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
        <Dropdown overlay={menu}>
          <ModelType>
            <ModelText>3D Model: Product Only</ModelText>
            <img src={arrowDown} />
          </ModelType>
        </Dropdown>
        <BottomButtons>
          <ButtonWrapper>
            <Button onClick={this.openAddToStoreModal}>
              <FormattedMessage {...messages.addToTeam} />
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button type="primary" onClick={onAddToCart}>
              <FormattedMessage {...messages.addToCart} />
            </Button>
          </ButtonWrapper>
        </BottomButtons>
        <Slider onChangeZoom={this.handleOnChangeZoom} />
        <ButtonWrapperRight>
          <ButtonRight type="primary">
            <FormattedMessage {...messages.keepShoping} />
          </ButtonRight>
        </ButtonWrapperRight>
      </Container>
    )
  }
}

export default Render3D
