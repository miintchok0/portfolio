import * as THREE from 'three'

export function setupLights(scene) {

  const redAmbient = new THREE.AmbientLight(0xfffafa, 4.8)
  scene.add(redAmbient)

  const lavaPurple = new THREE.PointLight(0xb66cff, 1.54, 18.4)
  lavaPurple.position.set(0.19, 1.2, -1.02)
  scene.add(lavaPurple)

  const ps2Blue = new THREE.PointLight(0xfcfee1, 0.12, 3.5)
  ps2Blue.position.set(1.2, 0.95, -0.06)
  scene.add(ps2Blue)

  const muralOrange = new THREE.PointLight(0xfcf2f6, 1.02, 1)
  muralOrange.position.set(-1.15, 1.05, -0.75)
  scene.add(muralOrange)

  const softRed = new THREE.PointLight(0x06fe23, 0.62, 25.7)
  softRed.position.set(1, 2.8, -1.02)
  scene.add(softRed)

  const thrillerLight = new THREE.PointLight(0xc4b4fe, 0, 18.4)
  thrillerLight.position.set(0.73, 1.4, -0.75)
  scene.add(thrillerLight)

  const extraAmbient = new THREE.AmbientLight(0xfffffa, 0.08)
  scene.add(extraAmbient)

  const lightPresets = {
    morning: {
      redAmbient: { intensity: 4.8, color: '#fffafa' },
      lavaPurple: { position: [0.19,1.2,-1.02], intensity:1.54, distance:18.4, color:'#b66cff' },
      ps2Blue: { position:[1.2,0.95,-0.06], intensity:0.12, distance:3.5, color:'#fcfee1' },
      muralOrange:{ position:[-1.15,1.05,-0.75], intensity:1.02, distance:1, color:'#fcf2f6' },
      softRed:{ position:[1,2.8,-1.02], intensity:0.62, distance:25.7, color:'#06fe23' },
      thrillerLight:{ position:[0.73,1.4,-0.75], intensity:0, distance:18.4, color:'#c4b4fe' },
      extraAmbient:{ intensity:0.08, color:'#fffffa' }
    },

    afternoon: {
      redAmbient:{ intensity:2.9, color:'#ffedad' },
      lavaPurple:{ position:[0.19,1.2,-1.02], intensity:2.37, distance:18.4, color:'#b665ff' },
      ps2Blue:{ position:[1.2,0.95,-0.06], intensity:0.48, distance:3.5, color:'#b3ffec' },
      muralOrange:{ position:[-1.15,1.05,-0.75], intensity:4.38, distance:1, color:'#f9c05d' },
      softRed:{ position:[1,2.8,-1.02], intensity:0.62, distance:25.7, color:'#fef9be' },
      thrillerLight:{ position:[0.73,1.4,0.06], intensity:2.1, distance:18.4, color:'#b35656' },
      extraAmbient:{ intensity:0.08, color:'#ff9999' }
    },

    evening: {
      redAmbient:{ intensity:1.42, color:'#94a6ff' },
      lavaPurple:{ position:[0.19,1.2,-1.02], intensity:2.77, distance:18.4, color:'#b66cff' },
      ps2Blue:{ position:[1.2,0.95,-0.06], intensity:0.48, distance:3.5, color:'#8aebff' },
      muralOrange:{ position:[-0.75,1.05,-1.02], intensity:8.83, distance:1, color:'#f7a922' },
      softRed:{ position:[1,2.8,-1.02], intensity:0.89, distance:25.7, color:'#8df934' },
      thrillerLight:{ position:[0.73,1.4,-0.75], intensity:2.1, distance:18.4, color:'#feca10' },
      extraAmbient:{ intensity:1.29, color:'#fb8c32' }
    },

    night: {
      redAmbient:{ intensity:0, color:'#94a6ff' },
      lavaPurple:{ position:[0.19,1.2,-1.02], intensity:2.77, distance:18.4, color:'#f56bff' },
      ps2Blue:{ position:[1.2,0.95,-0.06], intensity:0.35, distance:3.5, color:'#25d5f8' },
      muralOrange:{ position:[-0.75,1.05,-1.02], intensity:2.1, distance:1, color:'#2230f7' },
      softRed:{ position:[1,2.8,-1.02], intensity:3.17, distance:25.7, color:'#c800ff' },
      thrillerLight:{ position:[0.73,1.4,-0.75], intensity:1.42, distance:18.4, color:'#10fafe' },
      extraAmbient:{ intensity:0.48, color:'#bb00ff' }
    }
  }

  function applyPoint(light,data){
    if(data.position) light.position.set(...data.position)
    light.intensity=data.intensity
    if(data.distance!==undefined) light.distance=data.distance
    light.color.set(data.color)
  }

  function applyAmbient(light,data){
    light.intensity=data.intensity
    light.color.set(data.color)
  }

  function getPreset(){

    const h=new Date().getHours()

    if(h>=6 && h<12) return "morning"
    if(h>=12 && h<18) return "afternoon"
    if(h>=18 && h<23) return "evening"

    return "night"
  }

  function applyPreset(){

    const p=lightPresets[getPreset()]

    applyAmbient(redAmbient,p.redAmbient)
    applyPoint(lavaPurple,p.lavaPurple)
    applyPoint(ps2Blue,p.ps2Blue)
    applyPoint(muralOrange,p.muralOrange)
    applyPoint(softRed,p.softRed)
    applyPoint(thrillerLight,p.thrillerLight)
    applyAmbient(extraAmbient,p.extraAmbient)

  }

  applyPreset()

  setInterval(applyPreset,60000)

  return {
    redAmbient,
    lavaPurple,
    ps2Blue,
    muralOrange,
    softRed,
    thrillerLight,
    extraAmbient
  }

}