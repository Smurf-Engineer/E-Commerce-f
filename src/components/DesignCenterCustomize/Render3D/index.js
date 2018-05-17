import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import { FormattedMessage } from 'react-intl'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import findIndex from 'lodash/findIndex'
import SVG from 'svg.js'
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
import { viewPositions } from './config'
import Slider from '../../ZoomSlider'
import OptionsController from '../OptionsController'
import messages from './messages'
import quickView from '../../../assets/quickview.svg'
import arrowDown from '../../../assets/downarrow.svg'
import left from '../../../assets/leftarrow.svg'
import right from '../../../assets/arrow.svg'
import frontIcon from '../../../assets/Cube-Front.svg'
import leftIcon from '../../../assets/Cube_Left.svg'
import rightIcon from '../../../assets/Cube_right.svg'
import topIcon from '../../../assets/Cube-Top.svg'
import backIcon from '../../../assets/Cube_back.svg'
// TODO: Test data
import dummieData from './dummieData'

const cubeViews = [backIcon, rightIcon, frontIcon, leftIcon]
const { Item } = Menu

const irnd = rng => {
  return parseInt(Math.random() * rng)
}

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

  componentDidMount() {
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({
      antialias: true
      // preserveDrawingBuffer: true
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
    const isMobile = window.matchMedia('only screen and (max-width: 1366px)')
      .matches

    controls.enableKeys = false
    controls.minDistance = 0
    controls.maxDistance = 350
    // controls.enableZoom = isMobile

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

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.controls = controls
    this.directionalLight = directionalLight

    this.mtlLoader = mtlLoader
    this.objLoader = objLoader
    this.textureLoader = textureLoader

    // this.render3DModel()

    this.container.appendChild(this.renderer.domElement)
    this.start()

    const svgTexture = Snap('#svg')

    const bigCircle = svgTexture.circle(100, 100, 50)

    // Snap.load('./testsvg/colorblock_5.svg', f => {
    //   s.append(f.select('g'))
    // })
    const textureList = []
    const loadMulti = list => {
      let image,
        fragLoadedCount = 0,
        listLength = list.length

      for (let count = 0; count < listLength; count++) {
        ;(() => {
          let wichEl = count
          image = Snap.load(list[wichEl], loadedFragment => {
            fragLoadedCount++
            textureList[wichEl] = loadedFragment
            if (fragLoadedCount >= listLength) {
              addLoadedFrags(textureList)
            }
          })
        })()
      }
    }

    const addLoadedFrags = list => {
      for (let count = 0; count < list.length; count++) {
        svgTexture.append(textureList[count])
      }
    }
    const listSvg = [
      './testsvg/colorblock_5.svg',
      './testsvg/colorblock_4.svg',
      './testsvg/colorblock_3.svg',
      './testsvg/colorblock_2.svg',
      './testsvg/colorblock_1.svg'
    ]
    loadMulti(listSvg)
  }

  componentWillUnmount() {
    this.stop()
    this.container.removeChild(this.renderer.domElement)
  }

  render3DModel = () => {
    /* Object and MTL load */
    const { onLoadModel, currentStyle } = this.props

    /* Texture configuration */
    const modelTextures = dummieData[currentStyle]
    const flatlockTexture = this.textureLoader.load(
      './models/images/flatlock.png'
    )
    const bumpMapTexture = this.textureLoader.load(modelTextures.bumpMap)

    const loadedAreas = modelTextures.areas.map(areaUri => {
      const areaTexture = this.textureLoader.load(areaUri)
      areaTexture.minFilter = THREE.LinearFilter
      return areaTexture
    })

    this.mtlLoader.load(modelTextures.mtl, materials => {
      onLoadModel(true)
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        modelTextures.obj,
        object => {
          onLoadModel(false)
          const objectChilds = object.children.length
          this.setState({ objectChilds })

          // TODO: TEXT Test
          const logoTexture = this.textureLoader.load('./testsvg/C01-D01.svg')

          // logoTexture.wrapS = logoTexture.wrapT = THREE.RepeatWrapping

          const materialLogo = new THREE.MeshPhongMaterial({
            map: logoTexture,
            bumpMap: bumpMapTexture,
            side: THREE.FrontSide
          })
          // const cdim = 2048
          // const canvas = document.createElement('canvas')
          // canvas.width = canvas.height = cdim
          // const compositeTexture = new THREE.Texture(canvas)
          // compositeTexture.wrapS = compositeTexture.wrapT = THREE.RepeatWrapping

          // const rebuildTexture = () => {
          //   const ctx = canvas.getContext('2d')
          //   ctx.globalCompositeOperation = 'source-over'
          //   const fcolor = '#d12212'
          //   ctx.fillStyle = fcolor

          //   ctx.fillRect(0, 0, cdim, cdim)

          //   for (let i = 0; i < 30; i++) {
          //     const rdim = parseInt(360 * Math.random() + 10)
          //     ctx.fillStyle = '#312121'
          //     if (irnd(10) > 5) ctx.fillRect(irnd(cdim), irnd(cdim), rdim, rdim)
          //     else {
          //       ctx.beginPath()
          //       ctx.arc(irnd(cdim), irnd(cdim), rdim, rdim, 2 * Math.PI)
          //       ctx.fill()
          //     }
          //   }
          //   ctx.globalCompositeOperation = 'normal'
          //   const img = logoTexture.image

          //   let iwid = img.width
          //   let ihite = img.height
          //   const max = Math.max(iwid, ihite)
          //   const scl = cdim / max * 0.38
          //   iwid *= scl
          //   ihite *= scl
          //   ctx.drawImage(
          //     img,
          //     cdim * 0.25 - iwid * 0.5,
          //     cdim * 0.5 - ihite * 0.5,
          //     iwid,
          //     ihite
          //   )

          //   ctx.drawImage(
          //     img,
          //     cdim * 0.75 - iwid * 0.5,
          //     cdim * 0.5 - ihite * 0.5,
          //     iwid,
          //     ihite
          //   )

          // ctx.font = '80px Georgia'
          // ctx.textAlign = 'center'
          // ctx.fillStyle = '#212000'
          // ctx.fillText('DAVID', 1500, 1450)
          //   compositeTexture.needsUpdate = true
          //   materialLogo.map = compositeTexture

          //   materialLogo.needsUpdate = true
          // }

          // rebuildTexture(materialLogo, canvas)

          /* Object materials */

          // Stitching
          const flatlockMaterial = new THREE.MeshPhongMaterial({
            map: flatlockTexture
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          // Back material
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })

          let meshIndex = findIndex(
            object.children,
            mesh => mesh.name === 'FINAL Jersey_Mesh'
          )

          if (meshIndex < 0) {
            meshIndex = 0
          }

          // Setup the texture layers
          const areasLayers = loadedAreas.map(() =>
            object.children[meshIndex].clone()
          )
          object.add(...areasLayers)

          /* Jersey label */
          object.children[4].material.color.set('#ffffff')
          object.children[6].material = flatlockMaterial

          object.children[objectChilds].material = materialLogo
          // object.children[objectChilds].rebuildTexture = rebuildTexture

          // loadedAreas.forEach(
          //   (materialTexture, index) =>
          //     (object.children[
          //       objectChilds + index
          //     ].material = new THREE.MeshPhongMaterial({
          //       map: loadedAreas[index],
          //       side: THREE.FrontSide,
          //       bumpMap: bumpMapTexture,
          //       color: modelTextures.colors[index],
          //       transparent: true
          //     }))
          // )

          /* Object Config */
          object.position.y = -30
          object.name = 'jersey'
          this.scene.add(object)
        },
        this.onProgress,
        this.onError
      )
    })
  }

  createLabel = (text, color, font, size) => {
    size = size || 24
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const fontStr = (font || 'Arial') + ' ' + (size + 'px')
    ctx.font = fontStr
    const w = ctx.measureText(text).width
    const h = Math.ceil(size * 1.25)
    canvas.width = w
    canvas.height = h
    ctx.font = fontStr
    ctx.fillStyle = color || 'black'
    ctx.fillText(text, 0, size)
    const tex = new THREE.CanvasTexture(canvas)
    // tex.needsUpdate = true

    return tex
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
    const { showDragmessage, currentView, zoomValue, progress } = this.state
    const {
      onPressQuickView,
      undoEnabled,
      redoEnabled,
      loadingModel,
      formatMessage,
      productName
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
      <Container onKeyDown={this.handleOnKeyDown} tabIndex="0">
        <Row>
          <Model>{productName}</Model>
          <QuickView onClick={onPressQuickView} src={quickView} />
        </Row>
        <div style={{ width: '100%', height: '100%' }} id="drawing">
          <svg id="svg" width="100%" height="100%" />
        </div>
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
}

export default Render3D
