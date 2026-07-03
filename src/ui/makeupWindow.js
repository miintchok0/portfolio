export function setupMakeupWindow({ onOpen, onClose } = {}) {
  const makeupWindow = document.querySelector('#makeup-window')
  const closeButton = document.querySelector('#close-makeup-window')
  const page = document.querySelector('.makeup-page')
  const magicCursor = document.querySelector('#magic-cursor')
  const sparkleLayer = document.querySelector('#magic-sparkle-layer')

  const textures = [
    'cit60083.jpg',
    'cin60229.jpg',
    'cin60106.jpg',
    '086C.jpg',
    'pdj50165.gif',
    'ST191.jpg',
    'ST168.jpg'
  ]

  function getWeeklyTexture() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const week = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7))

    return textures[week % textures.length]
  }

  function applyWeeklyTexture() {
  const texture = getWeeklyTexture()
  const textureUrl = `/textures/${texture}`

  page.style.backgroundImage = `url("${textureUrl}")`
  page.style.backgroundRepeat = 'repeat'
  page.style.backgroundSize = 'auto'
  page.style.backgroundPosition = 'top left'
}

  function open() {
    applyWeeklyTexture()
    makeupWindow.classList.remove('hidden')
    onOpen?.()
  }

  function close() {
    makeupWindow.classList.add('hidden')
    onClose?.()
  }

  closeButton.addEventListener('click', close)

  window.addEventListener('keydown', (event) => {
    if (makeupWindow.classList.contains('hidden')) return

    if (event.key === 'Escape') {
      close()
    }
  })

  let lastSparkle = 0

  function createSparkle(x, y) {
    if (!sparkleLayer) return

    const sparkle = document.createElement('span')
    sparkle.className = 'magic-sparkle'
    sparkle.textContent = Math.random() > 0.5 ? '✦' : '✧'

    sparkle.style.left = `${x}px`
    sparkle.style.top = `${y}px`
    sparkle.style.color = Math.random() > 0.5 ? '#ffe84d' : '#8ee7ff'
    sparkle.style.fontSize = `${12 + Math.random() * 10}px`

    sparkleLayer.appendChild(sparkle)

    setTimeout(() => {
      sparkle.remove()
    }, 650)
  }

  makeupWindow.addEventListener('mousemove', (event) => {
    if (makeupWindow.classList.contains('hidden')) return

    if (magicCursor) {
      magicCursor.style.left = `${event.clientX}px`
      magicCursor.style.top = `${event.clientY}px`
    }

    const now = performance.now()

    if (now - lastSparkle < 35) return

    lastSparkle = now

    createSparkle(event.clientX + 8, event.clientY + 8)
  })

  return {
    open,
    close,

    isOpen() {
      return !makeupWindow.classList.contains('hidden')
    }
  }
}