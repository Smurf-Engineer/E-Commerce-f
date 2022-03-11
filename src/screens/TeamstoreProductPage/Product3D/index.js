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
import { WHITE } from '../../../theme/colors'
import {
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_INTENSITY
} from '../../../constants'

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
    const { onLoadModel, svgUrl } = this.props
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    /* Textures */
    const textureLoader = new THREE.TextureLoader()
    textureLoader.setCrossOrigin('anonymous')
    const textures = {
      texture: {},
      flatlock: {},
      bumpMap: {}
    }

    // TODO: Delete jersey textures and get from the design
    jerseyTextures.images.texture =
      svgUrl || 'https://storage.googleapis.com/jakroo/models/Tour/C01-D01.svg'

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
    const ambient = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY)
    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      DIRECTIONAL_LIGHT_INTENSITY
    )
    const cameraPosition = {
      x: -4,
      y: 100,
      z: -1
    }
    directionalLight.position.copy(cameraPosition)
    const leftLight = { x: -100, y: 70, z: 64 }
    const leftDirectionLight = new THREE.DirectionalLight(
      0xffffff,
      0.3
    )
    leftDirectionLight.position.copy(leftLight)
    const rightLight = { x: 100, y: 84, z: 51 }
    const rightDirectionLight = new THREE.DirectionalLight(
      0xffffff,
      0.3
    )
    rightDirectionLight.position.copy(rightLight)
    const backLight = { x: 0, y: 118, z: -75 }
    const backDirectionLight = new THREE.DirectionalLight(
      0xffffff,
      0.4
    )
    backDirectionLight.position.copy(backLight)
    scene.add(camera)
    scene.add(ambient)
    // scene.add(directionalLight)
    scene.add(rightDirectionLight)
    scene.add(leftDirectionLight)
    scene.add(backDirectionLight)

    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 1;
    directionalLight.shadow.darkness = 1;
    directionalLight.shadowCameraVisible = true;
    directionalLight.shadow.camera.visible = true;
    directionalLight.shadow.camera.near = 60;
    directionalLight.shadow.camera.far = 135;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.left = - 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = - 25;
    directionalLight.shadow.mapSize.width = 28;
    directionalLight.shadow.mapSize.height = 28;

    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.ShadowMaterial({
      side: THREE.BackSide,
      opacity: 0.4,
      color: 0xaaaaaa
    });

    const ground = new THREE.Mesh(geometry, material);
    ground.scale.multiplyScalar(5);
    ground.rotateX(Math.PI / 2);
    ground.position.y = -30;
    ground.castShadow = false;
    ground.receiveShadow = true;

    // const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(cameraHelper)

    scene.add(ground);
    scene.add(directionalLight)

    const mtlLoader = new THREE.MTLLoader()
    mtlLoader.setCrossOrigin('anonymous')
    /* Object and MTL load */

    mtlLoader.load(jerseyTextures.mtl, materials => {
      this.handleOnLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.crossOrigin = 'anonymous'
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
            color: new THREE.Color('#fafafa'),
            side: THREE.BackSide
          })

          // Front material
          const frontMaterial = new THREE.MeshPhongMaterial({
            map: textures.texture,
            bumpMap: textures.bumpMap,
            side: THREE.FrontSide,
            color: 0xdbdde0
          })

          const { children } = object

          const getMeshIndex = meshName => {
            const index = findIndex(children, mesh => mesh.name === meshName)
            return index < 0 ? 0 : index
          }

          const meshIndex = getMeshIndex('FINAL JV2_Design_Mesh')
          const labelIndex = getMeshIndex('Red_Tag FINAL')
          const flatlockIndex = getMeshIndex('FINAL JV2_Flatlock')

          /* Assign materials */
          const cloneObject = object.children[meshIndex].clone()
          object.add(cloneObject)

          /* Model */
          object.children[labelIndex].material.color.set('#FFF')
          object.children[flatlockIndex].material = flatlockMaterial
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

  componentWillUnmount() {
    this.stop()
    this.container.removeChild(this.renderer.domElement)
  }

  handleOnLoadModel = isLoading => this.setState({ loadingModel: isLoading })

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

  lightUpdate = () => {
    const { showDragmessage } = this.state
    if (showDragmessage) {
      this.setState({ showDragmessage: false })
    }
    // this.directionalLight.position.copy(this.camera.position)
  }

  cameraUpdate = ({ x, y, z }) => {
    this.camera.position.set(x, y, z)
    this.controls.update()
  }

  render() {
    const { showDragmessage, progress, loadingModel } = this.state

    return (
      <Container onKeyDown={this.handleOnKeyDown}>
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
        {showDragmessage && false && (
          <DragText>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
      </Container>
    )
  }
}

export default Render3D
