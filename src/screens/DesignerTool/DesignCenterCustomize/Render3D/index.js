import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import reverse from 'lodash/reverse'
import Spin from 'antd/lib/spin'
import findIndex from 'lodash/findIndex'
import { modelPositions, MESH_NAME } from './config'
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

class Render3D extends PureComponent {
  state = {
    progress: 0,
    objectChilds: 0
  }

  componentWillReceiveProps(nextProps) {
    const {
      colors,
      colorBlockHovered: oldColorBlockHovered,
      files: oldFiles,
      areas
    } = this.props
    const {
      colors: nextColors,
      areas: nextAreas,
      colorBlockHovered,
      files
    } = nextProps

    const areasHasChange = isEqual(areas, nextAreas)
    if (!areasHasChange) {
      this.loadDesign(nextAreas, nextColors)
      return
    }

    const filesHasChange = isEqual(files, oldFiles)
    if (!filesHasChange) {
      this.loadObject(files)
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
      this.scene.dispose()
    }
  }

  loadTextures = modelTextures =>
    new Promise((resolve, reject) => {
      try {
        const loadedTextures = {}
        // TODO: TEST
        loadedTextures.zipper = this.imgLoader.load(
          'https://storage.googleapis.com/jakroo-designs/TEST_DESIGN/EPIC/3D%20MODEL/images/zipper_black.jpg'
        )
        loadedTextures.binding = this.imgLoader.load(
          'https://storage.googleapis.com/jakroo-designs/TEST_DESIGN/EPIC/3D%20MODEL/images/EPIC_Jv2-BumpMap.jpg'
        )
        const { bumpMap, flatlock, brandingPng, areasPng = [] } = modelTextures
        loadedTextures.flatlock = this.imgLoader.load(flatlock)
        loadedTextures.bumpMap = this.imgLoader.load(bumpMap)
        loadedTextures.branding = this.imgLoader.load(brandingPng)
        loadedTextures.branding.minFilter = THREE.LinearFilter
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
      const { objectChilds } = this.state
      const object = this.scene.getObjectByName(MESH_NAME)
      if (object) {
        loadedTextures.forEach((texture, index) => {
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

  loadObject = async files => {
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

          console.log('------------------------------------')
          console.log(object)
          console.log('------------------------------------')

          /* Object materials */
          // Stitching
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            alphaMap: flatlock,
            color: '#FFFFFF'
          })
          flatlockMaterial.alphaMap.wrapS = THREE.RepeatWrapping
          flatlockMaterial.alphaMap.wrapT = THREE.RepeatWrapping
          flatlockMaterial.alphaTest = 0.5
          // TODO: TEST
          const zipperMaterial = new THREE.MeshLambertMaterial({
            map: loadedTextures.zipper
          })
          const bindingMaterial = new THREE.MeshLambertMaterial({
            map: loadedTextures.binding
          })
          // END TEST
          // Back material
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })

          const getMeshIndex = meshName => {
            const index = findIndex(children, ({ name }) => name === meshName)
            return index < 0 ? 0 : index
          }

          // const meshIndex = getMeshIndex('FINAL JV2_Design_Mesh')
          const meshIndex = getMeshIndex('FINAL1 polySurface1')
          // TODO: TEST
          const zipperIndex = getMeshIndex('FINAL1 OBJ1')
          const bindingIndex = getMeshIndex('FINAL1 OBJ1')
          // TODO: END TEST
          // const labelIndex = getMeshIndex('Red_Tag FINAL')
          const labelIndex = getMeshIndex(
            'FINAL1 RED_J_TAG:RED_J_TAG:J_Red_Tag:pCube1'
          )
          const flatlockIndex = getMeshIndex('FINAL JV2_Flatlock')

          // Setup the texture layers
          const areasLayers = areas.map(() =>
            object.children[meshIndex].clone()
          )
          object.add(...areasLayers)

          /* Jersey label */
          object.children[labelIndex].material.color.set('#ffffff')
          object.children[flatlockIndex].material = flatlockMaterial
          object.children[meshIndex].material = insideMaterial
          // TODO: Start test
          object.children[zipperIndex].material = zipperMaterial
          object.children[bindingIndex].material = bindingMaterial
          // TODO: End test

          const { colors = [] } = files.design || {}
          const reversedAreas = reverse(areas)

          reversedAreas.forEach(
            (map, index) =>
              (object.children[
                objectChilds + index
              ].material = new THREE.MeshPhongMaterial({
                map,
                bumpMap,
                side: THREE.FrontSide,
                color: colors[index],
                transparent: true
              }))
          )

          /* Branding  */
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

          /* Object Config */
          object.position.y = -35
          object.name = MESH_NAME
          this.scene.add(object)
          onLoadModel(false)

          if (window !== undefined && !window.scene) {
            window.scene = this.scene
          }
        },
        this.onProgress,
        this.onError
      )
    })
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

  saveThumbnail = async (design, item, colors) => {
    this.setFrontFaceModel()
    const reverseColors = reverse(colors)
    this.setupColors(reverseColors)
    try {
      const { onSaveThumbnail, onUploadingThumbnail } = this.props
      onUploadingThumbnail(true)
      const thumbnail = await this.takeScreenshot()
      onSaveThumbnail(design, item, thumbnail)
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
