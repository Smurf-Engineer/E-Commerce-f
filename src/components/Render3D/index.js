import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import findIndex from 'lodash/findIndex'
import { Container, Render, Progress, DragText } from './styledComponents'
import {
  MESH,
  BIB_BRACE,
  BINDING,
  ZIPPER,
  RED_TAG,
  FLATLOCK,
  PROPEL_PALMS,
  GRIP_TAPE,
  ACCESSORY_WHITE
} from '../../constants'
import messages from './messages'

/* eslint-disable */
class Render3D extends PureComponent {
  state = {
    showDragmessage: true,
    currentModel: 0,
    zoomValue: 0,
    progress: 0,
    isLoading: false,
    objectChilds: 0
  }

  async componentDidMount() {
    /* Renderer config */
    const { svg, product = {}, flatlockColor } = this.props
    const { clientWidth, clientHeight } = this.container
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

    controls.enableKeys = false
    controls.minDistance = 150
    controls.maxDistance = 350
    controls.enableZoom = true

    /* Scene and light */
    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.78)
    directionalLight.position.copy(camera.position)

    const mtlLoader = new THREE.MTLLoader()

    scene.add(camera)
    scene.add(ambient)
    scene.add(directionalLight)

    const loadedTextures = await this.loadTextures(product, svg)

    /* Object and MTL load */
    mtlLoader.load(product.mtl, materials => {
      this.handleOnLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(
        product.obj,
        object => {
          const objectChilds = object.children.length
          this.setState({ objectChilds })

          const {
            flatlock,
            zipper,
            bumpMap,
            texture,
            binding,
            bibBrace
          } = loadedTextures
          const { children } = object
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
              color: flatlockColor || '#FFFFFF'
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

          // Inside material
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })

          const frontMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.FrontSide,
            bumpMap: bumpMap
          })

          // /* Assign materials */
          const cloneObject = children[meshIndex].clone()
          object.add(cloneObject)

          children[meshIndex].material = insideMaterial
          children[objectChilds].material = frontMaterial

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

          /* Object Conig */
          object.position.y = 0
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

  loadTextures = (product, area) =>
    new Promise((resolve, reject) => {
      try {
        const { bindingColor, zipperColor, bibColor } = this.props
        const loadedTextures = {}
        const textureLoader = new THREE.TextureLoader()
        const { flatlock, bumpMap, zipper, binding, bibBrace } = product
        // TODO: Get the colors: zipper, binding, bibBrace and flatlock
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
          const texture = !!bibBrace[bibColor]
            ? bibBrace[bibColor]
            : ACCESSORY_WHITE
          loadedTextures.bibBrace = textureLoader.load(texture)
          loadedTextures.bibBrace.minFilter = THREE.LinearFilter
        }
        if (!!flatlock) {
          loadedTextures.flatlock = textureLoader.load(flatlock)
        }
        loadedTextures.bumpMap = textureLoader.load(bumpMap)
        loadedTextures.texture = textureLoader.load(area)

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
      </Container>
    )
  }

  clearScene = () => {
    const object = this.scene.getObjectByName(MESH_NAME)
    if (!!object) {
      object.children.forEach(({ material }) => {
        if (!!material) {
          const { map, bumpMap, alphaMap } = material
          if (map) map.dispose()
          if (bumpMap) bumpMap.dispose()
          if (alphaMap) alphaMap.dispose()
          material.dispose()
        }
      })
      this.scene.remove(object)
    }
  }
}

export default Render3D
