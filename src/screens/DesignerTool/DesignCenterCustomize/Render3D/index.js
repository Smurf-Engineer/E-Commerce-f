import React, { PureComponent } from 'react'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import reverse from 'lodash/reverse'
import findIndex from 'lodash/findIndex'
import message from 'antd/lib/message'
import { modelPositions } from './config'
import { Container, Render, Progress, Logo } from './styledComponents'
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
      preserveDrawingBuffer: true
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

    // TODO: Need tests
    if (this.scene) {
      const object = this.scene.getObjectByName('jersey')
      if (object) {
        object.children.forEach(mesh => {
          mesh.material.dispose()
          object.dispose()
          this.scene.dispose()
        })
      }
    }
  }

  loadTextures = modelTextures =>
    new Promise((resolve, reject) => {
      try {
        const loadedTextures = {}
        loadedTextures.flatlock = this.imgLoader.load(
          './models/images/flatlock.png'
        )
        loadedTextures.bumpMap = this.imgLoader.load(modelTextures.bumpMap)
        const reversedAreas = reverse(modelTextures.areas)
        const loadedAreas = reversedAreas.map(areaUri => {
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
      const object = this.scene.getObjectByName('jersey')
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

    console.log('------------------------------------')
    console.log(files)
    console.log('------------------------------------')

    /* Texture configuration */
    const loadedTextures = await this.loadTextures(files)

    this.mtlLoader.load(files.mtl, materials => {
      onLoadModel(true)
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(
        files.obj,
        object => {
          const objectChilds = object.children.length
          this.setState({ objectChilds })

          /* Object materials */
          // Stitching
          const flatlockMaterial = new THREE.MeshPhongMaterial({
            map: loadedTextures.flatlock
          })
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping

          // Back material
          const insideMaterial = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            color: '#000000'
          })

          const { children } = object

          const getMeshIndex = meshName => {
            const index = findIndex(children, mesh => mesh.name === meshName)
            return index < 0 ? 0 : index
          }

          const meshIndex = getMeshIndex('FINAL JV2_Design_Mesh')
          const labelIndex = getMeshIndex('Red_Tag FINAL')
          const flatlockIndex = getMeshIndex('FINAL JV2_Flatlock')

          // Setup the texture layers
          const areasLayers = loadedTextures.areas.map(() =>
            object.children[meshIndex].clone()
          )
          object.add(...areasLayers)

          /* Jersey label */
          object.children[labelIndex].material.color.set('#ffffff')
          object.children[flatlockIndex].material = flatlockMaterial
          object.children[meshIndex].material = insideMaterial

          loadedTextures.areas.forEach(
            (materialTexture, index) =>
              (object.children[
                objectChilds + index
              ].material = new THREE.MeshPhongMaterial({
                map: loadedTextures.areas[index],
                side: THREE.FrontSide,
                bumpMap: loadedTextures.bumpMap,
                color: files.design.colors[index],
                transparent: true
              }))
          )

          /* Object Config */
          object.position.y = -40
          object.name = 'jersey'
          this.scene.add(object)
          onLoadModel(false)
        },
        this.onProgress,
        this.onError
      )
    })
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

  lightUpdate = () => {
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

  render() {
    const { progress } = this.state
    const { loadingModel, files } = this.props

    return (
      <Container>
        <Render innerRef={container => (this.container = container)}>
          {loadingModel && <Progress type="circle" percent={progress + 1} />}
          {!files && <Logo src={logo} />}
        </Render>
        {/* TODO: WIP
        <ButtonWrapper>
          <Button onClick={this.saveThumbnail}>Save Thumbnail</Button>
        </ButtonWrapper>
      */}
      </Container>
    )
  }

  setFrontFaceModel = () => {
    if (this.camera) {
      const { front: { x, y, z } } = modelPositions
      this.camera.position.set(x, y, z)
      this.controls.update()
    }
  }

  takeScreenshot = () =>
    new Promise(resolve => {
      setTimeout(() => {
        const thumbnail = this.renderer.domElement.toDataURL('image/webp', 0.5)
        resolve(thumbnail)
      }, 800)
    })

  saveThumbnail = async colors => {
    this.setFrontFaceModel()
    this.setupColors(colors)
    const { designConfig } = this.props
    if (isEmpty(designConfig)) {
      message.error('Please select a JSON file')
    } else {
      try {
        // TODO: Call action to upload
        const thumbnail = await this.takeScreenshot(inspirationColors.colors)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default Render3D
