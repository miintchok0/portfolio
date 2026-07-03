import { spotifyTracks } from './tracks.js'

export function setupMusicPlayer() {
  const widget = document.querySelector('#music-widget')
  const closeButton = document.querySelector('#close-music-player')
  const blinkie = document.querySelector('#nowplaying-blinkie')
  const statusText = document.querySelector('#music-status-text')
  const iframe = document.querySelector('#spotify-iframe')
  const prevButton = document.querySelector('#music-prev')
  const nextButton = document.querySelector('#music-next')
  const sideBoard = document.querySelector('#side-board')

  const tracks = shuffle(spotifyTracks)

  function shuffle(array) {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

  if (!widget || !iframe) return

  const openButton = document.querySelector('#music-sticker')

  openButton?.addEventListener('click', () => {
  widget.classList.remove('hidden')
  })

  let currentTrack = 0
  let isPlaying = false

  function updateState() {
    widget.classList.toggle('playing', isPlaying)

    if (statusText) {
      statusText.textContent = isPlaying
        ? 'playing'
        : `track ${currentTrack + 1}/${tracks.length}`
    }
  }

  function loadTrack(index) {
  currentTrack = (index + tracks.length) % tracks.length

  iframe.src = tracks[currentTrack].src
  widget.style.setProperty('--track-border', tracks[currentTrack].border)

  isPlaying = false
  updateState()
  }

  function open() {
    widget.classList.remove('hidden')
  }

  function close() {
    widget.classList.add('hidden')
    isPlaying = false
    updateState()
  }

  closeButton?.addEventListener('click', close)

  blinkie?.addEventListener('click', () => {
    isPlaying = !isPlaying
    updateState()
  })

  prevButton?.addEventListener('click', () => {
    loadTrack(currentTrack - 1)
  })

  nextButton?.addEventListener('click', () => {
    loadTrack(currentTrack + 1)
  })

  const observer = new MutationObserver(() => {
    if (!sideBoard) return
    widget.classList.toggle('closed-with-board', sideBoard.classList.contains('closed'))
  })

  if (sideBoard) {
    observer.observe(sideBoard, {
      attributes: true,
      attributeFilter: ['class']
    })
  }

  loadTrack(currentTrack)

  return {
    open,
    close
  }
}