import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import vertexShader from './vertex'
import fragmentShader from './fragment'
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
import { jerseyTextures, viewPositions } from './config'
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
    progress: 0
  }
  // TODO:  Refactor this code
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
    const isMobile = window.matchMedia('only screen and (max-width: 1366px)')
      .matches

    controls.enableKeys = false
    controls.minDistance = 150
    controls.maxDistance = 350
    controls.enableZoom = isMobile

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

          // Materials
          /* Object material */
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            map: textures.flatlock,
            color: 0xffffff
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          const customColors = {}
          let i = 0
          for (const color of colors) {
            customColors[`customColor${i + 1}`] = {
              type: 'c',
              value: new THREE.Color(color)
            }
            i += 1
          }

          const uniforms = {
            ...customColors,
            positionX: { type: 'f', value: 1.0 },
            positionY: { type: 'f', value: 1.0 },
            color1: {},
            color2: {},
            color3: {},
            color4: {},
            color5: {},
            logo: {}
          }

          const phongShader = THREE.ShaderLib.phong
          const mergeUniforms = THREE.UniformsUtils.merge([
            phongShader.uniforms,
            uniforms
          ])

          const uniformsWithPhong = THREE.UniformsUtils.clone(mergeUniforms)
          uniformsWithPhong.color1.value = textures.color1
          uniformsWithPhong.color2.value = textures.color2
          uniformsWithPhong.color3.value = textures.color3
          uniformsWithPhong.color4.value = textures.color4
          uniformsWithPhong.color5.value = textures.color5
          uniformsWithPhong.bumpMap.value = textures.bumpMap
          uniformsWithPhong.bumpMapScale = 0.45
          uniformsWithPhong.shininess.value = 15

          this.uniformsWithPhong = uniformsWithPhong

          const defines = {}
          defines['USE_MAP'] = ''
          defines['USE_COLOR'] = ''
          defines['USE_BUMPMAP'] = ''

          const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniformsWithPhong,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.FrontSide,
            defines: defines,
            lights: true
          })

          shaderMaterial.extensions.derivatives = true

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
          object.children[24].material = shaderMaterial
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
      loadingModel
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
            <Button type="primary">
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
