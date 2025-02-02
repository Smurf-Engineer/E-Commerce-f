import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import reverse from 'lodash/reverse'
import filter from 'lodash/filter'
import FontFaceObserver from 'fontfaceobserver'
import { FormattedMessage } from 'react-intl'
// TODO: JV2 - Phase II
// import Dropdown from 'antd/lib/dropdown'
// import Menu from 'antd/lib/menu'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import shortid from 'shortid'
import { EditorState, convertFromRaw } from 'draft-js'
import Modal from 'antd/lib/modal'
import notification from 'antd/lib/notification'
import Checkbox from 'antd/lib/checkbox'
import {
  Container,
  Render,
  Progress,
  Model,
  Row,
  QuickView,
  Button,
  TutorialButton,
  TutorialIcon,
  DragText,
  ProAssistText,
  ViewControls,
  ViewButton,
  ButtonWrapper,
  ModalMessage,
  ModalLinkText,
  InfoBody,
  buttonStyle,
  BottomControls,
  TopButton,
  HintModalImage,
  HintIcon,
  TurnOffHintRow,
  MobileContainer,
  Icon,
  Variants,
  VariantButton,
  MobileHintIcon,
  DesignCheckButton,
  PrintPreviewLabel,
  PrintPreviewIcon,
  PrintImage,
  LoadingPreviewText,
  PreviewProgress
} from './styledComponents'
import {
  viewPositions,
  fabricJsConfig,
  DELETE_ACTION,
  DUPLICATE_ACTION,
  BRING_TO_FRONT_ACTION,
  ROTATE_ACTION,
  SCALE_ACTION,
  DRAG_ACTION,
  MESH_NAME,
  CANVAS_MESH,
  BRANDING_MESH,
  GUIDELINE_MESH,
  REGULAR_CANVAS,
  BIB_BRACE_NAME,
  ZIPPER_NAME,
  BINDING_NAME,
  CHANGE_ACTIONS,
  CENTER_ORIGIN,
  EXTRA_POSITION,
  TOP_VIEW,
  BACK_VIEW,
  LEFT_VIEW,
  EXTRA_FIELDS,
  INITIAL_ZOOM,
  INITIAL_ZOOM_MOBILE,
  THUMBNAIL_ZOOM,
  CAMERA_MIN_ZOOM,
  CAMERA_MAX_ZOOM,
  HIGH_RESOLUTION_CANVAS,
  REGULAR_CORNER_SIZE,
  HIGH_RESOLUTION_CORNER_SIZE
} from './config'
import {
  blackProducts,
  doubleSideMeshes,
  blackMeshes,
  MESH,
  RED_TAG,
  FLATLOCK,
  ZIPPER,
  BINDING,
  BIB_BRACE,
  DPI,
  CM_PER_INCH,
  PROPEL_PALMS,
  GRIP_TAPE,
  DEFAULT_COLOR,
  TUTORIALS_BUTTON,
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_INTENSITY,
  ILLUSTRATOR_PIXELS_PER_CM
} from '../../../constants'
import {
  BLACK,
  WHITE,
  SELECTION_3D_AREA,
  RED_TRANSPARENT
} from '../../../theme/colors'
import {
  Changes,
  CustomizeTabs,
  CanvasElements
} from '../../../screens/DesignCenter/constants'
import ModalFooter from '../../ModalFooter'
import ModalTitle from '../../ModalTitle'
import Slider from '../../ZoomSlider'
import OptionsController from '../OptionsController'
import messages from './messages'
import {
  isMouseOver,
  clickOnCorner,
  getTextCanvasElement,
  getClipArtCanvasElement,
  downloadSVG,
  getImageCanvas
} from './utils'
import HelpModal from '../../Common/JakrooModal'
import printPreviewImg from '../../../assets/printpreview.svg'
import quickView from '../../../assets/quickview.svg'
import left from '../../../assets/leftarrow.svg'
import right from '../../../assets/arrow.svg'
import JakrooLogo from '../../../assets/Jackroologo.svg'
import top from '../../../assets/uparrow.svg'
import frontIcon from '../../../assets/Cube-Front.svg'
import leftIcon from '../../../assets/Cube_Left.svg'
import rightIcon from '../../../assets/Cube_right.svg'
import tutorials from '../../../assets/tutorials.svg'
import backIcon from '../../../assets/Cube_back.svg'
import topIcon from '../../../assets/Cube-Top.svg'
import hintImg from '../../../assets/designCenterhelpHint.jpg'
import mobileHintImg from '../../../assets/designCenterhelpMobileHint.png'
import helpTooltip from '../../../assets/tooltip.svg'
import config from '../../../config'
import PROAssistButton from '../../../assets/PROAssist-button.svg'
import { initSlaask, closeSlaask } from '../../../slaask'

