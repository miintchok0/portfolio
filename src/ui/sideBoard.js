export function setupSideBoard() {
  const board = document.querySelector('#side-board')
  const toggle = document.querySelector('#side-board-toggle')
  const stickers = document.querySelectorAll('.sticker-draggable')
  const area = document.querySelector('#sticker-area')
  const mailSticker = document.querySelector('#mail-sticker')
  const welcomeNote = document.querySelector('#welcome-note')
  const closeNote = document.querySelector('.note-close')

  toggle.addEventListener('click', () => {
    board.classList.toggle('closed')
  })

  stickers.forEach((sticker) => {
    let isDragging = false
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0

    sticker.addEventListener('mousedown', (event) => {
      event.preventDefault()
      event.stopPropagation()

      isDragging = true
      startX = event.clientX
      startY = event.clientY
      startLeft = sticker.offsetLeft
      startTop = sticker.offsetTop
      sticker.classList.add('dragging')
    })

    window.addEventListener('mousemove', (event) => {
      if (!isDragging) return

      const rect = area.getBoundingClientRect()

      let x = startLeft + event.clientX - startX
      let y = startTop + event.clientY - startY

      x = Math.max(0, Math.min(x, rect.width - sticker.offsetWidth))
      y = Math.max(0, Math.min(y, rect.height - sticker.offsetHeight))

      sticker.style.left = `${x}px`
      sticker.style.top = `${y}px`
    })

    window.addEventListener('mouseup', () => {
      isDragging = false
      sticker.classList.remove('dragging')
    })
  })

  if (mailSticker && welcomeNote && closeNote) {
    mailSticker.addEventListener('click', (event) => {
      event.stopPropagation()
      welcomeNote.classList.remove('hidden')
    })

    closeNote.addEventListener('click', (event) => {
      event.stopPropagation()
      welcomeNote.classList.add('hidden')
    })

    makeDraggableNote(welcomeNote)
  }

  function makeDraggableNote(note) {
    let isDragging = false
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0

    note.addEventListener('mousedown', (event) => {
      if (event.target.closest('.note-close')) return

      event.preventDefault()
      event.stopPropagation()

      isDragging = true
      startX = event.clientX
      startY = event.clientY

      const rect = note.getBoundingClientRect()
      startLeft = rect.left
      startTop = rect.top

      note.style.left = `${startLeft}px`
      note.style.top = `${startTop}px`
      note.style.position = 'fixed'
      note.classList.add('dragging')
    })

    window.addEventListener('mousemove', (event) => {
      if (!isDragging) return

      note.style.left = `${startLeft + event.clientX - startX}px`
      note.style.top = `${startTop + event.clientY - startY}px`
    })

    window.addEventListener('mouseup', () => {
      isDragging = false
      note.classList.remove('dragging')
    })
  }
}