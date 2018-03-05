import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import { FormattedMessage } from 'react-intl'
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
  ModelText
} from './styledComponents'
import messages from './messages'
import quickView from '../../../assets/quickview.svg'
import arrowDown from '../../../assets/downarrow.svg'

// TODO: Refactor this code
/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    loading: false,
    progress: 0.0
  }
  componentWillReceiveProps(nextProps) {
    const { colors } = this.props
    const { colors: nextColors } = nextProps
    const isDifferent = isEqual(colors, nextColors)
    if (!isDifferent) {
      this.setupColors(nextColors)
    }
  }
  // TODO: Remove
  componentDidMount() {
    /* Renderer config */
    const { onLoadModel } = this.props
    const { clientWidth, clientHeight } = this.container
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#fff')
    renderer.setSize(clientWidth, clientHeight)

    /* Textures */
    const loader = new THREE.TextureLoader()

    const backPocket = loader.load(
      './models/Tour5/bb-7-camback_Back Pockets.png'
    )
    const branding = loader.load('./models/Tour5/branding.png')
    const color1 = loader.load('./models/Tour5/colorblock_1.png')
    const color2 = loader.load('./models/Tour5/colorblock_2.png')
    const color3 = loader.load('./models/Tour5/colorblock_3.png')
    const color4 = loader.load('./models/Tour5/colorblock_4.png')
    const color5 = loader.load('./models/Tour5/colorblock_5.png')
    const flatlock = loader.load('./models/Tour5/flatlock.png')
    const label = loader.load('./models/Red-J.jpg')
    const bumpMap = loader.load('./models/TOUR-SS_Jersey-BUMP.jpg')

    // Fix the warning: image is not power of two
    flatlock.minFilter = THREE.LinearFilter
    backPocket.minFilter = THREE.LinearFilter
    label.minFilter = THREE.LinearFilter
    color1.minFilter = THREE.LinearFilter
    color2.minFilter = THREE.LinearFilter
    color3.minFilter = THREE.LinearFilter
    color4.minFilter = THREE.LinearFilter
    color5.minFilter = THREE.LinearFilter

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
            map: flatlock,
            color: 0xffffff
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          const uniforms = {
            customColor1: { type: 'c', value: new THREE.Color('#F0AAB4') },
            customColor2: { type: 'c', value: new THREE.Color('#EE3C6F') },
            customColor3: { type: 'c', value: new THREE.Color('#94CFBB') },
            customColor4: { type: 'c', value: new THREE.Color('#00ADEE') },
            customColor5: { type: 'c', value: new THREE.Color('#ffffff') },
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
          uniformsWithPhong.color1.value = color1
          uniformsWithPhong.color2.value = color2
          uniformsWithPhong.color3.value = color3
          uniformsWithPhong.color4.value = color4
          uniformsWithPhong.color5.value = color5
          uniformsWithPhong.bumpMap.value = bumpMap
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
          const labelMaterial = new THREE.MeshPhongMaterial({ map: label })
          const backPocketMaterial = new THREE.MeshPhongMaterial({
            map: backPocket
          })

          /* Assign materials */
          const cloneObject = object.children[0].clone()
          object.add(cloneObject)

          // FIXME: Clipart testing
          // object.children[0].add(logoMesh);

          /* jersey */
          object.children[0].material = insideMaterial
          object.children[24].material = shaderMaterial
          /* flatlock */
          object.children[1].material = flatlockMaterial
          object.children[2].material = flatlockMaterial
          object.children[3].material = flatlockMaterial
          object.children[4].material = flatlockMaterial
          object.children[5].material = flatlockMaterial
          object.children[6].material = flatlockMaterial
          object.children[7].material = flatlockMaterial
          object.children[8].material = flatlockMaterial
          object.children[9].material = flatlockMaterial
          object.children[10].material = flatlockMaterial
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
    this.directionalLight = directionalLight

    this.container.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.container.removeChild(this.renderer.domElement)
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

  onProgress = xhr => {
    if (xhr.lengthComputable) {
      const progress = Math.round(xhr.loaded / xhr.total * 100)
      this.setState({ progress })
    }
  }

  onError = xhr => {
    console.log('Error: ' + xhr)
  }

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

  render() {
    const { showDragmessage } = this.state
    return (
      <Container>
        <Row>
          <Model>{'TOUR'}</Model>
          <QuickView src={quickView} />
        </Row>
        <Render innerRef={container => (this.container = container)} />
        {showDragmessage && (
          <DragText>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
        <ModelType>
          <ModelText>3D Model: Product Only</ModelText>
          <img src={arrowDown} />
        </ModelType>
        <Button type="primary">Save</Button>
      </Container>
    )
  }
}

export default Render3D
