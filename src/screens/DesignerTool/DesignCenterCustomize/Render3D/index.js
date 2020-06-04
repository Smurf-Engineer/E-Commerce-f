import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import reverse from 'lodash/reverse'
import isEmpty from 'lodash/isEmpty'
import Spin from 'antd/lib/spin'
import FontFaceObserver from 'fontfaceobserver'
import shortid from 'shortid'
import findIndex from 'lodash/findIndex'
import {
  isMouseOver,
  clickOnCorner,
  getTextCanvasElement,
  getClipArtCanvasElement,
  getImageCanvas
} from './utils'
import {
  modelPositions,
  MESH_NAME,
  BIB_BRACE_NAME,
  BINDING_NAME,
  ZIPPER_NAME,
  CANVAS_SIZE,
  CANVAS_MESH,
  CORNER_SIZE,
  fabricJsConfig,
  Mode
} from './config'
import {
  Changes,
  CanvasElements
} from '../../../../screens/DesignCenter/constants'
import {
  MESH,
  RED_TAG,
  FLATLOCK,
  ZIPPER,
  BINDING,
  BIB_BRACE,
  PROPEL_PALMS,
  GRIP_TAPE,
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_INTENSITY
} from '../../../../constants'
import {
  Container,
  Render,
  Progress,
  Logo,
  Button,
  Loading,
  Icon
} from './styledComponents'
import logo from '../../../../assets/jakroo_logo.svg'
import { LoadScripts } from '../../../../utils/scriptLoader'
import { threeDScripts } from '../../../../utils/scripts'

const NONE = -1

class Render3D extends PureComponent {
  state = {
    progress: 0,
    objectChilds: 0,
    bibBraceIndex: NONE,
    zipperIndex: NONE,
    bindingIndex: NONE
  }

  componentWillReceiveProps(nextProps) {
    const {
      colors,
      colorBlockHovered: oldColorBlockHovered,
      files: oldFiles,
      areas,
      bibBrace: oldBibBrace,
      zipper: oldZipper,
      binding: oldBinding,
      styleMode: oldStyleMode
    } = this.props
    const {
      colors: nextColors,
      areas: nextAreas,
      design,
      colorBlockHovered,
      files,
      bibBrace,
      zipper,
      binding,
      styleMode
    } = nextProps

    if (oldBibBrace !== bibBrace && !!this.bibBrace) {
      this.changeExtraColor(BIB_BRACE_NAME, bibBrace)
      return
    }

    if (oldZipper !== zipper && !!this.zipper) {
      this.changeExtraColor(ZIPPER_NAME, zipper)
      return
    }

    if (oldBinding !== binding && !!this.binding) {
      this.changeExtraColor(BINDING_NAME, binding)
      return
    }

    const areasHasChange = isEqual(areas, nextAreas)
    if (!areasHasChange) {
      this.loadDesign(nextAreas, nextColors)
      return
    }

    const filesHasChange = isEqual(files, oldFiles)
    if (!filesHasChange) {
      this.loadObject(files, design)
      return
    }

    const colorsHasChange = isEqual(colors, nextColors)
    if (!colorsHasChange) {
      this.setupColors(nextColors)
      return
    }

    const colorBlockHasChange = oldColorBlockHovered !== colorBlockHovered
    if (colorBlockHasChange) {
      this.setupHoverColor(colorBlockHovered)
      return
    }
  }

  componentDidMount() {
    LoadScripts(threeDScripts, this.render3DConfig)
  }

