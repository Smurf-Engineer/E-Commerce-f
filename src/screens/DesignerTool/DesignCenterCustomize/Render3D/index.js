import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import reverse from 'lodash/reverse'
import Spin from 'antd/lib/spin'
import Radio from 'antd/lib/radio'
import findIndex from 'lodash/findIndex'
import {
  modelPositions,
  MESH_NAME,
  BIB_BRACE_NAME,
  BINDING_NAME,
  ZIPPER_NAME
} from './config'
import {
  MESH,
  RED_TAG,
  FLATLOCK,
  ZIPPER,
  BINDING,
  BIB_BRACE,
  PROPEL_PALMS,
  GRIP_TAPE
} from '../../../../constants'
import {
  Container,
  Render,
  Progress,
  Logo,
  Button,
  Loading,
  Icon,
  Modes
} from './styledComponents'
import logo from '../../../../assets/jakroo_logo.svg'

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
      binding: oldBinding
    } = this.props
    const {
      colors: nextColors,
      areas: nextAreas,
      design,
      colorBlockHovered,
      files,
      bibBrace,
      zipper,
      binding
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
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    })

    renderer.setPixelRatio(window.devicePixelRatio)
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

    if (this.scene) {
      this.clearScene()
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

  loadObject = async (files, design) => {
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
    const { loadingModel, files, onSaveDesign, uploadingThumbnail } = this.props

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
        <Modes>
          <Radio.Group value={'large'} onChange={this.handleSizeChange}>
            <Radio.Button value="large">Style Mode</Radio.Button>
            <Radio.Button value="default">Placeholder Mode</Radio.Button>
          </Radio.Group>
        </Modes>
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
        this.zipper.white.dispose()
        this.zipper.black.dispose()
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
}

export default Render3D
