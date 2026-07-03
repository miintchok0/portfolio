export function setupPcWindow({ onOpen, onClose } = {}) {
  const pcWindowLayer = document.querySelector('#pc-window-test')
  const desktopArea = document.querySelector('#desktop-area')
  const draggableIcons = document.querySelectorAll('.draggable-icon')
  const gifPopupLayer = document.querySelector('#gif-popup-layer')
  const portfolioWindow = document.querySelector('#portfolio-window')
  const portfolioTitlebar = document.querySelector('#portfolio-titlebar')

  function makeDraggableIcon(icon) {
    let isDragging = false
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0

    icon.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()

      isDragging = true
      startX = e.clientX
      startY = e.clientY
      startLeft = icon.offsetLeft
      startTop = icon.offsetTop
      icon.classList.add('dragging')
    })

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return

      const rect = desktopArea.getBoundingClientRect()
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let x = startLeft + dx
      let y = startTop + dy

      x = Math.max(0, Math.min(x, rect.width - icon.offsetWidth))
      y = Math.max(0, Math.min(y, rect.height - icon.offsetHeight))

      icon.style.left = `${x}px`
      icon.style.top = `${y}px`
    })

    window.addEventListener('mouseup', () => {
      isDragging = false
      icon.classList.remove('dragging')
    })
  }

  function makeWindowDraggable(win, handle) {
    let isDragging = false
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0

    handle.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()

      isDragging = true
      startX = e.clientX
      startY = e.clientY

      const rect = win.getBoundingClientRect()
      startLeft = rect.left
      startTop = rect.top

      win.style.position = 'fixed'
      win.style.left = `${startLeft}px`
      win.style.top = `${startTop}px`
      win.style.margin = '0'
    })

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return

      win.style.left = `${startLeft + e.clientX - startX}px`
      win.style.top = `${startTop + e.clientY - startY}px`
    })

    window.addEventListener('mouseup', () => {
      isDragging = false
    })
  }

  function openGifPopup(src, title) {
    const popup = document.createElement('div')
    popup.className = 'window gif-popup'

    popup.innerHTML = `
      <div class="title-bar gif-titlebar">
        <div class="title-bar-text">${title}</div>
        <div class="title-bar-controls">
          <button aria-label="Close"></button>
        </div>
      </div>

      <div class="window-body gif-body">
        <img src="${src}" />
      </div>
    `

    popup.style.left = `${120 + Math.random() * 240}px`
    popup.style.top = `${90 + Math.random() * 160}px`

    gifPopupLayer.appendChild(popup)

    popup.querySelector('[aria-label="Close"]').addEventListener('click', () => {
      popup.remove()
    })

    makeWindowDraggable(popup, popup.querySelector('.gif-titlebar'))
  }

  function open() {
    pcWindowLayer.classList.remove('hidden')
    onOpen?.()
  }

  function close() {
    pcWindowLayer.classList.add('hidden')
    portfolioWindow.classList.remove('minimized')
    onClose?.()
  }

  draggableIcons.forEach(makeDraggableIcon)
  makeWindowDraggable(portfolioWindow, portfolioTitlebar)

  document.querySelector('#close-window').addEventListener('click', (e) => {
    e.stopPropagation()
    close()
  })

  document.querySelector('#minimize-window').addEventListener('click', (e) => {
    e.stopPropagation()
    close()
  })

  document.querySelector('#maximize-window').addEventListener('click', (e) => {
    e.stopPropagation()
    portfolioWindow.classList.toggle('maximized')
  })

  document.querySelectorAll('.easter-icon').forEach((icon) => {
    icon.addEventListener('dblclick', () => {
      openGifPopup(icon.dataset.gif, icon.dataset.title)
    })
  })

  return {
    open,
    close,

    isOpen() {
      return !pcWindowLayer.classList.contains('hidden')
    }
  }
}