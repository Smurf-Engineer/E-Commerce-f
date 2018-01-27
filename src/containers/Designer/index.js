import React, { Component } from "react";
import vertexShader from "./vertex";
import fragmentShader from "./fragment";

/* eslint-disable */
class Designer extends Component {
  componentDidMount() {
    /* Renderer config */
    const { clientWidth, clientHeight } = this.container;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#4f5052");
    renderer.setSize(clientWidth, clientHeight);

    /* Textures */

    const loader = new THREE.TextureLoader();

    const front = loader.load("./models/Tour5/bb-1-camfront_Front.png");
    const rightSleeve = loader.load(
      "./models/Tour5/bb-3-camright_Right Sleeve.png"
    );
    const leftSleeve = loader.load(
      "./models/Tour5/bb-5-camleft_Left Sleeve.png"
    );
    const rightPanel = loader.load(
      "./models/Tour5/bb-2-camright_RightSidepanel.png"
    );
    const leftPanel = loader.load(
      "./models/Tour5/bb-4-camleft_Left_Sidepanel.png"
    );
    const back = loader.load("./models/Tour5/bb-6-camback_Back.png");
    const backPocket = loader.load(
      "./models/Tour5/bb-7-camback_Back Pockets.png"
    );
    const branding = loader.load("./models/Tour5/branding.png");
    const color1 = loader.load("./models/Tour5/colorblock_1.png");
    const color2 = loader.load("./models/Tour5/colorblock_2.png");
    const color3 = loader.load("./models/Tour5/colorblock_3.png");
    const color4 = loader.load("./models/Tour5/colorblock_4.png");
    const color5 = loader.load("./models/Tour5/colorblock_5.png");
    const flatlock = loader.load("./models/Tour5/flatlock.png");
    const label = loader.load("./models/Red-J.jpg");
    const bumpMap = loader.load("./models/TOUR-SS_Jersey-BUMP.jpg");

    /* Camera */
    const camera = new THREE.PerspectiveCamera(
      25,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    camera.position.z = 250;
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", this.lightUpdate);

    /* Scene and light */
    const scene = new THREE.Scene();
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.copy(camera.position);

    const mtlLoader = new THREE.MTLLoader();

    scene.add(camera);
    scene.add(ambient);
    scene.add(directionalLight);

    /* Object and MTL load */

    mtlLoader.setPath("./models/");
    mtlLoader.load("Tour.mtl", materials => {
      materials.preload();
      const objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("./models/");
      objLoader.load(
        "Tour.obj",
        object => {
          // Materials
          /* Object material */
          const flatlockMaterial = new THREE.MeshLambertMaterial({
            map: flatlock,
            color: 0xffffff
          });
          flatlockMaterial.map.wrapS = THREE.RepeatWrapping;
          flatlockMaterial.map.wrapT = THREE.RepeatWrapping;

          const uniforms = {
            customColor1: { type: "c", value: new THREE.Color("#F0AAB4") },
            customColor2: { type: "c", value: new THREE.Color("#EE3C6F") },
            customColor3: { type: "c", value: new THREE.Color("#94CFBB") },
            customColor4: { type: "c", value: new THREE.Color("#00ADEE") },
            customColor5: { type: "c", value: new THREE.Color("#000000") },
            positionX: { type: "f", value: 1.0 },
            positionY: { type: "f", value: 1.0 },
            color1: {},
            color2: {},
            color3: {},
            color4: {},
            color5: {},
            logo: {}
          };

          const phongShader = THREE.ShaderLib.phong;
          const mergeUniforms = THREE.UniformsUtils.merge([
            phongShader.uniforms,
            uniforms
          ]);

          const uniformsWithPhong = THREE.UniformsUtils.clone(mergeUniforms);
          uniformsWithPhong.color1.value = color1;
          uniformsWithPhong.color2.value = color2;
          uniformsWithPhong.color3.value = color3;
          uniformsWithPhong.color4.value = color4;
          uniformsWithPhong.color5.value = color5;
          uniformsWithPhong.bumpMap.value = bumpMap;
          uniformsWithPhong.bumpMapScale = 0.45;
          uniformsWithPhong.shininess.value = 20;

          this.uniformsWithPhong = uniformsWithPhong;

          const defines = {};
          defines["USE_MAP"] = "";
          defines["USE_COLOR"] = "";
          defines["USE_BUMPMAP"] = "";

          const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniformsWithPhong,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.FrontSide,
            defines: defines,
            lights: true
          });

          shaderMaterial.extensions.derivatives = true;

          // Inside material
          const insideMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.BackSide
          });

          /* Texture materials */
          const labelMaterial = new THREE.MeshPhongMaterial({ map: label });
          const backPocketMaterial = new THREE.MeshPhongMaterial({
            map: backPocket
          });

          /* Assign materials */
          const cloneObject = object.children[0].clone();
          object.add(cloneObject);

          // FIXME: Clipart testing
          // object.children[0].add(logoMesh);

          /* jersey */
          object.children[0].material = insideMaterial;
          object.children[24].material = shaderMaterial;
          /* flatlock */
          object.children[1].material = flatlockMaterial;
          object.children[2].material = flatlockMaterial;
          object.children[3].material = flatlockMaterial;
          object.children[4].material = flatlockMaterial;
          object.children[5].material = flatlockMaterial;
          object.children[6].material = flatlockMaterial;
          object.children[7].material = flatlockMaterial;
          object.children[8].material = flatlockMaterial;
          object.children[9].material = flatlockMaterial;
          object.children[10].material = flatlockMaterial;
          /* Jersey label */
          object.children[17].material = labelMaterial;
          /* back pocket */
          object.children[22].material = backPocketMaterial;

          /* Object Conig */
          object.position.y = -30;
          object.name = "jersey";
          scene.add(object);
        },
        this.onProgress,
        this.onError
      );
    });

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.loader = mtlLoader;
    this.directionalLight = directionalLight;
    this.setupGui();

    this.container.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.container.removeChild(this.renderer.domElement);
  }

  setupGui = () => {
    const object = this.scene.getObjectByName("jersey");
    const gui = new dat.GUI({
      height: 5 * 32 - 1
    });
    const Config = function() {
      this.block1 = "#FFAAB4";
      this.block2 = "#EE3C6F";
      this.block3 = "#94CFBB";
      this.block4 = "#00ADEE";
      this.flatlock = "#ffffff";
      this.object = "#000000";
      this.positionX = 1.0;
      this.positionY = 1.0;
    };
    const conf = new Config();

    const setPosition = function() {
      logoMesh.position.set(positionY, positionX, 15.5);
    };

    const positionControllerX = gui
      .add(conf, "positionX")
      .min(0.6)
      .max(1.2)
      .step(0.001);
    positionControllerX.onChange(value => {
      this.uniformsWithPhong.positionX.value = value;
    });

    const positionControllerY = gui
      .add(conf, "positionY")
      .min(0.9)
      .max(1.2)
      .step(0.001);
    positionControllerY.onChange(value => {
      this.uniformsWithPhong.positionY.value = value;
    });

    const controller1 = gui.addColor(conf, "block1");
    controller1.onChange(colorValue => {
      this.uniformsWithPhong.customColor1.value = new THREE.Color(colorValue);
    });

    const controller2 = gui.addColor(conf, "block2");
    controller2.onChange(colorValue => {
      this.uniformsWithPhong.customColor2.value = new THREE.Color(colorValue);
    });

    const controller3 = gui.addColor(conf, "block3");
    controller3.onChange(colorValue => {
      this.uniformsWithPhong.customColor3.value = new THREE.Color(colorValue);
    });

    const controller4 = gui.addColor(conf, "block4");
    controller4.onChange(colorValue => {
      this.uniformsWithPhong.customColor4.value = new THREE.Color(colorValue);
    });

    const flatlockController = gui.addColor(conf, "flatlock");
    flatlockController.onChange(colorValue => {
      object.children[1].material.color = new THREE.Color(colorValue);
    });

    const objectController = gui.addColor(conf, "object");
    objectController.onChange(colorValue => {
      this.uniformsWithPhong.customColor5.value = new THREE.Color(colorValue);
    });
  };

  onProgress = xhr => {
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + "% downloaded");
    }
  };

  onError = xhr => {
    console.log("Error: " + xhr);
  };

  start = () => {
    if (!this.framId) {
      this.framId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.framId);
  };

  animate = () => {
    this.rendeScene();
    this.framId = window.requestAnimationFrame(this.animate);
  };

  rendeScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  lightUpdate = () => {
    this.directionalLight.position.copy(this.camera.position);
  };

  render() {
    return (
      <div>
        <div>Jackroo Designer - v0.01</div>
        <div
          ref={container => (this.container = container)}
          style={{ width: "100%", height: "100vh" }}
        />
      </div>
    );
  }
}

export default Designer;
