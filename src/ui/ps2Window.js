export function setupPs2Window({ onOpen, onClose } = {}) {
  const ps2Window = document.querySelector('#ps2-window')
  const video = document.querySelector('#ps2-bg-video')
  const menu = document.querySelector('#ps2-menu')
  const optionsContainer = document.querySelector('#ps2-options')

  const sounds = {
    choose: new Audio('/sounds/choose.mp3'),
    back: new Audio('/sounds/back.mp3'),
    select: new Audio('/sounds/select.mp3')
  }

  Object.values(sounds).forEach((sound) => {
    sound.preload = 'auto'
    sound.volume = 0.8
  })

  const menus = {
    main: {
      title: '',
      items: [
        { label: 'installazioni', target: 'installazioni' },
        { label: 'interattività', target: 'interattivita' },
        { label: 'visual', target: 'visual' }
      ]
    },

    installazioni: {
      title: 'installazioni',
      items: [
        { label: 'Panarmonie', detail: 'panarmonie' },
        { label: '11:34', detail: '1134' },
        { label: 'kinect', detail: 'kinect' }
      ]
    },

    interattivita: {
      title: 'interattività',
      items: [
        { label: 'troll.html', detail: 'troll' },
        { label: 'this.website :)', detail: 'thiswebsite' }
      ]
    },

    visual: {
      title: 'visual',
      items: [
        { label: 'hall de lumieres - winesound', detail: 'hall' },
        { label: 'vj artist & operator', detail: 'vjoperator' }
      ]
    }
  }

  const details = {
    panarmonie: {
      title: 'panarmonie',
      text: 'blablablabla — qui poi inseriamo documentazione, audio, immagini, video e descrizione del progetto.'
    },
    1134: {
      title: '11:34',
      text: 'spazio dedicato alla documentazione del progetto 11:34.'
    },
    kinect: {
      title: 'kinect',
      text: 'installazione multimediale e sonora in collaborazione con Valerio.'
    },
    troll: {
      title: 'troll.html',
      text: 'sito gioco / ragebait in collaborazione con Chiara.'
    },
    thiswebsite: {
      title: 'this.website :)',
      text: 'spazio per esperimenti web e interattivi.'
    },
    hall: {
      title: 'hall de lumieres - winesound',
      text: 'visual riempitivi della struttura per Winesound / Move The Passion.'
    },
    vjoperator: {
      title: 'vj artist & operator',
      text: 'visual per DJ e lavoro come operatrice VJ nei locali.'
    }
  }

  let currentMenu = 'main'
  let currentIndex = 0
  let detailOpen = null
  let menuTimeout = null

  function playSound(name) {
    const baseSound = sounds[name]
    if (!baseSound) return

    const sound = baseSound.cloneNode()
    sound.volume = 0.8
    sound.play().catch(() => {})
  }

  function renderMenu() {
    optionsContainer.innerHTML = ''

    if (detailOpen) {
      const detail = details[detailOpen]

      optionsContainer.innerHTML = `
        <div class="ps2-detail-panel">
          <h2>${detail.title}</h2>
          <p>${detail.text}</p>
        </div>
      `

      return
    }

    const menuData = menus[currentMenu]

    if (menuData.title) {
      const title = document.createElement('div')
      title.className = 'ps2-section-title'
      title.textContent = menuData.title
      optionsContainer.appendChild(title)
    }

    menuData.items.forEach((item, index) => {
      const button = document.createElement('button')
      button.className = 'ps2-menu-item'
      button.textContent = item.label

      if (index === currentIndex) {
        button.classList.add('active')
      }

      button.addEventListener('click', () => {
        currentIndex = index
        selectCurrent()
      })

      optionsContainer.appendChild(button)
    })
  }

  function showMenuAfterDelay() {
    menu.classList.add('hidden')
    clearTimeout(menuTimeout)

    menuTimeout = setTimeout(() => {
      menu.classList.remove('hidden')
      renderMenu()
    }, 7000)
  }

  function open() {
    ps2Window.classList.remove('hidden')

    currentMenu = 'main'
    currentIndex = 0
    detailOpen = null
    renderMenu()

    video.currentTime = 0
    video.muted = false

    video.play().catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })

    showMenuAfterDelay()
    onOpen?.()
  }

  function close() {
    ps2Window.classList.add('hidden')
    menu.classList.add('hidden')

    clearTimeout(menuTimeout)

    video.pause()
    video.currentTime = 0

    onClose?.()
  }

  function move(direction) {
    if (ps2Window.classList.contains('hidden')) return
    if (menu.classList.contains('hidden')) return
    if (detailOpen) return

    const items = menus[currentMenu].items

    currentIndex += direction

    if (currentIndex < 0) currentIndex = items.length - 1
    if (currentIndex >= items.length) currentIndex = 0

    renderMenu()
    playSound('choose')
  }

  function selectCurrent() {
    if (ps2Window.classList.contains('hidden')) return
    if (menu.classList.contains('hidden')) return
    if (detailOpen) return

    const selected = menus[currentMenu].items[currentIndex]

    playSound('select')

    if (selected.target) {
      currentMenu = selected.target
      currentIndex = 0
      renderMenu()
      return
    }

    if (selected.detail) {
      detailOpen = selected.detail
      renderMenu()
    }
  }

  function goBack() {
    if (ps2Window.classList.contains('hidden')) return

    playSound('back')

    if (detailOpen) {
      detailOpen = null
      renderMenu()
      return
    }

    if (currentMenu !== 'main') {
      currentMenu = 'main'
      currentIndex = 0
      renderMenu()
    }
  }

  window.addEventListener('keydown', (event) => {
    if (ps2Window.classList.contains('hidden')) return

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      selectCurrent()
    }

    if (event.key === 'Backspace') {
      event.preventDefault()
      goBack()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  })

  return {
    open,
    close,

    isOpen() {
      return !ps2Window.classList.contains('hidden')
    }
  }
}