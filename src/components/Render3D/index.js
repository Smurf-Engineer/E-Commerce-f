import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import findIndex from 'lodash/findIndex'
import Icon from 'antd/lib/icon'
import FontFaceObserver from 'fontfaceobserver'
import isEqual from 'lodash/isEqual'
import reverse from 'lodash/reverse'
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
  Loading
} from './styledComponents'
import {
  MESH,
  BIB_BRACE,
  BINDING,
  ZIPPER,
  RED_TAG,
  FLATLOCK,
  PROPEL_PALMS,
  GRIP_TAPE,
  ACCESSORY_WHITE,
  CANVAS_SIZE,
  MESH_NAME
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
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(WHITE)
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
      data: { loading, error, design = {} }
    } = nextProps
    const {
      data: { design: oldDesign = {} }
    } = this.props
    const notEqual = !isEqual(design, oldDesign)
    const { firstLoad } = this.state
    if (!loading && !error && (notEqual || firstLoad)) {
      this.renderModel(design)
    }
  }

  componentWillUnmount() {
    this.stop()
    this.clearScene()
  }

  loadTextures = design =>
    new Promise((resolve, reject) => {
      try {
        const {
          product,
          bibBraceColor,
          bindingColor,
          zipperColor,
          colors,
          style: { brandingPng }
        } = design
        const { flatlock, bumpMap, zipper, binding, bibBrace } = product
        const loadedTextures = {}
        const textureLoader = new THREE.TextureLoader()
        if (!!zipper) {
          const texture = !!zipper[zipperColor]
            ? zipper[zipperColor]
            : ACCESSORY_WHITE
          loadedTextures.zipper = textureLoader.load(texture)
          loadedTextures.zipper.minFilter = THREE.LinearFilter
        }
        if (!!binding) {
          const texture = !!binding[bindingColor]
            ? binding[bindingColor]
            : ACCESSORY_WHITE
          loadedTextures.binding = textureLoader.load(texture)
          loadedTextures.binding.minFilter = THREE.LinearFilter
        }
        if (!!bibBrace) {
          const texture = !!bibBrace[bibBraceColor]
            ? bibBrace[bibBraceColor]
            : ACCESSORY_WHITE
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
        const reversedAreas = reverse(sanitizedColors)
        const images = []
        loadedTextures.colors = []
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
      data: { loading, error }
    } = this.props

    if (error) {
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
      <Container onKeyDown={this.handleOnKeyDown}>
        <Render
          {...{ customProduct }}
          innerRef={container => (this.container = container)}
        >
          {loading && <Loading indicator={circleIcon} />}
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
        </Render>
        {showDragmessage &&
          !loading && (
            <DragText>
              <FormattedMessage {...messages.drag} />
            </DragText>
          )}
      </Container>
    )
  }

  renderModel = async design => {
    const { product = {}, flatlockColor } = design

    const loadedTextures = await this.loadTextures(design)

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
            areas,
            colors,
            flatlock,
            zipper,
            bumpMap,
            binding,
            bibBrace,
            branding
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
              color: flatlockColor || WHITE
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

          /* Assign materials */
          children[meshIndex].material = insideMaterial
          const areasLayers = areas.map(() => children[meshIndex].clone())
          object.add(...areasLayers)

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

          if (design.canvas) {
            await this.loadCanvasTexture(design.canvas)
          }

          /* Object Conig */
          object.position.y = 0
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
      for (const el of objects) {
        el.hasRotatingPoint = false
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
      const fontsPromises = fonts.map(font => {
        const fontObserver = new FontFaceObserver(font)
        return fontObserver.load()
      })
      await Promise.all(fontsPromises)
      const fabricObjects = await this.convertToFabricObjects(elements)
      fabricObjects.forEach(o => this.canvasTexture.add(o))
      this.canvasTexture.renderAll()
      return true
    } catch (e) {
      return false
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
          material.dispose()
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
}

const Render3DWithData = compose(
  graphql(designQuery, {
    options: ({ designId }) => ({
      variables: { designId },
      fetchPolicy: 'network-only'
    })
  })
)(Render3D)

export default Render3DWithData