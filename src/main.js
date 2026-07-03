import 'xp.css/dist/98.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { pcWindowHTML } from './ui/pcWindowHTML.js'
import { setupPcWindow } from './ui/pcWindow.js'
import { ps2WindowHTML } from './ui/ps2WindowHTML.js'
import { setupPs2Window } from './ui/ps2Window.js'
import { sideBoardHTML } from './ui/sideBoardHTML.js'
import { setupSideBoard } from './ui/sideBoard.js'
import { makeupWindowHTML } from './ui/makeupWindowHTML.js'
import { setupMakeupWindow } from './ui/makeupWindow.js'
import { setupLights } from './room/lights.js'
import { createRoomVideos } from './room/videoTextures.js'
import { loadRoom } from './room/roomLoader.js'
import { pcNames, crtNames, makeupNames } from './room/constants.js'
import { setupInteractions } from './room/interactions.js'
import { musicPlayerHTML } from './ui/musicPlayerHTML.js'
import { setupMusicPlayer } from './ui/musicPlayer.js'
import { blinkiesHTML } from './ui/blinkiesHTML.js'
import { setupBlinkies } from './ui/blinkies.js'
import { loaderHTML } from './ui/loaderHTML.js'
import { setupLoader } from './ui/loader.js'

const app = document.querySelector('#app')

app.innerHTML = `
<canvas id="three-canvas"></canvas>
${loaderHTML}
${pcWindowHTML}
${ps2WindowHTML}
${sideBoardHTML}
${blinkiesHTML}
${musicPlayerHTML}
${makeupWindowHTML}
`
const loader = setupLoader()

const canvas = document.querySelector('#three-canvas')

setupSideBoard()
setupMusicPlayer()
setupBlinkies()

const pcWindowLayer = document.querySelector('#pc-window-test')

const pcWindow = setupPcWindow({
  onOpen() {
    controls.enabled = false
    outlinePass.selectedObjects = []
    document.body.style.cursor = 'default'
  },

  onClose() {
    controls.enabled = true
  }
})

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x05050a)
scene.fog = new THREE.Fog(0x05050a, 0, 50)

const camera = new THREE.PerspectiveCamera(
  32,
  window.innerWidth / window.innerHeight,
  0.001,
  318
)

camera.position.set(-1.4, 1.13, 1.9)

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(0.75)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.domElement.style.imageRendering = 'pixelated'
renderer.toneMapping = THREE.NoToneMapping
renderer.toneMappingExposure = 1

const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.dampingFactor = 0.06
controls.enableRotate = true
controls.enableZoom = true
controls.enablePan = true
controls.rotateSpeed = 0.43
controls.zoomSpeed = 0.8
controls.panSpeed = 0.5
controls.minDistance = 0
controls.maxDistance = Infinity
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI
controls.minAzimuthAngle = -Infinity
controls.maxAzimuthAngle = Infinity
controls.target.set(-0.1, 1.3, -0.5)
controls.update()

setupLights(scene)

const videos = createRoomVideos()

const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))

const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
)

outlinePass.edgeStrength = 4
outlinePass.edgeGlow = 0.8
outlinePass.edgeThickness = 1.2
outlinePass.pulsePeriod = 1.8
outlinePass.visibleEdgeColor.set('#00ff66')
outlinePass.hiddenEdgeColor.set('#05050a')

composer.addPass(outlinePass)

const ps2Window = setupPs2Window({
  onOpen() {
    controls.enabled = false
    outlinePass.selectedObjects = []
    document.body.style.cursor = 'default'
  },

  onClose() {
    controls.enabled = true
  }
})

const makeupWindow = setupMakeupWindow({
  onOpen() {
    controls.enabled = false
    outlinePass.selectedObjects = []
    document.body.style.cursor = 'default'
  },

  onClose() {
    controls.enabled = true
  }
})

const clickableGroups = {
  pc: [],
  crt: [],
  makeup: []
}

loadRoom({
  scene,
  videos,
  clickableGroups,
  pcNames,
  crtNames,
  makeupNames,

  onProgress(percent) {
    loader.setProgress(percent)
  },

  onLoad() {
    loader.complete()
  }
})

setupInteractions({
  camera,
  pcWindowLayer,
  ps2Window,
  makeupWindow,
  outlinePass,
  clickableGroups,

  openPcWindow() {
  pcWindow.open()
  },

  openPs2Window() {
    ps2Window.open()
  },

  openMakeupWindow() {
    makeupWindow.open()
  }
})

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  composer.render()
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
  outlinePass.setSize(window.innerWidth, window.innerHeight)
})

const favicon = document.querySelector('#favicon')

const favicons = [
  '/favicon1.png',
  '/favicon2.png'
]

let faviconIndex = 0

setInterval(() => {
  faviconIndex = (faviconIndex + 1) % favicons.length

  favicon.href = `${favicons[faviconIndex]}?v=${Date.now()}`
}, 500)