  render3DConfig = () => {
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container
    const { files, design } = this.props

    fabricJsConfig.settings.cornerSize = CORNER_SIZE
    fabric.Object.prototype.customiseCornerIcons(fabricJsConfig)
    const devicePixelRatio = window.devicePixelRatio || 1

    const precision = 'highp'
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      precision,
      preserveDrawingBuffer: true
    })

    renderer.setPixelRatio(devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
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
    const ambient = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY)
    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      DIRECTIONAL_LIGHT_INTENSITY
    )
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

    if (files && design) {
      this.loadObject(files, design)
    }
  }

  componentWillUnmount() {
    this.stop()
    this.container.removeChild(this.renderer.domElement)

    if (this.scene) {
      this.clearScene()
    }
  }

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
      objects.forEach((el, index) => {
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
              const element = getClipArtCanvasElement(el)
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
            const element = getClipArtCanvasElement(el)
            canvas.path[elId] = element
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
      })
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
      const fontsPromises = fonts.map(font => {
        const fontObserver = new FontFaceObserver(font)
        return fontObserver.load()
      })
      await Promise.all(fontsPromises)
      const fabricObjects = await this.convertToFabricObjects(elements)
      fabricObjects.forEach(o => this.canvasTexture.add(o))
      if (reseting) {
        const {
          currentStyle: { accessoriesColor },
          onResetEditing
        } = this.props
        onResetEditing(canvas, accessoriesColor)
      } else {
        onSetCanvasObject(canvas, paths)
      }
      this.canvasTexture.getObjects().forEach(el => {
        el.moveTo(indexes[el.id])
      })
      this.canvasTexture.renderAll()
    } catch (e) {
      console.error('Error loading canvas object: ', e.message)
    }
  }

  loadTextures = modelTextures =>
    new Promise((resolve, reject) => {
      try {
        const {
          bumpMap,
          flatlock,
          brandingPng,
          areasPng = [],
          zipperWhite,
          zipperBlack,
          bibBraceWhite,
          bibBraceBlack,
          bindingWhite,
          bindingBlack
        } = modelTextures
        const loadedTextures = {}
        if (!!zipperWhite && !!zipperBlack) {
          this.zipper = {}
          this.zipper.white = this.imgLoader.load(zipperWhite)
          this.zipper.black = this.imgLoader.load(zipperBlack)
          this.zipper.white.minFilter = THREE.LinearFilter
          this.zipper.black.minFilter = THREE.LinearFilter
        }
        if (!!bibBraceWhite && !!bibBraceBlack) {
          this.bibBrace = {}
          this.bibBrace.white = this.imgLoader.load(bibBraceWhite)
          this.bibBrace.black = this.imgLoader.load(bibBraceBlack)
          this.bibBrace.white.minFilter = THREE.LinearFilter
          this.bibBrace.black.minFilter = THREE.LinearFilter
        }
        if (!!bindingWhite && !!bindingBlack) {
          this.binding = {}
          this.binding.white = this.imgLoader.load(bindingWhite)
          this.binding.black = this.imgLoader.load(bindingBlack)
          this.binding.white.minFilter = THREE.LinearFilter
          this.binding.black.minFilter = THREE.LinearFilter
        }
        if (!!flatlock) {
          loadedTextures.flatlock = this.imgLoader.load(flatlock)
          loadedTextures.flatlock.minFilter = THREE.LinearFilter
        }
        if (!!brandingPng) {
          loadedTextures.branding = this.imgLoader.load(brandingPng)
          loadedTextures.branding.minFilter = THREE.LinearFilter
        }
        loadedTextures.bumpMap = this.imgLoader.load(bumpMap)
        const loadedAreas = areasPng.map(areaUri => {
          const areaTexture = this.imgLoader.load(areaUri)
          areaTexture.minFilter = THREE.LinearFilter
          return areaTexture
        })
        loadedTextures.areas = loadedAreas
        resolve(loadedTextures)
      } catch (error) {
        reject(error)
      }
    })

  loadDesign = async (textureUrls, colors) => {
    const loadedTextures = await new Promise((resolve, reject) => {
      this.clearTextures()
      try {
        const loadedAreas = textureUrls.map(areaUrl => {
          const areaTexture = this.imgLoader.load(areaUrl)
          areaTexture.minFilter = THREE.LinearFilter
          return areaTexture
        })
        resolve(loadedAreas)
      } catch (error) {
        reject(error)
      }
    })
    if (loadedTextures.length) {
      const reverseTextures = reverse(loadedTextures)
      const { objectChilds } = this.state
      const object = this.scene.getObjectByName(MESH_NAME)
      if (object) {
        reverseTextures.forEach((texture, index) => {
          if (object.children[objectChilds + index]) {
            object.children[objectChilds + index].material.color.set(
              colors[index]
            )
            object.children[objectChilds + index].material.map = texture
          }
        })
      }
    }
  }

  loadObject = async (files, design, styleMode = Mode.Style) => {
    /* Object and MTL load */
    const { onLoadModel } = this.props
    this.clearScene()

    /* Texture configuration */
    const loadedTextures = await this.loadTextures(files)

    this.mtlLoader.load(files.mtl, materials => {
      onLoadModel(true)
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        files.obj,
        object => {
          const { children } = object
          const { flatlock, areas, bumpMap, branding } = loadedTextures
          const objectChilds = children.length
          this.setState({ objectChilds })

          const getMeshIndex = meshName => {
            const index = findIndex(children, ({ name }) => name === meshName)
            return index < 0 ? 0 : index
          }

          const meshIndex = getMeshIndex(MESH)

          /* Object materials */
          // Stitching
          if (!!flatlock) {
            const flatlockIndex = getMeshIndex(FLATLOCK)
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              alphaMap: flatlock,
              color: '#FFFFFF'
            })
            flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
            flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
            flatlockMaterial.alphaTest = 0.5
            object.children[flatlockIndex].material = flatlockMaterial
          }

          if (!!this.bibBrace) {
            const bibBraceIndex = getMeshIndex(BIB_BRACE)
            const bibBraceMaterial = new THREE.MeshPhongMaterial({
              map: this.bibBrace.white
            })
            object.children[bibBraceIndex].material = bibBraceMaterial
            this.setState({ bibBraceIndex })
          }

          if (!!this.zipper) {
            const zipperIndex = getMeshIndex(ZIPPER)
            const zipperMaterial = new THREE.MeshPhongMaterial({
              map: this.zipper.white
            })
            object.children[zipperIndex].material = zipperMaterial
            this.setState({ zipperIndex })
          }

          if (!!this.binding) {
            const bindingIndex = getMeshIndex(BINDING)
            const bindingMaterial = new THREE.MeshPhongMaterial({
              map: this.binding.white
            })
            object.children[bindingIndex].material = bindingMaterial
            this.setState({ bindingIndex })
          }

          // Back material
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })
          // Setup the texture layers
          const areasLayers = areas.map(() =>
            object.children[meshIndex].clone()
          )
          object.add(...areasLayers)

          /* Extra files loaded by MTL file */
          const labelIndex = findIndex(children, ({ name }) => name === RED_TAG)
          if (labelIndex >= 0) {
            object.children[labelIndex].material.color.set('#ffffff')
          }
          const propelPalmsIndex = findIndex(
            children,
            ({ name }) => name === PROPEL_PALMS
          )
          if (propelPalmsIndex >= 0) {
            object.children[propelPalmsIndex].material.color.set('#ffffff')
          }
          const gripTapeIndex = findIndex(
            children,
            ({ name }) => name === GRIP_TAPE
          )
          if (gripTapeIndex >= 0) {
            object.children[gripTapeIndex].material.color.set('#ffffff')
          }

          /* Model materials */
          object.children[meshIndex].material = insideMaterial
          const { colors = [] } = design || {}
          const reverseColors = colors.reverse()
          const reversedAreas = reverse(areas)

          reversedAreas.forEach(
            (map, index) =>
              (object.children[
                objectChilds + index
              ].material = new THREE.MeshPhongMaterial({
                map,
                bumpMap,
                side: THREE.FrontSide,
                color: reverseColors[index],
                transparent: true
              }))
          )

          /* Canvas */
          const canvas = document.createElement('canvas')
          canvas.width = CANVAS_SIZE
          canvas.height = CANVAS_SIZE
          const canvasConfig = {
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            crossOrigin: 'Anonymous',
            selection: false,
            skipTargetFind: true
          }

          this.canvasTexture = new fabric.Canvas(canvas, canvasConfig)

          const canvasTexture = new THREE.CanvasTexture(canvas)
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
          if (!!branding) {
            const brandingObj = object.children[meshIndex].clone()
            object.add(brandingObj)
            const brandingIndex = children.length - 1
            const brandingMaterial = new THREE.MeshPhongMaterial({
              map: branding,
              side: THREE.FrontSide,
              bumpMap,
              transparent: true
            })
            object.children[brandingIndex].material = brandingMaterial
          }

          /* Object Config */
          object.position.y = 0
          object.name = MESH_NAME
          this.scene.add(object)

          if (design && design.canvas && styleMode === Mode.Placeholder) {
            this.loadCanvasTexture(design.canvas)
          }

          onLoadModel(false)
        },
        this.onProgress,
        this.onError
      )
    })
  }

  changeExtraColor = (texture, isWhite) => {
    const { bibBraceIndex, zipperIndex, bindingIndex } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (this[texture]) {
      const map = isWhite ? this[texture].white : this[texture].black
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
        case BINDING_NAME:
          if (object.children[bindingIndex]) {
            object.children[bindingIndex].material.map = map
          }
        default:
          break
      }
    }
  }

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
    this.directionalLight.position.copy(this.camera.position)
  }

  cameraUpdate = ({ x, y, z }) => {
    this.camera.position.set(x, y, z)
    this.controls.update()
  }

  setupColors = colors => {
    const { objectChilds } = this.state
    const object = this.scene.getObjectByName(MESH_NAME)
    if (object) {
      colors.forEach((color, index) => {
        if (object.children[objectChilds + index]) {
          object.children[objectChilds + index].material.color.set(color)
        }
      })
    }
  }

  setupHoverColor = colorBlockHovered => {
    const object = this.scene.getObjectByName(MESH_NAME)
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
    const {
      loadingModel,
      files,
      onSaveDesign,
      uploadingThumbnail,
      design,
      styleMode
    } = this.props
    return (
      <Container>
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
          {!files && <Logo src={logo} />}
        </Render>
        <Button type="primary" onClick={onSaveDesign}>
          Save Design
        </Button>
        {uploadingThumbnail && (
          <Loading>
            <Spin tip="Uploading..." indicator={<Icon type="loading" />} />
          </Loading>
        )}
      </Container>
    )
  }

  setFrontFaceModel = () => {
    if (this.camera) {
      const {
        front: { x, y, z }
      } = modelPositions
      this.camera.position.set(x, y, z)
      this.controls.update()
    }
  }

  takeScreenshot = () =>
    new Promise(resolve => {
      setTimeout(() => {
        const thumbnail = this.renderer.domElement.toDataURL('image/webp', 0.3)
        resolve(thumbnail)
      }, 800)
    })

  saveThumbnail = async (item, colors = []) => {
    this.setFrontFaceModel()
    const clonedColors = [...colors]
    this.setupColors(clonedColors.reverse())
    try {
      const { onSaveThumbnail, onUploadingThumbnail } = this.props
      onUploadingThumbnail(true)
      const thumbnail = await this.takeScreenshot()
      onSaveThumbnail(item, thumbnail)
    } catch (error) {
      console.error(error)
      onUploadingThumbnail(false)
    }
  }

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

  clearTextures = () => {
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      object.children.forEach(({ material }) => {
        if (!!material) {
          let { map } = material
          if (map && map.dispose) {
            map.dispose()
          }
        }
      })
    }
  }

  convertToFabricObjects = elements =>
    new Promise((resolve, reject) => {
      try {
        fabric.util.enlivenObjects(elements, objects => {
          resolve(objects)
        })
      } catch (e) {
        reject(e)
      }
    })
}

export default Render3D