const cubeViews = [backIcon, rightIcon, frontIcon, leftIcon, topIcon]
const MIN_ZOOM = 50
const MAX_ZOOM = 400
/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentView: 2,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    objectChildCount: 0,
    canvasEl: null,
    oldScale: { oldScaleX: null, oldScaleY: null },
    oldPosition: { oldLeft: null, oldTop: null },
    oldRotation: null,
    scaleFactor: 1,
    scaleFactorX: 1,
    scaleFactorY: 1,
    isFirstAdd: true,
    showHelpModal: true,
    openSlaask: true,
    retrySave: false,
    editorState: false,
    editorReady: false,
    Editor: null
  }
  canvasApplied = null
  dragComponent = null
  constructor(props) {
    super(props)
    if (typeof window !== undefined) {
      this.setState({
        editorState: EditorState.createEmpty(),
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      colors,
      colorBlockHovered: oldColorBlockHovered,
      stitchingColor: oldStitchingColor,
      bindingColor: oldBindingColor,
      zipperColor: oldZipperColor,
      bibColor: oldBibColor,
      selectedVariant: oldSelected,
      showBranding: oldShowBranding,
      showGuidelines: oldShowGuidelines
    } = this.props
    const {
      colors: nextColors,
      styleColors,
      colorBlockHovered,
      stitchingColor,
      selectedVariant,
      bindingColor,
      zipperColor,
      bibColor,
      loadingModel,
      product: newProduct,
      proAssistId,
      userEmail,
      name,
      lastName,
      designId,
      loggedUserId,
      showBranding,
      showGuidelines,
      userCode,
      managerName
    } = nextProps
    const { openSlaask } = this.state
    if (loadingModel) {
      return
    }

    if (oldBibColor !== bibColor && !!this.bibBrace) {
      this.changeExtraColor(BIB_BRACE_NAME, bibColor)
      return
    }

    if (oldZipperColor !== zipperColor && !!this.zipper) {
      this.changeExtraColor(ZIPPER_NAME, zipperColor)
      return
    }

    if (oldBindingColor !== bindingColor && !!this.binding) {
      this.changeExtraColor(BINDING_NAME, bindingColor)
      return
    }

    const flatlockIsEqual = isEqual(oldStitchingColor, stitchingColor)
    if (!flatlockIsEqual) {
      const { value } = stitchingColor
      this.changeStitchingColor(value)
      return
    }
    const colorsHasChange = isEqual(colors, nextColors)
    if (!colorsHasChange) {
      const emptyColors = filter(nextColors, (color) => !!!color)
      const isResetingColors = emptyColors.length >= colors.length
      this.setupColors(isResetingColors ? styleColors : nextColors)
      return
    }

    const colorBlockHasChange = oldColorBlockHovered !== colorBlockHovered
    if (colorBlockHasChange) {
      this.setupHoverColor(colorBlockHovered)
    }
    if ((selectedVariant !== oldSelected) || (oldShowBranding !== showBranding) || (oldShowGuidelines !== showGuidelines)) {
      this.clearScene()
      this.render3DModel(showBranding, newProduct, showGuidelines)
    }
    if (openSlaask && proAssistId) {
      initSlaask({
        id: proAssistId,
        userId: loggedUserId,
        email: userEmail,
        userCode,
        designId,
        lastName,
        managerName,
        name
      })
      this.setState({ openSlaask: false })
    }
  }

  componentWillMount() {
    const hideHint = this.getHelpModalValueFromLocal()
    this.setState({ showHelpModal: !hideHint })
  }

  componentDidMount() {
    const { isEditing, design, showBranding = true, product, lowResolution, isMobile } = this.props
    const { modalText } = product || {}
    const cornerSize =
      (isEditing && design.highResolution) || !isEditing
        ? HIGH_RESOLUTION_CORNER_SIZE
        : REGULAR_CORNER_SIZE
    fabricJsConfig.settings.cornerSize = cornerSize
    /* Renderer config */
    fabric.Object.prototype.customiseCornerIcons(fabricJsConfig)

    const { clientWidth, clientHeight } = this.container
    const devicePixelRatio = window.devicePixelRatio || 1

    const precision = lowResolution ? 'mediump' : 'highp'

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowResolution,
      precision,
      preserveDrawingBuffer: true,
      powerPreference: lowResolution ? 'high-performance' : 'default'
    })

    renderer.setPixelRatio(lowResolution ? (devicePixelRatio * 0.75) : devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(clientWidth, clientHeight)
    if (!lowResolution) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }
    /* Camera */
    const aspect = clientWidth / clientHeight
    const camera = new THREE.PerspectiveCamera(25, aspect, 0.1, 1000)

    camera.position.z = 150

    /* Setting the react DraftJS to ready */
    if (modalText && typeof window !== undefined) {
      try {
        const Editor = require('react-draft-wysiwyg').Editor
        const blocksContent = JSON.parse(modalText)
        const editorState = EditorState.createWithContent(convertFromRaw(blocksContent))
        this.setState({
          editorState,
          editorReady: true,
          Editor
        })
      } catch (e) {
        console.error('Error:', e)
      }
    }

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

    if (!lowResolution) {
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
        opacity: 0.2,
        color: new THREE.Color('rgb(0, 0, 0)')
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
    }
    scene.add(directionalLight)
    /* Loaders */
    const mtlLoader = new THREE.MTLLoader()
    mtlLoader.setCrossOrigin('anonymous')
    const objLoader = new THREE.OBJLoader()
    objLoader.crossOrigin = 'anonymous'
    const textureLoader = new THREE.TextureLoader()
    textureLoader.setCrossOrigin('anonymous')
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const onClickPosition = new THREE.Vector2()

    this.raycaster = raycaster
    this.mouse = mouse
    this.onClickPosition = onClickPosition

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.directionalLight = directionalLight

    this.mtlLoader = mtlLoader
    this.objLoader = objLoader
    this.textureLoader = textureLoader

    this.camera.zoom = isMobile ? INITIAL_ZOOM_MOBILE : INITIAL_ZOOM
    this.camera.updateProjectionMatrix()

    this.render3DModel(showBranding)

    this.container.appendChild(this.renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', this.lightUpdate)

    controls.enableKeys = false
    controls.enableZoom = isMobile
    controls.minDistance = CAMERA_MIN_ZOOM
    controls.maxDistance = CAMERA_MAX_ZOOM
    // controls.enableZoom = isMobile TODO: Pan zoom
    const { down, up, move, wheel } = this.configureEventListeners()
    if (!isMobile) {
      this.container.addEventListener(down, this.onMouseDown, false)
      this.container.addEventListener(up, this.onMouseUp, false)
      this.container.addEventListener(move, this.onMouseMove, false)
      this.container.addEventListener(wheel, this.onWheel, false)
    }
    this.controls = controls
    this.start()
  }

  componentWillUnmount() {
    const { onUnmountTab, isMobile } = this.props
    if (this.canvasTexture) {
      const designCanvas = this.canvasTexture.toObject(EXTRA_FIELDS)
      this.canvasTexture.dispose()
    }
    if (this.renderer) {
      this.stop()
      if (!isMobile) {
        const { down, up, move, wheel } = this.configureEventListeners()
        this.container.removeEventListener(down, this.onMouseDown, false)
        this.container.removeEventListener(up, this.onMouseUp, false)
        this.container.removeEventListener(move, this.onMouseMove, false)
        this.container.removeEventListener(wheel, this.onWheel, false)
      }
      this.container.removeChild(this.renderer.domElement)
      this.clearScene()
    }
    closeSlaask()
  }

  configureEventListeners = () => {
    const {
      responsive: { tablet }
    } = this.props
    // TODO: Configure SAFARI EVENTS
    if (tablet) {
      return {
        down: 'touchstart',
        up: 'touchend',
        move: 'touchmove'
      }
    }
    return {
      down: 'mousedown',
      up: 'mouseup',
      move: 'mousemove',
      wheel: 'wheel'
    }
  }

  getMousePosition = (dom, x, y) => {
    const rect = dom.getBoundingClientRect()
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height]
  }

  getIntersects = (point, objects) => {
    this.mouse.set(point.x * 2 - 1, -(point.y * 2) + 1)
    this.raycaster.setFromCamera(this.mouse, this.camera)
    return this.raycaster.intersectObjects(objects, true)
  }

  handleSelectVariant = (value) => () => {
    const { selectVariantAction } = this.props
    selectVariantAction(value)
  }

  convertToFabricObjects = (elements) =>
    new Promise((resolve, reject) => {
      try {
        fabric.util.enlivenObjects(elements, (objects) => {
          resolve(objects)
        })
      } catch (e) {
        reject(e)
      }
    })

  loadFabricImage = (url) =>
    new Promise((resolve, reject) => {
      try {
        fabric.util.loadImage(
          url,
          (img) => resolve(img),
          undefined,
          'Anonymous'
        )
      } catch (e) {
        reject(e)
      }
    })

  loadCanvasTexture = async (object, reseting) => {
    try {
      const { onSetCanvasObject } = this.props
      const canvas = { text: {}, image: {}, path: {} }
      let elements = []
      const paths = []
      const imagesElements = []
      const imagesPromises = []
      const fonts = []
      const indexes = {}
      const { objects } = JSON.parse(object)
      let index = 0
      for (const el of objects) {
        const elId = shortid.generate()
        el.id = elId
        el.hasRotatingPoint = false
        indexes[elId] = index
        switch (el.type) {
          case CanvasElements.Text: {
            elements.push(el)
            fonts.push(el.fontFamily)
            const element = getTextCanvasElement(el)
            canvas.text[elId] = element
            break
          }
          case CanvasElements.Group: {
            if (el.isClipArtGroup) {
              const element = await getClipArtCanvasElement(el)
              canvas.path[elId] = element
              paths.push(el)
            } else {
              const element = getImageCanvas(el)
              canvas.image[elId] = element
              paths.push(el)
            }
            break
          }
          case CanvasElements.Polygon:
          case CanvasElements.Path: {
            const element = await getClipArtCanvasElement(el)
            canvas[el.isImage ? 'image' : 'path'][elId] = element
            paths.push(el)
            break
          }
          case CanvasElements.Image: {
            const element = getImageCanvas(el)
            canvas.image[elId] = element
            imagesElements.push(el)
            imagesPromises.push(this.loadFabricImage(el.src))
            break
          }
          default:
            break
        }
        index++
      }
      elements = [...elements, ...paths]
      let images = []
      if (!!imagesElements.length) {
        images = await Promise.all(imagesPromises)
      }
      images.forEach((img, index) => {
        const config = imagesElements[index] || {}
        const imageEl = new fabric.Image(img, { ...config })
        this.canvasTexture.add(imageEl)
      })
      const fontsPromises = fonts.map((font) => {
        const fontObserver = new FontFaceObserver(font)
        return fontObserver.load()
      })
      await Promise.all(fontsPromises)
      const fabricObjects = await this.convertToFabricObjects(elements)
      fabricObjects.forEach((o) => this.canvasTexture.add(o))
      if (reseting) {
        const {
          currentStyle: { accessoriesColor },
          onResetEditing
        } = this.props
        onResetEditing(canvas, accessoriesColor)
      } else {
        onSetCanvasObject(canvas, paths)
      }
      const temporalCanvasTexture = cloneDeep(this.canvasTexture.getObjects())
      temporalCanvasTexture.forEach((el) => {
        find(this.canvasTexture.getObjects(), (obj) => obj.id === el.id).moveTo(
          indexes[el.id]
        )
      })
      this.canvasTexture.renderAll()
    } catch (e) {
      console.error('Error loading canvas object: ', e.message)
    }
  }

  loadTextures = (design, product) =>
    new Promise((resolve, reject) => {
      try {
        const loadedTextures = {}
        const { brandingPng, colors } = design
        const { flatlock, bumpMap, zipper, binding, bibBrace, guideline } = product
        if (!!zipper) {
          const { white, black } = zipper
          this.zipper = {}
          if (white) {
            this.zipper.white = this.textureLoader.load(white)
            this.zipper.white.minFilter = THREE.LinearFilter
          }
          if (black) {
            this.zipper.black = this.textureLoader.load(black)
            this.zipper.black.minFilter = THREE.LinearFilter
          }
        }
        if (!!binding) {
          const { white, black } = binding
          this.binding = {}
          this.binding.white = this.textureLoader.load(white)
          this.binding.black = this.textureLoader.load(black)
          this.binding.white.minFilter = THREE.LinearFilter
          this.binding.black.minFilter = THREE.LinearFilter
        }
        if (!!bibBrace) {
          const { white, black } = bibBrace
          this.bibBrace = {}
          this.bibBrace.white = this.textureLoader.load(white)
          this.bibBrace.black = this.textureLoader.load(black)
          this.bibBrace.white.minFilter = THREE.LinearFilter
          this.bibBrace.black.minFilter = THREE.LinearFilter
        }
        if (!!flatlock) {
          loadedTextures.flatlock = this.textureLoader.load(flatlock)
        }
        if (!!brandingPng) {
          loadedTextures.branding = this.textureLoader.load(brandingPng)
          loadedTextures.branding.minFilter = THREE.LinearFilter
        }
        loadedTextures.bumpMap = this.textureLoader.load(bumpMap)
        loadedTextures.bumpMap.minFilter = THREE.LinearFilter

        if (!!guideline) {
          loadedTextures.guideline = this.textureLoader.load(guideline)
          loadedTextures.guideline.minFilter = THREE.LinearFilter
        }

        /**
         * I had to implement this because when we load one design
         * the colors had a propert from apollo, that causes fail on
         * the lodash reverse function.
         */
        const sanitizedColors = colors.map(({ color, image }) => ({
          color,
          image
        }))
        const reversedAreas = reverse(sanitizedColors)
        const images = []
        loadedTextures.colors = []
        reversedAreas.forEach(({ color, image }) => {
          loadedTextures.colors.push(color)
          images.push(image)
        })
        const loadedAreas = images.map((image) => {
          const areaTexture = this.textureLoader.load(image)
          areaTexture.minFilter = THREE.LinearFilter
          return areaTexture
        })
        loadedTextures.areas = loadedAreas
        resolve(loadedTextures)
      } catch (e) {
        reject(e)
      }
    })

  clearScene = () => {
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      object.children.forEach(({ material }) => {
        if (!!material) {
          const { map, bumpMap, alphaMap } = material
          if (map && map.dispose) map.dispose()
          if (bumpMap && bumpMap.dispose) bumpMap.dispose()
          if (alphaMap && alphaMap.dispose) alphaMap.dispose()
          if (material.dipose) material.dispose()
        }
      })
      if (this.zipper) {
        if (this.zipper.white) {
          this.zipper.white.dispose()
        }
        if (this.zipper.black) {
          this.zipper.black.dispose()
        }
        delete this.zipper
      }
      if (this.binding) {
        this.binding.white.dispose()
        this.binding.black.dispose()
        delete this.binding
      }
      if (this.bibBrace) {
        this.bibBrace.white.dispose()
        this.bibBrace.black.dispose()
        delete this.bibBrace
      }
      this.scene.remove(object)
    }
  }

  render3DModel = async (showBranding = true, newProduct, showGuidelines = false) => {
    /* Object and MTL load */
    const {
      onLoadModel,
      currentStyle,
      design,
      product: oldProduct,
      isEditing,
      onSetEditConfig,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      colors: areaColors,
      designHasChanges,
      isMobile,
    } = this.props
    const { retrySave } = this.state
    const product = newProduct || oldProduct
    const loadedTextures = await this.loadTextures(
      currentStyle,
      product,
      isEditing
    )
    const { accessoriesColor, designId } = currentStyle
    if (isEditing) {
      onSetEditConfig(loadedTextures.colors, accessoriesColor || {}, designId)
    } else {
      onLoadModel(true)
    }

    this.mtlLoader.load(product.mtl, (materials) => {
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        product.obj,
        (object) => {
          /* Object materials */
          const { children } = object
          const objectChildCount = children.length
          const { width, height } = currentStyle
          const CANVAS_SIZE =
            (isEditing && design.highResolution) || !isEditing
              ? HIGH_RESOLUTION_CANVAS
              : REGULAR_CANVAS
          const scaleFactorX = CANVAS_SIZE / width
          const scaleFactorY = CANVAS_SIZE / height
          this.setState({ scaleFactorX, scaleFactorY, objectChildCount })

          const getMeshIndex = (meshName) => {
            const index = findIndex(children, (mesh) => mesh.name === meshName)
            return index < 0 ? 0 : index
          }

          const meshIndex = getMeshIndex(MESH)

          const { flatlock, areas, bumpMap, branding, colors, guideline } = loadedTextures
          /* Stitching */
          if (!!flatlock) {
            const color =
              (isEditing && accessoriesColor.flatlockColor) ||
              stitchingColor.value
            const flatlockIndex = getMeshIndex(FLATLOCK)
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              alphaMap: flatlock,
              color
            })
            flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
            flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
            flatlockMaterial.alphaTest = 0.5
            children[flatlockIndex].material = flatlockMaterial
            this.setState({ flatlockIndex })
          }

          /* Zipper */
          if (!!this.zipper) {
            const color =
              (isEditing && accessoriesColor.zipperColor) || zipperColor
            const zipperIndex = getMeshIndex(ZIPPER)
            const zipperMaterial = new THREE.MeshPhongMaterial({
              map: this.zipper[color],
              transparent: true
            })
            children[zipperIndex].material = zipperMaterial
            this.setState({ zipperIndex })
          }
          /* Binding */
          if (!!this.binding) {
            const color =
              (isEditing && accessoriesColor.bindingColor) || bindingColor
            const bindingIndex = getMeshIndex(BINDING)
            const bindingMaterial = new THREE.MeshPhongMaterial({
              map: this.binding[color],
              transparent: true
            })
            children[bindingIndex].material = bindingMaterial
            this.setState({ bindingIndex })
          }
          /* Bib Brace */
          if (!!this.bibBrace) {
            const color =
              (isEditing && accessoriesColor.bibBraceColor) || bibColor
            const bibBraceIndex = getMeshIndex(BIB_BRACE)
            const bibBraceMaterial = new THREE.MeshPhongMaterial({
              map: this.bibBrace[color]
            })
            children[bibBraceIndex].material = bibBraceMaterial
            this.setState({ bibBraceIndex })
          }

          /* Back material */
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: new THREE.Color('#fafafa')
          })

          // Setup the texture layers
          const areasLayers = areas.map(() => children[meshIndex].clone())
          object.add(...areasLayers)
          /* Transparent predyed  */
          if (!showBranding && product.hasPredyed) {
            const brandingObj = children[meshIndex].clone()
            object.add(brandingObj)
            const brandingIndex = children.length - 1
            const brandingMaterial = new THREE.MeshPhongMaterial({
              side: THREE.FrontSide,
              bumpMap,
              opacity: 1,
              transparent: false
            })
            children[brandingIndex].material = brandingMaterial
            children[brandingIndex].name = BRANDING_MESH
          }
          children[meshIndex].material = insideMaterial
          /* Extra files loaded by MTL file */
          const labelIndex = findIndex(children, ({ name }) => name === RED_TAG)
          if (labelIndex >= 0) {
            object.children[labelIndex].material.color.set(DEFAULT_COLOR)
          }
          const propelPalmsIndex = findIndex(
            children,
            ({ name }) => name === PROPEL_PALMS
          )
          if (propelPalmsIndex >= 0) {
            object.children[propelPalmsIndex].material.color.set(DEFAULT_COLOR)
          }
          const gripTapeIndex = findIndex(
            children,
            ({ name }) => name === GRIP_TAPE
          )
          if (gripTapeIndex >= 0) {
            object.children[gripTapeIndex].material.color.set(DEFAULT_COLOR)
          }
          if (children && blackProducts[product.id]) {
            children.forEach((meshItem, indexMesh) => {
              if (meshItem && doubleSideMeshes[meshItem.name]) {
                object.children[indexMesh].material.side = THREE.DoubleSide
              }
              if (meshItem && blackMeshes[meshItem.name]) {
                object.children[indexMesh].material.transparent = true
                object.children[indexMesh].material.color.set(WHITE)
              }
            })
          }
          const svgColors = designHasChanges ? areaColors : colors
          areas.forEach(
            (map, index) =>
            (children[
              objectChildCount + index
            ].material = new THREE.MeshPhongMaterial({
              map,
              side: THREE.FrontSide,
              color: svgColors[index],
              bumpMap,
              transparent: true
            }))
          )

          /* Canvas */
          if (!newProduct) {
            this.canvasApplied = document.createElement('canvas')
            const MOBILE_SIZE = 512
            const CANVAS = !isMobile ? CANVAS_SIZE : MOBILE_SIZE
            this.canvasApplied.width = CANVAS
            this.canvasApplied.height = CANVAS
            const canvasConfig = {
              width: CANVAS,
              height: CANVAS,
              crossOrigin: 'Anonymous',
              selection: false,
              skipTargetFind: true
            }

            if (isMobile) {
              this.canvasTexture = new fabric.StaticCanvas(
                this.canvasApplied,
                canvasConfig
              )
            } else {
              this.canvasTexture = new fabric.Canvas(
                this.canvasApplied,
                canvasConfig
              )
            }
          }

          const canvasTexture = new THREE.CanvasTexture(this.canvasApplied)
          canvasTexture.minFilter = THREE.LinearFilter
          this.canvasTexture.on(
            'after:render',
            () => (canvasTexture.needsUpdate = true)
          )
          const canvasMaterial = new THREE.MeshPhongMaterial({
            map: canvasTexture,
            side: THREE.FrontSide,
            bumpMap,
            transparent: true
          })
          const canvasObj = children[meshIndex].clone()
          object.add(canvasObj)

          const childrenLength = children.length
          const canvasIndex = childrenLength - 1
          children[canvasIndex].material = canvasMaterial
          children[canvasIndex].name = CANVAS_MESH

          /* Branding  */
          if (!!branding && showBranding) {
            const brandingObj = children[meshIndex].clone()
            object.add(brandingObj)
            const brandingIndex = children.length - 1
            const brandingMaterial = new THREE.MeshPhongMaterial({
              map: branding,
              side: THREE.FrontSide,
              bumpMap,
              transparent: true
            })
            children[brandingIndex].material = brandingMaterial
            children[brandingIndex].name = BRANDING_MESH
          }

          /* Guidelines */
          if (!!guideline && showGuidelines) {
            const guideLineObj = children[meshIndex].clone()
            object.add(guideLineObj)
            const guideLineIndex = children.length - 1

            const guideLineMaterial = new THREE.MeshPhongMaterial({
              map: guideline,
              side: THREE.FrontSide,
              transparent: true,
            })
            children[guideLineIndex].material = guideLineMaterial
            children[guideLineIndex].name = GUIDELINE_MESH
          }

          /* Object Config */
          object.position.y = 0
          object.name = MESH_NAME
          this.scene.add(object)
          if (
            (design && design.canvasJson) ||
            (currentStyle.canvas && !isMobile)
          ) {
            this.loadCanvasTexture(design.canvasJson || currentStyle.canvas)
          }
          onLoadModel(false)
          if (retrySave) {
            this.setState({ retrySave: false }, () => this.takeDesignPicture(false))
          }
        },
        this.onProgress,
        this.onError
      )
    })
  }

  onProgress = (xhr) => {
    if (xhr.lengthComputable) {
      const progress = Math.round((xhr.loaded / xhr.total) * 100)
      this.setState({ progress })
    }
  }

  onError = (xhr) => console.error('Error: ' + xhr)

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

  lightUpdate = (changed) => {
    const { showDragmessage } = this.state
    if (showDragmessage) {
      this.setState({ showDragmessage: false })
    }
    // this.directionalLight.position.copy(this.camera.position)
  }

  cameraUpdate = ({ x, y, z }) => {
    if (this.camera) {
      this.camera.position.set(x, y, z)
      this.controls.target.set(0, 0, 0)
      this.controls.update()
    }
  }

  onWheel = (event) => {
    if (event && event.deltaY) {
      const actualZoom = this.camera.zoom * 100
      const newZoom = actualZoom + (event.deltaY * -1)
      if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
        this.handleOnChangeZoom(newZoom)
      }
    }
  }

  changeStitchingColor = (color) => {
    const { flatlockIndex } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      if (!!object.children[flatlockIndex]) {
        object.children[flatlockIndex].material.color.set(color)
      }
    } else {
      console.error('3D model is not loaded')
    }
  }

  getLayersIndexed = (canvas) => {
    if (canvas && this.canvasTexture) {
      const objects = this.canvasTexture.getObjects() || []
      objects.forEach((obj, index) => {
        const { type, id, fileId = '' } = obj
        if (canvas[type] && canvas[type][id]) {
          canvas[type][id].index = index
          if (type === 'image') {
            canvas[type][id].fileId = fileId
          }
        }
      })
    }
    return canvas
  }

  changeLayerIndex = (id, index) => {
    if (this.canvasTexture) {
      find(this.canvasTexture.getObjects(), (obj) => obj.id === id).moveTo(
        index
      )
      this.canvasTexture.renderAll()
    }
  }

  changeExtraColor = (texture, color) => {
    const { bibBraceIndex, zipperIndex, bindingIndex } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      const loadedTexture = this[texture]
      if (loadedTexture && loadedTexture[color]) {
        const map = loadedTexture[color]
        switch (texture) {
          case ZIPPER_NAME:
            if (object.children[zipperIndex]) {
              object.children[zipperIndex].material.map = map
            }
            break
          case BIB_BRACE_NAME:
            if (object.children[bibBraceIndex]) {
              object.children[bibBraceIndex].material.map = map
            }
            break
          case BINDING_NAME:
            if (object.children[bindingIndex]) {
              object.children[bindingIndex].material.map = map
            }
          default:
            break
        }
      }
    } else {
      console.error('Model is not loaded')
    }
  }

  setupColors = (colors) => {
    if (!this.scene) {
      return
    }
    const { objectChildCount } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (object) {
      colors.forEach((color, index) => {
        if (object.children[objectChildCount + index]) {
          object.children[objectChildCount + index].material.color.set(color)
        }
      })
    }
  }

  setupHoverColor = (colorBlockHovered) => {
    if (!this.scene) {
      return
    }
    const object = this.scene.getObjectByName(MESH_NAME)
    const { objectChildCount } = this.state
    const { colors } = this.props
    if (object && colorBlockHovered >= 0) {
      object.children[objectChildCount + colorBlockHovered].material.color.set(
        SELECTION_3D_AREA
      )
    } else {
      this.setupColors(colors)
    }
  }

  handleGoToTutorials = () => {
    const { onTabClick } = this.props
    if (typeof window !== 'undefined') {
      const { product: { name } } = this.props
      window.dataLayer.push({ event: TUTORIALS_BUTTON, label: name })
    }
    onTabClick(CustomizeTabs.TutorialsTab)
  }

  handleOnPressLeft = () => {
    const { currentView } = this.state
    const nextView =
      currentView === BACK_VIEW || currentView === TOP_VIEW
        ? LEFT_VIEW
        : currentView - 1
    const viewPosition = viewPositions[nextView]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: nextView })
  }

  handleOnPressRight = () => {
    const { currentView } = this.state
    const nextView =
      currentView === LEFT_VIEW || currentView === TOP_VIEW
        ? BACK_VIEW
        : currentView + 1
    const viewPosition = viewPositions[nextView]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: nextView })
  }

  handleOnPressTop = () => {
    const viewPosition = viewPositions[TOP_VIEW]
    this.cameraUpdate(viewPosition)
    this.setState({ currentView: TOP_VIEW })
  }

  handleOnChangeZoom = (value) => {
    if (this.camera) {
      this.camera.zoom = value / 100.0
      this.camera.updateProjectionMatrix()
      this.forceUpdate()
    }
  }

  onKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase()
    if (event.shiftKey && event.ctrlKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickRedo()
    } else if (event.ctrlKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickUndo()
    }

    // For MAC we can use metaKey to detect cmd key
    if (event.shiftKey && event.metaKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickRedo()
    } else if (event.metaKey && charCode === 'z') {
      event.preventDefault()
      this.handleOnClickUndo()
    }
  }

  handleOnClickUndo = () => {
    const { onUndoAction, undoChanges, undoEnabled } = this.props
    if (undoEnabled) {
      const changeToApply = undoChanges[0]
      const {
        type,
        state: { id }
      } = changeToApply
      switch (type) {
        case Changes.Add:
          this.deleteElementById(id)
          break
        case Changes.Delete:
          this.reAddCanvasElement(changeToApply)
          break
        case Changes.Resize:
          this.resizeCanvasElement(changeToApply)
          break
        case Changes.Drag:
          this.dragCanvasElement(changeToApply)
          break
        case Changes.CanvasStyle:
          this.styleCanvasElement(changeToApply)
          break
        case Changes.Rotate:
          this.rotateCanvasElement(changeToApply)
          break
        case Changes.ChangeText:
          this.changeTextCanvasElement(changeToApply)
          break
        case Changes.Duplicate:
          this.deleteDuplicateCanvasElement(changeToApply)
          break
        default:
          break
      }
      onUndoAction()
      this.canvasTexture.discardActiveObject()
      this.canvasTexture.renderAll()
    }
  }

  handleOnClickRedo = () => {
    const { onRedoAction, redoChanges, redoEnabled } = this.props
    if (redoEnabled) {
      const changeToApply = redoChanges[0]
      const {
        type,
        state: { id }
      } = changeToApply
      let skipRedo = false
      switch (type) {
        case Changes.Add:
          this.reAddCanvasElement(changeToApply)
          break
        case Changes.Delete:
          this.deleteElementById(id)
        case Changes.Resize:
          this.resizeCanvasElement(changeToApply, true)
          break
        case Changes.Drag:
          this.dragCanvasElement(changeToApply, true)
          break
        case Changes.CanvasStyle:
          this.styleCanvasElement(changeToApply, true)
          break
        case Changes.Rotate:
          this.rotateCanvasElement(changeToApply, true)
          break
        case Changes.ChangeText:
          this.changeTextCanvasElement(changeToApply, true)
          break
        case Changes.Duplicate:
          this.reDuplicateCanvasElement(changeToApply)
          skipRedo = true
          break
        default:
          break
      }
      if (!skipRedo) onRedoAction()
      this.canvasTexture.discardActiveObject()
      this.canvasTexture.renderAll()
    }
  }

  deleteDuplicateCanvasElement = (canvasElement) => {
    const {
      state: { id }
    } = canvasElement
    this.deleteElementById(id)
  }

  reDuplicateCanvasElement = (canvasElement) => {
    const {
      state: { id, originalId }
    } = canvasElement
    const element = this.getElementById(originalId)
    if (element) {
      this.duplicateElement(element, id)
    }
  }

  changeTextCanvasElement = (canvasElement, applyNewText = false) => {
    const {
      state: { id, oldText, newText }
    } = canvasElement
    const element = this.getElementById(id)
    if (element) {
      let text = applyNewText ? newText : oldText
      element.set({ text })
      this.canvasTexture.renderAll()
    }
  }

  rotateByAngle = (newAngle, idElement) => {
    const element = this.getElementById(idElement)
    const constraintPosition = element.translateToOriginPoint(
      element.getCenterPoint(),
      CENTER_ORIGIN,
      CENTER_ORIGIN
    )
    element.set({
      angle: newAngle
    })
    element.setPositionByOrigin(
      constraintPosition,
      CENTER_ORIGIN,
      CENTER_ORIGIN
    )
    element.setCoords()
  }

  rotateCanvasElement = (canvasElement, applyNewRotation = false) => {
    const {
      state: {
        id,
        fromTool,
        oldAngle,
        angle,
        oldRotation,
        newRotation,
        currentTransform
      }
    } = canvasElement
    if (fromTool) {
      const newAngle = applyNewRotation ? angle : oldAngle
      this.rotateByAngle(newAngle, id)
    } else {
      const { x, y } = applyNewRotation ? newRotation : oldRotation
      this.rotateObject(x, y, currentTransform, id)
    }
  }

  styleCanvasElement = (canvasElement, newStyle = false) => {
    const {
      state: { id, newFormat, oldFormat }
    } = canvasElement

    const element = this.getElementById(id)
    let format = newStyle ? newFormat : oldFormat
    if (element) {
      if (element.isClipArtGroup) {
        element.forEachObject((o) => o.set({ ...format }))
      }
      element.set({ ...format })
      this.canvasTexture.renderAll()
    }
  }

  resizeCanvasElement = (canvasElement, newScale = false) => {
    const {
      state: { id, oldScaleX, oldScaleY, scaleX: newScaleX, scaleY: newScaleY }
    } = canvasElement
    const element = this.getElementById(id)
    if (element) {
      let scaleX = oldScaleX
      let scaleY = oldScaleY
      if (newScale || newScaleX < 0) {
        scaleX = newScaleX
        scaleY = newScaleY
      }
      element
        .set({
          scaleX,
          scaleY
        })
        .setCoords()
      this.canvasTexture.renderAll()
    }
  }

  dragCanvasElement = (canvasElement, newPosition = false) => {
    const {
      state: { id, oldLeft, oldTop, left: newLeft, top: newTop }
    } = canvasElement
    const element = this.getElementById(id)
    if (element) {
      let left = oldLeft
      let top = oldTop
      if (newPosition) {
        left = newLeft
        top = newTop
      }
      element
        .set({
          left,
          top
        })
        .setCoords()
      this.canvasTexture.renderAll()
    }
  }

  handleOnOpenResetModal = () => {
    const { openResetDesignModalAction } = this.props
    openResetDesignModalAction(true)
  }

  openModalText = () => {
    const { formatMessage } = this.props
    const { editorReady, editorState, Editor } = this.state
    if (editorReady) {
      Modal.info({
        icon: ' ',
        width: 616,
        centered: true,
        className: 'modal-link',
        okText: formatMessage(messages.okGotIt),
        okButtonProps: {
          style: buttonStyle
        },
        content:
          <InfoBody>
            <Editor
              {...{ editorState }}
              toolbarHidden={true}
              readOnly={true}
            />
          </InfoBody>
      })
    }
  }

  handleOnOpenPlaceholderModal = () => {
    const { openResetPlaceholderModalAction } = this.props
    openResetPlaceholderModalAction(true)
  }

  onCloseResetModal = () => {
    const { openResetDesignModalAction } = this.props
    openResetDesignModalAction(false)
  }

  onCloseResetPlaceholderModal = () => {
    const { openResetPlaceholderModalAction } = this.props
    openResetPlaceholderModalAction(false)
  }

  onReset = () => {
    const {
      isEditing,
      design,
      onResetAction,
      currentStyle,
      openResetPlaceholderModal
    } = this.props
    this.canvasTexture.clear()
    if (openResetPlaceholderModal || (!isEditing && !currentStyle.canvas)) {
      onResetAction()
      return
    }
    if (design && design.canvasJson) {
      this.loadCanvasTexture(design.canvasJson, true)
    }
    if (currentStyle.canvas) {
      onResetAction()
      this.loadCanvasTexture(currentStyle.canvas)
    }
  }

  handleOnClickGuides = () => {
    const { onClickGuides } = this.props
    onClickGuides()
  }

  handleOnClickClear = () => this.props.onClearAction()

  handleOnTakeDesignPicture = () => this.takeDesignPicture(false)

  openPreviewAction = async () => {
    const {
      showGuidelines,
      selectVariantAction,
      onClickGuides,
      openPreview,
      openPreviewModal
    } = this.props
    const { retrySave } = this.state
    if (!openPreviewModal) {
      if (showGuidelines && !retrySave) {
        this.setState({ retrySave: true }, () => onClickGuides(false))
        return
      }
      selectVariantAction(-1)
      if (this.renderer) {
        const {
          currentStyle,
          isMobile,
          isEditing,
          design
        } = this.props
        if (!isMobile) {
          this.canvasTexture.forEachObject((el) => {
            el.set({
              opacity: 1,
              backgroundColor: null
            })
          })
          this.canvasTexture.discardActiveObject()
          this.canvasTexture.renderAll()
        }
        const highResolution = (isEditing && design.highResolution) || !isEditing
        const designCanvas = this.canvasTexture.toObject(EXTRA_FIELDS)
        const canvasJson = JSON.stringify(designCanvas)
        const saveDesign = {
          canvasJson,
          styleId: currentStyle.id,
          highResolution
        }
        await openPreview(saveDesign)
      }
    } else {
      await openPreview({})
    }
  }

  takeDesignPicture = (automaticSave = false) => {
    const {
      isUserAuthenticated,
      openLoginAction,
      selectedVariant,
      showGuidelines,
      selectVariantAction,
      onClickGuides
    } = this.props
    const { retrySave } = this.state
    this.setupHoverColor(-1)
    if (showGuidelines && !retrySave) {
      this.setState({ retrySave: true }, () => onClickGuides(false))
      return
    }
    selectVariantAction(-1)
    if (!isUserAuthenticated) {
      openLoginAction(true)
      return
    }
    if (this.renderer) {
      const {
        onOpenSaveDesign,
        currentStyle,
        isMobile,
        isEditing,
        design
      } = this.props
      if (!isMobile) {
        this.canvasTexture.forEachObject((el) => {
          el.set({
            opacity: 1,
            backgroundColor: null
          })
        })
        this.canvasTexture.discardActiveObject()
        this.canvasTexture.renderAll()
      }
      const highResolution = (isEditing && design.highResolution) || !isEditing
      const viewPosition = viewPositions[2]
      this.handleOnChangeZoom(THUMBNAIL_ZOOM)
      this.cameraUpdate(viewPosition)
      this.setState({ currentView: 2 }, () =>
        setTimeout(
          () => {
            const designBase64 = this.renderer.domElement.toDataURL('image/png')
            const designCanvas = this.canvasTexture.toObject(EXTRA_FIELDS)
            const canvasJson = JSON.stringify(designCanvas)
            const saveDesign = {
              canvasJson,
              designBase64,
              styleId: currentStyle.id,
              highResolution
            }
            onOpenSaveDesign(true, saveDesign, automaticSave)
          },
          selectedVariant !== -1 || showGuidelines ? 5000 : 500
        )
      )
    }
  }
  render() {
    const { showDragmessage, currentView, progress, showHelpModal } = this.state
    const {
      onPressQuickView,
      undoEnabled,
      redoEnabled,
      loadingModel,
      formatMessage,
      productName,
      selectedVariant,
      variants,
      openResetDesignModal,
      designHasChanges,
      product,
      previewImage,
      openPreviewModal,
      isMobile,
      openResetPlaceholderModal,
      currentStyle,
      openDesignCheckModal,
      showGuidelines,
      proAssistId,
      previewProgress
    } = this.props
    const { hasModal, modalLinkText, guideline } = product || {}
    if (isMobile) {
      return (
        <MobileContainer>
          <Render
            id="render-3d"
            innerRef={(container) => (this.container = container)}
          >
            {loadingModel && <Progress type="circle" percent={progress + 1} />}
          </Render>
          {showDragmessage && false && (
            <DragText>
              <FormattedMessage {...messages.drag} />
            </DragText>
          )}
          {hasModal &&
            <ModalLinkText onClick={this.openModalText}>
              {modalLinkText}
            </ModalLinkText>
          }
          <HelpModal
            open={showHelpModal}
            withLogo={false}
            requestClose={this.handleHelpModal}
          >
            <HintModalImage src={mobileHintImg} alt="" />
            {!showHint && (
              <TurnOffHintRow>
                <Checkbox onChange={this.disableHelpModal}>
                  {formatMessage(messages.turOffHintMobile)}
                </Checkbox>
              </TurnOffHintRow>
            )}
          </HelpModal>
          <MobileHintIcon src={helpTooltip} onClick={this.handleHelpModal} />
          {variants.length > 1 && (
            <Variants {...{ isMobile }}>
              {variants.map(({ icon }, index) => (
                <VariantButton
                  key={index}
                  onClick={this.handleSelectVariant(index)}
                  selected={selectedVariant === index}
                  src={icon || JakrooLogo}
                />
              ))}
            </Variants>
          )}
        </MobileContainer>
      )
    }
    const zoom = this.camera ? this.camera.zoom * 100 : INITIAL_ZOOM * 100
    const showHint = this.getHelpModalValueFromLocal()

    {
      /*
      // TODO: JV2 - Phase II
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
    )*/
    }

    return (
      <Container onKeyDown={this.onKeyDown} tabIndex="0">
        <Row>
          <Model>{productName}</Model>
          <QuickView onClick={onPressQuickView} src={quickView} />
          <HintIcon src={helpTooltip} onClick={this.handleHelpModal} />
          {variants.length > 1 && (
            <Variants>
              {variants.map(({ icon }, index) => (
                <VariantButton
                  key={index}
                  onClick={this.handleSelectVariant(index)}
                  selected={selectedVariant === index}
                  src={icon || JakrooLogo}
                />
              ))}
            </Variants>
          )}
        </Row>
        {hasModal &&
          <ModalLinkText onClick={this.openModalText}>
            {modalLinkText}
          </ModalLinkText>
        }
        <ButtonWrapper>
          {!proAssistId && (
            <DesignCheckButton onClick={openDesignCheckModal}>
              <Icon src={PROAssistButton} />
              <ProAssistText>
                <FormattedMessage
                  {...messages.proAssist}
                  values={{
                    proLabel: <b>{formatMessage(messages.proLabel)}</b>
                  }}
                />
              </ProAssistText>
            </DesignCheckButton>
          )}
          <Button type="primary" onClick={this.handleOnTakeDesignPicture}>
            {formatMessage(messages.saveButton)}
          </Button>
        </ButtonWrapper>
        <Render
          id="render-3d"
          innerRef={(container) => (this.container = container)}
        >
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
        {showDragmessage && false && (
          <DragText>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
        {/*
          // TODO: JV2 - Phase II
          <Dropdown overlay={menu}>
          <ModelType>
            <ModelText>3D Model: Product Only</ModelText>
            <img src={arrowDown} />
          </ModelType>
        </Dropdown>
        */}
        <OptionsController
          {...{ undoEnabled, redoEnabled, formatMessage, guideline, showGuidelines }}
          placeholders={currentStyle.canvas}
          resetEnabled={designHasChanges}
          onClickUndo={this.handleOnClickUndo}
          onClickGuides={this.handleOnClickGuides}
          onClickRedo={this.handleOnClickRedo}
          onClickReset={this.handleOnOpenResetModal}
          onClickClear={this.handleOnClickClear}
          onClickResetPlaceholder={this.handleOnOpenPlaceholderModal}
        />
        {!loadingModel &&
          <PrintPreviewLabel hide={true} onClick={this.openPreviewAction}>
            <PrintPreviewIcon src={printPreviewImg} />
            <Modal
              style={{
                maxWidth: '925px',
                minHeight: '128px',
                maxHeight: '768px',
                padding: '0 20px'
              }}
              bodyStyle={{
                padding: '8px',
                paddingTop: '43px',
                alignItems: 'center',
                minHeight: '328px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onCancel={this.openPreviewAction}
              footer={null}
              width="100%"
              visible={openPreviewModal}
            >
              {!!previewImage ?
                <PrintImage src={previewImage} /> : (
                  <div>
                    <LoadingPreviewText>
                      {formatMessage(messages.loadingPreview)}
                    </LoadingPreviewText>
                    <PreviewProgress percent={previewProgress} />
                  </div>
                )}
            </Modal>
          </PrintPreviewLabel>
        }
        <Slider value={zoom} onChangeZoom={this.handleOnChangeZoom} />
        {config.tutorialsTabActive === 'true' && (
          <TutorialButton onClick={this.handleGoToTutorials}>
            <TutorialIcon src={tutorials} />
          </TutorialButton>
        )}
        <ViewControls {... { proAssistId }}>
          <TopButton onClick={this.handleOnPressTop} src={top} />
          <BottomControls>
            <ViewButton onClick={this.handleOnPressLeft} src={left} />
            <img src={cubeViews[currentView]} />
            <ViewButton onClick={this.handleOnPressRight} src={right} />
          </BottomControls>
        </ViewControls>
        {/* Reset Modal */}
        <Modal
          visible={openResetDesignModal || openResetPlaceholderModal}
          title={<ModalTitle title={formatMessage(messages.modalResetTitle)} />}
          footer={
            <ModalFooter
              onOk={this.onReset}
              onCancel={
                openResetPlaceholderModal
                  ? this.onCloseResetPlaceholderModal
                  : this.onCloseResetModal
              }
              {...{ formatMessage }}
            />
          }
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(
              openResetPlaceholderModal
                ? messages.modalResetPlaceholderMessage
                : messages.modalResetMessage
            )}
          </ModalMessage>
        </Modal>
        <HelpModal
          open={showHelpModal}
          withLogo={false}
          requestClose={this.handleHelpModal}
        >
          <HintModalImage src={hintImg} alt="" />
          {!showHint && (
            <TurnOffHintRow>
              <Checkbox onChange={this.disableHelpModal}>
                {formatMessage(messages.turOffHint)}
              </Checkbox>
            </TurnOffHintRow>
          )}
        </HelpModal>
      </Container>
    )
  }

  disableHelpModal = (evt) => {
    const {
      target: { checked }
    } = evt
    if (typeof window !== 'undefined') {
      localStorage.setItem('disableDesignCenterHint', checked)
    }
  }

  handleHelpModal = () => {
    const { showHelpModal } = this.state
    this.setState({ showHelpModal: !showHelpModal })
  }

  getHelpModalValueFromLocal = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('disableDesignCenterHint')
    }
  }

  setSelectedLayer = (id, type) => {
    const { onSelectEl } = this.props
    if (id) {
      const el = this.getElementById(id)
      this.controls.enabled = false
      this.hoverBlur(id, false)
      this.canvasTexture.setActiveObject(el)
    } else {
      this.canvasTexture.discardActiveObject()
    }
    onSelectEl(id, type)
    this.canvasTexture.renderAll()
  }

  hoverBlur = (id, hover) => {
    const el = this.getElementById(id)
    const opacity = hover ? 0.5 : 1
    const backgroundColor = hover ? RED_TRANSPARENT : null
    if (el) {
      el.set({ opacity, backgroundColor })
    }
    this.canvasTexture.renderAll()
  }

  deleteLayer = (id) => {
    const el = this.getElementById(id)
    this.deleteElement(el)
    this.canvasTexture.renderAll()
  }

  applyPosition = (data, type) => {
    const activeEl = this.canvasTexture.getActiveObject()
    if (activeEl) {
      const {
        left: oldLeft,
        top: oldTop,
        scaleX: oldScaleX,
        scaleY: oldScaleY,
        flipX: oldFlipX,
        angle: oldAngle
      } = activeEl
      const oldValues = {
        oldAngle,
        oldLeft,
        oldTop,
        oldScaleX,
        oldScaleY,
        oldFlipX
      }
      const { selectedElement, canvas } = this.props
      const selectedGraphicElement =
        canvas.image[selectedElement] ||
        canvas.path[selectedElement] ||
        canvas.text[selectedElement]
      const { width: elmWidth, height: elmHeight, angle } = activeEl
      let width = elmWidth
      let height = elmHeight
      if (selectedGraphicElement && selectedGraphicElement.imageSize) {
        const {
          imageSize: { width: imageWidth, height: imageHeight }
        } = selectedGraphicElement
        width = imageWidth
        height = imageHeight
      }
      const {
        width: cmWidth,
        height: cmHeight,
        rotation,
        horizontal,
        vertical
      } = data
      const { scaleX, scaleY } = this.getSizeInPixels(
        cmWidth,
        cmHeight,
        width,
        height
      )
      const constraintPosition = activeEl.translateToOriginPoint(
        activeEl.getCenterPoint(),
        CENTER_ORIGIN,
        CENTER_ORIGIN
      )
      activeEl.set({
        scaleX,
        scaleY,
        left: horizontal,
        top: vertical,
        angle: rotation
      })
      if (angle !== rotation) {
        activeEl.setPositionByOrigin(
          constraintPosition,
          CENTER_ORIGIN,
          CENTER_ORIGIN
        )
      }
      activeEl.setCoords()
      this.canvasTexture.renderAll()
      this.storeAction(type, oldValues)
    }
  }

  applyCanvasEl = (canvasEl) => {
    if (this.canvasTexture) {
      const { isFirstAdd } = this.state
      const objects = this.canvasTexture.getObjects()
      if (!objects.length && isFirstAdd) {
        let element = canvasEl.type
        if (canvasEl.type === CanvasElements.Path) {
          element = 'symbol'
        }
        const modal = Modal.info({
          title: 'Getting started',
          content: `Click the position, where the ${element} should be placed`,
          okText: 'Got it!',
          okType: 'default'
        })
        setTimeout(() => modal.destroy(), 10000)
        document.getElementById('render-3d').style.cursor = 'no-drop'
        this.setState({ canvasEl, isFirstAdd: false })
      } else {
        document.getElementById('render-3d').style.cursor = 'no-drop'
        this.setState({ canvasEl })
      }
    }
  }

  reAddCanvasElement = (canvasEl) => {
    const {
      state: {
        id,
        type,
        style,
        src,
        position,
        isClipArtGroup,
        fileId,
        fileUrl,
        rotation
      }
    } = canvasEl
    switch (type) {
      case CanvasElements.Group:
        if (!isClipArtGroup) {
          this.applyGroup(src, position, id, rotation)
          break
        }
      case CanvasElements.Polygon:
      case CanvasElements.Path:
        const source = src || fileUrl
        this.applyClipArt(source, style, position, id, fileId, rotation)
        break
      case CanvasElements.Text:
        this.applyText(src, style, position, id, rotation)
        break
      case CanvasElements.Image:
        this.applyImage(src, position, id, rotation)
        break
    }
  }

  applyImage = (file = {}, position = {}, idElement, rotation) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const { fileUrl, size: imageSize, id: fileId, type } = file
    const id = idElement || shortid.generate()
    fabric.util.loadImage(
      fileUrl,
      (img) => {
        const imageEl = new fabric.Image(img, {
          id,
          crossOrigin: 'Anonymous',
          hasRotatingPoint: false,
          ...position
        })

        const scaleX = position.scaleX || scaleFactorX
        const scaleY = position.scaleY || scaleFactorY
        if (rotation) {
          const { constraintPosition, angle } = rotation
          imageEl
            .set({ scaleX, scaleY, fileId, angle })
            .setPositionByOrigin(
              constraintPosition,
              CENTER_ORIGIN,
              CENTER_ORIGIN
            )
        } else {
          imageEl.set({ scaleX, scaleY, fileId })
        }
        imageEl.setCoords()
        this.canvasTexture.add(imageEl)

        const el = {
          id,
          imageSize,
          type,
          ...position,
          fileId,
          src: fileUrl,
          scaleX,
          scaleY,
          lock: false
        }
        position.scaleX = scaleX
        position.scaleY = scaleY
        if (!idElement) {
          const { onApplyCanvasEl } = this.props
          onApplyCanvasEl(el, CanvasElements.Image, undefined, {
            src: file,
            style: undefined,
            position,
            fileId
          })
          this.canvasTexture.setActiveObject(imageEl)
        } else {
          const { onReApplyImageEl } = this.props
          onReApplyImageEl(el)
        }
        this.canvasTexture.renderAll()
      },
      undefined,
      'Anonymous'
    )
  }

  applyText = (text, style, position = {}, idElement, rotation) => {
    if (!this.canvasTexture || !text) {
      return
    }

    const activeEl = this.canvasTexture.getActiveObject()

    let txtEl = {}
    if (activeEl && activeEl.type === CanvasElements.Text && !idElement) {
      const { text: oldText } = activeEl
      if (text !== oldText) {
        this.props.onCanvasElementTextChanged(oldText, text)
      }
      activeEl.set({ text, ...style })
      this.canvasTexture.renderAll()
    } else {
      const { onApplyCanvasEl } = this.props
      const id = idElement || shortid.generate()

      txtEl = new fabric.Text(text, {
        id,
        hasRotatingPoint: false,
        fontSize: 50,
        scaleX: 1.0,
        scaleY: 1.0,
        ...position,
        ...style
      })
      if (rotation) {
        const { constraintPosition, angle } = rotation
        txtEl
          .set({ angle })
          .setPositionByOrigin(constraintPosition, CENTER_ORIGIN, CENTER_ORIGIN)
        txtEl.setCoords()
      } else {
      }
      this.canvasTexture.add(txtEl)
      if (!idElement) {
        this.canvasTexture.setActiveObject(txtEl)
      }

      this.canvasTexture.renderAll()
      let activeElementId
      if (activeEl && activeEl.type === CanvasElements.Text) {
        activeElementId = activeEl.id
      }

      if (!idElement) {
        const el = {
          id: activeElementId || txtEl.id,
          text,
          textFormat: style,
          lock: false
        }
        onApplyCanvasEl(el, CanvasElements.Text, !!activeEl, {
          src: text,
          style,
          position
        })
      }
    }
  }

  applyClipArt = (
    src,
    style = {},
    position = {},
    idElement,
    fileId,
    rotation
  ) => {
    const activeEl = this.canvasTexture.getActiveObject()
    const { scaleFactorX, scaleFactorY } = this.state
    const type = activeEl && activeEl.get('type')
    const isGroup = type === CanvasElements.Group
    const isClipArtElement = type === CanvasElements.Path || isGroup
    if (isClipArtElement && !idElement && !activeEl.isImageGroup) {
      if (isGroup && activeEl.forEachObject) {
        const { fill, stroke, strokeWidth } = style
        activeEl.forEachObject((o) => o.set({ fill, stroke, strokeWidth }))
        activeEl.set({ fill, stroke, strokeWidth })
      } else {
        activeEl.set({ ...style })
      }
      this.canvasTexture.renderAll()
    } else {
      const { onApplyCanvasEl } = this.props
      fabric.loadSVGFromURL(src, (objects, options) => {
        const id = idElement || shortid.generate()
        const newObjects = objects && objects.length > 0 ? objects.filter((item) => item.visible) : []
        const shape = fabric.util.groupSVGElements(newObjects || [], options)
        const isClipArtGroup = shape.type === CanvasElements.Group
        const shapeObject = {
          id,
          isClipArtGroup,
          fileId,
          fileUrl: src,
          hasRotatingPoint: false,
          ...position,
          ...style
        }

        const scaleX = position.scaleX || scaleFactorX
        const scaleY = position.scaleY || scaleFactorY
        if (rotation) {
          const { constraintPosition, angle } = rotation
          shape
            .set({ ...shapeObject, scaleX, scaleY, angle })
            .setPositionByOrigin(
              constraintPosition,
              CENTER_ORIGIN,
              CENTER_ORIGIN
            )
        } else {
          shape.set({ ...shapeObject, scaleX, scaleY })
        }
        shape.setCoords()

        if (isClipArtGroup && !isEmpty(style)) {
          shape.forEachObject((o) => o.set({ ...style }))
        }
        this.canvasTexture.add(shape)
        downloadSVG(src).then((svg) => {
          const el = {
            id,
            src,
            svg,
            fill: BLACK,
            stroke: BLACK,
            strokeWidth: 0,
            ...style,
            lock: false
          }
          position.scaleX = scaleX
          position.scaleY = scaleY
          if (!idElement) {
            onApplyCanvasEl(el, CanvasElements.Path, false, {
              src,
              style,
              position,
              fileId
            })
            this.canvasTexture.setActiveObject(shape)
          }
          this.canvasTexture.renderAll()
        })
      })
    }
  }

  applyGroup = (file = {}, position = {}, idElement, rotation, isImage = false) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const { fileUrl: src, size: imageSize, id: fileId, type } = file
    fabric.loadSVGFromURL(src, (objects, options) => {
      const id = idElement || shortid.generate()
      const newObjects = objects && objects.length > 0 ? objects.filter((item) => item.visible) : []
      const shape = fabric.util.groupSVGElements(newObjects || [], options)
      const shapeObject = {
        id,
        fileId,
        fileUrl: src,
        isImageGroup: true,
        isImage,
        hasRotatingPoint: false,
        ...position
      }

      const scaleX = position.scaleX || scaleFactorX
      const scaleY = position.scaleY || scaleFactorY
      if (rotation) {
        const { constraintPosition, angle } = rotation
        shape
          .set({ ...shapeObject, scaleX, scaleY, angle })
          .setPositionByOrigin(constraintPosition, CENTER_ORIGIN, CENTER_ORIGIN)
      } else {
        shape.set({ ...shapeObject, scaleX, scaleY })
      }
      shape.setCoords()
      this.canvasTexture.add(shape)

      const el = { id, imageSize, type, fileId, src, scaleX, scaleY, isImage }
      position.scaleX = scaleX
      position.scaleY = scaleY
      if (!idElement) {
        const { onApplyCanvasEl } = this.props
        onApplyCanvasEl(el, CanvasElements.Image, undefined, {
          src: file,
          style: undefined,
          position,
          fileId
        })
        this.canvasTexture.setActiveObject(shape)
      } else {
        const { onReApplyImageEl } = this.props
        onReApplyImageEl(el)
      }
      this.canvasTexture.renderAll()
    })
  }

  deleteElement = (el) => {
    const { canvas } = this.props
    const type = el.get('type')
    const isImage = el.get('isImage')
    const { id, left, top, scaleX, scaleY, isClipArtGroup, angle } = el
    let rotation = null
    if (angle > 0) {
      const constraintPosition = el.translateToOriginPoint(
        el.getCenterPoint(),
        CENTER_ORIGIN,
        CENTER_ORIGIN
      )
      rotation = { angle, constraintPosition }
    }
    const canvasObject = {
      position: { left, top, scaleX, scaleY },
      rotation
    }
    switch (type) {
      case CanvasElements.Text:
        {
          const {
            text,
            fill,
            fontFamily,
            stroke,
            strokeWidth,
            textAlign,
            charSpacing,
            fontSize,
            lineHeight
          } = el
          canvasObject.src = text
          canvasObject.style = {
            fill,
            fontFamily,
            stroke,
            strokeWidth,
            textAlign,
            charSpacing,
            fontSize,
            lineHeight
          }
        }
        break
      case CanvasElements.Group:
        if (!isClipArtGroup) {
          {
            const object = canvas.image[id]
            const { fileId, imageSize, type } = object
            const { fileUrl } = el
            canvasObject.src = {
              id: fileId,
              fileUrl,
              size: imageSize,
              type
            }
            canvasObject.fileId = fileId
          }
          break
        }
      case CanvasElements.Polygon:
      case CanvasElements.Path:
        {
          const { fill, stroke, strokeWidth, fileId, fileUrl } = el
          canvasObject.style = {
            fill: fill || BLACK,
            stroke: stroke || BLACK,
            strokeWidth: strokeWidth || 0
          }
          if (fileUrl) {
            canvasObject.src = fileUrl
            canvasObject.fileId = fileId
            canvasObject.fileUrl = fileUrl
            canvasObject.isClipArtGroup = isClipArtGroup
          }
        }
        break
      case CanvasElements.Image:
        {
          const object = canvas.image[id]
          const { src, fileId, imageSize, type } = object
          canvasObject.src = { id: fileId, fileUrl: src, size: imageSize, type }
          canvasObject.fileId = fileId
        }
        break
    }
    let typeRemove = isImage ? CanvasElements.Image : type
    if (type === CanvasElements.Group && !isImage) {
      typeRemove = CanvasElements.Path
    }
    const { onRemoveEl } = this.props
    onRemoveEl(id, typeRemove, canvasObject)
    this.canvasTexture.remove(el)
  }

  getElementById = (id, inCentimeters) => {
    if (this.canvasTexture) {
      const objects = this.canvasTexture.getObjects()
      const element = find(objects, { id })
      if (inCentimeters) {
        const { canvas } = this.props
        const selectedGraphicElement =
          canvas.image[id] || canvas.path[id] || canvas.text[id] || {}
        const imageSize = selectedGraphicElement.imageSize || {
          width: element.width,
          height: element.height
        }
        const { width, height } = this.getSizeInCentimeters({
          imageSize,
          scaleX: element.scaleX,
          scaleY: element.scaleY
        })
        return { ...element, width, height }
      }
      return element
    }
    return {}
  }

  deleteElementById = (id) => {
    const object = this.getElementById(id)
    if (object) {
      this.canvasTexture.remove(object)
    }
  }

  duplicateElement = (el, oldId) => {
    const { onCanvasElementDuplicated } = this.props
    const boundingBox = el.getBoundingRect()

    const { type, fileId, fileUrl, src, isClipArtGroup, isImage } = el
    let elementType = type
    if (type === CanvasElements.Group) {
      elementType = !isClipArtGroup ? CanvasElements.Image : CanvasElements.Path
    }
    const id = oldId || shortid.generate()
    let canvasEl = { id, originalId: el.id }

    el.clone((clone) => {
      clone.set({
        id,
        hasRotatingPoint: false,
        left: boundingBox.left + EXTRA_POSITION,
        top: boundingBox.top + EXTRA_POSITION,
        stroke: el.stroke,
        fileId,
        isImage,
        fileUrl,
        src,
        isClipArtGroup
      })
      this.canvasTexture.add(clone)
    })
    onCanvasElementDuplicated(canvasEl, elementType, oldId)
  }

  setLayerElement = (el) => {
    this.canvasTexture.bringToFront(el)
  }

  storeAction = (action, oldValues) => {
    const activeEl = this.canvasTexture.getActiveObject()
    const { id } = activeEl
    switch (action) {
      case SCALE_ACTION:
        const {
          scaleX: newScaleX,
          flipX,
          scaleY,
          type,
          isClipArtGroup
        } = activeEl
        const { oldScaleX: scaleXOld, oldScaleY, oldFlipX } = oldValues
        const canvasType =
          type === CanvasElements.Group && !isClipArtGroup
            ? CanvasElements.Image
            : type
        const oldScaleX = oldFlipX ? scaleXOld * -1 : scaleXOld
        const scaleX = flipX ? newScaleX * -1 : newScaleX
        if (scaleX !== oldScaleX || scaleY !== oldScaleY) {
          const { onCanvasElementResized } = this.props
          onCanvasElementResized({
            id,
            elementType: canvasType,
            oldScaleX,
            oldScaleY,
            scaleX,
            scaleY
          })
        }
        break
      case DRAG_ACTION:
        const { left, top } = activeEl
        const { oldLeft, oldTop } = oldValues
        if (left !== oldLeft || top !== oldTop) {
          const { onCanvasElementDragged } = this.props
          onCanvasElementDragged({
            id,
            oldLeft,
            oldTop,
            left,
            top
          })
        }
        break
      case ROTATE_ACTION:
        const { oldAngle } = oldValues
        const { angle } = activeEl
        const { onCanvasElementRotated } = this.props
        if (oldAngle != angle) {
          onCanvasElementRotated({
            id,
            fromTool: true,
            oldAngle,
            angle
          })
        }
        break
    }
  }

  onMouseUp = (evt) => {
    const { isEditing, design } = this.props
    evt.preventDefault()
    document.getElementById('render-3d').style.cursor = 'grab'
    const action = this.dragComponent && this.dragComponent.action

    if (CHANGE_ACTIONS.includes(action)) {
      const activeEl = this.canvasTexture.getActiveObject() || {}
      const { id } = activeEl

      const CANVAS_SIZE =
        (isEditing && design.highResolution) || !isEditing
          ? HIGH_RESOLUTION_CANVAS
          : REGULAR_CANVAS
      switch (action) {
        case SCALE_ACTION:
          const { scaleX, scaleY, type, isClipArtGroup } = activeEl
          const {
            oldScale: { oldScaleX = 1, oldScaleY = 1 }
          } = this.state
          const canvasType =
            type === CanvasElements.Group && !isClipArtGroup
              ? CanvasElements.Image
              : type
          if (scaleX !== oldScaleX || scaleY !== oldScaleY) {
            const { onCanvasElementResized } = this.props
            onCanvasElementResized({
              id,
              elementType: canvasType,
              oldScaleX,
              oldScaleY,
              scaleX,
              scaleY
            })
          }
          break
        case DRAG_ACTION:
          const { left, top } = activeEl
          const {
            oldPosition: { oldLeft, oldTop }
          } = this.state
          if (left !== oldLeft || top !== oldTop) {
            const { onCanvasElementDragged } = this.props
            onCanvasElementDragged({
              id,
              oldLeft,
              oldTop,
              left,
              top
            })
          }
          break
        case ROTATE_ACTION:
          const intersects = this.getIntersects(
            this.onClickPosition,
            this.scene.children
          )
          if (!isEmpty(intersects)) {
            const uv = intersects[0].uv
            const cX = uv.x * CANVAS_SIZE
            const cY = (1 - uv.y) * CANVAS_SIZE

            const {
              oldRotation: { currentTransform, x, y }
            } = this.state
            if (x !== cX || y !== cY) {
              const { onCanvasElementRotated } = this.props
              onCanvasElementRotated({
                id,
                oldRotation: { x, y },
                newRotation: { x: cX, y: cY },
                currentTransform
              })
            }
          }
          break
      }
    }

    if (this.dragComponent && this.dragComponent.oldAngle) {
      this.dragComponent.el.oldAngle = this.dragComponent.oldAngle
    }

    this.dragComponent = null
    this.controls.enabled = true
  }

  onMouseDown = (evt) => {
    evt.preventDefault()
    document.getElementById('render-3d').style.cursor = 'grabbing'

    if (!this.canvasTexture) {
      return
    }
    const {
      responsive: { tablet },
      selectedElement,
      canvas,
      isEditing,
      design
    } = this.props

    const CANVAS_SIZE =
      (isEditing && design.highResolution) || !isEditing
        ? HIGH_RESOLUTION_CANVAS
        : REGULAR_CANVAS

    let clientX = evt.clientX
    let clientY = evt.clientY
    if (tablet) {
      clientX = evt.targetTouches[0]
        ? evt.targetTouches[0].pageX
        : evt.changedTouches[evt.changedTouches.length - 1].pageX
      clientY = evt.targetTouches[0]
        ? evt.targetTouches[0].pageY
        : evt.changedTouches[evt.changedTouches.length - 1].pageY
    }
    const array = this.getMousePosition(this.container, clientX, clientY)
    this.onClickPosition.fromArray(array)

    const intersects = this.getIntersects(
      this.onClickPosition,
      this.scene.children
    )

    const activeEl = this.canvasTexture.getActiveObject()
    const { onSelectEl, onSelectedItem } = this.props
    if (!!intersects.length && intersects[0].uv) {
      const { canvasEl } = this.state
      const meshName = get(intersects[0], 'object.name', '')
      const uv = intersects[0].uv
      const validMesh =
        meshName === MESH ||
        meshName === CANVAS_MESH ||
        meshName === BRANDING_MESH ||
        meshName === BIB_BRACE
      if (!!canvasEl && validMesh) {
        const el = Object.assign({}, canvasEl)
        const { fileId } = canvasEl
        this.setState({ canvasEl: null }, () => {
          onSelectedItem({})
          const left = uv.x * CANVAS_SIZE
          const top = (1 - uv.y) * CANVAS_SIZE
          switch (el.type) {
            case CanvasElements.Text:
              this.applyText(el.text, el.style, { left, top })
              break
            case CanvasElements.Image:
              this.applyImage(el.file, { left, top })
              break
            case CanvasElements.Group:
              this.applyGroup(el.file, { left, top }, null, null, el.isImage)
              break
            case CanvasElements.Polygon:
            case CanvasElements.Path:
              this.applyClipArt(
                el.url,
                el.style,
                { left, top },
                undefined,
                fileId
              )
              break
            default:
              break
          }
        })
      } else {
        if (activeEl && !this.dragComponent) {
          const selectedGraphicElement =
            canvas.image[selectedElement] ||
            canvas.path[selectedElement] ||
            canvas.text[selectedElement]
          const action = clickOnCorner(activeEl.oCoords, uv, CANVAS_SIZE)
          if (
            action &&
            selectedGraphicElement &&
            !selectedGraphicElement.lock
          ) {
            switch (action) {
              case DELETE_ACTION:
                this.deleteElement(activeEl)
                break
              case DUPLICATE_ACTION:
                this.duplicateElement(activeEl)
                break
              case BRING_TO_FRONT_ACTION:
                this.setLayerElement(activeEl)
                break
              case SCALE_ACTION: {
                const { scaleX: oldScaleX, scaleY: oldScaleY } = activeEl
                const sX = uv.x * CANVAS_SIZE
                const sY = (1 - uv.y) * CANVAS_SIZE
                this.setState({
                  oldScale: { oldScaleX, oldScaleY }
                })
                this.controls.enabled = false
                const currentTransform = {
                  originX: activeEl.originX,
                  originY: activeEl.originY,
                  scaleX: oldScaleX,
                  scaleY: oldScaleY,
                  ex: sX,
                  ey: sY,
                  original: Object.assign({}, activeEl)
                }
                this.dragComponent = {
                  action: SCALE_ACTION,
                  currentTransform,
                  isImage: activeEl.get('type') === CanvasElements.Image
                }
                break
              }
              case ROTATE_ACTION: {
                const sX = uv.x * CANVAS_SIZE
                const sY = (1 - uv.y) * CANVAS_SIZE
                this.controls.enabled = false
                const currentTransform = {
                  originX: CENTER_ORIGIN,
                  originY: CENTER_ORIGIN,
                  ex: sX,
                  ey: sY,
                  theta: fabric.util.degreesToRadians(activeEl.angle)
                }
                this.setState({
                  oldRotation: { currentTransform, x: sX, y: sY }
                })
                this.dragComponent = {
                  el: activeEl,
                  currentTransform,
                  action: ROTATE_ACTION
                }
                break
              }
              default:
                break
            }
            return
          }
        }

        let allDeactive = true
        this.canvasTexture.forEachObject((el) => {
          const boundingBox = el.getBoundingRect()
          const isInside = isMouseOver(boundingBox, uv, CANVAS_SIZE)
          if (isInside) {
            allDeactive = false
            const typeEl = el.get('isImage') ? CanvasElements.Image : el.get('type')
            onSelectEl(el.id, typeEl)
            const left = uv.x * CANVAS_SIZE
            const top = (1 - uv.y) * CANVAS_SIZE
            const differenceX = left - el.left
            const differenceY = top - el.top
            const dragComponent = {
              differenceX,
              differenceY,
              action: DRAG_ACTION
            }
            const { left: oldLeft, top: oldTop } = el
            this.setState({
              oldPosition: { oldLeft, oldTop }
            })
            this.controls.enabled = false
            this.dragComponent = dragComponent
            this.canvasTexture.setActiveObject(el)
          } else {
            el.set('active', false)
          }
        })

        if (allDeactive && activeEl) {
          onSelectEl('')
          this.canvasTexture.discardActiveObject()
        }
        this.canvasTexture.renderAll()
      }
    } else {
      if (!!activeEl) {
        onSelectEl('')
        this.canvasTexture.discardActiveObject()
        this.canvasTexture.renderAll()
      }

      if (this.state.canvasEl) {
        const { onSelectedItem } = this.props
        onSelectedItem({})
        this.setState({ canvasEl: null })
      }
    }
  }

  onMouseMove = (evt) => {
    evt.preventDefault()
    const {
      responsive: { tablet },
      canvas,
      selectedElement,
      isEditing,
      design
    } = this.props
    let clientX = evt.clientX
    let clientY = evt.clientY

    const CANVAS_SIZE =
      (isEditing && design.highResolution) || !isEditing
        ? HIGH_RESOLUTION_CANVAS
        : REGULAR_CANVAS

    if (tablet) {
      clientX = evt.targetTouches[0]
        ? evt.targetTouches[0].pageX
        : evt.changedTouches[evt.changedTouches.length - 1].pageX
      clientY = evt.targetTouches[0]
        ? evt.targetTouches[0].pageY
        : evt.changedTouches[evt.changedTouches.length - 1].pageY
    }

    const array = this.getMousePosition(this.container, clientX, clientY)
    this.onClickPosition.fromArray(array)

    const intersects = this.getIntersects(
      this.onClickPosition,
      this.scene.children
    )

    if (!!intersects.length && intersects[0].uv && !!this.dragComponent) {
      const meshName = get(intersects[0], 'object.name', '')
      const validMesh =
        meshName === MESH ||
        meshName === CANVAS_MESH ||
        meshName === BRANDING_MESH ||
        meshName === BIB_BRACE
      if (validMesh) {
        const activeEl = this.canvasTexture.getActiveObject()
        const {
          differenceX,
          differenceY,
          action,
          currentTransform
        } = this.dragComponent
        const uv = intersects[0].uv
        const selectedGraphicElement =
          canvas.image[selectedElement] ||
          canvas.path[selectedElement] ||
          canvas.text[selectedElement]
        if (selectedGraphicElement && !selectedGraphicElement.lock) {
          switch (action) {
            case DRAG_ACTION: {
              const left = uv.x * CANVAS_SIZE - differenceX
              const top = (1 - uv.y) * CANVAS_SIZE - differenceY
              activeEl.set({ left, top }).setCoords()
              this.canvasTexture.renderAll()
              break
            }
            case SCALE_ACTION: {
              const cX = uv.x * CANVAS_SIZE
              const cY = (1 - uv.y) * CANVAS_SIZE
              this.scaleObject(cX, cY, currentTransform)
              this.forceUpdate()
              this.canvasTexture.renderAll()
              break
            }
            case ROTATE_ACTION: {
              const cX = uv.x * CANVAS_SIZE
              const cY = (1 - uv.y) * CANVAS_SIZE
              this.rotateObject(cX, cY, currentTransform)
              this.forceUpdate()
              this.canvasTexture.renderAll()
              break
            }
            default:
              break
          }
        }
      }
    } else if (!!intersects.length && !!this.state.canvasEl) {
      document.getElementById('render-3d').style.cursor = 'crosshair'
    } else if (!!this.state.canvasEl) {
      document.getElementById('render-3d').style.cursor = 'no-drop'
    }
  }

  scaleObject = (x, y, currentTransform) => {
    const { originX, originY, original } = currentTransform
    const el = this.canvasTexture.getActiveObject()
    if (!el) {
      return
    }
    const constraintPosition = el.translateToOriginPoint(
      el.getCenterPoint(),
      originX,
      originY
    )
    const localMouse = el.toLocalPoint(new fabric.Point(x, y), originX, originY)
    const dim = el._getTransformedDimensions()
    const dist = localMouse.y + localMouse.x
    const lastDist =
      (dim.y * original.scaleY) / el.scaleY +
      (dim.x * original.scaleX) / el.scaleX

    const scaleX = Math.abs((currentTransform.scaleX * dist) / lastDist)
    const scaleY = Math.abs((currentTransform.scaleY * dist) / lastDist)
    el.set({ scaleX, scaleY })
    el.setPositionByOrigin(
      constraintPosition,
      currentTransform.originX,
      currentTransform.originY
    )
    el.setCoords()
  }

  rotateObject = (x, y, currentTransform, idElement) => {
    const { ey, ex, originX, originY, theta } = currentTransform
    const el = idElement
      ? this.getElementById(idElement)
      : this.canvasTexture.getActiveObject()
    if (!el) {
      return
    }
    const constraintPosition = el.translateToOriginPoint(
      el.getCenterPoint(),
      originX,
      originY
    )
    const lastAngle = Math.atan2(
      ey - constraintPosition.y,
      ex - constraintPosition.x
    )
    const currentAngle = Math.atan2(
      y - constraintPosition.y,
      x - constraintPosition.x
    )
    let angle = fabric.util.radiansToDegrees(currentAngle - lastAngle + theta)
    if (angle < 0) {
      angle = 360 + angle
    }
    angle %= 360
    el.set('angle', angle)
    el.setPositionByOrigin(constraintPosition, originX, originY)
    el.setCoords()
  }

  /* Warning modals */
  showFontWarningModal = () => {
    const { formatMessage } = this.props
    Modal.warning({
      title: formatMessage(messages.modalWarningTitle),
      content: formatMessage(messages.modalFontMessage),
      okText: formatMessage(messages.modalWarningButtonText),
      maskClosable: true
    })
  }

  showResolutionWarningModal = () => {
    const { formatMessage } = this.props
    notification.warning({
      message: formatMessage(messages.modalWarningTitle),
      description: formatMessage(messages.modalResolutionMessage)
    })
  }

  getSizeInCentimeters = ({ imageSize, scaleX, scaleY }) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const size = {}
    const { width, height } = imageSize
    const scaleXTemp = scaleX / scaleFactorX
    const scaleYTemp = scaleY / scaleFactorY
    const scaledWidth = width * scaleXTemp
    const scaledHeight = height * scaleYTemp
    size.width = scaledWidth / ILLUSTRATOR_PIXELS_PER_CM
    size.height = scaledHeight / ILLUSTRATOR_PIXELS_PER_CM
    return size
  }

  getSizeInPixels = (cmWidth, cmHeight, width, height) => {
    const { scaleFactorX, scaleFactorY } = this.state
    const scaledWidth = (cmWidth || 1) * ILLUSTRATOR_PIXELS_PER_CM
    const scaleXTemp = scaledWidth / width
    const scaleX = scaleFactorX * scaleXTemp
    const scaledHeight = (cmHeight || 1) * ILLUSTRATOR_PIXELS_PER_CM
    const scaleYTemp = scaledHeight / height
    const scaleY = scaleFactorY * scaleYTemp
    return { scaleX, scaleY }
  }
}

export default Render3D
