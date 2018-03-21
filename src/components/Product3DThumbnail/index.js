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
import messages from './messages'

const { Item } = Menu

/* eslint-disable */
class Product3DThumbnail extends PureComponent {
  state = {
    showDragmessage: true,
    currentView: 2,
    currentModel: 0,
    zoomValue: 0,
    progress: 0
  }

  // TODO:  Refactor this code
  componentDidMount() {
    /* Renderer config */
    const { onLoadModel, styleColors } = this.props
    const { clientWidth, clientHeight } = this.container

    const loader = new THREE.TextureLoader()
    const flatlock = loader.load('./models/Tour5/flatlock.png')
    const label = loader.load('./models/Red-J.jpg')
    const labelMaterial = new THREE.MeshPhongMaterial({ map: label })
    const backPocket = loader.load(
      './models/Tour5/bb-7-camback_Back Pockets.png'
    )
    const backPocketMaterial = new THREE.MeshPhongMaterial({ map: backPocket })
    var bumpMap = loader.load('./models/TOUR-SS_Jersey-BUMP.jpg')
    var jerseyMaterial = new THREE.MeshPhongMaterial({
      bumpMap,
      side: THREE.DoubleSide
    })

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
    controls.minDistance = 150
    controls.maxDistance = 350
    controls.enableZoom = false

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
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
            map: flatlock,
            color: new THREE.Color('#ffffff')
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          object.children[0].material = jerseyMaterial
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

  render() {
    const { showDragmessage, progress } = this.state
    const { loadingModel } = this.props

    return (
      <Container onKeyDown={this.handleOnKeyDown} tabIndex="0">
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

export default Product3DThumbnail
