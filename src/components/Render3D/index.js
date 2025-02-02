import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import findIndex from 'lodash/findIndex'
import Icon from 'antd/lib/icon'
import FontFaceObserver from 'fontfaceobserver'
import isEqual from 'lodash/isEqual'
import has from 'lodash/has'
import cloneDeep from 'lodash/cloneDeep'
import find from 'lodash/find'
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
  Logo,
  Details,
  Property,
  DetailLabel,
  DetailProperties,
  DetailHeader,
  ContainerError,
  ProgressProduct,
  Loading
} from './styledComponents'
import { modelPositions } from './config'
import {
  blackProducts,
  doubleSideMeshes,
  blackMeshes,
  MESH,
  PREDYED_TRANSPARENT,
  BIB_BRACE,
  BINDING,
  ZIPPER,
  RED_TAG,
  FLATLOCK,
  PNG_EXTENSION,
  PROPEL_PALMS,
  GRIP_TAPE,
  REGULAR_CANVAS,
  PHONE_POSITION,
  HIGH_RESOLUTION_CANVAS,
  MESH_NAME,
  MODEL_SIZES,
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_INTENSITY,
  ACCESSORY_BLACK
} from '../../constants'
import { CanvasElements } from '../../screens/DesignCenter/constants'
import messages from './messages'
import { getFileExtension } from '../../utils/utilsFiles'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import OwnYourStyle from '../../assets/OWNYOURSTYLE.svg'
import JakrooLogoWhite from '../../assets/jakroo_logo_white.svg'
import '../../screens/App/theme.ant'
import { stubTrue } from 'lodash'

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
    await LoadScripts(threeDScripts)
    if (this.container) {
      const { modelSize, disableControls, maxHeight, zoomedIn, lowResolution } = this.props
      /* Renderer config */
      const { clientWidth = 0, clientHeight = 0 } = this.container
      const precision = lowResolution ? 'lowp' : 'highp'
      const renderer = new THREE.WebGLRenderer({
        alpha: !lowResolution,
        antialias: !lowResolution,
        precision,
        preserveDrawingBuffer: !lowResolution,
        powerPreference: lowResolution ? 'high-performance' : 'default'
      })
      renderer.setPixelRatio(lowResolution ? (window.devicePixelRatio * 0.7) : window.devicePixelRatio)
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(clientWidth, clientHeight)
      if (!lowResolution) {
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
      }
      /* Camera */
      const camera = new THREE.PerspectiveCamera(
        25,
        clientWidth / clientHeight,
        0.1,
        1000
      )
      camera.position.z = MODEL_SIZES[modelSize] || 160

      const controls = new THREE.OrbitControls(camera, renderer.domElement)
      controls.addEventListener('change', this.lightUpdate)

      controls.enableKeys = false
      controls.minDistance = maxHeight || zoomedIn ? 40 : 80
      controls.maxDistance = 350
      controls.enableZoom = true
      controls.enabled = !disableControls
      if (disableControls) {
        this.setState({ showDragmessage: false })
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

      if (lowResolution) {
        scene.background = new THREE.Color('#FFFFFF')
      }
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

        scene.add(ground);
      }
      scene.add(directionalLight)

      this.scene = scene
      this.camera = camera
      this.renderer = renderer
      this.controls = controls
      this.directionalLight = directionalLight
      this.environmentLight = ambient

      this.container.appendChild(this.renderer.domElement)

      this.start()
      const { designId, product, actualImage = '', colorAccessories } = this.props
      if (!designId && product) {
        setTimeout(() => {
          this.renderProduct(
            product,
            actualImage,
            false,
            colorAccessories
          )
        }, 2000)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { loading, error, design = {} } = {},
      actualImage = '',
      colorAccessories,
      product: newProduct,
      modelMtl,
      hidePredyed: newPredyed,
      light: newLight,
      disableControls: newDisableControls
    } = nextProps
    const {
      product,
      modelMtl: oldMtl,
      isProduct,
      designId,
      data: { design: oldDesign = {} } = {},
      actualImage: oldImage = '',
      colorAccessories: oldColorAccessories,
      hidePredyed,
      light: oldLight,
      disableControls
    } = this.props
    const { firstLoad } = this.state
    const imageChanged = !isEqual(actualImage, oldImage)
    const accessoriesChanged = !isEqual(colorAccessories, oldColorAccessories) || (modelMtl !== oldMtl)
    const productChanged =
      (product && newProduct && product.obj !== newProduct.obj) || (hidePredyed !== newPredyed)
    const productToRender = productChanged ? newProduct : product
    if (productChanged && this.renderer) {
      this.removeObject()
    }
    if (isProduct && productToRender) {
      if (imageChanged || accessoriesChanged || (firstLoad && designId) || productChanged) {
        setTimeout(() => {
          this.renderProduct(
            productToRender,
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
    if (oldLight !== newLight) {
      this.setAmbientLight(newLight)
    }
    if (disableControls !== newDisableControls) {
      this.controls.enabled = !newDisableControls
      this.setState({ showDragmessage: !newDisableControls })
    }
  }

  componentWillUnmount() {
    if (this.canvasTexture) {
      this.canvasTexture.dispose()
    }
    if (this.scene) {
      this.stop()
      this.clearScene()
    }
  }

  loadTextures = (design, actualImage, fromImage) => {
    const { lowResolution } = this.props
    return lowResolution ?
      new Promise(async (resolve, reject) => {
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
          const { colorAccessories, asImage, customProduct } = this.props
          const { flatlock, bumpMap, zipper, binding, bibBrace } = product
          const loadedTextures = {}
          const textureLoader = new THREE.TextureLoader()
          textureLoader.setCrossOrigin('anonymous')
          if (!!zipper) {
            const hasZipperColor =
              has(colorAccessories, 'zipperColor') &&
              colorAccessories.zipperColor.length

            const texture =
              zipper[hasZipperColor ? colorAccessories.zipperColor : zipperColor]
            loadedTextures.zipper = textureLoader.load(lowResolution ? (await this.resizeImage(texture, 512, 512, 1) || texture) : texture)
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
            loadedTextures.binding = textureLoader.load(lowResolution ? (await this.resizeImage(texture, 512, 512, 1) || texture) : texture)
            loadedTextures.binding.minFilter = THREE.LinearFilter
          }
          if (!!bibBrace) {
            const hasBibColor =
              has(colorAccessories, 'bibColor') &&
              colorAccessories.bibColor.length
            const texture =
              bibBrace[hasBibColor ? colorAccessories.bibColor : bibBraceColor]
            loadedTextures.bibBrace = textureLoader.load(lowResolution ? (await this.resizeImage(texture, 512, 512, 1) || texture) : texture)
            loadedTextures.bibBrace.minFilter = THREE.LinearFilter
          }

          if (!!flatlock) {
            loadedTextures.flatlock = textureLoader.load(lowResolution ? (await this.resizeImage(flatlock, 512, 512, 1) || flatlock) : flatlock)
          }
          if (!!brandingPng) {
            loadedTextures.branding = textureLoader.load(lowResolution ? (await this.resizeImage(brandingPng, 512, 512, 1) || brandingPng) : brandingPng)
            loadedTextures.branding.minFilter = THREE.LinearFilter
          }
          loadedTextures.bumpMap = textureLoader.load(lowResolution ? (await this.resizeImage(bumpMap, 512, 512, 1) || bumpMap) : bumpMap)
          const sanitizedColors = colors.map(({ color, image }) => ({
            color,
            image
          }))

          const images = []

          loadedTextures.colors = []

          if ((proDesign || (outputPng && customProduct)) || (outputSvg && fromImage) || asImage) {
            if ((actualImage || (outputSvg && !outputPng)) && !asImage) {
              const imageExtension = getFileExtension(actualImage)
              if (imageExtension === PNG_EXTENSION) {
                const auxImage = `${actualImage}${this.getCacheQuery()}`
                const newImage = lowResolution ? (await this.resizeImage(actualImage, 1024, 1024, 1) || auxImage) : auxImage
                loadedTextures.texture = textureLoader.load(
                  newImage
                )
              } else {
                const imageCanvas = document.createElement('canvas')
                const auxImage = `${actualImage || outputSvg}${this.getCacheQuery()}`
                const newImage = lowResolution ? (await this.resizeImage(auxImage, 1024, 1024, 1) || auxImage) : auxImage
                canvg(
                  imageCanvas,
                  newImage
                )
                loadedTextures.texture = new THREE.Texture(imageCanvas)
              }
            } else if (!outputPng && outputSvg) {
              const imageCanvas = document.createElement('canvas')
              const auxImage = `${outputSvg}${this.getCacheQuery()}`
              const newImage = lowResolution ? (await this.resizeImage(auxImage, 1024, 1024, 1) || auxImage) : auxImage
              canvg(
                imageCanvas,
                newImage
              )
              loadedTextures.texture = new THREE.Texture(imageCanvas)
            }
            else {
              const auxImage = `${outputPng}${this.getCacheQuery()}`
              loadedTextures.texture = textureLoader.load(
                lowResolution ? (await this.resizeImage(auxImage, 1024, 1024, 1) || auxImage) : auxImage
              )
            }
            loadedTextures.texture.needsUpdate = true
          } else {
            const reversedAreas = reverse(sanitizedColors)
            reversedAreas.forEach(({ color, image }) => {
              loadedTextures.colors.push(color)
              images.push(image)
            })
            const loadedAreas = images.map((image) => {
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
      }) :
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
          const { colorAccessories, asImage, customProduct } = this.props
          const { flatlock, bumpMap, zipper, binding, bibBrace } = product
          const loadedTextures = {}
          const textureLoader = new THREE.TextureLoader()
          textureLoader.setCrossOrigin('anonymous')
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

          if ((proDesign || (outputPng && customProduct)) || (outputSvg && fromImage) || asImage) {
            if ((actualImage || (outputSvg && !outputPng)) && !asImage) {
              const imageExtension = getFileExtension(actualImage)
              if (imageExtension === PNG_EXTENSION) {
                loadedTextures.texture = textureLoader.load(
                  `${actualImage}${this.getCacheQuery()}`
                )
              } else {
                const imageCanvas = document.createElement('canvas')
                canvg(
                  imageCanvas,
                  `${actualImage || outputSvg}${this.getCacheQuery()}`
                )
                loadedTextures.texture = new THREE.Texture(imageCanvas)
              }
            } else if (!outputPng && outputSvg) {
              const imageCanvas = document.createElement('canvas')
              canvg(
                imageCanvas,
                `${outputSvg}${this.getCacheQuery()}`
              )
              loadedTextures.texture = new THREE.Texture(imageCanvas)
            }
            else {
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
            const loadedAreas = images.map((image) => {
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
  }

  handleOnLoadModel = (isLoading) => this.setState({ loadingModel: isLoading })

  onProgress = (xhr) => {
    if (xhr.lengthComputable) {
      const progress = Math.round((xhr.loaded / xhr.total) * 100)
      this.setState({ progress })
    }
  }

  setAmbientLight = (light) => {
    if (this.environmentLight) {
      this.environmentLight.color.set(light ? new THREE.Color(light) : 0xffffff)
    }
  }

  onError = (xhr) => console.error('Error: ' + xhr)

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
    // this.directionalLight.position.copy(this.camera.position)
  }

  render() {
    const { showDragmessage, progress, loadingModel } = this.state
    const {
      customProduct,
      designSearch,
      isProduct,
      fullHeight,
      isAdmin,
      maxHeight,
      proDesign,
      fromShare,
      data = {},
      textColor
    } = this.props
    const { loading, error, design } = data
    const { code, name, product, shared } = design || {}
    const { name: productName } = product || {}
    if ((error && !isProduct) || (!isAdmin && (fromShare && (design && !shared)))) {
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
      <Container {...{ fullHeight, proDesign }} designSearch={designSearch} onKeyDown={this.handleOnKeyDown}>
        {loadingModel && isProduct && (
          <ProgressProduct type="circle" percent={progress + 1} />
        )}
        {isAdmin && window.location === window.parent.location && (
          <Details>
            <DetailHeader>
              <Logo src={JakrooLogoWhite} />
              <Logo src={OwnYourStyle} />
            </DetailHeader>
            <DetailProperties>
              <DetailLabel>
                <Property>
                  <FormattedMessage {...messages.designName} />
                </Property>
                {name}
              </DetailLabel>
              <DetailLabel>
                <Property>
                  <FormattedMessage {...messages.designCode} />
                </Property>
                {code}
              </DetailLabel>
              <DetailLabel>
                <Property>
                  <FormattedMessage {...messages.productName} />
                </Property>
                {productName}
              </DetailLabel>
            </DetailProperties>
          </Details>
        )}
        <Render
          {...{ customProduct, designSearch, fullHeight, proDesign, maxHeight }}
          id="render-3d"
          innerRef={(container) => (this.container = container)}
        >
          {loading && !isProduct && <Loading indicator={circleIcon} />}
          {loadingModel && !isProduct && (
            <Progress type="circle" percent={progress + 1} />
          )}
        </Render>
        {showDragmessage && !loading && !proDesign && false && (
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
    colorAccessories = {}
  ) => {
    const { stitchingValue, asImage, hidePredyed } = this.props

    const {
      id,
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
      mtlLoader.setCrossOrigin('anonymous')
      mtlLoader.load(`${mtl}${this.getCacheQuery()}`, (materials) => {
        this.handleOnLoadModel(true)

        materials.preload()
        const objLoader = new THREE.OBJLoader()
        objLoader.crossOrigin = 'anonymous'
        objLoader.setMaterials(materials)
        objLoader.load(
          `${obj}${this.getCacheQuery()}`,
          async (object) => {
            const { children } = object
            const objectChildCount = children.length
            const getMeshIndex = (meshName) => {
              const index = findIndex(
                children,
                (mesh) => mesh.name === meshName
              )
              return index < 0 ? 0 : index
            }
            const meshIndex = getMeshIndex(MESH)

            const textureLoader = new THREE.TextureLoader()
            textureLoader.setCrossOrigin('anonymous')
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
              color: new THREE.Color('#fafafa')
            })
            const bumpMapObj = textureLoader.load(bumpMap)

            let textureSvg
            if (actualImage && fromImage) {
              textureSvg = textureLoader.load(
                `${actualImage}${this.getCacheQuery()}`
              )
            }

            const frontMaterial = new THREE.MeshPhongMaterial({
              color: blackProducts[id] && !textureSvg ? BLACK : 0xdbdde0,
              transparent: blackProducts[id],
              map: textureSvg,
              side: THREE.FrontSide,
              bumpMap: bumpMapObj
            })

            /* Transparent predyed  */
            if (!!branding && hidePredyed) {
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
            }

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
            if (children && blackProducts[id]) {
              children.forEach((meshItem, indexMesh) => {
                if (meshItem && doubleSideMeshes[meshItem.name]) {
                  object.children[indexMesh].material.side = THREE.DoubleSide
                }
                if (meshItem && blackMeshes[meshItem.name]) {
                  object.children[indexMesh].material.transparent = true
                  object.children[indexMesh].material.color.set(WHITE)
                  if (meshItem.name === 'FINAL JV2_Design_Mesh') {
                    object.children[indexMesh].visible = false
                  }
                }
              })
            }
            /* Assign materials */
            const isFirefox = navigator && navigator.userAgent.indexOf('Firefox') !== -1
            if (!isFirefox) {
              const canvasObj = children[meshIndex].clone()
              object.add(canvasObj)
              children[meshIndex].material = insideMaterial
              children[objectChildCount].material = frontMaterial
            }
            /* Branding */
            if (!!branding && !hidePredyed) {
              const brandingObj = children[meshIndex].clone()
              object.add(brandingObj)
              const brandingIndex = children.length - 1
              const textureLoader = new THREE.TextureLoader()
              textureLoader.setCrossOrigin('anonymous')
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
            if (isFirefox) {
              const canvasObj = children[meshIndex].clone()
              object.add(canvasObj)
              children[meshIndex].material = insideMaterial
              children[objectChildCount].material = frontMaterial
            }
            /* Object Conig */
            const verticalPosition = asImage ? PHONE_POSITION : 0
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
    const { product = {}, flatlockColor, proDesign, highResolution, outputPng } = design
    const { stitchingValue, asImage, designSearch, hidePredyed, modelObj, modelMtl, customProduct, lowResolution } = this.props
    if (design.canvas && asImage) {
      await this.getFontsFromCanvas(design.canvas)
    }
    const loadedTextures = await this.loadTextures(
      design,
      actualImage,
      fromImage
    )
    /* Object and MTL load */
    const mtlLoader = new THREE.MTLLoader()
    mtlLoader.setCrossOrigin('anonymous')
    mtlLoader.load(`${modelMtl || product.mtl}${this.getCacheQuery()}`, (materials) => {
      this.handleOnLoadModel(true)
      materials.preload()
      const objLoader = new THREE.OBJLoader()
      objLoader.crossOrigin = 'anonymous'
      objLoader.setMaterials(materials)
      objLoader.load(
        `${modelObj || product.obj}${this.getCacheQuery()}`,
        async (object) => {
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
          const getMeshIndex = (meshName) => {
            const index = findIndex(children, (mesh) => mesh.name === meshName)
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
            color: new THREE.Color('#fafafa')
          })

          const frontMaterial = new THREE.MeshPhongMaterial({
            transparent: blackProducts[product.id],
            map: texture,
            side: THREE.FrontSide,
            bumpMap: bumpMap,
            color: 0xdbdde0
          })
          /* Assign materials */
          if (!proDesign && !(outputPng && customProduct) && !fromImage && !asImage) {
            children[meshIndex].material = insideMaterial
            const areasLayers = areas.map(() => children[meshIndex].clone())
            object.add(...areasLayers)
          }
          /* Transparent predyed  */
          if (
            ((design.predyedColor === PREDYED_TRANSPARENT && !customProduct) || (hidePredyed && customProduct))
            && product.hasPredyed
          ) {
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
          if (!proDesign && !(outputPng && customProduct) && !fromImage && !asImage) {
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
            if (!!branding &&
              ((design.predyedColor !== PREDYED_TRANSPARENT && !designSearch) || (!hidePredyed && designSearch))
            ) {
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
            const isFirefox = navigator && navigator.userAgent.indexOf('Firefox') !== -1
            if (!isFirefox) {
              const cloneObject = children[meshIndex].clone()
              object.add(cloneObject)
              children[meshIndex].material = insideMaterial
              children[objectChildCount].material = frontMaterial
            }

            if (!!product.branding && (!product.hasPredyed || design.predyedColor === ACCESSORY_BLACK)) {
              const brandingObj = children[meshIndex].clone()
              object.add(brandingObj)
              const brandingIndex = children.length - 1
              const textureLoader = new THREE.TextureLoader()
              textureLoader.setCrossOrigin('anonymous')
              const brandingTexture = textureLoader.load(product.branding)
              brandingTexture.minFilter = THREE.LinearFilter
              const brandingMaterial = new THREE.MeshPhongMaterial({
                map: brandingTexture,
                side: THREE.FrontSide,
                bumpMap,
                transparent: true
              })
              children[brandingIndex].material = brandingMaterial
            }
            if (isFirefox) {
              const cloneObject = children[meshIndex].clone()
              object.add(cloneObject)
              children[meshIndex].material = insideMaterial
              children[objectChildCount].material = frontMaterial
            }
          }

          /* Object Conig */
          const verticalPosition = asImage ? PHONE_POSITION : 0
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

  loadCanvasTexture = async (object) => {
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
          case CanvasElements.Polygon:
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
      const fontsPromises = fonts.map((font) => {
        const fontObserver = new FontFaceObserver(font)
        return fontObserver.load()
      })
      await Promise.all(fontsPromises)
      const fabricObjects = await this.convertToFabricObjects(elements)
      fabricObjects.forEach((o) => this.canvasTexture.add(o))
      const temporalCanvasTexture = cloneDeep(this.canvasTexture.getObjects())
      temporalCanvasTexture.forEach((el) => {
        find(this.canvasTexture.getObjects(), (obj) => obj.id === el.id).moveTo(
          indexes[el.id]
        )
      })
      this.canvasTexture.renderAll()
      return true
    } catch (e) {
      console.error('Error loading canvas object: ', e.message)
      return false
    }
  }

  getFontsFromCanvas = async (object) => {
    try {
      const fonts = []
      const { objects } = JSON.parse(object)
      objects.forEach((el) => {
        switch (el.type) {
          case CanvasElements.Text: {
            fonts.push(el.fontFamily)
            break
          }
          default:
            break
        }
      })
      const fontsPromises = fonts.map((font) => {
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

  resizeImageCore = (imageElement, newWidth, newHeight, newQuality) => {
    const canvas = document.createElement('canvas')
    canvas.width = newWidth
    canvas.height = newHeight
    const context = canvas.getContext('2d')
    context.drawImage(imageElement, 0, 0, newWidth, newHeight)
    try {
      return canvas.toDataURL('image/jpeg', newQuality)
    } catch (e) {
      console.error(e)
      return null
    }
  }

  resizeImage = (imageUrl, newWidth, newHeight, newQuality, onError) =>
    new Promise((resolve) => {
      const image = document.createElement('img');
      image.crossOrigin = "anonymous"
      image.crossorigin = "anonymous"
      image.onload = () => {
        var dataUrl = this.resizeImageCore(image, newWidth, newHeight, newQuality)
        if (dataUrl) {
          resolve(dataUrl)
        } else {
          if (onError) {
            onError('Image saving error.');
          }
        }
      };
      image.onerror = () => {
        if (onError) {
          onError('Image loading error.');
        }
      };

      image.src = imageUrl;
    })


  takeScreenshot = () =>
    new Promise((resolve) => {
      if (this.renderer) {
        setTimeout(() => {
          const thumbnail = this.renderer.domElement.toDataURL(
            'image/webp',
            0.3
          )
          resolve(thumbnail)
        }, 800)
      }
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
  saveProDesignThumbnail = async () => {
    this.setFrontFaceModel()
    try {
      const thumbnail = await this.takeScreenshot()
      return thumbnail
    } catch (error) {
      console.error(error)
    }
  }
}

const Render3DWithData = compose(
  graphql(designQuery, {
    options: ({ designId }) => ({
      variables: { designId },
      fetchPolicy: 'network-only',
      skip: !designId
    }),
    withRef: true
  })
)(Render3D)

export default Render3DWithData
