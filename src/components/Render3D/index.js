import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import findIndex from 'lodash/findIndex'
import Icon from 'antd/lib/icon'
import FontFaceObserver from 'fontfaceobserver'
import isEqual from 'lodash/isEqual'
import has from 'lodash/has'
import get from 'lodash/get'
import reverse from 'lodash/reverse'
import shortid from 'shortid'
import { graphql, compose } from 'react-apollo'
import { BLACK, WHITE } from '../../theme/colors'
import { designQuery } from './data'
import {
  Container,
  Render,
  Progress,
  DragText,
  Title,
  Message,
  ContainerError,
  ProgressProduct,
  Loading
} from './styledComponents'
import { modelPositions } from './config'
import {
  MESH,
  BIB_BRACE,
  BINDING,
  ZIPPER,
  RED_TAG,
  FLATLOCK,
  PROPEL_PALMS,
  GRIP_TAPE,
  REGULAR_CANVAS,
  PHONE_POSITION,
  HIGH_RESOLUTION_CANVAS,
  MESH_NAME,
  MODEL_SIZES
} from '../../constants'
import { CanvasElements } from '../../screens/DesignCenter/constants'
import messages from './messages'
import '../../screens/App/theme.ant'

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    isLoading: false,
    objectChilds: 0,
    firstLoad: true
  }

  async componentDidMount() {
    const { modelSize, designSearch } = this.props
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container
    const precision = 'highp'
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      precision,
      preserveDrawingBuffer: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(clientWidth, clientHeight)
    /* Camera */
    const camera = new THREE.PerspectiveCamera(
      25,
      clientWidth / clientHeight,
      0.1,
      1000
    )
    camera.position.z = MODEL_SIZES[modelSize] || 160
    if (designSearch) {
      camera.position.z = 150
    }
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', this.lightUpdate)

    controls.enableKeys = false
    controls.minDistance = 80
    controls.maxDistance = 350
    controls.enableZoom = true
    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.65)
    directionalLight.position.copy(camera.position)

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.controls = controls
    this.directionalLight = directionalLight

    this.container.appendChild(this.renderer.domElement)

    this.start()
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { loading, error, design = {} },
      actualImage = '',
      colorAccessories
    } = nextProps
    const {
      product,
      isProduct,
      data: { design: oldDesign = {} },
      actualImage: oldImage = '',
      colorAccessories: oldColorAccessories
    } = this.props
    const { firstLoad } = this.state
    const imageChanged = !isEqual(actualImage, oldImage)
    const accessoriesChanged = !isEqual(colorAccessories, oldColorAccessories)

    if (isProduct && product) {
      if (imageChanged || accessoriesChanged || firstLoad) {
        setTimeout(() => {
          this.renderProduct(
            product,
            actualImage,
            imageChanged,
            colorAccessories
          )
        }, 200)
      }
    } else if (!isProduct) {
      const notEqual =
        !isEqual(design, oldDesign) || imageChanged || accessoriesChanged
      if (!error && (notEqual || (firstLoad && !loading))) {
        if (this.renderer) {
          this.removeObject()
        }
        setTimeout(() => {
          this.renderModel(design, actualImage, colorAccessories, imageChanged)
        }, 100)
      }
    }
  }

  componentWillUnmount() {
    this.stop()
    this.clearScene()
  }

  loadTextures = (design, actualImage, fromImage) =>
    new Promise((resolve, reject) => {
      try {
        const {
          product,
          bibBraceColor,
          bindingColor,
          zipperColor,
          colors,
          style: { brandingPng },
          proDesign,
          outputSvg,
          outputPng
        } = design
        const { colorAccessories, isPhone } = this.props
        const { flatlock, bumpMap, zipper, binding, bibBrace } = product
        const loadedTextures = {}
        const textureLoader = new THREE.TextureLoader()
        if (!!zipper) {
          const hasZipperColor =
            has(colorAccessories, 'zipperColor') &&
            colorAccessories.zipperColor.length

          const texture =
            zipper[hasZipperColor ? colorAccessories.zipperColor : zipperColor]
          loadedTextures.zipper = textureLoader.load(texture)
          loadedTextures.zipper.minFilter = THREE.LinearFilter
        }
        if (!!binding) {
          const hasBindingColor =
            has(colorAccessories, 'bindingColor') &&
            colorAccessories.bindingColor.length

          const texture =
            binding[
              hasBindingColor ? colorAccessories.bindingColor : bindingColor
            ]
          loadedTextures.binding = textureLoader.load(texture)
          loadedTextures.binding.minFilter = THREE.LinearFilter
        }
        if (!!bibBrace) {
          const hasBibColor =
            has(colorAccessories, 'bibColor') &&
            colorAccessories.bibColor.length
          const texture =
            bibBrace[hasBibColor ? colorAccessories.bibColor : bibBraceColor]
          loadedTextures.bibBrace = textureLoader.load(texture)
          loadedTextures.bibBrace.minFilter = THREE.LinearFilter
        }

        if (!!flatlock) {
          loadedTextures.flatlock = textureLoader.load(flatlock)
        }
        if (!!brandingPng) {
          loadedTextures.branding = textureLoader.load(brandingPng)
          loadedTextures.branding.minFilter = THREE.LinearFilter
        }
        loadedTextures.bumpMap = textureLoader.load(bumpMap)
        const sanitizedColors = colors.map(({ color, image }) => ({
          color,
          image
        }))

        const images = []

        loadedTextures.colors = []

        if (proDesign || (outputSvg && fromImage) || isPhone) {
          if ((actualImage || (outputSvg && !outputPng)) && !isPhone) {
            const imageCanvas = document.createElement('canvas')
            canvg(
              imageCanvas,
              `${actualImage || outputSvg}${this.getCacheQuery()}`
            )
            loadedTextures.texture = new THREE.Texture(imageCanvas)
          } else {
            loadedTextures.texture = textureLoader.load(
              `${outputPng}${this.getCacheQuery()}`
            )
          }
          loadedTextures.texture.needsUpdate = true
        } else {
          const reversedAreas = reverse(sanitizedColors)
          reversedAreas.forEach(({ color, image }) => {
            loadedTextures.colors.push(color)
            images.push(image)
          })
          const loadedAreas = images.map(image => {
            const areaTexture = textureLoader.load(image)
            areaTexture.minFilter = THREE.LinearFilter
            return areaTexture
          })
          loadedTextures.areas = loadedAreas
        }
        resolve(loadedTextures)
      } catch (e) {
        reject(e)
      }
    })

  handleOnLoadModel = isLoading => this.setState({ loadingModel: isLoading })

  onProgress = xhr => {
    if (xhr.lengthComputable) {
      const progress = Math.round((xhr.loaded / xhr.total) * 100)
      this.setState({ progress })
    }
  }

  onError = xhr => console.error('Error: ' + xhr)

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => cancelAnimationFrame(this.frameId)

  animate = () => {
    this.rendeScene()
    this.frameId = window.requestAnimationFrame(this.animate)
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
    const { showDragmessage, progress, loadingModel } = this.state
    const {
      customProduct,
      designSearch,
      isProduct,
      textColor,
      data: { loading, error }
    } = this.props

    if (error && !isProduct) {
      return (
        <ContainerError>
          <Title>
            <FormattedMessage {...messages.errorTitle} />
          </Title>
          <Message>
            <FormattedMessage {...messages.errorMessage} />
          </Message>
        </ContainerError>
      )
    }

    const circleIcon = <Icon type="loading" style={{ fontSize: 64 }} spin />

    return (
      <Container designSearch={designSearch} onKeyDown={this.handleOnKeyDown}>
        {loadingModel && isProduct && (
          <ProgressProduct type="circle" percent={progress + 1} />
        )}
        <Render
          {...{ customProduct, designSearch }}
          id="render-3d"
          innerRef={container => (this.container = container)}
        >
          {loading && !isProduct && <Loading indicator={circleIcon} />}
          {loadingModel && !isProduct && (
            <Progress type="circle" percent={progress + 1} />
          )}
        </Render>
        {showDragmessage && !loading && (
          <DragText {...{ isProduct, textColor }}>
            <FormattedMessage {...messages.drag} />
          </DragText>
        )}
      </Container>
    )
  }
  renderProduct = async (
    product,
    actualImage,
    fromImage = false,
    colorAccessories
  ) => {
    const { stitchingValue, isPhone } = this.props

    const {
      obj,
      mtl,
      flatlock,
      zipper,
      bumpMap,
      binding,
      bibBrace,
      branding
    } = product
    /* Object and MTL load */
    if (obj && mtl) {
      const mtlLoader = new THREE.MTLLoader()
      mtlLoader.load(mtl, materials => {
        this.handleOnLoadModel(true)

        materials.preload()
        const objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
          obj,
          async object => {
            const { children } = object
            const objectChildCount = children.length
            const getMeshIndex = meshName => {
              const index = findIndex(children, mesh => mesh.name === meshName)
              return index < 0 ? 0 : index
            }
            const meshIndex = getMeshIndex(MESH)

            const textureLoader = new THREE.TextureLoader()

            /* Stitching */
            if (!!flatlock) {
              const flatlockObj = textureLoader.load(flatlock)
              const flatlockIndex = getMeshIndex(FLATLOCK)
              const flatlockMaterial = new THREE.MeshLambertMaterial({
                alphaMap: flatlockObj,
                color: stitchingValue || BLACK
              })
              flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
              flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
              flatlockMaterial.alphaTest = 0.5
              children[flatlockIndex].material = flatlockMaterial
            }
            /* Zipper */
            if (!!zipper) {
              const zipperColor = zipper.black || zipper.white

              const texture =
                zipper[colorAccessories.zipperColor || zipperColor]

              const zipperObj = textureLoader.load(texture)
              zipperObj.minFilter = THREE.LinearFilter
              const zipperIndex = getMeshIndex(ZIPPER)
              const zipperMaterial = new THREE.MeshPhongMaterial({
                map: zipperObj
              })
              children[zipperIndex].material = zipperMaterial
            }
            /* Binding */
            if (!!binding) {
              const texture =
                binding[
                  colorAccessories.bindingColor || Object.keys(binding)[0]
                ]

              const bindingObj = textureLoader.load(texture)
              bindingObj.minFilter = THREE.LinearFilter
              const bindingIndex = getMeshIndex(BINDING)
              const bindingMaterial = new THREE.MeshPhongMaterial({
                map: bindingObj
              })
              children[bindingIndex].material = bindingMaterial
            }

            /* Bib Brace */
            if (!!bibBrace) {
              const texture =
                bibBrace[colorAccessories.bibColor || Object.keys(bibBrace)[0]]
              const bibBraceObj = textureLoader.load(texture)
              bibBraceObj.minFilter = THREE.LinearFilter
              const bibBraceIndex = getMeshIndex(BIB_BRACE)
              const bibBraceMaterial = new THREE.MeshPhongMaterial({
                map: bibBraceObj
              })
              children[bibBraceIndex].material = bibBraceMaterial
            }

            /* Inside material */
            const insideMaterial = new THREE.MeshPhongMaterial({
              side: THREE.BackSide,
              color: BLACK
            })
            const bumpMapObj = textureLoader.load(bumpMap)

            let textureSvg
            if (actualImage && fromImage) {
              textureSvg = textureLoader.load(
                `${actualImage}${this.getCacheQuery()}`
              )
            }

            const frontMaterial = new THREE.MeshPhongMaterial({
              color: 0xdbdde0,
              map: textureSvg,
              side: THREE.FrontSide,
              bumpMap: bumpMapObj
            })

            /* Extra files loaded by MTL file */
            const labelIndex = findIndex(
              children,
              ({ name }) => name === RED_TAG
            )
            if (labelIndex >= 0) {
              object.children[labelIndex].material.color.set(WHITE)
            }
            const propelPalmsIndex = findIndex(
              children,
              ({ name }) => name === PROPEL_PALMS
            )
            if (propelPalmsIndex >= 0) {
              object.children[propelPalmsIndex].material.color.set(WHITE)
            }
            const gripTapeIndex = findIndex(
              children,
              ({ name }) => name === GRIP_TAPE
            )
            if (gripTapeIndex >= 0) {
              object.children[gripTapeIndex].material.color.set(WHITE)
            }
            /* Assign materials */
            const canvasObj = children[meshIndex].clone()
            object.add(canvasObj)

            children[meshIndex].material = insideMaterial
            children[objectChildCount].material = frontMaterial

            /* Branding */
            if (!!branding) {
              const brandingObj = children[meshIndex].clone()
              object.add(brandingObj)
              const brandingIndex = children.length - 1
              const textureLoader = new THREE.TextureLoader()
              const brandingTexture = textureLoader.load(branding)
              brandingTexture.minFilter = THREE.LinearFilter
              const brandingMaterial = new THREE.MeshPhongMaterial({
                map: brandingTexture,
                side: THREE.FrontSide,
                bumpMap: bumpMapObj,
                transparent: true
              })
              children[brandingIndex].material = brandingMaterial
            }
            /* Object Conig */
            const verticalPosition = isPhone ? PHONE_POSITION : 0
            object.position.y = verticalPosition
            object.name = MESH_NAME
            this.scene.add(object)

            this.setState({ loadingModel: false, firstLoad: false })
          },
          this.onProgress,
          this.onError
        )
      })
    }
  }
  renderModel = async (
    design,
    actualImage,
    colorAccessories,
    fromImage = false
  ) => {
    const { product = {}, flatlockColor, proDesign, highResolution } = design

    const { stitchingValue, isPhone } = this.props
    if (design.canvas && isPhone) {
      await this.getFontsFromCanvas(design.canvas)
    }
    const loadedTextures = await this.loadTextures(
      design,
      actualImage,
      fromImage
    )
    /* Object and MTL load */
    const mtlLoader = new THREE.MTLLoader()
    mtlLoader.load(product.mtl, materials => {
      this.handleOnLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(
        product.obj,
        async object => {
          const {
            areas = [],
            colors,
            flatlock,
            zipper,
            bumpMap,
            binding,
            bibBrace,
            branding,
            texture
          } = loadedTextures
          const { children } = object
          const objectChildCount = children.length
          const getMeshIndex = meshName => {
            const index = findIndex(children, mesh => mesh.name === meshName)
            return index < 0 ? 0 : index
          }
          const meshIndex = getMeshIndex(MESH)
          /* Stitching */
          if (!!flatlock) {
            const flatlockIndex = getMeshIndex(FLATLOCK)
            const flatlockMaterial = new THREE.MeshLambertMaterial({
              alphaMap: flatlock,
              color:
                get(colorAccessories, 'stitching', flatlockColor) ||
                stitchingValue
            })
            flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
            flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
            flatlockMaterial.alphaTest = 0.5
            children[flatlockIndex].material = flatlockMaterial
          }

          /* Zipper */
          if (!!zipper) {
            const zipperIndex = getMeshIndex(ZIPPER)
            const zipperMaterial = new THREE.MeshPhongMaterial({
              map: zipper
            })
            children[zipperIndex].material = zipperMaterial
          }
          /* Binding */
          if (!!binding) {
            const bindingIndex = getMeshIndex(BINDING)
            const bindingMaterial = new THREE.MeshPhongMaterial({
              map: binding
            })
            children[bindingIndex].material = bindingMaterial
          }
          /* Bib Brace */
          if (!!bibBrace) {
            const bibBraceIndex = getMeshIndex(BIB_BRACE)
            const bibBraceMaterial = new THREE.MeshPhongMaterial({
              map: bibBrace
            })
            children[bibBraceIndex].material = bibBraceMaterial
          }

          /* Inside material */
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: BLACK
          })

          const frontMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.FrontSide,
            bumpMap: bumpMap
          })
          /* Assign materials */
          if (!proDesign && !fromImage && !isPhone) {
            children[meshIndex].material = insideMaterial
            const areasLayers = areas.map(() => children[meshIndex].clone())
            object.add(...areasLayers)
          }

          /* Extra files loaded by MTL file */
          const labelIndex = findIndex(children, ({ name }) => name === RED_TAG)
          if (labelIndex >= 0) {
            object.children[labelIndex].material.color.set(WHITE)
          }
          const propelPalmsIndex = findIndex(
            children,
            ({ name }) => name === PROPEL_PALMS
          )
          if (propelPalmsIndex >= 0) {
            object.children[propelPalmsIndex].material.color.set(WHITE)
          }
          const gripTapeIndex = findIndex(
            children,
            ({ name }) => name === GRIP_TAPE
          )
          if (gripTapeIndex >= 0) {
            object.children[gripTapeIndex].material.color.set(WHITE)
          }
          if (!proDesign && !fromImage && !isPhone) {
            areas.forEach(
              (map, index) =>
                (children[
                  objectChildCount + index
                ].material = new THREE.MeshPhongMaterial({
                  map,
                  side: THREE.FrontSide,
                  color: colors[index],
                  bumpMap,
                  transparent: true
                }))
            )
            /* Canvas */
            const canvas = document.createElement('canvas')
            const CANVAS_SIZE = highResolution
              ? HIGH_RESOLUTION_CANVAS
              : REGULAR_CANVAS
            canvas.width = CANVAS_SIZE
            canvas.height = CANVAS_SIZE
            this.canvasTexture = new fabric.StaticCanvas(canvas, {
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
              selection: false,
              renderOnAddRemove: false,
              crossOrigin: 'Anonymous'
            })
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

            if (design.canvas) {
              await this.loadCanvasTexture(design.canvas)
            }
            /* Branding  */
            if (!!branding) {
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
            }
          } else {
            // /* Assign materials */
            const cloneObject = children[meshIndex].clone()
            object.add(cloneObject)
            children[meshIndex].material = insideMaterial
            children[objectChildCount].material = frontMaterial
          }

          /* Object Conig */
          const verticalPosition = isPhone ? PHONE_POSITION : 0
          object.position.y = verticalPosition
          object.name = MESH_NAME
          this.scene.add(object)
          this.setState({ loadingModel: false, firstLoad: false })
        },
        this.onProgress,
        this.onError
      )
    })
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

  loadFabricImage = url =>
    new Promise((resolve, reject) => {
      try {
        fabric.util.loadImage(url, img => resolve(img), undefined, 'Anonymous')
      } catch (e) {
        reject(e)
      }
    })

  loadCanvasTexture = async object => {
    try {
      let elements = []
      const paths = []
      const imagesElements = []
      const imagesPromises = []
      const fonts = []
      const { objects } = JSON.parse(object)
      const indexes = {}
      objects.forEach((el, index) => {
        const elId = shortid.generate()
        el.id = elId
        el.hasRotatingPoint = false
        indexes[elId] = index
        switch (el.type) {
          case CanvasElements.Text: {
            elements.push(el)
            fonts.push(el.fontFamily)
            break
          }
          case CanvasElements.Group: {
            paths.push(el)
            break
          }
          case CanvasElements.Path: {
            paths.push(el)
            break
          }
          case CanvasElements.Image: {
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
      this.canvasTexture.getObjects().forEach(el => {
        el.moveTo(indexes[el.id])
      })
      this.canvasTexture.renderAll()
      return true
    } catch (e) {
      console.error('Error loading canvas object: ', e.message)
      return false
    }
  }

  getFontsFromCanvas = async object => {
    try {
      const fonts = []
      const { objects } = JSON.parse(object)
      objects.forEach(el => {
        switch (el.type) {
          case CanvasElements.Text: {
            fonts.push(el.fontFamily)
            break
          }
          default:
            break
        }
      })
      const fontsPromises = fonts.map(font => {
        const fontObserver = new FontFaceObserver(font)
        return fontObserver.load()
      })
      await Promise.all(fontsPromises)
    } catch (e) {
      console.error('Error loading canvas object: ', e.message)
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
          if (material.dispose) material.dispose()
        }
      })
      this.scene.remove(object)
    }
    if (this.canvasTexture) {
      this.canvasTexture.dispose()
    }
    if (this.container) {
      this.container.removeChild(this.renderer.domElement)
    }
  }

  getCacheQuery = () =>
    `?p=${Math.random()
      .toString(36)
      .substr(2, 5)}`

  removeObject = () => {
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      object.children.forEach(({ material }) => {
        if (!!material) {
          const { map, bumpMap, alphaMap } = material
          if (map && map.dispose) map.dispose()
          if (bumpMap && bumpMap.dispose) bumpMap.dispose()
          if (alphaMap && alphaMap.dispose) alphaMap.dispose()
          if (material.dispose) material.dispose()
        }
      })
      this.scene.remove(object)
    }
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
  saveThumbnail = async () => {
    const { designId } = this.props
    this.setFrontFaceModel()
    try {
      const { onSaveThumbnail, onUploadingThumbnail } = this.props
      onUploadingThumbnail(true)
      const thumbnail = await this.takeScreenshot()
      onSaveThumbnail(thumbnail, designId)
    } catch (error) {
      console.error(error)
      onUploadingThumbnail(false)
    }
  }
}

const Render3DWithData = compose(
  graphql(designQuery, {
    options: ({ designId }) => ({
      variables: { designId },
      fetchPolicy: 'network-only'
    }),
    withRef: true
  })
)(Render3D)

export default Render3DWithData
