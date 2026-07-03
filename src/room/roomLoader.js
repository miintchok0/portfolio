import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { setupDailyObjects } from './dailyObjects.js'

export function loadRoom({
  scene,
  videos,
  clickableGroups,
  pcNames,
  crtNames,
  makeupNames
}) {
  const loader = new GLTFLoader()

  loader.load(
    '/models/3droom.glb',

    (gltf) => {
      const room = gltf.scene
      scene.add(room)
      
      setupDailyObjects(room)

      room.traverse((child) => {
        if (!child.isMesh) return

        child.frustumCulled = false

        if (child.name === 'schermotv') {
          child.material = new THREE.MeshBasicMaterial({
            map: videos.tv,
            toneMapped: false
          })
        } else if (child.name === 'schermopc') {
          child.material = new THREE.MeshBasicMaterial({
            map: videos.pc,
            toneMapped: false
          })
        } else if (child.name === 'lavawax') {
          child.material = new THREE.MeshBasicMaterial({
            map: videos.lava,
            toneMapped: false
          })
        } else if (child.material) {
          child.material.needsUpdate = true
        }

        if (pcNames.includes(child.name)) {
          clickableGroups.pc.push(child)
        }

        if (crtNames.includes(child.name)) {
          clickableGroups.crt.push(child)
        }

        if (makeupNames.includes(child.name)) {
          clickableGroups.makeup.push(child)
        }
      })

      console.log('Stanza caricata')
    },

    undefined,

    (error) => {
      console.error(error)
    }
  )
}