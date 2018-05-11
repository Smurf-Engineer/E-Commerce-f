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
  Logo
} from './styledComponents'
import logo from '../../../../assets/jakroo_logo.svg'
import { jerseyTextures, viewPositions } from './config'
import messages from './messages'

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
    const {
      colors,
      colorBlockHovered: oldColorBlockHovered,
      files: oldFiles
    } = this.props
    const {
      colors: nextColors,
      styleColors,
      colorBlockHovered,
      files
    } = nextProps

    const filesHasChange = isEqual(files, oldFiles)
    if (!filesHasChange) {
      this.loadObject(files)
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
      return
    }
  }

  // TODO:  Refactor this code
  componentDidMount() {
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)

    /* Camera */
    const aspect = clientWidth / clientHeight
    const camera = new THREE.PerspectiveCamera(25, aspect, 0.1, 1000)

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

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    /* Loaders */
    const mtlLoader = new THREE.MTLLoader()
    const objLoader = new THREE.OBJLoader()
    const imgLoader = new THREE.TextureLoader()

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.controls = controls
    this.directionalLight = directionalLight

    this.mtlLoader = mtlLoader
    this.objLoader = objLoader
    this.imgLoader = imgLoader

    this.container.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.container.removeChild(this.renderer.domElement)
  }

  loadObject = files => {
    /* Object and MTL load */
    const { onLoadModel, styleColors } = this.props

    /* Get the texture configuration */
    // This maybe change for a graph query
    const { /* areas, */ textures } = jerseyTextures('C02-D01') || {}

    /* Load area textures */
    const loadedTextures = {}
    for (const key in textures) {
      loadedTextures[key] = this.imgLoader.load(textures[key])
      if (key !== 'flatlock') {
        loadedTextures[key].minFilter = THREE.LinearFilter
      }
    }

    const bumpMapTexture = this.imgLoader.load(files.bumpMap)

    const loadedAreas = files.areas.map(areaUri => {
      const areaTexture = this.imgLoader.load(areaUri)
      areaTexture.minFilter = THREE.LinearFilter
      return areaTexture
    })

    this.mtlLoader.load(files.mtl, materials => {
      onLoadModel(true)
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        files.obj,
        object => {
          onLoadModel(false)
          const objectChilds = object.children.length
          this.setState({ objectChilds })

          /* Object materials */
          // Stitching
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            map: loadedTextures.flatlock
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          // Back material
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })

          console.log('---------------OBJECT-------------')
          console.log(object)
          console.log('------------------------------------')

          // Setup the texture layers
          const areasLayers = loadedAreas.map(() => object.children[5].clone())
          object.add(...areasLayers)

          /* Jersey label */
          object.children[4].material.color.set('#ffffff')
          object.children[6].material = flatlockMaterial
          object.children[5].material = insideMaterial

          loadedAreas.forEach(
            (materialTexture, index) =>
              (object.children[
                objectChilds + index
              ].material = new THREE.MeshPhongMaterial({
                map: loadedAreas[index],
                side: THREE.FrontSide,
                bumpMap: bumpMapTexture,
                color: styleColors[index],
                transparent: true
              }))
          )

          /* Object Config */
          object.position.y = -40
          object.name = 'jersey'
          this.scene.add(object)
        },
        this.onProgress,
        this.onError
      )
    })
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
    if (object) {
      colors.forEach((color, index) => {
        if (object.children[objectChilds + index]) {
          object.children[objectChilds + index].material.color.set(color)
        }
      })
    }
  }

  setupHoverColor = colorBlockHovered => {
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

  render() {
    const { progress } = this.state
    const { loadingModel, files } = this.props

    return (
      <Container>
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
          {!files && <Logo src={logo} />}
        </Render>
      </Container>
    )
  }
}

export default Render3D
