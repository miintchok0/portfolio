import * as THREE from 'three'

function createVideoTexture(src) {

  const video = document.createElement('video')

  video.src = src
  video.loop = true
  video.muted = true
  video.playsInline = true
  video.autoplay = true

  video.play().catch(() => {
    console.log('Il video partirà al primo click:', src)
  })

  const texture = new THREE.VideoTexture(video)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = false

  return texture
}

export function createRoomVideos() {

  return {

    tv: createVideoTexture('/videos/playy.mp4'),

    pc: createVideoTexture('/videos/typing.mp4'),

    lava: createVideoTexture('/videos/lavalamp_512.mp4')

  }

}